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

  constructor(private reportsService: ReportsService, private formBuilder: FormBuilder) {
    // Jquery for dataTable
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
    this.shapeSearchByFilters.get('startDate').setValue(this.formatDate(new Date(), false));
    this.shapeSearchByFilters.get('finalDate').setValue(this.formatDate(new Date(), false));

    this.onChanges();

    this.listReports = this.reportsService.getListReports();      
    this.loadData();
  }

  dateRangeFilter() {
  }

  onChanges() {
    this.shapeSearchByFilters.valueChanges.subscribe(val => {
      if (val.search == "") {
        this.loadData();
      }

      document.getElementById("input-search").addEventListener("keydown", (e) => {
        if (val.search.length > 0) {          
          
        }

        if (e.keyCode == 8 && val.search == "") {
            
        } 
          
        if (e.keyCode == 46 && val.search == "") {
          // this.loadData();
          // e.preventDefault();
        }
      });           
    });
  }
  
  searchReport() {    
  }

  loadData() {
    // this.reportsService.getConsolidated(localStorage.getItem('numberId')).subscribe(data => {
    //   this.consolidatedList = data;        
    // }); 
    this.reportsService.getConsolidated(localStorage.getItem('numberId')).then(values => {
      if (values != null) {
        this.consolidatedList = values;                
        const valuesClone = Object.assign([], values);
        
        // for (let i = 0; i < valuesClone.length; i++) {
        //   const element = valuesClone[i];
        //   console.log(new Array(element.Day))
        // }

        // valuesClone.forEach(element => {
        //   let newElement = element.Day;
        //   let array = new Array(newElement);
        //   console.log(array)
        // })
     
        
        // for (let i = 0; i < this.consolidatedList) {

        // }
        // this.consolidatedList.forEach(element => {
        //   console.log()
        //   let startEnd = new Array();
        //   startEnd.push(element.Day);
        //   console.log(startEnd)
        // })
        // this.shapeSearchByFilters.get('startDate').setValue();
      }
    }).catch(err => {
      console.log(err);
    })
    
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
