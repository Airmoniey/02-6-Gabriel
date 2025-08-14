const professores = [
    'Prof. Silva', 'Prof. Santos', 'Prof. Souza', 'Prof. Costa',
    'Prof. Almeida', 'Prof. Pereira', 'Prof. Oliveira'
  ];
  const materias = [
    'Matemática', 'Português', 'História', 'Geografia',
    'Física', 'Química', 'Biologia'
  ];
  
  const tabela         = document.getElementById('tabelaHorarios');
  const professorInput = document.getElementById('buscaProfessor');
  const aulaInput      = document.getElementById('buscaAula');
  const materiaInput   = document.getElementById('buscaMateria');
  const btnGerar       = document.getElementById('btnGerar');
  const btnDownload    = document.getElementById('btnDownload');
  
  function aplicarFiltro() {
    const prof    = professorInput.value.toLowerCase();
    const aula    = aulaInput.value.toLowerCase();
    const materia = materiaInput.value.toLowerCase();
  
    for (let row of tabela.rows) {
      const texto = row.textContent.toLowerCase();
      row.style.display = (texto.includes(prof)
                         && texto.includes(aula)
                         && texto.includes(materia))
                        ? '' : 'none';
    }
  }
  
  professorInput.addEventListener('input', aplicarFiltro);
  aulaInput.addEventListener('input', aplicarFiltro);
  materiaInput.addEventListener('input', aplicarFiltro);
  
  function gerarHorarios() {
    for (let row of tabela.rows) {
      if (row.cells.length < 6) continue; // Ignora intervalo
      for (let i = 1; i <= 5; i++) {
        const prof = professores[Math.floor(Math.random() * professores.length)];
        const mat  = materias[Math.floor(Math.random() * materias.length)];
        row.cells[i].textContent = `${prof} - ${mat}`;
      }
    }
    professorInput.value = '';
    aulaInput.value      = '';
    materiaInput.value   = '';
  }
  
  function downloadCSV() {
    const rows = [];
    const headers = Array.from(document.querySelectorAll('table thead th'))
                         .map(th => th.textContent.trim());
    rows.push(headers);
  
    for (let row of tabela.rows) {
      const rowData = Array.from(row.cells).map(td => td.textContent.trim());
      rows.push(rowData);
    }
  
    const csvContent = rows
      .map(r => r.map(cell => `"${cell.replace(/"/g,'""')}"`).join(','))
      .join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'horarios.csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  btnGerar.addEventListener('click', gerarHorarios);
  btnDownload.addEventListener('click', downloadCSV);
  