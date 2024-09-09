import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CatalogoUnicoService } from '../services/catalogo-unico.service';
import { SharedModule } from '../shared/shared/shared.module';
import { Mgee } from '../model/mgee';
import { Router } from 'express';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SharedModule,IonCol, IonRow, IonGrid, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  constructor(private catalogoUnicoSvc:CatalogoUnicoService, private router: Router) {}
  registros!:Mgee[];

  cargaCatalogoEstados(){
    this.catalogoUnicoSvc.getEstados().subscribe({

      next:(res:any)=>{
        console.log(res);
        this.registros=res;

    /*    this.registros.forEach((registro) => {
         this.insertaRegistroMgee(registro)
        });
*/

      },
      error:(error:any)=>{
        console.log('Error en estados');
        console.log(error)


      }
    })

  }
  insertaRegistroMgee(registro:Mgee){
    let mgee:Mgee=new Mgee();
    mgee.cve_ent=registro.cve_ent;
    mgee.cvegeo=registro.cvegeo;
    mgee.nom_abrev=registro.nom_abrev;
    mgee.nomgeo=registro.nomgeo;
    mgee.pob_femenina=registro.pob_femenina;
    mgee.pob_masculina=registro.pob_masculina;
    mgee.pob_total=registro.pob_total;
    mgee.total_viviendas_habitadas=registro.total_viviendas_habitadas;


    this.catalogoUnicoSvc.insertaMgee(mgee).subscribe({
      next:(res:any)=>{
        console.log('Registro insertado  de  forma exitosa')
        console.log(res);

      },
      error:(error:any)=>{
        console.log('Error en la inserción del registro')
        console.log(error)

      }
    })

  }
}
