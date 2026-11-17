import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Page = 'escritorio'|'calendario'|'clientes'|'causas'|'tareas'|'archivos'|'equipo'|'presupuestos'|'escritos'|'transcripciones'|'puma'|'copilot'|'configuracion'|'soporte';

interface Client { name:string; type:string; id:string; email:string; phone:string; city:string; lawyer:string; tag:string; }
interface CaseRow { file:string; title:string; client:string; court:string; stage:string; lawyer:string; next:string; status:string; }
interface TaskRow { title:string; case:string; lawyer:string; priority:string; due:string; done:boolean; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section class="login" *ngIf="!loggedIn">
    <div class="login-visual">
      <div class="visual-overlay"></div>
      <div class="visual-brand">
        <span class="login-logo-mark" aria-hidden="true"></span>
        <div><strong>Lambrecht & Procoppo</strong><span>ESTUDIO JURÍDICO</span></div>
      </div>
      <div class="visual-copy">
        <span class="eyebrow">GESTIÓN JURÍDICA</span>
        <h1>El estudio, organizado en un solo lugar.</h1>
        <p>Clientes, causas, plazos, documentación y honorarios con una vista clara del trabajo diario.</p>
        <div class="login-benefits"><span>✓ Agenda judicial centralizada</span><span>✓ Seguimiento de causas y vencimientos</span><span>✓ Información segura para todo el equipo</span></div>
      </div>
      <small>Aplicación demostrativa · Datos ficticios</small>
    </div>
    <div class="login-panel">
      <form class="login-card" (ngSubmit)="login()">
        <div class="mobile-brand"><span class="login-logo-mark" aria-hidden="true"></span><div><strong>Lambrecht & Procoppo</strong><small>ESTUDIO JURÍDICO</small></div></div>
        <span class="pill">ACCESO AL ESTUDIO</span>
        <h2>Bienvenido</h2>
        <p>Ingresá a la plataforma de gestión jurídica.</p>
        <label>Correo electrónico</label>
        <input type="email" [(ngModel)]="email" name="email" placeholder="nombre@estudio.com" required>
        <div class="label-line"><label>Contraseña</label><button type="button" class="text-btn">¿Olvidaste tu contraseña?</button></div>
        <div class="password"><input [type]="showPassword?'text':'password'" [(ngModel)]="password" name="password" placeholder="Ingresá tu contraseña" required><button type="button" (click)="showPassword=!showPassword">{{showPassword?'Ocultar':'Ver'}}</button></div>
        <label class="remember"><input type="checkbox" [(ngModel)]="remember" name="remember"><span>Mantener sesión iniciada<small>Activar solo en dispositivos personales</small></span></label>
        <button class="primary" type="submit">Ingresar al estudio</button>
        <button class="demo-btn" type="button" (click)="demoLogin()">Explorar cuenta demo</button>
        <div class="demo-hint">Demo lista para usar · sin contraseña</div>
      </form>
    </div>
  </section>

  <div class="app-shell" *ngIf="loggedIn">
    <aside [class.collapsed]="sidebarCollapsed">
      <div class="brand"><span class="brand-mark" aria-hidden="true"></span><div><strong>L&P</strong><span>Gestión Jurídica</span></div><button (click)="sidebarCollapsed=!sidebarCollapsed">‹</button></div>
      <nav>
        <span class="nav-caption">GENERAL</span>
        <button *ngFor="let item of mainNav" [class.active]="page===item.id" (click)="open(item.id)"><i>{{item.icon}}</i><span>{{item.label}}</span><b *ngIf="item.badge">{{item.badge}}</b></button>
        <span class="nav-caption">GESTIÓN</span>
        <button *ngFor="let item of toolsNav" [class.active]="page===item.id" (click)="open(item.id)"><i>{{item.icon}}</i><span>{{item.label}}</span></button>
      </nav>
      <div class="sidebar-system"><button [class.active]="page==='configuracion'" (click)="open('configuracion')"><i>⚙</i><span>Configuración</span></button><button [class.active]="page==='soporte'" (click)="open('soporte')"><i>?</i><span>Soporte</span></button></div>
      <div class="sidebar-help"><i>?</i><div><strong>¿Necesitás ayuda?</strong><span>Centro de soporte</span></div></div>
      <div class="profile"><span>JL</span><div><strong>Juan Lambrecht</strong><small>Administrador</small></div><button (click)="logout()">↪</button></div>
    </aside>

    <main class="workspace">
      <header>
        <button class="mobile-menu" (click)="sidebarCollapsed=!sidebarCollapsed">☰</button>
        <div class="global-search"><span>⌕</span><input [(ngModel)]="search" placeholder="Buscar clientes, causas o tareas..."><kbd>Ctrl K</kbd></div>
        <div class="header-actions"><button (click)="dark=!dark" title="Cambiar tema">{{dark?'☀':'◐'}}</button><button class="bell">♢<b>3</b></button><span class="avatar">JL</span></div>
      </header>
      <section class="content" [class.dark]="dark">
        <div class="demo-strip">Estás explorando una cuenta demo con datos ficticios de Río Negro.</div>

        <ng-container [ngSwitch]="page">
          <section *ngSwitchCase="'escritorio'">
            <div class="page-head"><div><span class="date">LUNES 17 DE NOVIEMBRE</span><h1>Buenos días, Juan</h1><p>Tenés 3 eventos y 5 tareas prioritarias para hoy.</p></div><button class="action" (click)="toast='Resumen diario generado'">Generar resumen diario</button></div>
            <div class="stats-grid">
              <article class="stat"><i class="wine">⚖</i><div><span>Causas activas</span><strong>38</strong><small class="up">↑ 4 este mes</small></div></article>
              <article class="stat"><i class="blue">◷</i><div><span>Vencimientos</span><strong>7</strong><small>Próximos 7 días</small></div></article>
              <article class="stat"><i class="gold">✓</i><div><span>Tareas pendientes</span><strong>14</strong><small class="warn">5 prioritarias</small></div></article>
              <article class="stat"><i class="green">$</i><div><span>Honorarios pendientes</span><strong>$2,4 M</strong><small class="up">↑ 12,5%</small></div></article>
            </div>
            <div class="dashboard-grid">
              <article class="card agenda-card"><div class="card-head"><div><h3>Agenda próxima</h3><p>Audiencias, reuniones y vencimientos</p></div><button (click)="open('calendario')">Ver calendario</button></div>
                <div class="agenda-day"><span>HOY</span><b>17 NOV</b></div>
                <div class="event"><time>09:30</time><i class="dot wine-bg"></i><div><strong>Audiencia de alimentos provisorios</strong><span>Sosa Villanueva · Juzgado de Familia N° 5</span></div><em>Audiencia</em></div>
                <div class="event"><time>15:00</time><i class="dot blue-bg"></i><div><strong>Reunión de estrategia procesal</strong><span>Andreoli · Sala de reuniones</span></div><em>Reunión</em></div>
                <div class="event"><time>Todo el día</time><i class="dot gold-bg"></i><div><strong>Vence presentación de memorial</strong><span>Transportes Andinos · Cámara Civil</span></div><em>Plazo</em></div>
              </article>
              <article class="card quick-card"><div class="card-head"><div><h3>Acciones rápidas</h3><p>Creá registros sin salir del escritorio</p></div></div><div class="quick-grid"><button (click)="openModal('cliente')"><i>＋</i>Nuevo cliente</button><button (click)="openModal('causa')"><i>⚖</i>Nueva causa</button><button (click)="openModal('tarea')"><i>✓</i>Nueva tarea</button><button (click)="openModal('evento')"><i>◷</i>Nuevo evento</button></div></article>
              <article class="card tasks-card"><div class="card-head"><div><h3>Tareas prioritarias</h3><p>Ordenadas por vencimiento</p></div><button (click)="open('tareas')">Ver todas</button></div><div class="task-mini" *ngFor="let task of priorityTasks"><button (click)="toggleTask(task)">{{task.done?'✓':''}}</button><div><strong [class.done]="task.done">{{task.title}}</strong><span>{{task.case}}</span></div><em [class.urgent]="task.priority==='Urgente'">{{task.due}}</em></div></article>
              <article class="card health-card"><div class="card-head"><div><h3>Salud del estudio</h3><p>Indicadores que requieren atención</p></div></div><div class="donut"><strong>82%</strong><span>Al día</span></div><ul><li><i class="wine-bg"></i><span>Tareas vencidas</span><b>4</b></li><li><i class="gold-bg"></i><span>Presupuestos sin respuesta</span><b>6</b></li><li><i class="blue-bg"></i><span>Causas sin próxima acción</span><b>3</b></li></ul></article>
            </div>
          </section>

          <section *ngSwitchCase="'calendario'">
            <div class="page-head"><div><span class="date">AGENDA DEL ESTUDIO</span><h1>Calendario</h1><p>Audiencias, vencimientos, reuniones y tareas.</p></div><button class="action" (click)="openModal('evento')">＋ Nuevo evento</button></div>
            <div class="calendar-layout"><aside class="mini-card"><button class="action full" (click)="openModal('evento')">Crear evento</button><h4>Tipos de evento</h4><label><i class="wine-bg"></i> Audiencia</label><label><i class="blue-bg"></i> Reunión</label><label><i class="gold-bg"></i> Vencimiento</label><label><i class="green-bg"></i> Tarea</label><h4>Abogados</h4><label><input type="checkbox" checked> Juan Lambrecht</label><label><input type="checkbox" checked> Paula Procoppo</label></aside><article class="card calendar-card"><div class="calendar-toolbar"><button>‹</button><button>Hoy</button><button>›</button><h3>Noviembre 2026</h3><div><button class="selected">Mes</button><button>Semana</button><button>Día</button></div></div><div class="weekdays"><span *ngFor="let d of weekDays">{{d}}</span></div><div class="month"><div *ngFor="let day of calendarDays" [class.muted]="day.muted" [class.today]="day.day===17"><b>{{day.day}}</b><span *ngFor="let ev of day.events" [class]="ev.color">{{ev.label}}</span></div></div></article></div>
          </section>

          <section *ngSwitchCase="'clientes'">
            <div class="page-head"><div><span class="date">BASE DE CONTACTOS</span><h1>Clientes</h1><p>{{filteredClients.length}} personas y empresas vinculadas al estudio.</p></div><button class="action" (click)="openModal('cliente')">＋ Nuevo cliente</button></div>
            <article class="card table-card"><div class="filters"><div class="filter-search">⌕ <input [(ngModel)]="tableSearch" placeholder="Buscar por nombre, DNI o CUIT"></div><select [(ngModel)]="typeFilter"><option value="">Todos los tipos</option><option>Persona</option><option>Empresa</option></select><button>Filtros</button></div><div class="table-wrap"><table><thead><tr><th>CLIENTE</th><th>DNI / CUIT</th><th>CONTACTO</th><th>LOCALIDAD</th><th>RESPONSABLE</th><th>ETIQUETA</th><th></th></tr></thead><tbody><tr *ngFor="let c of filteredClients"><td><span class="client-avatar">{{initials(c.name)}}</span><div><strong>{{c.name}}</strong><small>{{c.type}}</small></div></td><td>{{c.id}}</td><td><strong>{{c.email}}</strong><small>{{c.phone}}</small></td><td>{{c.city}}</td><td>{{c.lawyer}}</td><td><em class="tag">{{c.tag}}</em></td><td><button class="more" (click)="toast='Ficha de '+c.name">•••</button></td></tr></tbody></table></div></article>
          </section>

          <section *ngSwitchCase="'causas'">
            <div class="page-head"><div><span class="date">EXPEDIENTES Y ASUNTOS</span><h1>Causas</h1><p>Seguimiento judicial y extrajudicial del estudio.</p></div><button class="action" (click)="openModal('causa')">＋ Nueva causa</button></div>
            <div class="case-stats"><button [class.active]="caseFilter==='Activa'" (click)="caseFilter='Activa'"><b>38</b><span>Activas</span></button><button [class.active]="caseFilter==='Extrajudicial'" (click)="caseFilter='Extrajudicial'"><b>8</b><span>Extrajudiciales</span></button><button [class.active]="caseFilter==='Archivada'" (click)="caseFilter='Archivada'"><b>12</b><span>Archivadas</span></button><button [class.active]="caseFilter===''" (click)="caseFilter=''"><b>58</b><span>Total</span></button></div>
            <article class="card table-card"><div class="filters"><div class="filter-search">⌕ <input [(ngModel)]="tableSearch" placeholder="Buscar por carátula o expediente"></div><select><option>Todos los fueros</option><option>Civil</option><option>Laboral</option><option>Familia</option></select><button>Más filtros</button></div><div class="table-wrap"><table><thead><tr><th>EXPEDIENTE / CAUSA</th><th>CLIENTE</th><th>ORGANISMO</th><th>ETAPA</th><th>RESPONSABLE</th><th>PRÓXIMA ACCIÓN</th><th>ESTADO</th></tr></thead><tbody><tr *ngFor="let c of filteredCases"><td><strong>{{c.title}}</strong><small>{{c.file}}</small></td><td>{{c.client}}</td><td>{{c.court}}</td><td><em class="stage">{{c.stage}}</em></td><td>{{c.lawyer}}</td><td>{{c.next}}</td><td><em class="status" [class.closed]="c.status!=='Activa'">{{c.status}}</em></td></tr></tbody></table></div></article>
          </section>

          <section *ngSwitchCase="'tareas'">
            <div class="page-head"><div><span class="date">TRABAJO DEL EQUIPO</span><h1>Tareas</h1><p>Asignaciones, prioridades y vencimientos.</p></div><button class="action" (click)="openModal('tarea')">＋ Nueva tarea</button></div>
            <article class="card task-board"><div class="filters"><button class="selected">Activas</button><button>Completadas</button><button>Archivadas</button></div><div class="board-columns"><div *ngFor="let col of taskColumns"><div class="column-head"><h3>{{col}}</h3><b>{{tasksFor(col).length}}</b></div><article class="task-card" *ngFor="let t of tasksFor(col)"><div><em [class.urgent]="t.priority==='Urgente'">{{t.priority}}</em><button (click)="toggleTask(t)">{{t.done?'✓':'○'}}</button></div><strong [class.done]="t.done">{{t.title}}</strong><span>{{t.case}}</span><footer><small>{{t.lawyer}}</small><b>{{t.due}}</b></footer></article></div></div></article>
          </section>

          <section *ngSwitchCase="'archivos'">
            <div class="page-head"><div><span class="date">BIBLIOTECA DOCUMENTAL</span><h1>Archivos</h1><p>Documentos organizados por causa y cliente.</p></div><button class="action" (click)="toast='Carga simulada habilitada'">⇧ Cargar archivo</button></div><div class="files-layout"><aside class="mini-card folders"><button class="active">Todos los archivos <b>46</b></button><button>Causas <b>31</b></button><button>Clientes <b>9</b></button><button>General <b>6</b></button><h4>Etiquetas</h4><label><i class="wine-bg"></i> Presentaciones</label><label><i class="blue-bg"></i> Prueba</label><label><i class="gold-bg"></i> Honorarios</label></aside><article class="card files"><div class="filters"><div class="filter-search">⌕ <input placeholder="Buscar archivo"></div><button>Más recientes</button></div><div class="file-grid"><button *ngFor="let f of files"><i>{{f.type}}</i><strong>{{f.name}}</strong><span>{{f.link}}</span><small>{{f.date}} · {{f.size}}</small></button></div></article></div>
          </section>

          <section *ngSwitchCase="'equipo'">
            <div class="page-head"><div><span class="date">ORGANIZACIÓN INTERNA</span><h1>Equipo</h1><p>Roles, permisos y carga de trabajo.</p></div><button class="action" (click)="toast='Invitación preparada'">＋ Invitar integrante</button></div><div class="team-grid"><article class="card member" *ngFor="let m of members"><span class="member-avatar">{{m.initials}}</span><em>{{m.role}}</em><h3>{{m.name}}</h3><p>{{m.position}}</p><div><span>Causas activas <b>{{m.cases}}</b></span><span>Tareas pendientes <b>{{m.tasks}}</b></span></div><button (click)="toast='Perfil de '+m.name">Ver perfil</button></article></div>
          </section>

          <section *ngSwitchCase="'presupuestos'">
            <div class="page-head"><div><span class="date">HONORARIOS PROFESIONALES</span><h1>Presupuestos</h1><p>Propuestas, aceptación y seguimiento de cobros.</p></div><button class="action" (click)="toast='Nuevo presupuesto iniciado'">＋ Nuevo presupuesto</button></div><div class="budget-summary"><article><span>En borrador</span><b>4</b><small>$1.280.000</small></article><article><span>Enviados</span><b>6</b><small>$3.450.000</small></article><article><span>Aceptados</span><b>12</b><small>$8.920.000</small></article><article><span>Vencidos</span><b>3</b><small>$1.100.000</small></article></div><article class="card table-card"><div class="table-wrap"><table><thead><tr><th>N°</th><th>CLIENTE / CAUSA</th><th>RESPONSABLE</th><th>ESTADO</th><th>FECHA</th><th>HONORARIO</th><th></th></tr></thead><tbody><tr *ngFor="let b of budgets"><td>#{{b.id}}</td><td><strong>{{b.client}}</strong><small>{{b.case}}</small></td><td>{{b.lawyer}}</td><td><em class="budget-state" [class.accepted]="b.status==='Aceptado'">{{b.status}}</em></td><td>{{b.date}}</td><td><strong>{{b.amount}}</strong><small>{{b.detail}}</small></td><td><button class="more">•••</button></td></tr></tbody></table></div></article>
          </section>

          <section *ngSwitchCase="'escritos'">
            <div class="page-head"><div><span class="date">ASISTENTE DOCUMENTAL</span><h1>Escritos IA</h1><p>Flujos guiados para preparar borradores jurídicos vinculados a una causa.</p></div><button class="action" (click)="toast='Borrador nuevo preparado'">＋ Nuevo escrito</button></div>
            <div class="ai-credits"><div><i>✦</i><div><strong>Créditos IA disponibles</strong><span>Saldo estimado para generación y revisión</span></div></div><b>USD 4,80</b></div>
            <div class="writer-layout"><article class="card writer-form"><div class="form-grid"><label>Tipo de escrito<select [(ngModel)]="writingType"><option>Carta documento / intimación</option><option>Demanda civil</option><option>Contestación de demanda</option><option>Recurso de apelación</option><option>Acuerdo transaccional</option></select></label><label>Causa<select><option>Sosa Villanueva s/ Alimentos</option><option>Rodríguez c/ Seguros del Sur</option><option>Fernández c/ Empresa XX</option></select></label><label>Cliente<select><option>Patricia Sosa Villanueva</option><option>María Elena Rodríguez</option><option>Juan C. Fernández</option></select></label><label>Jurisdicción<select><option>Río Negro</option><option>Federal</option></select></label></div><div class="workflow-card"><span>FLUJO GUIADO</span><h3>{{writingType}}</h3><p>La herramienta te solicitará antecedentes, pretensión, hechos relevantes y documentación antes de generar el borrador.</p><button class="action" (click)="writerStarted=true; toast='Revisión guiada iniciada'">▶ Iniciar revisión</button></div></article><article class="card writer-preview"><header><div><span class="date">VISTA PREVIA</span><h3>Borrador del escrito</h3></div><button (click)="toast='Documento DOCX preparado'">⇩ Descargar .docx</button></header><div *ngIf="!writerStarted" class="empty-preview"><b>Seleccioná una causa y un tipo de escrito</b><p>La vista previa se completará con tus respuestas antes de generar el documento final.</p></div><div *ngIf="writerStarted" class="document-preview"><small>SEÑOR/A JUEZ/A:</small><h4>CARTA DOCUMENTO · BORRADOR</h4><p>Quien suscribe, en representación de la parte interesada, se presenta y respetuosamente manifiesta...</p><p class="muted-copy">Borrador demostrativo. Requiere revisión profesional antes de su utilización.</p></div></article></div>
          </section>

          <section *ngSwitchCase="'transcripciones'">
            <div class="page-head"><div><span class="date">AUDIO Y AUDIENCIAS</span><h1>Transcripciones <small>(4)</small></h1><p>Convertí audios de audiencias y reuniones en texto consultable.</p></div><button class="action" (click)="toast='Carga de audio simulada'">◉ Nueva transcripción</button></div>
            <div class="transcription-quota"><div><i>◉</i><div><strong>Cuota de transcripciones</strong><span>Renueva el 1 de diciembre de 2026</span></div></div><div><span>Disponibles</span><b>35 min</b></div><div><span>Procesadas</span><b>4</b></div><div><span>Total transcripto</span><b>2m 37s</b></div></div>
            <article class="card table-card"><div class="filters"><div class="filter-search">⌕ <input placeholder="Buscar en transcripciones..."></div><select><option>Todos los estados</option><option>Completada</option><option>Procesando</option></select><select><option>Todas las causas</option></select></div><div class="table-wrap"><table><thead><tr><th>ARCHIVO</th><th>CAUSA</th><th>CLIENTE</th><th>DURACIÓN</th><th>PERSONAS</th><th>ESTADO</th><th>FECHA</th></tr></thead><tbody><tr *ngFor="let t of transcriptions"><td><strong>{{t.file}}</strong><small>{{t.format}}</small></td><td>{{t.case}}</td><td>{{t.client}}</td><td>{{t.duration}}</td><td>{{t.people}}</td><td><em class="status">✓ Completada</em></td><td>{{t.date}}</td></tr></tbody></table></div></article>
          </section>

          <section *ngSwitchCase="'copilot'">
            <div class="page-head"><div><span class="date">ASISTENTE DEL ESTUDIO</span><h1>Copilot jurídico</h1><p>Consultas contextuales sobre clientes, causas, tareas y documentación.</p></div></div>
            <div class="copilot-layout"><aside class="card chat-list"><button class="action full" (click)="toast='Nueva conversación creada'">＋ Nueva conversación</button><div class="filter-search">⌕ <input placeholder="Buscar conversaciones"></div><div class="chat-history"><button><strong>Resumen causa de alimentos</strong><span>Hoy · 08:42</span></button><button><strong>Jurisprudencia laboral RN</strong><span>Ayer · 16:10</span></button></div></aside><article class="card copilot-main"><div class="copilot-context"><div><span class="date">NUEVA CONVERSACIÓN</span><h3>¿En qué puedo ayudarte?</h3></div><select><option>Contexto general</option><option>Sosa Villanueva s/ Alimentos</option><option>Rodríguez c/ Seguros del Sur</option></select></div><p class="copilot-sub">Seleccioná una causa o cliente para recibir sugerencias más precisas.</p><div class="prompt-grid"><button (click)="copilotPrompt='Resumí los últimos movimientos de la causa'">⌁ Resumir movimientos</button><button (click)="copilotPrompt='Prepará la estructura de un escrito'">▤ Preparar un escrito</button><button (click)="copilotPrompt='Buscá jurisprudencia aplicable de Río Negro'">▥ Buscar jurisprudencia</button><button (click)="copilotPrompt='¿Qué tareas y vencimientos son urgentes?'">◷ Revisar vencimientos</button></div><div class="copilot-input"><textarea [(ngModel)]="copilotPrompt" placeholder="Escribí tu consulta jurídica..."></textarea><div><button (click)="toast='Archivo adjunto simulado'">⌕ Adjuntar</button><button class="action" (click)="sendCopilot()">Enviar ↑</button></div></div></article></div>
          </section>

          <section *ngSwitchCase="'configuracion'">
            <div class="page-head"><div><span class="date">CUENTA Y ESTUDIO</span><h1>Configuración</h1><p>Perfil profesional, matrículas, preferencias y datos de cobro.</p></div><button class="action" (click)="toast='Cambios de configuración guardados'">Guardar cambios</button></div>
            <div class="settings-tabs"><button class="active">Mi perfil</button><button>Preferencias</button><button>Integraciones</button><button>Seguridad</button></div><div class="settings-layout"><aside class="card profile-card"><div class="profile-photo">JL</div><h3>Juan Lambrecht</h3><p>Administrador · Estudio jurídico</p><div><span>Matrícula Río Negro</span><b>N.º 4821</b></div><div><span>Correo</span><b>juan@estudio.com</b></div><div><span>WhatsApp</span><b>+54 9 2920 555-000</b></div></aside><div class="settings-forms"><article class="card"><h3>Datos personales</h3><div class="form-grid"><label>Nombre<input value="Juan"></label><label>Apellido<input value="Lambrecht"></label><label>Teléfono<input value="+54 2920 555-000"></label><label>WhatsApp<input value="+54 9 2920 555-000"></label><label>Provincia<select><option>Río Negro</option></select></label><label>Correo<input value="juan@estudio.com"></label></div></article><article class="card"><h3>Datos profesionales</h3><div class="form-grid three"><label>Cargo<input value="Socio administrador"></label><label>Matrícula Río Negro<input value="4821"></label><label>Matrícula Federal<input placeholder="N.º de matrícula"></label></div></article><article class="card"><h3>Datos de cobro</h3><div class="form-grid"><label>Alias bancario<input value="lambrecht.procoppo"></label><label>CBU<input value="0000003100012345678901"></label></div></article></div></div>
          </section>

          <section *ngSwitchCase="'soporte'">
            <div class="page-head"><div><span class="date">CENTRO DE AYUDA</span><h1>Soporte</h1><p>Guías de uso y seguimiento de consultas del estudio.</p></div><button class="action" (click)="toast='Ticket de soporte iniciado'">＋ Crear ticket</button></div><div class="support-search">⌕ <input placeholder="Buscar en la ayuda..."></div><div class="guide-grid"><button *ngFor="let g of guides" (click)="toast='Guía abierta: '+g.title"><span>{{g.id}}</span><div><h3>{{g.title}}</h3><p>{{g.description}}</p><small>{{g.articles}} artículos</small></div></button></div>
          </section>

          <section *ngSwitchCase="'puma'">
            <div class="page-head"><div><span class="date">INTEGRACIÓN RÍO NEGRO</span><h1>Mi PUMA</h1><p>Expedientes, movimientos y audiencias en modo de consulta.</p></div><button class="action" (click)="toast='Sincronización demo completada'">↻ Actualizar ahora</button></div><div class="puma-banner"><div><span>⚖</span><div><strong>Cuenta PUMA vinculada</strong><p>Última actualización hoy a las 08:15 · Consulta de solo lectura</p></div></div><em>Conectado</em></div><div class="puma-tabs"><button class="active">Movimientos <b>5</b></button><button>Expedientes</button><button>Audiencias</button><button>Causas vinculadas</button><button>Historial</button></div><article class="card movement-list"><div class="movement" *ngFor="let m of movements"><div class="movement-date"><b>{{m.day}}</b><span>NOV</span></div><div><strong>{{m.title}}</strong><span>{{m.file}} · {{m.court}}</span><p>{{m.detail}}</p></div><em [class.linked]="m.linked">{{m.linked?'Vinculado':'Sin vincular'}}</em><button (click)="toast='Movimiento abierto'">Ver detalle</button></div></article>
          </section>
        </ng-container>
      </section>
    </main>
  </div>

  <div class="modal-backdrop" *ngIf="modal" (click)="closeModal()"><div class="modal" (click)="$event.stopPropagation()"><header><div><span class="date">NUEVO REGISTRO</span><h2>{{modalTitle}}</h2></div><button (click)="closeModal()">×</button></header><form (ngSubmit)="saveModal()"><label>Título o nombre</label><input [(ngModel)]="draftTitle" name="draftTitle" required><label>Responsable</label><select name="responsable"><option>Juan Lambrecht</option><option>Paula Procoppo</option></select><label>Observaciones</label><textarea name="notes" rows="4" placeholder="Agregá información relevante..."></textarea><footer><button type="button" (click)="closeModal()">Cancelar</button><button class="action" type="submit">Guardar</button></footer></form></div></div>
  <div class="toast" *ngIf="toast" (click)="toast=''">✓ {{toast}}</div>
  `
})
export class AppComponent implements OnInit {
  loggedIn=false; email='demo@estudio.com'; password='demo'; remember=false; showPassword=false; sidebarCollapsed=false; dark=false;
  page:Page='escritorio'; search=''; tableSearch=''; typeFilter=''; caseFilter=''; modal=''; draftTitle=''; toast='';
  writingType='Carta documento / intimación'; writerStarted=false; copilotPrompt='';
  mainNav:{id:Page,label:string,icon:string,badge?:string}[]=[
    {id:'escritorio',label:'Escritorio',icon:'⌂'}, {id:'calendario',label:'Calendario',icon:'◫'}, {id:'clientes',label:'Clientes',icon:'♙'},
    {id:'causas',label:'Causas',icon:'⚖'}, {id:'tareas',label:'Tareas',icon:'✓',badge:'14'}, {id:'archivos',label:'Archivos',icon:'□'}, {id:'equipo',label:'Equipo',icon:'♧'}
  ];
  toolsNav:{id:Page,label:string,icon:string}[]=[{id:'presupuestos',label:'Presupuestos',icon:'$'},{id:'escritos',label:'Escritos IA',icon:'✦'},{id:'transcripciones',label:'Transcripciones',icon:'◉'},{id:'puma',label:'Mi PUMA',icon:'P'},{id:'copilot',label:'Copilot',icon:'▢'}];
  weekDays=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  calendarDays=Array.from({length:35},(_,i)=>({day:i<5?27+i:i-4,muted:i<5||i>34,events:[] as {label:string,color:string}[]}));
  clients:Client[]=[
    {name:'Patricia Sosa Villanueva',type:'Persona',id:'30.456.789',email:'psosa@gmail.com',phone:'+54 2920 555-111',city:'Viedma',lawyer:'Paula Procoppo',tag:'Referido'},
    {name:'Clínica del Valle SA',type:'Empresa',id:'30-72345678-2',email:'legal@clinicadelvalle.com.ar',phone:'+54 294 444-3344',city:'Bariloche',lawyer:'Juan Lambrecht',tag:'Recurrente'},
    {name:'Transportes Andinos SA',type:'Empresa',id:'30-68754321-9',email:'legal@transportesandinos.com.ar',phone:'+54 298 444-7890',city:'General Roca',lawyer:'Paula Procoppo',tag:'Empresa'},
    {name:'Federico Andreoli',type:'Persona',id:'31.234.567',email:'fandreoli@gmail.com',phone:'+54 299 555-9876',city:'Cipolletti',lawyer:'Juan Lambrecht',tag:'Nuevo'},
    {name:'Inmobiliaria Lagos del Sur',type:'Empresa',id:'30-70987654-1',email:'legal@lagosdelsur.com.ar',phone:'+54 294 444-6543',city:'Bariloche',lawyer:'Juan Lambrecht',tag:'Recurrente'},
    {name:'María Elena Rodríguez',type:'Persona',id:'28.456.789',email:'maria.rodriguez@email.com',phone:'+54 2920 444-123',city:'Viedma',lawyer:'Paula Procoppo',tag:'Activo'}
  ];
  cases:CaseRow[]=[
    {file:'VI-01872-C-2026',title:'Sosa Villanueva s/ Alimentos',client:'Patricia Sosa',court:'Familia N° 5 · Viedma',stage:'Prueba',lawyer:'Paula Procoppo',next:'Audiencia · 17/11',status:'Activa'},
    {file:'RO-00614-L-2025',title:'Fernández c/ Empresa XX s/ Despido',client:'Juan C. Fernández',court:'Cámara Laboral 1 · Roca',stage:'Alegatos',lawyer:'Juan Lambrecht',next:'Memorial · 19/11',status:'Activa'},
    {file:'BA-00942-C-2026',title:'Rodríguez c/ Seguros del Sur',client:'María E. Rodríguez',court:'Civil N° 3 · Bariloche',stage:'Pericial',lawyer:'Paula Procoppo',next:'Control pericia · 21/11',status:'Activa'},
    {file:'CI-01331-C-2025',title:'Lagos del Sur c/ Municipalidad',client:'Inmobiliaria Lagos del Sur',court:'Contencioso · Cipolletti',stage:'Sentencia',lawyer:'Juan Lambrecht',next:'Sin próxima acción',status:'Activa'},
    {file:'EXTRA-00028',title:'Clínica del Valle · Acuerdo societario',client:'Clínica del Valle SA',court:'Extrajudicial',stage:'Negociación',lawyer:'Juan Lambrecht',next:'Reunión · 24/11',status:'Extrajudicial'}
  ];
  tasks:TaskRow[]=[
    {title:'Preparar audiencia de alimentos',case:'Sosa Villanueva s/ Alimentos',lawyer:'Paula Procoppo',priority:'Urgente',due:'Hoy',done:false},
    {title:'Validar liquidación actualizada',case:'Pereyra c/ Supermercado Norte',lawyer:'Juan Lambrecht',priority:'Urgente',due:'Hoy',done:false},
    {title:'Presentar memorial',case:'Transportes Andinos c/ AFIP',lawyer:'Paula Procoppo',priority:'Alta',due:'Mañana',done:false},
    {title:'Solicitar informe pericial médico',case:'Rodríguez c/ Seguros del Sur',lawyer:'Juan Lambrecht',priority:'Alta',due:'19 nov',done:false},
    {title:'Revisar contestación de demanda',case:'Constructora Patagonia',lawyer:'Paula Procoppo',priority:'Media',due:'21 nov',done:false},
    {title:'Compilar jurisprudencia laboral',case:'Fernández c/ Empresa XX',lawyer:'Juan Lambrecht',priority:'Media',due:'Completada',done:true}
  ];
  files=[
    {type:'PDF',name:'Demanda y documental.pdf',link:'Sosa Villanueva s/ Alimentos',date:'Hoy',size:'2,4 MB'},
    {type:'DOC',name:'Memorial de agravios.docx',link:'Transportes Andinos c/ AFIP',date:'Ayer',size:'184 KB'},
    {type:'PDF',name:'Informe pericial médico.pdf',link:'Rodríguez c/ Seguros del Sur',date:'14 nov',size:'3,1 MB'},
    {type:'XLS',name:'Liquidación actualizada.xlsx',link:'Pereyra c/ Supermercado Norte',date:'13 nov',size:'96 KB'},
    {type:'PDF',name:'Convenio de honorarios.pdf',link:'Clínica del Valle SA',date:'10 nov',size:'320 KB'},
    {type:'IMG',name:'Acta de constatación.jpg',link:'Lagos del Sur c/ Municipalidad',date:'8 nov',size:'1,8 MB'}
  ];
  members=[
    {initials:'JL',name:'Juan Lambrecht',role:'Administrador',position:'Socio · Abogado',cases:22,tasks:7},
    {initials:'PP',name:'Paula Procoppo',role:'Administrador',position:'Socia · Abogada',cases:16,tasks:6},
    {initials:'MF',name:'Marina Fernández',role:'Administrativo',position:'Secretaría jurídica',cases:0,tasks:4},
    {initials:'LS',name:'Lucas Soria',role:'Procurador',position:'Procuración',cases:12,tasks:8}
  ];
  budgets=[
    {id:'032',client:'Clínica del Valle SA',case:'Negociación paritaria 2026',lawyer:'Juan Lambrecht',status:'Enviado',date:'15/11/26',amount:'20 JUS',detail:'40% al inicio + 3 cuotas'},
    {id:'031',client:'Patricia Sosa',case:'Alimentos y régimen de comunicación',lawyer:'Paula Procoppo',status:'Aceptado',date:'12/11/26',amount:'$ 680.000',detail:'Anticipo + cuota litis'},
    {id:'030',client:'Transportes Andinos SA',case:'Impugnación de multa',lawyer:'Paula Procoppo',status:'Borrador',date:'10/11/26',amount:'12 JUS',detail:'Primera instancia'},
    {id:'029',client:'Federico Andreoli',case:'Denuncia penal por estafa',lawyer:'Juan Lambrecht',status:'Aceptado',date:'05/11/26',amount:'$ 950.000',detail:'Etapa inicial'}
  ];
  transcriptions=[
    {file:'Audiencia conciliación.mp3',format:'Audio MP3',case:'Pereyra c/ Supermercado Norte',client:'Ana María Pereyra',duration:'51s',people:4,date:'16/11/2026'},
    {file:'Audiencia alimentos.m4a',format:'Audio M4A',case:'Sosa Villanueva s/ Alimentos',client:'Patricia Sosa Villanueva',duration:'31s',people:4,date:'15/11/2026'},
    {file:'Consulta estrategia.wav',format:'Audio WAV',case:'Rodríguez c/ Seguros del Sur',client:'María Elena Rodríguez',duration:'24s',people:2,date:'12/11/2026'},
    {file:'Reunión directorio.mp3',format:'Audio MP3',case:'Lagos del Sur c/ Municipalidad',client:'Inmobiliaria Lagos del Sur',duration:'51s',people:4,date:'08/11/2026'}
  ];
  guides=[
    {id:'01',title:'Primeros pasos',description:'Configuración inicial, cuenta y navegación general.',articles:3},
    {id:'02',title:'Escritorio',description:'Agenda diaria, tareas vencidas e indicadores del estudio.',articles:2},
    {id:'03',title:'Búsqueda global',description:'Encontrá expedientes, clientes, archivos y tareas.',articles:1},
    {id:'04',title:'Notificaciones',description:'Alertas automáticas de plazos y asignaciones.',articles:2},
    {id:'05',title:'Clientes',description:'Alta, edición y organización de la cartera.',articles:3},
    {id:'06',title:'Causas',description:'Expedientes judiciales y asuntos extrajudiciales.',articles:4},
    {id:'07',title:'Calendario y tareas',description:'Audiencias, vencimientos, prioridades y responsables.',articles:4},
    {id:'08',title:'Copilot e IA',description:'Borradores, jurisprudencia y consultas contextuales.',articles:3},
    {id:'09',title:'Mi PUMA',description:'Sincronización, vinculación y seguimiento de movimientos.',articles:3}
  ];
  movements=[
    {day:'17',title:'Provee prueba informativa',file:'VI-01872-C-2026',court:'Familia N° 5 · Viedma',detail:'Téngase presente la documental acompañada. Líbrense los oficios solicitados.',linked:true},
    {day:'16',title:'Designa perito médico',file:'BA-00942-C-2026',court:'Civil N° 3 · Bariloche',detail:'Desígnase perito médico. Notifíquese para que acepte el cargo.',linked:true},
    {day:'14',title:'Vista a las partes por cinco días',file:'RO-00614-L-2025',court:'Cámara Laboral 1 · Roca',detail:'De la liquidación practicada, córrase vista a las partes por el término de ley.',linked:false},
    {day:'12',title:'Audiencia fijada',file:'CI-01331-C-2025',court:'Contencioso · Cipolletti',detail:'Fíjase audiencia preliminar para el día 4 de diciembre a las 10:00.',linked:false}
  ];
  taskColumns=['Pendientes','En progreso','Completadas'];

  ngOnInit(){ this.loggedIn=localStorage.getItem('lp-demo-auth')==='1'; this.seedCalendar(); }
  get priorityTasks(){return this.tasks.slice(0,4);}
  get filteredClients(){const q=this.tableSearch.toLowerCase(); return this.clients.filter(c=>(!this.typeFilter||c.type===this.typeFilter)&&(!q||`${c.name} ${c.id}`.toLowerCase().includes(q)));}
  get filteredCases(){const q=this.tableSearch.toLowerCase(); return this.cases.filter(c=>(!this.caseFilter||c.status===this.caseFilter)&&(!q||`${c.title} ${c.file}`.toLowerCase().includes(q)));}
  get modalTitle(){return ({cliente:'Nuevo cliente',causa:'Nueva causa',tarea:'Nueva tarea',evento:'Nuevo evento'} as Record<string,string>)[this.modal]||'Nuevo registro';}
  login(){if(this.email&&this.password){this.loggedIn=true;if(this.remember)localStorage.setItem('lp-demo-auth','1');this.toast='Sesión iniciada';}}
  demoLogin(){this.email='demo@lambrecht-procoppo.com';this.password='demo';this.loggedIn=true;this.toast='Cuenta demo cargada';}
  logout(){this.loggedIn=false;localStorage.removeItem('lp-demo-auth');this.page='escritorio';}
  open(page:Page){this.page=page;this.tableSearch='';this.sidebarCollapsed=innerWidth<900;scrollTo({top:0,behavior:'smooth'});}
  initials(name:string){return name.split(' ').slice(0,2).map(x=>x[0]).join('').toUpperCase();}
  tasksFor(col:string){if(col==='Completadas')return this.tasks.filter(t=>t.done);if(col==='En progreso')return this.tasks.filter(t=>!t.done&&t.priority==='Alta');return this.tasks.filter(t=>!t.done&&t.priority!=='Alta');}
  toggleTask(t:TaskRow){t.done=!t.done;this.toast=t.done?'Tarea completada':'Tarea reabierta';}
  openModal(type:string){this.modal=type;this.draftTitle='';}
  closeModal(){this.modal='';}
  saveModal(){if(!this.draftTitle)return;this.toast=`${this.modalTitle} guardado`;this.closeModal();}
  sendCopilot(){if(!this.copilotPrompt.trim()){this.toast='Escribí una consulta para continuar';return;}this.toast='Consulta enviada al Copilot demo';this.copilotPrompt='';}
  seedCalendar(){const add=(day:number,label:string,color:string)=>{const found=this.calendarDays.find(d=>d.day===day&&!d.muted);if(found)found.events.push({label,color});};add(4,'Audiencia laboral','wine-event');add(9,'Reunión cliente','blue-event');add(17,'Alimentos · 09:30','wine-event');add(17,'Memorial','gold-event');add(19,'Vence traslado','gold-event');add(24,'Mediación','green-event');add(27,'Audiencia civil','wine-event');}
}
