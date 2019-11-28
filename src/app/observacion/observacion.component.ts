import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.scss']
})
export class ObservacionComponent implements OnInit {

  observacion1: any;
  criterio5: String;
  ponderacion5: number;
  valor5: String;

  constructor(private auth: AuthService) { }

  ngOnInit() {
   this.auth.read_Obs().subscribe(data => {
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

}
