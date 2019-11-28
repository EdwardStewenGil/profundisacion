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
  Idplantilla7:String ;
  referencia1: String;
  lista1: String;
  autor1: String;
  fecha1: String;
  estado1: String;
  observacion10: String;
  nameplantilla1: String;
  umbral1: number;
  created_at1: Date;
  idplantillaname1: String;



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

  // observacion
  observacion1: any;
  cumple="verdadero";
  nocumplee ="falso";
  idlista: string;
  criterio5: String;
  ponderacion5: number;
  valor5: String;
  suma=0;
  umbral5=0;
  validando="valido";


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
          idplantillaname: e.payload.doc.data()['idplantillaname'],
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




RemoveRecord3(rowID) {
  this.auth.delete_Plantilla(rowID);
}

EditRecord3(record) {
  record.isEdit=true;
  record.EditCriterio=record.Criterio;
  record.EditPonderacion=record.Ponderacion;
  record.EditValor =record.Valor;

}

UpdateRecord3(recordRow){
let record = {};
  record['Criterio'] = recordRow.Criterio;
  record['Ponderacion'] = recordRow.Ponderacion;
  record['Valor'] = recordRow.Valor;
  this.auth.update_Plantilla(recordRow.id, record);
  recordRow.isEdit = false;


}

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
  record['idplantillaname'] = this.idplantillaname;
  this.auth.create_NewEvaluador(record).then(resp =>{
    this.referencia = "";
    this.lista = "";
    this.autor = "";
    this.fecha = " ";
    this.estado = "";
    this.observacion = "";
    this.nameplantilla = "";
    this.umbral = undefined;
    this.idplantillaname = "";
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

  busqueda3(item1){

console.log(item1)
this.idlista=item1.id
this.umbral5=item1.Umbral


this.referencia1= item1.Referencia
this.lista1= item1.Lista
this.autor1=item1.Autor
this.observacion10= item1.Observacion
this.nameplantilla1= item1.Plantilla
this.created_at1=item1.Fecha
this.idplantillaname1=item1.idplantillaname











this.auth.read_Criterios(item1.idplantillaname).subscribe(data => {
  this.criterios = data.map(e => {
    return{
      id: e.payload.doc.id,
      isEdit: false,
      Criterio: e.payload.doc.data()['Criterio'],
      Tipo: e.payload.doc.data()['Tipo'],
      Descripcion: e.payload.doc.data()['Descripcion'],
      Ponderacion: e.payload.doc.data()['Ponderacion'],
    };
  })
  console.log(this.criterios);

});




  }


  CreateRecord3(){
    let record = {};
    record['Criterio'] = this.criterio5;
    record['Ponderacion'] = this.ponderacion5;
    record['Valor'] = this.valor5;
    this.auth.create_Obs(record).then(resp =>{
      this.criterio5 = "";
      this.ponderacion5 = undefined;
      this.valor5 = "";
      console.log(resp);
    })
    .catch(error=> {
      console.log(error);
    });
  }

  nocumple(item2){
    console.log(item2)
    let record = {};
    record['Criterio'] = item2.Criterio;
    record['Ponderacion'] = item2.Ponderacion;
    record['Valor'] = this.nocumplee;
    record['idlista'] = this.idlista;

    this.auth.create_Obs(record).then(resp =>{
      this.criterio5 = "";
      this.ponderacion5 = undefined;
      this.valor5 = "";
      console.log(resp);
    })
    .catch(error=> {
      console.log(error);
    });
  

  }

  cumplio(item2){
    console.log(item2)
  
    console.log(this.idlista)

    let record = {};
    record['Criterio'] = item2.Criterio;
    record['Ponderacion'] = item2.Ponderacion;
    record['Valor'] = this.cumple;
    record['idlista'] = this.idlista;

    this.auth.create_Obs(record).then(resp =>{
      this.criterio5 = "";
      this.ponderacion5 = undefined;
      this.valor5 = "";
      console.log(resp);
    })
    .catch(error=> {
      console.log(error);
    });
  

  }

  validar(item) {
console.log(item)
console.log(this.umbral5)

if(item.Valor  ==  this.cumple){
  this.suma=  this.suma + parseInt(item.Ponderacion)
  console.log( "prueba")
  console.log( item.Ponderacion)
  console.log( this.suma)
  console.log( this.umbral5)





if(this.suma >= this.umbral5){

console.log( "paso la lista de chequeo")

console.log(this.validando)

let record = {};
  record['Referencia'] =  this.referencia1;
  record['Lista'] = this.lista1;
  record['Autor'] =this.autor1;
  record['Fecha'] = this.created_at1;
  record['Estado'] = this.validando;
  record['Observacion'] = this.observacion10;
  record['Plantilla'] = this.nameplantilla1;
   record['Umbral'] = this.umbral5;
   record['idplantillaname'] = this.nameplantilla1;

  this.auth.update_Evaluador(this.idlista, record);


 




}

}
 



  }

  limpiar(){
    this.suma = 0;
    this.umbral5 = 0;


  }




  buscarbusqueda() {

  this.auth.read_Obs(this.idlista ).subscribe(data => {
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
}



