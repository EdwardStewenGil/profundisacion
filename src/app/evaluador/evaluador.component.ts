import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluador',
  templateUrl: './evaluador.component.html',
  styleUrls: ['./evaluador.component.scss']
})



export class EvaluadorComponent implements OnInit {


  evaluador: any;

  referencia: String;
  lista: String;
  autor: String;
  fecha: String;
  estado: String;
  observacion: String;
  id_plantilla: String;
  umbral: number;
  created_at: Date;

  constructor(private auth: AuthService , private router: Router) { }

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
        };
      })
      console.log(this.evaluador);

    });

  }

  CreateRecord(){

  var dateDay = new Date().toDateString();
  let record = {};
  record['Referencia'] = this.referencia;
  record['Lista'] = this.lista;
  record['Autor'] = this.autor;
  record['Fecha'] = this.fecha;
  record['Estado'] = this.estado;
  record['Observacion'] = this.observacion;
  record['Plantilla'] = this.id_plantilla;
  record['Umbral'] = this.umbral;
  this.auth.create_NewEvaluador(record).then(resp =>{
    this.referencia = "";
    this.lista = "";
    this.autor = "";
    this.fecha = dateDay;
    this.estado = "";
    this.observacion = "";
    this.id_plantilla = "";
    this.umbral = undefined;
    console.log(resp);
    console.log(dateDay);
  })
  .catch(error=> {
    console.log(error);
  });
}

RemoveRecord(rowID) {
  this.auth.delete_Evaluador(rowID);
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

}


