// Função para ler CSV simples (assume header: Dia,Início,Fim,Turma)
function lerCSV(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const texto = reader.result;
        const linhas = texto.trim().split('\n');
        const cabecalho = linhas[0].split(',').map(c => c.trim());
        const dados = linhas.slice(1).map(linha => {
          const cols = linha.split(',').map(c => c.trim());
          let obj = {};
          cabecalho.forEach((col, i) => obj[col] = cols[i]);
          return obj;
        });
        resolve(dados);
      };
      reader.onerror = () => reject('Erro ao ler arquivo ' + file.name);
      reader.readAsText(file, 'UTF-8');
    });
  }
  
  function parseHorario(horaStr) {
    const [h, m] = horaStr.split(':').map(Number);
    return h * 60 + m; // minutos totais para facilitar comparação
  }
  
  function horariosConflitam(h1, h2) {
    if (h1.Dia !== h2.Dia) return false;
    const inicio1 = parseHorario(h1.Início);
    const fim1 = parseHorario(h1.Fim);
    const inicio2 = parseHorario(h2.Início);
    const fim2 = parseHorario(h2.Fim);
  
    // Verifica se os intervalos se sobrepõem
    return !(fim1 <= inicio2 || fim2 <= inicio1);
  }
  
  document.getElementById('btnVerificar').addEventListener('click', async () => {
    const fileA = document.getElementById('fileTurmaA').files[0];
    const fileB = document.getElementById('fileTurmaB').files[0];
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
  
    if (!fileA || !fileB) {
      alert('Por favor, selecione os dois arquivos CSV.');
      return;
    }
  
    try {
      const turmaA = await lerCSV(fileA);
      const turmaB = await lerCSV(fileB);
  
      // Para cada horário em turma A, comparar com cada horário em turma B
      const conflitos = [];
  
      turmaA.forEach(hA => {
        turmaB.forEach(hB => {
          if (horariosConflitam(hA, hB)) {
            conflitos.push({hA, hB});
          }
        });
      });
  
      if (conflitos.length === 0) {
        resultadoDiv.innerHTML = '<div class="ok">Nenhum conflito encontrado entre as turmas.</div>';
      } else {
        resultadoDiv.innerHTML = `<h2>Conflitos encontrados: ${conflitos.length}</h2>`;
        conflitos.forEach(({hA, hB}, i) => {
          const div = document.createElement('div');
          div.className = 'conflito';
          div.innerHTML = `<strong>Conflito ${i + 1}:</strong><br>
            Turma A - Dia ${hA.Dia}, ${hA.Início} às ${hA.Fim}<br>
            Turma B - Dia ${hB.Dia}, ${hB.Início} às ${hB.Fim}`;
          resultadoDiv.appendChild(div);
        });
      }
    } catch (err) {
      alert('Erro: ' + err);
    }
  });
  