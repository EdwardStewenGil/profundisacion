import { Component, OnInit,Input,Output ,EventEmitter} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.scss']
})
export class CriteriosComponent implements OnInit {

  @Input() id_plantilla2: String;
  @Input() nombre_plantilla2: String;
  @Output() emitEvent:EventEmitter<boolean> = new EventEmitter<boolean>();



  criterios: any;

  id_criterio: String;
  criterio_valor: String;
  tipo_criterio: String;
  descripcion: String;
  id_plantilla: String;
  ponderacion: number;
  id_criterio1: String;
  criterio_valor1: String;
  tipo_criterio1: String;
  descripcion1: String;
  id_plantilla1: String;
  ponderacion1: number;

  constructor(private auth: AuthService , private router: Router) { }

  ngOnInit() {


console.log(this.nombre_plantilla2)
console.log(this.id_plantilla2)

    this.auth.read_Criterios(this.id_plantilla2).subscribe(data => {
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

  CreateRecordC(){
    let record = {};
    record['Criterio'] = this.criterio_valor;
    record['Tipo'] = this.tipo_criterio;
    record['Descripcion'] = this.descripcion;
    record['Plantilla'] = this.id_plantilla2;
    record['Ponderacion'] = this.ponderacion;
    this.auth.create_NewCriterios(record).then(resp =>{
      this.criterio_valor = "";
      this.tipo_criterio = "";
      this.descripcion = "";
      this.id_plantilla = "";
      this.ponderacion = undefined;
    })
    .catch(error=> {
      console.log(error);
    });
  }

  RemoveRecordC(rowID) {
    this.auth.delete_Criterios(this.id_criterio1);
  }

  EditRecord(record) {

    this.id_criterio1=record.id;
    this.criterio_valor1=record.Criterio;
    this.tipo_criterio1=record.Tipo;
    this.descripcion1=record.Descripcion;
    this.ponderacion1 =record.Ponderacion;

  }
  volver(){
    location.reload();


  }
  UpdateRecordC(recordRow){
    let record = { };
      record['Criterio'] =  this.criterio_valor1;
      record['Tipo'] =  this.tipo_criterio1;
      record['Descripcion'] = this.descripcion1;
      record['Plantilla'] =  this.id_plantilla2;
      record['Ponderacion'] =   this.ponderacion1;
      this.auth.update_Criterios(this.id_criterio1, record);
    }


}
