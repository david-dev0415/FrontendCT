import { Component, OnInit } from '@angular/core';
import { ReportsService, Reports } from 'src/app/shared/services/reports.service';

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public listReports: Reports[] = [];

  constructor(private reportsService: ReportsService) {
    // Jquery for dataTable

    $(document).ready(function () {
      var table = $('#tbl-reports').DataTable({
        "dom": '<"top"l><"buttom"tip>',
        "language": {
          "lengthMenu": "Mostrar _MENU_ registros por página",
          "zeroRecords": "No sé encontró ningun dato alusivo al criterio introducido",
          "info": "Mostrando página _PAGE_ de _PAGES_",
          "infoEmpty": "No hay registros disponibles",
          "infoFiltered": "(Filtrado de _MAX_ registros totales)",
          "loadingRecords": "Cargando",
          "paginate": {
            "first": "«",
            "previous": "Anterior",
            "next": "Siguiente",
            "last": "»"
          },
          "aria": {
            "paginate": {
              "first": "Primero",
              "previous": "Anterior",
              "next": "Próximo",
              "last": "Último"
            }
          }
        },
      });

      $('#input-search').on('keyup', function () {
        table.search($('#input-search').val()).draw();
      })
    });

  }

  ngOnInit() {
    this.listReports = this.reportsService.getListReports();
    console.log(this.listReports);
  }
}
