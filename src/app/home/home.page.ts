import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CatalogoUnicoService } from '../services/catalogo-unico.service';
import { SharedModule } from '../shared/shared/shared.module';
import { Mgee } from '../model/mgee';
import { Router } from '@angular/router';
import { Mgem } from '../model/mgem';
import { Localidad } from '../model/localidad';
import { async } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SharedModule, IonCol, IonRow, IonGrid, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  registros!: Mgee[];
  registroMgee!: Mgee;
  registroMgem!: Mgem;
  contador:number=0;
  constructor(private catalogoUnicoSvc: CatalogoUnicoService, private router: Router) { }



  async cargaCatalogoLocalidades() {
    //https://gaia.inegi.org.mx/wscatgeo/v2/mgee/
    await this.catalogoUnicoSvc.getEstados().subscribe({

      next: (res: any) => {
        //console.log(res);
        this.registros = res;

        for (let index = 0; index < 1; index++) {
          const estado = res.datos[index];
          console.log(estado);
          this.leeMpiosXEstado(estado);
        
        }
          
       
          console.log('***** Fin del proceso lectura del estado *****')
      },
      error: (error: any) => {
        console.log('Error en lectura de estados');
        console.log(error)


      }
    })
    console.log('contador=',this.contador);
  }

  async leeMpiosXEstado(estado: Mgee) {
    //https://gaia.inegi.org.mx/wscatgeo/v2/mgem/01
    await this.catalogoUnicoSvc.getMunicipios(estado.cve_ent).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.registros = res;
        // this.leeLocalidadesXMpio("001");


        for (let index = 0; index < res.datos.length; index++) {
          const municipio = res.datos[index];
          console.log(municipio);
          this.leeLocalidadesXMpio(municipio);
        }
        console.log('***** Fin del proceso lectura del municipio *****')

        /*res.datos.forEach((registroMgem: Mgem) => {
          this.leeLocalidadesXMpio(registroMgem);
          //this.leeLocalidadesXMpio("001");
        });*/
      },
      error: (error: any) => {
        console.log('Error en lectura de municipio');
        console.log(error)


      }
    })
  }

  async leeLocalidadesXMpio(municipio: Mgem) {
     //https://gaia.inegi.org.mx/wscatgeo/v2/localidades/01001
    await this.catalogoUnicoSvc.getLocalidades(municipio.cvegeo).subscribe({
      next: (res: any) => {
     /*   console.log('Entidad=',municipio.cve_ent);
        console.log('Municipio=',municipio.cve_mun);
        console.log(res);
     */   this.registros = res;
        /* res.datos.forEach((registroLocalidad: Localidad) => {
           this.insertaRegistroLocalidad(registroLocalidad);
         });*/
        for (let index = 0; index < res.datos.length; index++) {
          const localidad = res.datos[index];
         this.insertaRegistroLocalidad(localidad);
         ++this.contador;
       
          //console.log(localidad);
        }
        

        console.log('***** Fin del proceso inserción localidades *****')
      },
      error: (error: any) => {
        // console.log('Error en municipios');
        // console.log(error)


      }
    })
  }

  cargaCatalogoEstados() {
    this.catalogoUnicoSvc.getEstados().subscribe({

      next: (res: any) => {
        console.log(res);
        this.registros = res;


        res.datos.forEach((registroMgee: Mgee) => {
          this.insertaRegistroMgee(registroMgee);
        });



      },
      error: (error: any) => {
        console.log('Error en estados');
        console.log(error)


      }
    })

  }
  insertaRegistroMgee(registroMgee: Mgee) {
    let mgee: Mgee = new Mgee();
    mgee.cve_ent = registroMgee.cve_ent;
    mgee.cvegeo = registroMgee.cvegeo;
    mgee.nom_abrev = registroMgee.nom_abrev;
    mgee.nomgeo = registroMgee.nomgeo;
    mgee.pob_femenina = registroMgee.pob_femenina;
    mgee.pob_masculina = registroMgee.pob_masculina;
    mgee.pob_total = registroMgee.pob_total;
    mgee.total_viviendas_habitadas = registroMgee.total_viviendas_habitadas;
    this.catalogoUnicoSvc.insertaMgee(mgee).subscribe({
      next: (res: any) => {
        console.log('Registro insertado  de  forma exitosa')
        console.log(res);

      },
      error: (error: any) => {
        console.log('Error en la inserción del registro')
        console.log(error)
      }
    })
  }

  cargaCatalogoMpios() {
    this.catalogoUnicoSvc.getEstados().subscribe({
      next: (res: any) => {
        console.log(res);
        this.registros = res;
        res.datos.forEach((registroMgee: Mgee) => {
          this.cargaMpiosXEstado(registroMgee.cve_ent)
        });
      },
      error: (error: any) => {
        console.log('Error en estados');
        console.log(error)
      }
    })
  }

  cargaMpiosXEstado(estado: string) {
    this.catalogoUnicoSvc.getMunicipios(estado).subscribe({
      next: (res: any) => {
        console.log(res);
        this.registros = res;
        res.datos.forEach((registroMgem: Mgem) => {
          this.insertaRegistroMgem(registroMgem);
        });
      },
      error: (error: any) => {
        console.log('Error en municipios');
        console.log(error)


      }
    })
  }

  insertaRegistroMgem(registroMgem: Mgem) {
    let mgem: Mgem = new Mgem();
    mgem.cvegeo = registroMgem.cvegeo;
    mgem.cve_ent = registroMgem.cve_ent;
    mgem.cve_mun = registroMgem.cve_mun;
    mgem.nomgeo = registroMgem.nomgeo;
    mgem.cve_cab = registroMgem.cve_cab;
    mgem.pob_total = registroMgem.pob_total;
    mgem.pob_femenina = registroMgem.pob_femenina;
    mgem.pob_masculina = registroMgem.pob_masculina;
    mgem.total_viviendas_habitadas = registroMgem.total_viviendas_habitadas;
    this.catalogoUnicoSvc.insertaMgem(mgem).subscribe({
      next: (res: any) => {
        console.log('Registro insertado  de  forma exitosa')
        console.log(res);

      },
      error: (error: any) => {
        console.log('Error en la inserción del registro')
        console.log(error)
      }
    })
  }

  cargaLocalidadesXMpio(estado: string) {
    this.catalogoUnicoSvc.getMunicipios(estado).subscribe({
      next: (res: any) => {
        console.log(res);
        this.registros = res;
        res.datos.forEach((registroMgem: Mgem) => {
          this.insertaRegistroMgem(registroMgem);
        });
      },
      error: (error: any) => {
        console.log('Error en municipios');
        console.log(error)


      }
    })
  }


  insertaRegistroLocalidad(registroLocalidad: Localidad) {
    let localidad: Localidad = new Localidad();
    //console.log('Localidad=',registroLocalidad)
    localidad.cvegeo = registroLocalidad.cvegeo;
    localidad.cve_ent = registroLocalidad.cve_ent;
    localidad.cve_mun = registroLocalidad.cve_mun;
    localidad.cve_loc = registroLocalidad.cve_loc;
    localidad.nomgeo = registroLocalidad.nomgeo;

    localidad.ambito = registroLocalidad.ambito;
    localidad.latitud = registroLocalidad.latitud;
    localidad.longitud = registroLocalidad.longitud;
    localidad.altitud = registroLocalidad.altitud;
    localidad.pob_total = registroLocalidad.pob_total;
    localidad.total_viviendas_habitadas = registroLocalidad.total_viviendas_habitadas;
    localidad.cve_carta = registroLocalidad.cve_carta;
    localidad.estatus = registroLocalidad.estatus;
    localidad.periodo = registroLocalidad.periodo;

    this.catalogoUnicoSvc.insertaLocalidad(localidad).subscribe({
      next: (res: any) => {
        console.log('Localidad insertada de forma exitosa')
        console.log(res);
      },
      error: (error: any) => {
        console.log('Error en la inserción del registro')
        console.log(error)
      }
    })
  }
}
