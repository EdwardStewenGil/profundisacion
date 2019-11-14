import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.scss']
})
export class PlantillasComponent implements OnInit {

mostrar2=false;
mostrar1=true;
  plantillas: any;
  plantillaRaice: String;
  plantillaName: String;
  plantillaDescription: String;
  plantillaUmbral: number;

  constructor(private auth: AuthService) { }

  ngOnInit() {
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

    });
}

CreateRecord(){
  let record = {};
  record['Raiz'] = this.plantillaRaice;
  record['Name'] = this.plantillaName;
  record['Description'] = this.plantillaDescription;
  record['Umbral'] = this.plantillaUmbral;
  this.auth.create_NewPlantilla(record).then(resp =>{
    this.plantillaRaice = "";
    this.plantillaName = "";
    this.plantillaDescription = "";
    this.plantillaUmbral = undefined;
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
  console.log("prueba")
  console.log(record)
  document.getElementById("raiz").nodeValue = record.EditRaiz;
  record.EditRaiz=record.Raiz;
  record.EditName=record.Name;
  record.EditDescription =record.Description;
  record.EditUmbral =record.Umbral;
  console.log(record.EditName)
}

UpdateRecord(recordRow){
let record = {};
record['Raiz'] = recordRow.plantillaRaice;
  record['Name'] = recordRow.plantillaName;
  record['Description'] = recordRow.plantillaDescription;
  record['Umbral'] = recordRow.plantillaUmbral;
  this.auth.update_Plantilla(recordRow.id, record);
  recordRow.isEdit = false;


}




  

}