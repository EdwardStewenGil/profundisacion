import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.scss']
})
export class CriteriosComponent implements OnInit {

  criterios: any;
  
  id_criterio: String;
  
  criterio_valor: String;
  tipo_criterio: String;
  descripcion: String;
  id_plantilla: String;
  ponderacion: number;

  constructor(private auth: AuthService) { }

  ngOnInit() {

    this.auth.read_Criterios().subscribe(data => {
      this.criterios = data.map(e => {
        return{
          id: e.payload.doc.id,
          isEdit: false,
          Criterio: e.payload.doc.data()['Criterio'],
          Tipo: e.payload.doc.data()['Tipo'],
          Descripcion: e.payload.doc.data()['Descripcion'],
          Plantilla: e.payload.doc.data()['Plantilla'],
          Ponderacion: e.payload.doc.data()['Ponderacion'],
        };
      })
      console.log(this.criterios);

    });
    
  }

  CreateRecordC(){
    let record = {};
    record['Criterio'] = this.criterio_valor;
    record['Tipo'] = this.tipo_criterio;
    record['Descripcion'] = this.descripcion;
    record['Plantilla'] = this.id_plantilla;
    record['Ponderacion'] = this.ponderacion;
    this.auth.create_NewCriterios(record).then(resp =>{      
      this.criterio_valor = "";
      this.tipo_criterio = "";
      this.descripcion = "";
      this.id_plantilla = "";
      this.ponderacion = undefined;
      console.log(resp);
    })
    .catch(error=> {
      console.log(error);
    });
  }

  RemoveRecordC(rowID) {
    this.auth.delete_Criterios(rowID);
  }

  EditRecordC(record) {
    record.isEdit=true;
    record.EditCriterio=record.Criterio;
    record.EditTipoCriterio=record.Tipo;
    record.EditDescripcion =record.Descripcion;
    record.EditPlantilla =record.Plantilla;
    record.EditPonderacion =record.Ponderacion;
  }

  UpdateRecordC(recordRow){
    let record = { };      
      record['Criterio'] = recordRow.criterio_valor;
      record['Tipo'] = recordRow.tipo_criterio;
      record['Descripcion'] = recordRow.descripcion;
      record['Plantilla'] = recordRow.id_plantilla;
      record['Ponderacion'] = recordRow.ponderacion;
      this.auth.update_Criterios(recordRow.id, record);
      recordRow.isEdit = false;
    }


}
