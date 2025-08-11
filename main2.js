/* main.js - MVP frontend
 - CSV import (PapaParse)
 - Preview + mapeamento
 - Aplicar e salvar entradas em localStorage
 - Detectar conflitos simples (professor, sala, turma)
 - Mostrar em tabela e FullCalendar
 - Modal para adicionar evento
 - Lista de professores - marcar inativo
*/

const state = {
  rawCsv: null,
  columns: [],
  entries: [], // normalized timetable entries
  teachers: {}, // {name: {name, active:true}}
};

// util: show aviso
function setAviso(text, tone = 'info') {
  const avisos = document.getElementById('avisos');
  avisos.innerHTML = `<div class="card" style="margin-bottom:8px"><strong>${tone==='error'? 'Erro':'Aviso'}</strong>: ${text}</div>`;
  setTimeout(()=>{ if(avisos.innerHTML) avisos.innerHTML=''; }, 5000);
}

/* ---------------- CSV Import / Preview ---------------- */
const fileInput = document.getElementById('fileInput');
document.getElementById('btnImportar').addEventListener('click', ()=> fileInput.click());

fileInput.addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  Papa.parse(file, {
    header: true,
    dynamicTyping: false,
    worker: true,
    preview: 10000,
    complete: (results)=> {
      state.rawCsv = results.data;
      state.columns = results.meta.fields || Object.keys(results.data[0]||{});
      openPreview();
    },
    error: (err)=> {
      console.error(err);
      setAviso('Erro ao ler CSV: '+err.message,'error');
    }
  });
});

function openPreview(){
  document.getElementById('previewArea').removeAttribute('aria-hidden');
  const wrapper = document.getElementById('previewTableWrapper');
  wrapper.innerHTML = '';
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  state.columns.forEach(c=>{
    const th = document.createElement('th'); th.textContent = c; tr.appendChild(th);
  });
  thead.appendChild(tr); table.appendChild(thead);
  const tbody = document.createElement('tbody');
  (state.rawCsv.slice(0,10)).forEach(row=>{
    const r = document.createElement('tr');
    state.columns.forEach(c=>{
      const td = document.createElement('td'); td.textContent = row[c] ?? ''; r.appendChild(td);
    });
    tbody.appendChild(r);
  });
  table.appendChild(tbody);
  wrapper.appendChild(table);

  // preencher selects de mapeamento
  ['mapDia','mapHorario','mapDisciplina','mapProfessor','mapSala','mapTurma'].forEach(id=>{
    const sel = document.getElementById(id);
    sel.innerHTML = '<option value="">(coluna)</option>';
    state.columns.forEach(c=>{
      const o = document.createElement('option'); o.value = c; o.textContent = c; sel.appendChild(o);
    });
  });
}

/* cancelar preview */
document.getElementById('btnCancelarPreview').addEventListener('click', ()=>{
  document.getElementById('previewArea').setAttribute('aria-hidden','true');
  state.rawCsv = null; state.columns = [];
  fileInput.value = '';
});

/* aplicar mapeamento */
document.getElementById('btnAplicarMapeamento').addEventListener('click', ()=>{
  // pegar mapeamento
  const map = {
    dia: document.getElementById('mapDia').value,
    horario: document.getElementById('mapHorario').value,
    disciplina: document.getElementById('mapDisciplina').value,
    professor: document.getElementById('mapProfessor').value,
    sala: document.getElementById('mapSala').value,
    turma: document.getElementById('mapTurma').value,
  };
  // validação mínima
  if(!map.dia || !map.horario || !map.professor || !map.turma){
    setAviso('Mapeamento incompleto. Pelo menos: dia, horário, professor, turma.', 'error');
    return;
  }
  // Normalizar entradas
  const normalized = [];
  state.rawCsv.forEach((r, idx)=>{
    // pular linhas vazias
    if(!r[map.dia] || !r[map.horario]) return;
    const entry = {
      id: 'imp-'+idx + '-' + Date.now(),
      day: normalizeDay(r[map.dia]),
      rawDay: String(r[map.dia]),
      horario: String(r[map.horario]).trim(),
      disciplina: r[map.disciplina] ?? '',
      professor: r[map.professor] ?? '',
      sala: r[map.sala] ?? '',
      turma: r[map.turma] ?? '',
      type: r[map.type] ?? 'aula',
      source: 'import',
    };
    const times = parseHorario(entry.horario);
    if(!times) {
      entry.start = null; entry.end = null;
      entry.invalid = true;
    } else {
      entry.start = times.start;
      entry.end = times.end;
    }
    normalized.push(entry);
    // add teacher registry
    if(entry.professor && !state.teachers[entry.professor]){
      state.teachers[entry.professor] = {name: entry.professor, active:true};
    }
  });

  state.entries = (state.entries || []).concat(normalized);
  saveState();
  document.getElementById('previewArea').setAttribute('aria-hidden','true');
  fileInput.value = '';
  setAviso('CSV importado e aplicado. Verifique conflitos na grade.');
  renderAll();
});

/* ---------------- normalization helpers ---------------- */
function normalizeDay(v){
  if(!v) return null;
  v = String(v).toLowerCase().trim();
  if(/^2|terc/i.test(v)) return 2;
  if(/^3|qua/i.test(v)) return 3;
  if(/^4|qui/i.test(v)) return 4;
  if(/^5|sex/i.test(v)) return 5;
  // default 1 for segunda if "seg" or "1"
  if(/^1|seg/i.test(v)) return 1;
  // try number
  const n = parseInt(v);
  if(!isNaN(n) && n>=1 && n<=5) return n;
  return null;
}

function parseHorario(h){
  // espera formatos "08:00-08:45" ou "08:00 - 08:45" ou "08:00/08:45" ou "08:00 08:45"
  if(!h) return null;
  const m = h.match(/(\d{2}:\d{2})\s*[-\/]?\s*(\d{2}:\d{2})/);
  if(!m) return null;
  return {start: m[1], end: m[2]};
}

/* ---------------- persistência (localStorage) ---------------- */
function saveState(){
  localStorage.setItem('vc_entries', JSON.stringify(state.entries));
  localStorage.setItem('vc_teachers', JSON.stringify(state.teachers));
}
function loadState(){
  try{
    const e = JSON.parse(localStorage.getItem('vc_entries')||'[]');
    const t = JSON.parse(localStorage.getItem('vc_teachers')||'{}');
    state.entries = e || [];
    state.teachers = t || {};
  }catch(err){ state.entries=[]; state.teachers={}; }
}
loadState();

/* ---------------- detect conflicts ---------------- */
function detectConflicts(entries = state.entries){
  // normalize: for each entry get key day|start|end
  const conflicts = [];
  const bySlot = {};
  entries.forEach(e => {
    if(!e.start || !e.end || !e.day) return;
    const key = `${e.day}|${e.start}|${e.end}`;
    bySlot[key] = bySlot[key]||[];
    bySlot[key].push(e);
  });

  Object.values(bySlot).forEach(list=>{
    if(list.length<=1) return;
    // check pairwise
    for(let i=0;i<list.length;i++){
      for(let j=i+1;j<list.length;j++){
        const a=list[i], b=list[j];
        if(a.professor && a.professor === b.professor){
          conflicts.push({type:'professor', a,b, key: `${a.id}|${b.id}`});
        }
        if(a.sala && a.sala === b.sala){
          conflicts.push({type:'sala', a,b, key: `${a.id}|${b.id}`});
        }
        if(a.turma && a.turma === b.turma){
          conflicts.push({type:'turma', a,b, key: `${a.id}|${b.id}`});
        }
      }
    }
  });
  return conflicts;
}

/* ---------------- render tabela ---------------- */
function renderTable(){
  const tbody = document.querySelector('#tabelaHorarios tbody');
  tbody.innerHTML = '';
  // create slots common (simple preset: 6 slots)
  const slots = [
    '07:00-07:45','07:45-08:30','08:30-09:15','09:15-10:00','10:15-11:00','11:00-11:45',
    '13:00-13:45','13:45-14:30','14:30-15:15','15:15-16:00'
  ];
  // we will show only unique start times from entries to be more dynamic
  const usedTimes = Array.from(new Set(state.entries.filter(e=>e.start).map(e=> `${e.start}-${e.end}`)));
  const rows = usedTimes.length? usedTimes : slots;

  const conflicts = detectConflicts();

  rows.forEach(slot=>{
    const tr = document.createElement('tr');
    const tdTime = document.createElement('td'); tdTime.textContent = slot; tr.appendChild(tdTime);

    for(let day=1; day<=5; day++){
      const td = document.createElement('td'); td.className='slot-cell';
      const cellEntries = state.entries.filter(e=> e.day===day && `${e.start}-${e.end}` === slot);
      if(cellEntries.length){
        cellEntries.forEach(e=>{
          const div = document.createElement('div');
          div.innerHTML = `<strong>${e.disciplina||'(disc)'} </strong> <span class="muted">[${e.turma||'--'}]</span><br/>
            <small>${e.professor||'--'} • ${e.sala||''}</small>`;
          // check if this entry is in a conflict
          const isConflict = conflicts.some(c=> c.a.id===e.id || c.b.id===e.id);
          if(isConflict) { div.style.borderLeft = '4px solid var(--danger)'; div.style.paddingLeft='6px'; }
          td.appendChild(div);
        });
      } else {
        td.innerHTML = '<span class="muted">—</span>';
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });

  // highlight rows with conflicts (for accessibility)
  // mark any tr that contains a conflict
  Array.from(tbody.querySelectorAll('tr')).forEach(tr=>{
    if(tr.querySelector('[style*="border-left: 4px solid var(--danger)"]')) {
      tr.classList.add('conflict');
    } else tr.classList.remove('conflict');
  });
}

/* ---------------- FullCalendar render ---------------- */
let calendar = null;
function renderCalendar(){
  const calendarEl = document.getElementById('calendar');
  if(!calendar){
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      headerToolbar: { left:'prev,next today', center:'title', right:'timeGridWeek,dayGridMonth' },
      height: 'auto',
      allDaySlot: false,
      slotMinTime: "06:00:00",
      slotMaxTime: "20:00:00",
      nowIndicator: true,
      events: buildCalendarEvents(),
      eventDidMount: function(info){
        // add tooltip
        info.el.title = info.event.extendedProps.details || info.event.title;
      }
    });
    calendar.render();
  } else {
    calendar.removeAllEvents();
    calendar.addEventSource(buildCalendarEvents());
  }
}
function buildCalendarEvents(){
  // convert entries to FullCalendar events (week template; use upcoming Monday as reference)
  const events = [];
  const monday = nextMondayDate();
  state.entries.forEach(e=>{
    if(!e.start || !e.end || !e.day) return;
    const dayOffset = e.day - 1; // 0..4
    const startDate = addTimeToDate(monday, dayOffset, e.start);
    const endDate = addTimeToDate(monday, dayOffset, e.end);
    events.push({
      id: e.id,
      title: `${e.disciplina || 'Aula'} (${e.turma||''})`,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      extendedProps: { professor: e.professor, sala: e.sala, details: `${e.professor || ''} • ${e.sala || ''}` },
      color: e.type === 'prova' ? 'orange' : (e.type==='feriado' ? 'gray' : undefined)
    });
  });
  return events;
}
function nextMondayDate(){
  const now = new Date();
  const diff = (1 + 7 - now.getDay()) % 7; // days to next monday (0..6)
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
  monday.setHours(0,0,0,0);
  return monday;
}
function addTimeToDate(baseDate, dayOffset, hhmm){
  const [hh,mm] = hhmm.split(':').map(Number);
  const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate()+dayOffset, hh, mm, 0);
  return d;
}

/* ---------------- Professores drawer ---------------- */
function renderProfessores(){
  const ul = document.getElementById('listaProfessores');
  ul.innerHTML = '';
  // sort names
  const names = Object.keys(state.teachers).sort((a,b)=> a.localeCompare(b));
  names.forEach(name=>{
    const li = document.createElement('li');
    const t = state.teachers[name];
    li.innerHTML = `<span class="${t.active? '':'inactive'}">${name}</span>`;
    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.checked = t.active;
    toggle.title = t.active? 'Marcar inativo':'Marcar ativo';
    toggle.addEventListener('change', ()=> {
      state.teachers[name].active = toggle.checked;
      // mark entries by this teacher as needing attention (we'll flag via avisos)
      saveState(); renderAll();
      setAviso(`${name} agora ${toggle.checked? 'ativo':'inativo'}`);
    });
    li.appendChild(toggle);
    ul.appendChild(li);
  });
}

/* ---------------- Modal evento ---------------- */
const modal = document.getElementById('modalOverlay');
document.getElementById('btnAddEvento').addEventListener('click', ()=> {
  modal.hidden = false;
  document.getElementById('eventoDescricao').focus();
});
document.getElementById('btnFecharModal').addEventListener('click', ()=> modal.hidden = true);

document.getElementById('formEvento').addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const desc = document.getElementById('eventoDescricao').value;
  const tipo = document.getElementById('eventoTipo').value;
  const dia = Number(document.getElementById('eventoDia').value);
  const horario = document.getElementById('eventoHorario').value.trim();
  const times = parseHorario(horario);
  if(!times){ setAviso('Horário inválido (formato: HH:MM-HH:MM)','error'); return; }
  const e = {
    id: 'evt-' + Date.now(),
    day: dia,
    start: times.start,
    end: times.end,
    disciplina: desc,
    professor: '',
    sala: '',
    turma: '',
    type: tipo,
    source: 'manual'
  };
  state.entries.push(e);
  saveState();
  modal.hidden = true;
  setAviso('Evento adicionado');
  renderAll();
});

/* ---------------- Switch view button ---------------- */
const btnToggleView = document.getElementById('btnToggleView');
btnToggleView.addEventListener('click', ()=>{
  const tableView = document.getElementById('tableView');
  const calendarView = document.getElementById('calendarView');
  if(tableView.hidden){
    tableView.hidden = false; calendarView.hidden = true;
    btnToggleView.textContent = 'Mudar Vista';
  } else {
    tableView.hidden = true; calendarView.hidden = false;
    btnToggleView.textContent = 'Vista em Tabela';
    // render calendar to refresh
    renderCalendar();
  }
});

/* ---------------- utilities and renderAll ---------------- */
function renderAll(){
  // ensure teachers entries exist for any teacher names
  state.entries.forEach(e=>{
    if(e.professor && !state.teachers[e.professor]) state.teachers[e.professor] = {name:e.professor, active:true};
  });

  renderProfessores();
  renderTable();
  if(calendar) renderCalendar(); // refresh events if calendar already initialized
  // check for inativos and show aviso
  const inactiveUsed = state.entries.some(e=> e.professor && state.teachers[e.professor] && !state.teachers[e.professor].active);
  if(inactiveUsed) setAviso('Existem aulas atribuídas a professores marcados como inativos.', 'error');
}

/* initial render */
renderAll();

/* expose for debugging in console */
window._vc = { state, detectConflicts };

/* small UX: load entries sample if empty to demo */
if(!state.entries.length){
  state.entries.push(
    {id:'demo1', day:1, start:'07:00', end:'07:45', disciplina:'Matemática', professor:'Ana Silva', sala:'101', turma:'1DS-A', type:'aula', source:'demo'},
    {id:'demo2', day:1, start:'07:00', end:'07:45', disciplina:'Física', professor:'João Souza', sala:'102', turma:'1DS-B', type:'aula', source:'demo'},
    {id:'demo3', day:1, start:'07:00', end:'07:45', disciplina:'Química', professor:'Ana Silva', sala:'103', turma:'1DM-A', type:'aula', source:'demo'},
  );
  state.teachers['Ana Silva'] = {name:'Ana Silva', active:true};
  state.teachers['João Souza'] = {name:'João Souza', active:true};
  saveState();
  renderAll();
}

