import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.scss']
})
export class ObservacionComponent implements OnInit {

  observacion: any;

  criterio: String;
  ponderacion: number;
  valor: String;

  constructor(private auth: AuthService) { }

  ngOnInit() {
   this.auth.read_Obs().subscribe(data => {
      this.observacion = data.map(e => {
        return{
          id: e.payload.doc.id,
          isEdit: false,
          Criterio: e.payload.doc.data()['Criterio'],
          Ponderacion: e.payload.doc.data()['Ponderacion'],
          Valor: e.payload.doc.data()['Valor'],
        };
      })
      console.log(this.observacion);

    });

  }

  CreateRecord(){
  let record = {};
  record['Criterio'] = this.criterio;
  record['Ponderacion'] = this.ponderacion;
  record['Valor'] = this.valor;
  this.auth.create_Obs(record).then(resp =>{
    this.criterio = "";
    this.ponderacion = undefined;
    this.valor = "";
    console.log(resp);
  })
  .catch(error=> {
    console.log(error);
  });
}

RemoveRecord(rowID) {
  this.auth.delete_Plantilla(rowID);
}

EditRecord(record) {
  record.isEdit=true;
  record.EditCriterio=record.Criterio;
  record.EditPonderacion=record.Ponderacion;
  record.EditValor =record.Valor;

}

UpdateRecord(recordRow){
let record = {};
  record['Criterio'] = recordRow.Criterio;
  record['Ponderacion'] = recordRow.Ponderacion;
  record['Valor'] = recordRow.Valor;
  this.auth.update_Plantilla(recordRow.id, record);
  recordRow.isEdit = false;


}

}
