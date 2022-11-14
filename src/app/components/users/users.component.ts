import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] ,
  providers:[
    SesionService,
    LoginService,
    AccountService
  ]
})
export class UsersComponent implements OnInit {
  public exist__window__edit:boolean=true;
  public formName:string = '';
  public formEmail:string = '';
  public formEditName:string = '';
  public formEditEmail:string = '';
  public formEditId:number = 0;

  public lenAllCustomers:number=0;
  public dateStart:any = new Date().toString().substring(0,16);
  public isFormValidated:any='';
  public existContainerEdit:boolean=false;

  public startPage:number=0;
  public nextPage:number=6;
  public resultOfTableStart:number=1;


  
  constructor(
    public account:AccountService,
    public loginService:LoginService,
    public sessionServices:SesionService) { }

    
  ngOnInit (): void {
    this.sessionServices.verifiedSession('users');
    this.getAccountByToken();
  }

  
  public getAccountByToken(){
        
    let token:any=localStorage.getItem("token")?.toString();
    
    this.account.getUserByToken(token)
    .subscribe((user)=>{
       
        if(user.response[0].tipoDeUsuario!="Admin"){
          this.sessionServices.routeTo('home');
        }
         

    }) 

}

}
