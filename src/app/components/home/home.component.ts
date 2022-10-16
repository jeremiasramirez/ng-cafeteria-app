import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
        LoginService
    ]
})

export class HomeComponent{
    public name:string = 'Home';
    public isMenuOpen:boolean=true;
    

    constructor(
        public loginService:LoginService,
        public sesion:SesionService, public router:Router){ }

    ngOnInit(){
      this.sesion.verifiedSession('home');
    }
    
  
       
       
    public closeSesion(){
        let  oldtoken:any= localStorage.getItem("token")?.toString();
        let newtoken:any='0';
        this.loginService.removeToken(newtoken).subscribe(()=>{
            this.sesion.closeSesion();
        })
      
        
         

 

}

}