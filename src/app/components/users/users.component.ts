import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { SesionService } from 'src/app/services/sesion.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] ,
  providers:[
    SesionService,
    LoginService,
    AccountService,
    UsersService
  ]
})
export class UsersComponent implements OnInit {
  public exist__window__add:boolean=false;
  public formName:string = '';
  public formEmail:string = '';
  public formState:string='Activo'
  public formUserType:string='Usuario';
  public formPass?:string;
 
  // public formEditName:string = '';
  // public formEditEmail:string = '';
  // public formEditId:number = 0;

  // public lenAllCustomers:number=0;
  public dateStart:any = new Date().toString().substring(0,16);
  public isFormValidated:any='';
  public existContainerEdit:boolean=false;
  public users:usersI[]=[]
  public existMenuSelection:boolean=false;
  // public startPage:number=0;
  // public nextPage:number=6;
  // public resultOfTableStart:number=1;


  
  constructor(
    public account:AccountService,
    public loginService:LoginService,
    public usersService:UsersService,
    public sessionServices:SesionService) { }

    
  ngOnInit (): void {
    this.sessionServices.verifiedSession('users');
    this.getAccountByToken();
    this.getAllUsers()
  }

  public searchUser(data:string){
    let filtered=this.users.filter((element)=>{
      return element.nombre.toLowerCase().includes(data);
    })

    if(filtered.length==0 || data.length==0) this.getAllUsers();
    this.users=filtered;
    
    
  }


  public postUser(){
    
   
    if(this.formName != '' && this.formEmail != '' && this.formState && this.formUserType && this.formPass){
      
      this.usersService.postUser(this.formName,this.formEmail,this.formUserType,this.formState,this.formPass,'0')
       .subscribe((user)=>{
        console.log(this.users);
        
        this.getAllUsers()
        this.isFormValidated='true'
        this.exist__window__add=false
       })

    }
    else{
      console.log('faltan campos');
      this.isFormValidated='false'
      
    }
  }
  
  public getAllUsers(){
    
    this.usersService.getAllUsers()
    .subscribe((user)=>{
      // console.log(user.response);
      
      this.users=user.response;  
      // this.lenAllCustomers=Math.ceil(this.customers.length / 6) ;
    });

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

interface usersI{
   clave:string;
   email:string;
   estado:string;
   id:string;
   nombre:string;
   sessionKey:string;
   tipoDeUsuario:string;
}