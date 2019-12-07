import { Component, OnInit } from '@angular/core';
import { ReportsService, Reports } from 'src/app/shared/services/reports.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { element } from 'protractor';

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public listReports: Reports[] = [];
  shapeSearchByFilters: FormGroup;
  initialDateRange: any;
  endDateRange: any;
  consolidatedList: any;

  months: any[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
    'Junio', 'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(private reportsService: ReportsService, private formBuilder: FormBuilder) {
    // Realizar modificación para realizar "sort" en las columnas.
    $(document).ready(function () {
      var table = $('#tbl-reports').DataTable({
        "dom": '<"top"l><"buttom"tip>',
        "select": "true",
        "ordering": "true", 
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
        table.search($('#input-search').val());
        table.draw();
      });      
      
    });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
  }

  ngOnInit() {
    this.shapeSearchByFilters = this.formBuilder.group({
      'search': new FormControl(''),
      'startDate': new FormControl(''),
      'finalDate': new FormControl('')
    });

    // Insertar la fecha de hoy
    // Prueba: insertar la fecha disponible en la base de datos.

    this.shapeSearchByFilters.get('startDate').setValue(this.formatDate(new Date(), false));
    this.shapeSearchByFilters.get('finalDate').setValue(this.formatDate(new Date(), false));

    // this.shapeSearchByFilters.get('startDate').setValue(this.formatDate(new Date('2016/09/15'), false));
    // this.shapeSearchByFilters.get('finalDate').setValue(this.formatDate(new Date('2016/09/15'), false));

    this.onChanges();

    this.listReports = this.reportsService.getListReports();      
    this.loadConsolidatedData();
  }

  dateRangeFilter() {
  }

  onChanges() {
    this.shapeSearchByFilters.valueChanges.subscribe(val => {
      this.loadConsolidatedData();
      if (val.search == "") {        
      }

      document.getElementById("input-search").addEventListener("keydown", (e) => {
        if (val.search.length > 0) {                    
        }

        if (e.keyCode == 8 && val.search == "") {            
        } 
          
        if (e.keyCode == 46 && val.search == "") {
          // this.loadConsolidatedData();
          // e.preventDefault();
        }
      });           
    });
  }
  
  searchReport() {    
  }

  monthNumToName(monthnum) {
    return this.months[monthnum] || '';
  }

  loadConsolidatedData() {

    if (this.shapeSearchByFilters.get('startDate').value == null && this.shapeSearchByFilters.get('finalDate').value == null) return;

    let bodyDate = {
      StartDay: new Date(this.shapeSearchByFilters.get('startDate').value).getDate() + 1,
      StartMonth: this.monthNumToName(new Date(this.shapeSearchByFilters.get('startDate').value).getMonth()),
      StartYear: new Date(this.shapeSearchByFilters.get('startDate').value).getFullYear(),
      FinalDay: new Date(this.shapeSearchByFilters.get('finalDate').value).getDate() + 1,
      FinalMonth: this.monthNumToName(new Date(this.shapeSearchByFilters.get('finalDate').value).getMonth()),
      FinalYear: new Date(this.shapeSearchByFilters.get('finalDate').value).getFullYear()
    };

    this.consolidatedList = null;

    this.reportsService.getConsolidatedByDate(bodyDate, localStorage.getItem('numberId')).then(data => {
      this.consolidatedList = data;
      console.log(this.consolidatedList);
    }).catch(err => {
      console.log(err);
    })
    // Realizar búsqueda por defecto al día anterior 
  }

  // Pendiente
  loadDetailedReport(idConsolidated: string) {
    console.log(idConsolidated);
  }

  formatDate(date?: any, yesterday?: boolean) {
    if (date == null)
      return;

    let d = new Date(date), month, day, year;

    if (!yesterday) {
      month = '' + (d.getMonth() + 1);
      day = '' + d.getDate();
      year = d.getFullYear();
    } else {
      month = '' + (d.getMonth() + 1);
      day = '' + (d.getDate() - 1);
      year = d.getFullYear();
    }

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }  

}