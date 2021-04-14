import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private API_SERVER = "http://localhost:8070/usuario/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUsers(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public getUsersByName(userName:any): Observable<any>{
    return this.httpClient.get(this.API_SERVER + userName);
  }

  public saveUser(usuario:any): Observable<any>{
    
    if(usuario.activo){
      usuario.activo = 'S';
    }else{
      usuario.activo = 'N';
    }
    return this.httpClient.post(this.API_SERVER,usuario);
  }

  public deleteUser(userId:any): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + userId);
  }

  public updateUser(usuario:any): Observable<any>{
    if(usuario.activo){
      usuario.activo = 'S';
    }else{
      usuario.activo = 'N';
    }
    return this.httpClient.put(this.API_SERVER,usuario);
  }

}
