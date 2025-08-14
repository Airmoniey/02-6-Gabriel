document.addEventListener('DOMContentLoaded', function() {
    // Sample data for schedule
    const scheduleData = [
        {
            day: 'mon',
            periods: [
                { id: 'mon-1', subject: 'Matemática', teacher: 'Prof. Silva', type: 'regular', room: 'Sala 101' },
                { id: 'mon-2', subject: 'Português', teacher: 'Prof. Oliveira', type: 'regular', room: 'Sala 102', absent: true },
                { id: 'mon-3', subject: 'Programação Web', teacher: 'Prof. Rodrigues', type: 'technical', room: 'Lab 201' },
                { id: 'mon-4', subject: 'Inglês Técnico', teacher: 'Prof. Almeida', type: 'technical', room: 'Sala 103' },
                { id: 'mon-5', subject: 'Banco de Dados', teacher: 'Prof. Castro', type: 'technical', room: 'Lab 202' },
                { id: 'mon-6', subject: 'Empreendedorismo', teacher: 'Prof. Lima', type: 'technical', room: 'Sala 104' },
                { id: 'mon-7', subject: 'Ética Profissional', teacher: 'Prof. Castro', type: 'technical', room: 'Sala 105' }
            ]
        },
        {
            day: 'tue',
            periods: [
                { id: 'tue-1', subject: 'Física', teacher: 'Prof. Costa', type: 'regular', room: 'Sala 101' },
                { id: 'tue-2', subject: 'História', teacher: 'Prof. Santos', type: 'regular', room: 'Sala 102' },
                { id: 'tue-3', subject: 'Programação Web', teacher: 'Prof. Rodrigues', type: 'technical', room: 'Lab 201' },
                { id: 'tue-4', subject: 'Redes de Computadores', teacher: 'Prof. Nunes', type: 'technical', room: 'Lab 202' },
                { id: 'tue-5', subject: 'Design de Interface', teacher: 'Prof. Lima', type: 'technical', room: 'Sala 103' },
                { id: 'tue-6', subject: 'Banco de Dados', teacher: 'Prof. Castro', type: 'technical', room: 'Lab 201' },
                { id: 'tue-7', subject: 'Projeto Integrador', teacher: 'Prof. Rodrigues', type: 'technical', room: 'Lab 202' }
            ]
        },
        {
            day: 'wed',
            periods: [
                { id: 'wed-1', subject: 'Química', teacher: 'Prof. Lima', type: 'regular', room: 'Sala 101' },
                { id: 'wed-2', subject: 'Geografia', teacher: 'Prof. Souza', type: 'regular', room: 'Sala 102' },
                { id: 'wed-3', subject: 'Análise de Sistemas', teacher: 'Prof. Castro', type: 'technical', room: 'Lab 201' },
                { id: 'wed-4', subject: 'Sistemas Operacionais', teacher: 'Prof. Nunes', type: 'technical', room: 'Lab 202' },
                { id: 'wed-5', subject: 'Banco de Dados', teacher: 'Prof. Castro', type: 'technical', room: 'Lab 201' },
                { id: 'wed-6', subject: 'Projeto Integrador', teacher: 'Prof. Rodrigues', type: 'technical', room: 'Lab 202' },
                { id: 'wed-7', subject: 'Oficina Técnica', teacher: 'Prof. Castro', type: 'technical', room: 'Lab 201' }
            ]
        },
        {
            day: 'thu',
            periods: [
                { id: 'thu-1', subject: 'Biologia', teacher: 'Prof. Dias', type: 'regular', room: 'Sala 101' },
                { id: 'thu-2', subject: 'Sociologia', teacher: 'Prof. Ramos', type: 'regular', room: 'Sala 102' },
                { id: 'thu-3', subject: 'Desenvolvimento Mobile', teacher: 'Prof. Rodrigues', type: 'technical', room: 'Lab 201' },
                { id: 'thu-4', subject: 'Testes de Software', teacher: 'Prof. Lima', type: 'technical', room: 'Lab 202' },
                { id: 'thu-5', subject: 'Cloud Computing', teacher: 'Prof. Castro', type: 'technical', room: 'Lab 201' },
                { id: 'thu-6', subject: 'Segurança Digital', teacher: 'Prof. Nunes', type: 'technical', room: 'Lab 202' },
                { id: 'thu-7', subject: 'Marketing Digital', teacher: 'Prof. Oliveira', type: 'technical', room: 'Sala 103' }
            ]
        },
        {
            day: 'fri',
            periods: [
                { id: 'fri-1', subject: 'Filosofia', teacher: 'Prof. Souza', type: 'regular', room: 'Sala 101' },
                { id: 'fri-2', subject: 'Educação Física', teacher: 'Prof. Mendes', type: 'regular', room: 'Quadra' },
                { id: 'fri-3', subject: 'Projeto Final', teacher: 'Prof. Castro', type: 'technical', room: 'Lab 201' },
                { id: 'fri-4', subject: 'Gestão de Projetos', teacher: 'Prof. Lima', type: 'technical', room: 'Sala 104' },
                { id: 'fri-5', subject: 'Marketing Digital', teacher: 'Prof. Oliveira', type: 'technical', room: 'Sala 103' },
                { id: 'fri-6', subject: 'Orientação Profissional', teacher: 'Prof. Rodrigues', type: 'technical', room: 'Sala 105' },
                { id: 'fri-7', subject: 'Revisão Geral', teacher: 'Prof. Castro', type: 'technical', room: 'Lab 201' }
            ]
        }
    ];

    // Sample teachers
    const teachers = [
        { id: 'silva', name: 'Prof. Silva', subjects: ['Matemática', 'Física'], status: 'active' },
        { id: 'oliveira', name: 'Prof. Oliveira', subjects: ['Português', 'Redação'], status: 'active' },
        { id: 'santos', name: 'Prof. Santos', subjects: ['História'], status: 'active' },
        { id: 'souza', name: 'Prof. Souza', subjects: ['Geografia'], status: 'active' },
        { id: 'lima', name: 'Prof. Lima', subjects: ['Química', 'Testes de Software'], status: 'active' },
        { id: 'costa', name: 'Prof. Costa', subjects: ['Física'], status: 'active' },
        { id: 'dias', name: 'Prof. Dias', subjects: ['Biologia'], status: 'active' },
        { id: 'ramos', name: 'Prof. Ramos', subjects: ['Sociologia'], status: 'active' },
        { id: 'mendes', name: 'Prof. Mendes', subjects: ['Educação Física'], status: 'active' },
        { id: 'rodrigues', name: 'Prof. Rodrigues', subjects: ['Programação Web', 'Desenvolvimento Mobile'], status: 'active' },
        { id: 'castro', name: 'Prof. Castro', subjects: ['Banco de Dados', 'Cloud Computing'], status: 'active' },
        { id: 'nunes', name: 'Prof. Nunes', subjects: ['Redes de Computadores', 'Segurança Digital'], status: 'active' },
        { id: 'almeida', name: 'Prof. Almeida', subjects: ['Inglês Técnico'], status: 'active' }
    ];

    // Sample students for attendance
    const students = [
        { id: 1, name: 'Ana Silva', status: 'present' },
        { id: 2, name: 'Bruno Oliveira', status: 'late' },
        { id: 3, name: 'Carla Santos', status: 'absent' },
        { id: 4, name: 'Daniel Costa', status: 'present' },
        { id: 5, name: 'Eduarda Pereira', status: 'present' },
        { id: 6, name: 'Felipe Mendes', status: 'present' },
        { id: 7, name: 'Gabriela Rocha', status: 'late' },
        { id: 8, name: 'Henrique Alves', status: 'present' },
        { id: 9, name: 'Isabela Lima', status: 'absent' },
        { id: 10, name: 'João Souza', status: 'present' },
        { id: 11, name: 'Karina Oliveira', status: 'late' },
        { id: 12, name: 'Lucas Martins', status: 'present' },
        { id: 13, name: 'Mariana Costa', status: 'present' },
        { id: 14, name: 'Nicolas Silva', status: 'present' },
        { id: 15, name: 'Otávio Santos', status: 'present' }
    ];

    // Render schedule
    function renderSchedule() {
        scheduleData.forEach(day => {
            day.periods.forEach(period => {
                const cell = document.getElementById(period.id);
                cell.innerHTML = '';
                
                if (period.subject) {
                    const subjectDiv = document.createElement('div');
                    subjectDiv.className = `subject ${period.type} ${period.absent ? 'absent-subject' : ''}`;
                    subjectDiv.draggable = true;
                    subjectDiv.dataset.id = period.id;
                    
                    subjectDiv.innerHTML = `
                        <div class="subject-title">${period.subject}</div>
                        <div class="teacher"><i class="fas fa-user"></i> ${period.teacher}</div>
                        <div class="room"><i class="fas fa-door-open"></i> ${period.room}</div>
                        ${period.absent ? '<div class="absent-ribbon">AUSENTE</div>' : ''}
                        <button class="call-btn" data-period="${period.id}">
                            <i class="fas fa-clipboard-list"></i> Chamada
                        </button>
                    `;
                    
                    cell.appendChild(subjectDiv);
                    
                    // Add drag events
                    subjectDiv.addEventListener('dragstart', handleDragStart);
                } else {
                    cell.innerHTML = '<div class="empty-slot"><i class="fas fa-plus-circle"></i> Disponível</div>';
                }
            });
        });
        
        // Add event listeners to call buttons
        document.querySelectorAll('.call-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const periodId = this.dataset.period;
                openAttendanceModal(periodId);
            });
        });
    }

    // Render teachers
    function renderTeachers() {
        const teacherList = document.getElementById('teacher-list');
        teacherList.innerHTML = '';
        
        teachers.forEach(teacher => {
            if (teacher.status === 'active') {
                const teacherCard = document.createElement('div');
                teacherCard.className = 'teacher-card';
                teacherCard.draggable = true;
                teacherCard.dataset.id = teacher.id;
                
                // Get initials for avatar
                const names = teacher.name.split(' ');
                const initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : names[0].charAt(1));
                
                teacherCard.innerHTML = `
                    <div class="teacher-avatar">${initials}</div>
                    <div class="teacher-name">${teacher.name}</div>
                    <div class="teacher-subjects">${teacher.subjects.join(', ')}</div>
                `;
                
                teacherCard.addEventListener('dragstart', handleDragStart);
                teacherList.appendChild(teacherCard);
            }
        });
    }

    // Check for conflicts
    function checkConflicts() {
        // Reset previous conflicts
        document.querySelectorAll('.conflict').forEach(el => {
            el.classList.remove('conflict');
        });
        document.getElementById('conflict-analysis').style.display = 'none';
        document.getElementById('conflicts-list').innerHTML = '';
        
        const conflicts = [];
        const roomUsage = {};
        
        // Analyze schedule for conflicts
        scheduleData.forEach(day => {
            day.periods.forEach(period => {
                if (period.subject) {
                    const key = `${day.day}-${period.id.split('-')[1]}`;
                    
                    // Track room usage
                    if (!roomUsage[period.room]) {
                        roomUsage[period.room] = {};
                    }
                    
                    if (!roomUsage[period.room][key]) {
                        roomUsage[period.room][key] = [];
                    }
                    
                    roomUsage[period.room][key].push({
                        subject: period.subject,
                        teacher: period.teacher,
                        period: key
                    });
                }
            });
        });
        
        // Find room conflicts
        for (const room in roomUsage) {
            for (const time in roomUsage[room]) {
                if (roomUsage[room][time].length > 1) {
                    conflicts.push({
                        type: 'room',
                        room: room,
                        time: time,
                        items: roomUsage[room][time]
                    });
                }
            }
        }
        
        // Find teacher conflicts
        const teacherSchedule = {};
        scheduleData.forEach(day => {
            day.periods.forEach(period => {
                if (period.teacher) {
                    const key = `${day.day}-${period.id.split('-')[1]}`;
                    
                    if (!teacherSchedule[period.teacher]) {
                        teacherSchedule[period.teacher] = {};
                    }
                    
                    if (!teacherSchedule[period.teacher][key]) {
                        teacherSchedule[period.teacher][key] = [];
                    }
                    
                    teacherSchedule[period.teacher][key].push({
                        subject: period.subject,
                        room: period.room,
                        period: key
                    });
                }
            });
        });
        
        for (const teacher in teacherSchedule) {
            for (const time in teacherSchedule[teacher]) {
                if (teacherSchedule[teacher][time].length > 1) {
                    conflicts.push({
                        type: 'teacher',
                        teacher: teacher,
                        time: time,
                        items: teacherSchedule[teacher][time]
                    });
                }
            }
        }
        
        // Highlight conflicts in schedule
        conflicts.forEach(conflict => {
            conflict.items.forEach(item => {
                const cell = document.getElementById(item.period.replace('-', '-'));
                if (cell) {
                    cell.classList.add('conflict');
                }
            });
        });
        
        // Show conflict analysis
        if (conflicts.length > 0) {
            const conflictList = document.getElementById('conflicts-list');
            conflicts.forEach(conflict => {
                const conflictDiv = document.createElement('div');
                conflictDiv.className = 'conflict-item';
                
                if (conflict.type === 'room') {
                    conflictDiv.innerHTML = `
                        <div class="conflict-header">
                            <span><i class="fas fa-door-open"></i> Conflito de Sala: ${conflict.room}</span>
                            <span>${getPeriodTime(conflict.time)}</span>
                        </div>
                        <p>Múltiplas aulas agendadas na mesma sala:</p>
                        <ul>
                            ${conflict.items.map(item => 
                                `<li><i class="fas fa-book"></i> ${item.subject} - ${item.teacher}</li>`
                            ).join('')}
                        </ul>
                    `;
                } else {
                    conflictDiv.innerHTML = `
                        <div class="conflict-header">
                            <span><i class="fas fa-chalkboard-teacher"></i> Conflito de Professor: ${conflict.teacher}</span>
                            <span>${getPeriodTime(conflict.time)}</span>
                        </div>
                        <p>Professor alocado em múltiplas aulas:</p>
                        <ul>
                            ${conflict.items.map(item => 
                                `<li><i class="fas fa-book"></i> ${item.subject} (${item.room})</li>`
                            ).join('')}
                        </ul>
                    `;
                }
                
                conflictList.appendChild(conflictDiv);
            });
            
            document.getElementById('conflict-analysis').style.display = 'block';
            showNotification(`Verificação de conflitos: ${conflicts.length} conflito(s) encontrado(s)!`, 'conflict');
        } else {
            showNotification('Verificação de conflitos: Nenhum conflito encontrado!', 'success');
        }
    }
    
    // Helper function to get period time
    function getPeriodTime(periodKey) {
        const periodId = periodKey.split('-')[1];
        const periodMap = {
            '1': '07:30 - 08:15',
            '2': '08:15 - 09:00',
            '3': '09:00 - 09:45',
            '4': '09:45 - 10:30',
            '5': '10:45 - 11:30',
            '6': '11:30 - 12:15',
            '7': '12:15 - 12:40'
        };
        return periodMap[periodId] || periodKey;
    }

    // Open attendance modal
    function openAttendanceModal(periodId) {
        // Find the period data
        let periodData = null;
        for (const day of scheduleData) {
            const period = day.periods.find(p => p.id === periodId);
            if (period) {
                periodData = period;
                break;
            }
        }
        
        if (!periodData) return;
        
        // Update modal title
        document.getElementById('modal-title').textContent = periodData.subject;
        
        // Update class info
        document.getElementById('class-info').innerHTML = `
            <p><strong><i class="fas fa-chalkboard-teacher"></i> Professor:</strong> ${periodData.teacher}</p>
            <p><strong><i class="fas fa-clock"></i> Horário:</strong> ${document.querySelector(`#${periodId}`).previousElementSibling.textContent}</p>
            <p><strong><i class="fas fa-door-open"></i> Sala:</strong> ${periodData.room}</p>
        `;
        
        // Render attendance list
        const attendanceList = document.getElementById('modal-attendance-list');
        attendanceList.innerHTML = '';
        
        students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'student';
            studentDiv.dataset.id = student.id;
            
            // Get initials for avatar
            const names = student.name.split(' ');
            const initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : names[0].charAt(1));
            
            studentDiv.innerHTML = `
                <div class="student-info">
                    <div class="student-avatar">${initials}</div>
                    <div>${student.name}</div>
                </div>
                <div class="status ${student.status}">${student.status === 'present' ? 'Presente' : 
                    student.status === 'absent' ? 'Falta' : 'Atraso'}</div>
                <div class="attendance-options">
                    <div class="attendance-option present" data-status="present">Presente</div>
                    <div class="attendance-option absent" data-status="absent">Falta</div>
                    <div class="attendance-option late" data-status="late">Atraso</div>
                </div>
            `;
            
            attendanceList.appendChild(studentDiv);
            
            // Add event listeners to status options
            studentDiv.querySelectorAll('.attendance-option').forEach(option => {
                option.addEventListener('click', function() {
                    const status = this.dataset.status;
                    updateStudentStatus(student.id, status);
                });
            });
        });
        
        // Show modal
        document.getElementById('attendance-modal').classList.add('active');
    }
    
    // Update student status
    function updateStudentStatus(studentId, status) {
        const student = students.find(s => s.id === studentId);
        if (student) {
            student.status = status;
            
            // Update UI
            const studentDiv = document.querySelector(`.student[data-id="${studentId}"]`);
            if (studentDiv) {
                studentDiv.querySelector('.status').className = `status ${status}`;
                studentDiv.querySelector('.status').textContent = 
                    status === 'present' ? 'Presente' : 
                    status === 'absent' ? 'Falta' : 'Atraso';
            }
        }
    }
    
    // Close modal
    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('attendance-modal').classList.remove('active');
    });
    
    // Save attendance
    document.getElementById('save-attendance').addEventListener('click', function() {
        showNotification('Frequência salva com sucesso!', 'success');
        document.getElementById('attendance-modal').classList.remove('active');
    });

    // Drag and drop functionality
    let dragSrcEl = null;
    
    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        
        // Add visual feedback
        this.style.opacity = '0.6';
    }
    
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    
    function handleDragEnter(e) {
        this.classList.add('drag-over');
    }
    
    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        
        if (dragSrcEl !== this) {
            dragSrcEl.style.opacity = '1';
            
            // Check if dropping on a subject cell
            if (this.classList.contains('subject')) {
                // Swap subjects
                const dragInnerHTML = dragSrcEl.innerHTML;
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = dragInnerHTML;
            } else if (this.id && this.id.startsWith('mon-') || this.id.startsWith('tue-') || 
                       this.id.startsWith('wed-') || this.id.startsWith('thu-') || 
                       this.id.startsWith('fri-')) {
                // Dropping on an empty slot
                if (dragSrcEl.classList.contains('teacher-card')) {
                    // Adding a teacher to the schedule
                    const teacherId = dragSrcEl.dataset.id;
                    const teacher = teachers.find(t => t.id === teacherId);
                    
                    if (teacher) {
                        const subjectDiv = document.createElement('div');
                        subjectDiv.className = 'subject technical';
                        subjectDiv.draggable = true;
                        subjectDiv.dataset.id = this.id;
                        
                        subjectDiv.innerHTML = `
                            <div class="subject-title">${teacher.subjects[0]}</div>
                            <div class="teacher"><i class="fas fa-user"></i> ${teacher.name}</div>
                            <div class="room"><i class="fas fa-door-open"></i> Sala ???</div>
                            <button class="call-btn" data-period="${this.id}">
                                <i class="fas fa-clipboard-list"></i> Chamada
                            </button>
                        `;
                        
                        this.innerHTML = '';
                        this.appendChild(subjectDiv);
                        
                        // Add drag events
                        subjectDiv.addEventListener('dragstart', handleDragStart);
                        
                        // Add event listener to call button
                        subjectDiv.querySelector('.call-btn').addEventListener('click', function() {
                            const periodId = this.dataset.period;
                            openAttendanceModal(periodId);
                        });
                        
                        showNotification(`Aula de ${teacher.subjects[0]} adicionada com sucesso!`, 'success');
                    }
                } else if (dragSrcEl.classList.contains('subject')) {
                    // Moving a subject to an empty slot
                    this.innerHTML = dragSrcEl.innerHTML;
                    dragSrcEl.parentNode.innerHTML = '<div class="empty-slot"><i class="fas fa-plus-circle"></i> Disponível</div>';
                    showNotification('Aula movida com sucesso!', 'success');
                }
            }
        }
        
        this.classList.remove('drag-over');
        return false;
    }
    
    function handleDragEnd(e) {
        document.querySelectorAll('td').forEach(cell => {
            cell.classList.remove('drag-over');
        });
        if (dragSrcEl) dragSrcEl.style.opacity = '1';
    }
    
    // Setup drag and drop
    function setupDragAndDrop() {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('dragenter', handleDragEnter);
            cell.addEventListener('dragleave', handleDragLeave);
            cell.addEventListener('drop', handleDrop);
            cell.addEventListener('dragend', handleDragEnd);
        });
    }
    
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the corresponding tab content
            const tabName = this.dataset.tab;
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
    
    // Show notification
    function showNotification(message, type) {
        const notifications = document.querySelector('.notifications');
        const notification = document.createElement('div');
        notification.className = `notification ${type === 'conflict' ? 'conflict' : type === 'success' ? '' : 'absent'}`;
        
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${type === 'conflict' ? 'Conflito Detectado' : type === 'success' ? 'Sucesso' : 'Aviso'}</div>
                <div class="notification-time">Agora</div>
            </div>
            <div class="notification-content">
                ${message}
            </div>
        `;
        
        notifications.insertBefore(notification, notifications.firstChild);
        
        // Update badge count
        const badge = document.querySelector('.badge');
        badge.textContent = parseInt(badge.textContent) + 1;
    }
    
    // Initialize
    renderSchedule();
    renderTeachers();
    setupDragAndDrop();
    
    // Event listeners
    document.getElementById('class-select').addEventListener('change', function() {
        showNotification(`Turma alterada para: ${this.options[this.selectedIndex].text}`, 'success');
    });
    
    document.getElementById('check-btn').addEventListener('click', checkConflicts);
    
    document.getElementById('add-event-btn').addEventListener('click', function() {
        showNotification('Formulário para adicionar evento aberto!', 'success');
    });
    
    document.getElementById('inactive-btn').addEventListener('click', function() {
        const teacher = prompt('Digite o nome do professor para marcar como inativo:');
        if (teacher) {
            showNotification(`Professor ${teacher} marcado como inativo com sucesso!`, 'success');
        }
    });
    
    // Save event
    document.querySelector('.btn-save').addEventListener('click', function() {
        const eventType = document.getElementById('event-type').value;
        const eventDate = document.getElementById('event-date').value;
        
        if (!eventDate) {
            showNotification('Por favor, selecione uma data para o evento.', 'warning');
            return;
        }
        
        showNotification(`Evento "${eventType}" agendado para ${eventDate} com sucesso!`, 'success');
    });
    
    // Submit absence justification
    document.querySelector('.btn-primary').addEventListener('click', function() {
        const teacher = document.getElementById('teacher-select').value;
        const date = document.getElementById('absence-date').value;
        
        if (!date) {
            showNotification('Por favor, selecione a data da ausência.', 'warning');
            return;
        }
        
        showNotification(`Ausência do ${teacher} justificada para ${date}!`, 'success');
    });
    
    // Simulate real-time notifications
    setInterval(() => {
        const notifications = [
            "Reunião de pais e mestres agendada para próxima semana",
            "Novo material didático disponível na plataforma",
            "Lembrete: Prova de Matemática na próxima sexta-feira"
        ];
        
        const types = ['', 'conflict', 'absent'];
        const randomIndex = Math.floor(Math.random() * notifications.length);
        
        if (Math.random() > 0.7) { // 30% chance of a notification
            showNotification(notifications[randomIndex], types[Math.floor(Math.random() * types.length)]);
        }
    }, 30000); // Every 30 seconds
});