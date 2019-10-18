import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-hider',
  templateUrl: './hider.component.html',
  styleUrls: ['./hider.component.css']
})
export class HiderComponent implements OnInit {

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
          PlantillaRaice: e.payload.doc.data()['Raiz'],
          PlantillaName: e.payload.doc.data()['Name'],
          PlantillaDescription: e.payload.doc.data()['Description'],
          PlantillaUmbral: e.payload.doc.data()['Umbral'],
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
  record.EditName=record.Name;
  record.EditAge=record.Age;
  record.EditAddress =record.Address;
}




  

}
