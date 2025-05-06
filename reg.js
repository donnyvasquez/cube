/************************************************************
 * 1. Datos y funciones iniciales
 ************************************************************/

// Array de datos con al menos 10 registros
const registros = [
    {
      id: "REG-001",
      title: "REG-101 - Emisión SoftwareOne SAS - Marzo 2025",
      fecha: "2025-03-11",
      altas: 1,
      bajas: 0,
      tiposMovimiento: ["Emsisión grupo"],
      estado: "Con errores",
      request: 'request_errors.html'
    },
    {
      id: "REG-002",
      title: "REG-101 - Importación sin errores - Emisión SoftwareOne SAS - Marzo 2025",
      fecha: "2025-03-12",
      altas: 1,
      bajas: 0,
      tiposMovimiento: ["Emisión grupo"],
      estado: "Sin errores",
      request: 'request_no_errors.html'
    },
    {
      id: "REG-008",
      title: "REG-101 - Importación exitosa - Emisión SoftwareOne SAS - Marzo 2025",
      fecha: "2025-03-13",
      altas: 107,
      bajas: 13,
      tiposMovimiento: ["Alta pólizas", "Baja póliza"],
      estado: "Aprobado",
      request: 'request_imported.html'
    },
    /* {
      id: "REG-002",
      fecha: "2025-03-11",
      altas: 0,
      bajas: 1,
      tiposMovimiento: ["Baja póliza"],
      estado: "Aprobado"
    },
    {
      id: "REG-004",
      fecha: "2025-03-12",
      altas: 3,
      bajas: 2,
      tiposMovimiento: ["Alta asegurados", "Baja póliza"],
      estado: "En proceso"
    },
    {
      id: "REG-005",
      fecha: "2025-03-12",
      altas: 0,
      bajas: 2,
      tiposMovimiento: ["Baja asegurados"],
      estado: "Pendiente"
    },
    {
      id: "REG-006",
      fecha: "2025-03-13",
      altas: 1,
      bajas: 0,
      tiposMovimiento: ["Póliza en emisión"],
      estado: "Aprobado"
    },
    {
      id: "REG-007",
      fecha: "2025-03-13",
      altas: 2,
      bajas: 2,
      tiposMovimiento: ["Alta asegurados", "Baja asegurados"],
      estado: "Pendiente"
    },
    {
      id: "REG-009",
      fecha: "2025-03-14",
      altas: 4,
      bajas: 0,
      tiposMovimiento: ["Alta asegurados"],
      estado: "Pendiente"
    },
    {
      id: "REG-010",
      fecha: "2025-03-14",
      altas: 0,
      bajas: 3,
      tiposMovimiento: ["Baja asegurados"],
      estado: "Rechazado"
    } */
  ];
  
  // Declaramos las variables que se usarán en updateActionButtons()
  const selectAllCheckbox = document.getElementById('selectAll');
  const btnEnviarRevision = document.getElementById('btnEnviarRevision');
  const btnRegistrar = document.getElementById('btnRegistrar');
  const container = document.getElementById('registroContainer');
  
  // Función para obtener la etiqueta del estado
  function getEstadoBadge(estado) {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return `<span class="badge bg-warning text-dark">${estado}</span>`;
      case 'aprobado':
      case 'sin errores':
        return `<span class="badge bg-success">${estado}</span>`;
      case 'en proceso':
        return `<span class="badge bg-info text-dark">${estado}</span>`;
      case 'rechazado':
      case 'con errores':
        return `<span class="badge bg-danger">${estado}</span>`;
      case 'enviado':
        return `<span class="badge bg-primary">${estado}</span>`;
      default:
        return `<span class="badge bg-secondary">${estado}</span>`;
    }
  }
  
  // Función para actualizar la visibilidad de los botones de acción
  function updateActionButtons() {
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    const selectedCheckboxes = Array.from(rowCheckboxes).filter(chk => chk.checked);
    if (selectedCheckboxes.length === 0) {
      btnEnviarRevision.classList.add('d-none');
      btnRegistrar.classList.add('d-none');
      return;
    }
    btnEnviarRevision.classList.remove('d-none');
    btnRegistrar.classList.remove('d-none');
  }
  
  // Función para renderizar (o re-renderizar) la lista de registros
  function renderRegistros() {
    // Limpiamos el contenedor
    container.innerHTML = '';
    registros.forEach((reg, index) => {
      const rowHtml = `
        <div class="col-12 mt-0">
          <div class="border-bottom item-register p-3 d-flex">
            <!-- Checkbox de selección individual -->
            <div class="mb-2 mb-md-0 me-3">
              <input
                class="form-check-input row-checkbox"
                type="checkbox"
                id="check-${index}"
                data-estado="${reg.estado}"
              >
            </div>
            <div class="data-wrapper w-100">
              <h5><label for="check-${index}">${reg.title}</label></h5>
              <div class="d-flex flex-column flex-md-row w-100 justify-content-between align-items-start align-items-md-center">
                <!-- ID Registro -->
                <div class="mb-2 mb-md-0 flex-fill">
                  <small class="text-muted d-block">ID Registro</small>
                  <span class="fw-semibold">${reg.id}</span>
                </div>
                <!-- Fecha -->
                <div class="mb-2 mb-md-0 flex-fill">
                  <small class="text-muted d-block">Fecha</small>
                  <span class="fw-semibold">${reg.fecha}</span>
                </div>
                <!-- Cambios -->
                <div class="mb-2 mb-md-0 flex-fill">
                  <small class="text-muted d-block">Grupo</small>
                  <span class="fw-semibold">
                    4850
                  </span>
                </div>
                <!-- Tipo de movimiento -->
                <div class="mb-2 mb-md-0 flex-fill">
                  <small class="text-muted d-block">Tipo de movimiento</small>
                  <span class="fw-semibold">
                    ${reg.tiposMovimiento.map(tipo => `${tipo}`).join('<br>')}
                  </span>
                </div>
                <!-- Estado -->
                <div class="mb-2 mb-md-0 flex-fill">
                  <small class="text-muted d-block">Estado</small>
                  ${getEstadoBadge(reg.estado)}
                </div>
              </div>
  
            </div>
            <!-- Menú de acciones -->
            <div class="dropdown">
              <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-three-dots-vertical fs-5"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="${reg.request}">Ver</a></li>
                <li><a class="dropdown-item" href="#">Cancelar</a></li>
              </ul>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', rowHtml);
    });
  
    // Re-asignar eventos a los checkboxes individuales
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    rowCheckboxes.forEach(chk => {
      chk.addEventListener('change', () => {
        const allSelected = Array.from(rowCheckboxes).every(c => c.checked);
        selectAllCheckbox.checked = allSelected;
        updateActionButtons();
      });
    });
    updateActionButtons();
  }
  
  // Renderizado inicial
  renderRegistros();
  
  /************************************************************
   * 2. Manejo de checkboxes y botones de acción
   ************************************************************/
  selectAllCheckbox.addEventListener('change', () => {
    const isChecked = selectAllCheckbox.checked;
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    rowCheckboxes.forEach(chk => chk.checked = isChecked);
    updateActionButtons();
  });
  
  /************************************************************
   * 3. Manejo del modal "Alta nuevo asegurado"
   ************************************************************/
  const btnAgregarAsegurado = document.getElementById('btnAgregarAsegurado');
  const formNuevoAsegurado = document.getElementById('formNuevoAsegurado');
  
  btnAgregarAsegurado.addEventListener('click', () => {
    // Extraer valores de los campos del formulario
    const poliza = document.getElementById('selPoliza').value;
    const grupo = document.getElementById('grupo').value;
    const fechaCobertura = document.getElementById('fechaCobertura').value;
    const identificacion = document.getElementById('identificacion').value;
    const primerNombre = document.getElementById('primerNombre').value;
    const segundoNombre = document.getElementById('segundoNombre').value;
    const primerApellido = document.getElementById('primerApellido').value;
    const segundoApellido = document.getElementById('segundoApellido').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const genero = document.getElementById('genero').value;
    const estadoCivil = document.getElementById('estadoCivil').value;
    // Aqu� podr�as capturar los archivos si lo necesitas
  
    // Generar un nuevo ID
    const nuevoId = `REG-${Math.floor(Math.random() * 1000)}`;
  
    // Agregar el nuevo registro con estado "Enviado"
    registros.unshift({
    id: nuevoId,
    fecha: new Date().toLocaleDateString(),
    altas: 1,
    bajas: 0,
    tiposMovimiento: ["Alta asegurados"],
    estado: "Enviado"
  });
  
    // Re-renderizamos la lista
    renderRegistros();
  
    // Cerramos el modal
    const modalEl = document.getElementById('modalNuevoAsegurado');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();
  
    // Reseteamos el formulario
    formNuevoAsegurado.reset();
    document.getElementById('selPoliza').selectedIndex = 0;
    document.getElementById('genero').selectedIndex = 0;
    document.getElementById('estadoCivil').selectedIndex = 0;
  });
  
  /************************************************************
   * 4. Manejo del modal "Importar pólizas" (Importación de asegurados)
   ************************************************************/
  const btnImportarAsegurados = document.getElementById('btnImportarAsegurados');
  
  btnImportarAsegurados.addEventListener('click', () => {
    // Determinar cuál tab está activo
    const activeTab = document.querySelector('#modalImportarPolizas .tab-pane.active').id;
    let tipoMovimiento = "TipoMovimientoEnImportar";
  
    if(activeTab === "tabAltaPolizas") {
      // Primer tab: Alta nuevas pólizas (En grupo existente o en emisión)
      const switchNuevaEmision = document.getElementById('switchNuevaEmision').checked;
      const numeroGrupo = document.getElementById('numeroGrupoImportacion').value;
      // Los archivos se pueden procesar de acuerdo a tus necesidades.
  
      // Dependiendo del switch se define el tipo de movimiento
      if(switchNuevaEmision) {
        tipoMovimiento = "Pólizas en emisión";
      } else {
        tipoMovimiento = "Alta nuevas pólizas";
      }
  
      // Opcional: podrías incluir el número de grupo en el registro o en un comentario
    }
    else if(activeTab === "tabAltaBajaAsegurados") {
      // Segundo tab: Alta o baja de asegurados
      const switchEncuestaMedica = document.getElementById('switchEncuestaMedica').checked;
      // Dependiendo del switch, podrías agregar una indicación en el tipo de movimiento
      tipoMovimiento = "Alta o baja de asegurados";
      if(switchEncuestaMedica) {
        tipoMovimiento += " (con encuesta)";
      }
    }
  
    // Generar un nuevo ID
    const nuevoId = `REG-${Math.floor(Math.random() * 1000)}`;
  
    // Agregar el nuevo registro al inicio del arreglo con estado "Enviado"
    registros.unshift({
      id: nuevoId,
      fecha: new Date().toLocaleDateString(),
      altas: 1, // Puedes ajustar según la lógica; por ejemplo, si en importación se consideran altas, bajas, etc.
      bajas: 0,
      tiposMovimiento: [tipoMovimiento],
      estado: "Enviado"
    });
  
    // Re-renderizamos la lista
    renderRegistros();
  
    // Cerramos el modal
    const modalEl = document.getElementById('modalImportarPolizas');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();
  
    // Opcional: Resetear campos del modal
    // Puedes resetear el formulario o los inputs manualmente según sea necesario
  });
  