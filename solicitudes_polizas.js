(function () {
    // Arreglo de solicitudes de ejemplo (al menos 10 elementos)
    const solicitudes = [
      { id: 1, poliza: "1", titular: "John Doe", documento: "CC 73188623", asegurados: 5, plan: "Gold Emited Plan" },
      { id: 2, poliza: "2", titular: "Jane Smith", documento: "CC 12345678", asegurados: 3, plan: "Silver Plan" },
      { id: 3, poliza: "3", titular: "Alice Johnson", documento: "CC 98765432", asegurados: 4, plan: "Platinum" },
      { id: 4, poliza: "4", titular: "Bob Brown", documento: "CC 55555555", asegurados: 2, plan: "Basic" },
      { id: 5, poliza: "5", titular: "Carol White", documento: "CC 11223344", asegurados: 6, plan: "Gold Emited Plan" },
      { id: 6, poliza: "6", titular: "David Black", documento: "CC 66778899", asegurados: 1, plan: "Silver Plan" },
      { id: 7, poliza: "7", titular: "Emily Green", documento: "CC 44332211", asegurados: 3, plan: "Platinum" },
      { id: 8, poliza: "8", titular: "Frank Blue", documento: "CC 99887766", asegurados: 4, plan: "Basic" },
      { id: 9, poliza: "9", titular: "Grace Yellow", documento: "CC 33445566", asegurados: 5, plan: "Gold Emited Plan" },
      { id: 10, poliza: "10", titular: "Henry Purple", documento: "CC 22113344", asegurados: 2, plan: "Silver Plan" }
    ];
  
    // Variables de control para paginación y filtrado
    let filteredSolicitudes = [...solicitudes];
    let currentPage = 1;
    const itemsPerPage = 5;
  
    // Función que renderiza el listado de solicitudes
    function renderSolicitudes() {
      const lista = document.getElementById("listaSolicitudes");
      lista.innerHTML = "";
  
      // Calculamos el slice según la página actual
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const itemsToShow = filteredSolicitudes.slice(start, end);
  
      itemsToShow.forEach((item) => {
        const solicitudHtml = `
          <div class="align-items-center d-flex justify-content-between list-group-item list-group-item-light">
            <div class="d-flex flex-column row-cols-5 flex-md-row w-100 justify-content-between align-items-start align-items-md-center">
              <div class="flex-fill">
                <small class="text-muted d-block">Poliza</small>
                <span class="fw-semibold">${item.poliza}</span>
              </div>
              <div class="flex-fill">
                <small class="text-muted d-block">Titular</small>
                <span class="fw-semibold">${item.titular}</span>
              </div>
              <div class="flex-fill">
                <small class="text-muted d-block">Doc. Titular</small>
                <span class="fw-semibold">${item.documento}</span>
              </div>
              <div class="flex-fill">
                <small class="text-muted d-block">Asegurados</small>
                <span class="fw-semibold">${item.asegurados}</span>
              </div>
              <div class="flex-fill">
                <small class="text-muted d-block">Plan</small>
                <span class="fw-semibold">${item.plan}</span>
              </div>
            </div>
            <button class="btn btn-outline-primary btn-sm" data--bs-toggle="modal" data-bs-target="#modalEditarAsegurado">Gestionar</button>
          </div>
        `;
        lista.insertAdjacentHTML("beforeend", solicitudHtml);
      });
      renderPagination();
    }
  
    // Función para renderizar el paginador
    function renderPagination() {
      const paginador = document.getElementById("paginadorSolicitudes");
      paginador.innerHTML = "";
      const totalPages = Math.ceil(filteredSolicitudes.length / itemsPerPage);
  
      for (let i = 1; i <= totalPages; i++) {
        paginador.insertAdjacentHTML(
          "beforeend",
          `
          <li class="page-item ${i === currentPage ? "active" : ""}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>
        `
        );
      }
  
      // Asignar eventos a cada enlace del paginador
      document.querySelectorAll("#paginadorSolicitudes a").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          currentPage = parseInt(this.getAttribute("data-page"));
          renderSolicitudes();
        });
      });
    }
  
    // Función de filtrado por número de documento del titular
    function filterSolicitudesByDoc(doc) {
      filteredSolicitudes = solicitudes.filter((solicitud) =>
        solicitud.documento.toLowerCase().includes(doc.toLowerCase())
      );
      currentPage = 1;
      renderSolicitudes();
    }
  
    // Evento para el input de filtrado (asegúrate de tener un input con id "filterDoc")
    const filterInput = document.getElementById("filterDoc");
    if (filterInput) {
      filterInput.addEventListener("input", function () {
        filterSolicitudesByDoc(this.value);
      });
    }
  
    // Renderizado inicial
    renderSolicitudes();
  
    // Exportar funciones si es necesario (opcional)
    window.solicitudesModule = {
      render: renderSolicitudes,
      filter: filterSolicitudesByDoc,
    };
  })();
  