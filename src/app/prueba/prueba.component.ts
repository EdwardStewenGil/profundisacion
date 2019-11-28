import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
// import  pdfMakeX  from 'pdfmake/build/pdfmake.js';
//import  pdfFontsX from 'pdfmake-unicode/dist/pdfmake-unicode.js';
//pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;

import * as jsPDF from 'jspdf';
import * as CanvasJS from 'canvasjs/dist/canvasjs.js';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import { CriteriosComponent } from '../criterios/criterios.component';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})

export class PruebaComponent implements OnInit  {
  
  criterios: any;
  evaluador: any;
  observacion1: any;

  constructor(private auth: AuthService , private router: Router) { }


  numeros:number;
  palabra:string;
  @ViewChild('content', {static: false}) content: ElementRef;

  ngOnInit() {

    this.auth.read_Evaluador().subscribe(data => {
      this.evaluador = data.map(e => {
        return{
          id: e.payload.doc.id,
          isEdit: false,
          Referencia: e.payload.doc.data()['Referencia'],
          Lista: e.payload.doc.data()['Lista'],
          Autor: e.payload.doc.data()['Autor'],
          Fecha: e.payload.doc.data()['Fecha'],
          Estado: e.payload.doc.data()['Estado'],
          Observacion: e.payload.doc.data()['Observacion'],
          Plantilla: e.payload.doc.data()['Plantilla'],
          Umbral: e.payload.doc.data()['Umbral'],
          idplantillaname: e.payload.doc.data()['idplantillaname'],
        };
      })
      console.log(this.evaluador);

    });


    this.auth.read_Obs1().subscribe(data => {
      this.observacion1 = data.map(e => {
        return{
          id: e.payload.doc.id,
          isEdit: false,
          Criterio: e.payload.doc.data()['Criterio'],
          Ponderacion: e.payload.doc.data()['Ponderacion'],
          Valor: e.payload.doc.data()['Valor'],
        };
      })
      console.log(this.observacion1);
  
    });









  

}


  generatePdf() {

  }

  public downloadPDF(){

   var div = document.getElementById("content");
   var pdf = new jsPDF();
   pdf.fromHTML(div.innerHTML,10,10);
   pdf.save('content');

}
modales(item){

this.numeros=parseInt(item.Umbral)
this.palabra=item.Plantilla
console.log(this.numeros)



let chart = new CanvasJS.Chart("chartContainer", {
  animationEnable: true, 
  exportEnable: true,
  title: {
   
  },
 data: [{
   type: "column",
   indexLabelFontColor: "#5A5757",
   indexLabelPlacement: "outside",
   dataPoints: [
     {y: this.numeros, label: this.palabra},
     {y: this.numeros, label: this.palabra},
     {y: this.numeros, label: this.palabra},

     
 
   ]
 }]


});

chart.render();

}






modales1(item){

  this.numeros=parseInt(item.Ponderacion)
  this.palabra=item.Criterio
  console.log(this.numeros)
  console.log(item.Criterio)

  
  
  
  let chart = new CanvasJS.Chart("chartContainer1", {
    animationEnable: true, 
    exportEnable: true,
    title: {
     
    },
   data: [{
     type: "column",
     indexLabelFontColor: "#5A5757",
     indexLabelPlacement: "outside",
     dataPoints: [
      {y: this.numeros, label: this.palabra},


  
       
   
     ]
   }]
  
  
  });
  
  chart.render();
  
  }
  
  



   }

    

  

