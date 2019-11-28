import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import { formatDate } from '@angular/common';


@Component({
  selector: 'app-evaluador',
  templateUrl: './evaluador.component.html',
  styleUrls: ['./evaluador.component.scss']
})



export class EvaluadorComponent implements OnInit {

  today= new Date();
  jstoday = '';
  //  aqui esta el usuario
  user: firebase.User;
  plantillas3: any;
  mostrar1=false
  mostrar2=true
  mostrar3=true


// aqui esta la lista de chequeo
  evaluador: any;
  referencia: String;
  lista: String;
  autor: String;
  fecha: String;
  estado: String;
  observacion: String;
  nameplantilla: String;
  umbral: number;
  created_at: Date;
  idplantillaname: String;



// aqui esta plantilla
  busqueda=String;
  plantillas: any;
  plantillaRaice: String;
  plantillaName: String;
  plantillaDescription: String;
  plantillaUmbral: number;
  plantillaid1: String;
  plantillas1: any;
  plantillaRaice1: String;
  plantillaName1: String;
  plantillaDescription1: String;
  plantillaUmbral1: number;


//aqui esta criterio
  criterios: any;
  id_criterio: String;
  criterio_valor: String;
  tipo_criterio: String;
  descripcion: String;
  ponderacion: number;
  id_criterio1: String;
  criterio_valor1: String;
  tipo_criterio1: String;
  descripcion1: String;
  id_plantilla1: String;
  ponderacion1: number;



  constructor(private auth: AuthService , private router: Router) { }

  ngOnInit() {


   this.auth.getUserState()
    .subscribe( user => {
      this.user = user;
    })



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
        };
      })
      console.log(this.evaluador);

    });


    this.auth.read_Plantilla().subscribe(data => {
      this.plantillas = data.map(e => {
        return{
          id: e.payload.doc.id,
          isEdit: false,
          Raiz: e.payload.doc.data()['Raiz'],
          Name: e.payload.doc.data()['Name'],
          Description: e.payload.doc.data()['Description'],
          Umbral: e.payload.doc.data()['Umbral'],
        };
      })
      console.log(this.plantillas);
      console.log(this.plantillas);


    });






  }

// lista de criterios

  CreateRecord(item){

 this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', 'UTC-5');

  let record = {};
  record['Referencia'] = this.referencia;
  record['Lista'] = this.lista;
  record['Autor'] = this.user.displayName;
  record['Fecha'] = this.jstoday;
  record['Estado'] = this.estado;
  record['Observacion'] = this.observacion;
  record['Plantilla'] = this.nameplantilla;
  record['Umbral'] = this.umbral;
  this.auth.create_NewEvaluador(record).then(resp =>{
    this.referencia = "";
    this.lista = "";
    this.autor = "";
    this.fecha = " ";
    this.estado = "";
    this.observacion = "";
    this.nameplantilla = "";
    this.umbral = undefined;
    console.log(resp);

  })
  .catch(error=> {
    console.log(error);
  });
}

RemoveRecord(item) {
  this.auth.delete_Evaluador(item.id);
}

EditRecord(record) {
  record.isEdit=true;
  record.EditReferencia= record.Referencia;
  record.EditLista= record.Lista;
  record.EditAutor= record.Autor;
  record.EditFecha= record.Fecha;
  record.EditEstado= record.Estado;
  record.EditObservacion= record.Observacion;
  record.EditPlantilla= record.Plantilla;
  record.EditUmbral= record.Umbral;
}

UpdateRecord(recordRow){
let record = {};
  record['Referencia'] = recordRow.Referencia;
  record['Lista'] = recordRow.Lista;
  record['Autor'] = recordRow.Autor;
  record['Fecha'] = recordRow.Fecha;
  record['Estado'] = recordRow.Estado;
  record['Observacion'] = recordRow.Observacion;
  record['Plantilla'] = recordRow.Plantilla;
   record['Umbral'] = recordRow.Umbral;
  this.auth.update_Evaluador(recordRow.id, record);
  recordRow.isEdit = false;


  }

  //plantillas

  buscarplantilla() {

    console.log(this.nameplantilla)


    this.auth.read_Plantilla1(this.nameplantilla).subscribe(data => {
      this.plantillas3 = data.map(e => {
        return{
          id: e.payload.doc.id,
          isEdit: false,
          Raiz: e.payload.doc.data()['Raiz'],
          Name: e.payload.doc.data()['Name'],
          Description: e.payload.doc.data()['Description'],
          Umbral: e.payload.doc.data()['Umbral'],

        };
      })
      console.log(this.plantillas3);



    })


    ;
}



  plantilla(item){
    console.log(item)


  this.nameplantilla=item.Name
  this.umbral=item.Umbral
  this.idplantillaname=item.id


console.log(this.nameplantilla)
console.log(this.umbral)
console.log(this.idplantillaname)



  }



}



