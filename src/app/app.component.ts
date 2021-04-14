import { JsonpClientBackend } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from './services/roles/roles.service';
import { UsuariosService } from './services/usuarios/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'gesusuariosfront';

  usuarioForm: FormGroup;
  roles: any;
  usuarios: any;
  usuarioRes: any;
  nameUser: any;
  userSelected = {
    id_usuario: '',
    rol_id: '',
	  nombre: '',
	  activo: false
  };

  constructor(
    public fb: FormBuilder,
    public rolesService: RolesService,
    public usuariosService: UsuariosService

  ){

  }
  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
    id_usuario: ['1', Validators.required],
    rol_id: ['', Validators.required],
	  nombre: ['', Validators.required],
	  activo: ['', Validators.required]	  
    });

    this.rolesService.getAllRoles().subscribe(
      resp=>{
        this.roles = resp;
      },
      error=>{
        console.error(error);
      }
    )

  }

  saveUser(): void{
    
    this.usuariosService.saveUser(this.usuarioForm.value).subscribe(
      resp=>{
        this.usuarioForm.reset();
        console.log(resp);
        this.usuarioRes = {
          id_usuario: resp.user.id_usuario,
          rol_id: resp.user.rol_id,
          nombre: resp.user.nombre,
          activo: resp.user.activo	 
        };

        if (this.usuarios){
          this.usuarios.push(this.usuarioRes);
        }
        
      },
      error=>{
        console.error(error)
      }
    );
  }

  delete(usuario:any){
    
    this.usuariosService.deleteUser(usuario.id_usuario).subscribe(
      resp=>{
        for (let [i, user] of this.usuarios.entries()) {
          if (user.id_usuario == usuario.id_usuario) {
            this.usuarios.splice(i, 1);
            //console.log('otro-' + i + '-' + user.id_usuario);
          }
        }
        this.usuarioForm.reset();
      },
      error=>{
        console.error(error)
      }
    )
  }

  searchUser(userName:any){
    if(!userName){
      this.usuariosService.getAllUsers().subscribe(
        resp=>{
          this.usuarios = resp;
        },
        error=>{
          console.error(error);
        }
      )
    }else{
      this.usuariosService.getUsersByName(userName).subscribe(
        resp=>{
          this.usuarios = resp;
        },
        error=>{
          console.error(error);
        }
      )
    }
    
  }

  getValueOfTD(usuario:any){
    var act:any;
    if(usuario.activo === 'S'){
      act = true;
    }else{
      act = false;
    }

    var usuarioNom = usuario.nombre.trim();

    this.userSelected = {
      id_usuario: usuario.id_usuario,
      nombre: usuarioNom,
      activo: act,
      rol_id: usuario.rol_id
    }

  }

  clearFieldUserName(){
    this.nameUser = null;
  }

  updateUser(){

    this.usuariosService.updateUser(this.userSelected).subscribe(
      resp=>{
        this.usuarioForm.reset();
        console.log(resp);
      },
      error=>{
        console.error(error)
      }
    );

  }

  clearFormUser(){
    
    this.userSelected = {
      id_usuario: '',
      nombre: '',
      activo: false,
      rol_id: ''
    }
  }

}
