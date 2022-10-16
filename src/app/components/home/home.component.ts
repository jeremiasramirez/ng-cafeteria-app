import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
import { LoginService } from "src/app/services/login.service";
  
import { SesionService } from "src/app/services/sesion.service";
 
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css'
    ] ,
    providers:[
        SesionService,
        LoginService,
        AccountService
    ]
})

export class HomeComponent{

     
    public username:string='Cargando..';
    public userEmail:string='Cargando email..';
    public isMenuOpen:boolean=true;
    public typeUser:string='';
    public isAdmin:boolean=false;


    constructor(
        public account:AccountService,
        public loginService:LoginService,
        public sesion:SesionService, public router:Router){ }



    ngOnInit(){
      this.sesion.verifiedSession('home');
      this.getAccountByToken();
    }
    
    public getAccountByToken(){
        
        let token:any=localStorage.getItem("token")?.toString();
        
        this.account.getUserByToken(token)
        .subscribe((user)=>{
           
            if(user.response[0].nombre.length >0&&  user.response[0].email.length>0){
                 
                this.username= user.response[0].nombre;
                this.userEmail= user.response[0].email;
                this.typeUser=user.response[0].tipoDeUsuario
            }
            else{
                this.closeSesion();
            }

        }) 

    }


    public routeToCustomers(){
        this.sesion.routeTo('customers')
    }

    public routeToUsers(){
        if(this.typeUser=="Admin"){
            this.sesion.routeTo('users')
            
        }
        else{
            this.isAdmin=true
            setTimeout(()=>{
                this.isAdmin=false
            },3000)
            
        }
        
    }
       
       
    public closeSesion(){
        let oldtoken:any = localStorage.getItem("token")?.toString();
        let newtoken:any='0';
       
            this.loginService.removeToken(newtoken).subscribe(()=>{
                this.sesion.closeSesion();
            })
     
        
   
}



}