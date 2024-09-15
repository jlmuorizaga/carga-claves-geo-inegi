import { Mgee } from './../model/mgee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Mgem } from '../model/mgem';
import { Localidad } from '../model/localidad';

@Injectable({
  providedIn: 'root'
})
export class CatalogoUnicoService {

  constructor(private http:HttpClient) { }

  //https://gaia.inegi.org.mx/wscatgeo/v2/mgee/
  getEstados(){
    return this.http.get(environment.urlEstados)
  }
  //https://gaia.inegi.org.mx/wscatgeo/v2/mgem/01
  getMunicipios(cve_ent:string){
    return this.http.get(environment.urlMpios+cve_ent)
  }
  //https://gaia.inegi.org.mx/wscatgeo/v2/localidades/01001
  getLocalidades(cvegeo:string){
    return this.http.get(environment.urlLocalidades+cvegeo)
  }

  insertaMgee(mgee:Mgee) {
    return this.http.post(environment.baseUrl + ':' + environment.puerto + environment.insertaMgee,mgee);
  }

  //https://gaia.inegi.org.mx/wscatgeo/v2/mgem/01
  insertaMgem(mgem:Mgem) {
    return this.http.post(environment.baseUrl + ':' + environment.puerto + environment.insertaMgem,mgem);
  }
  insertaLocalidad(localidad:Localidad) {
    return this.http.post(environment.baseUrl + ':' + environment.puerto + environment.insertaLocalidad,localidad);
  }
}
