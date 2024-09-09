import { Mgee } from './../model/mgee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CatalogoUnicoService {

  constructor(private http:HttpClient) { }

  getEstados(){
    return this.http.get(environment.urlEstados)
  }
  getMunicipios(id:string){
    return this.http.get(environment.baseUrl+environment.municipios+id)
  }
  getLocalidades(id:string){
    return this.http.get(environment.baseUrl+environment.localidades+id)
  }

  insertaMgee(mgee:Mgee) {
    return this.http.post(environment.baseUrl + ':' + environment.puerto + environment.insertaMgee,mgee);
  }
}
