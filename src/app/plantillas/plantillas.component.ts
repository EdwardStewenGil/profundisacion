import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.scss']
})
export class PlantillasComponent implements OnInit {

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

RemoveRecord() {
  this.auth.delete_Plantilla( this.plantillaid1);
}

EditRecord(record) {
  console.log(record)
  this.plantillaid1=record.id;
  this.plantillaRaice1=record.Description;
  this.plantillaName1=record.Name;
  this.plantillaDescription1 =record.Raiz;
  this.plantillaUmbral1 =record.Umbral;

  console.log(this.plantillaRaice1)

}



UpdateRecord( ){
let record = {};
record['Raiz'] = this.plantillaRaice1;
  record['Name'] = this.plantillaName1;
  record['Description'] = this.plantillaDescription1;
  record['Umbral'] = this.plantillaUmbral1;
  console.log(record)
  this.auth.update_Plantilla(this.plantillaid1,record);


}




  

}