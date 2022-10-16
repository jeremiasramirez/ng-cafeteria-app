import { Injectable } from "@angular/core"
import { Router } from "@angular/router";
import axios from "axios";
import { ajax } from 'rxjs/ajax';
import { LoginService } from "./login.service";

@Injectable()

export class SesionService {
   
      
   constructor(
    public loginService:LoginService,
    public router:Router){
      console.log("sesion service running");
   }
   
   
   public verifiedSession(route:string){
       
    if(localStorage.getItem("token")?.toString()==null || localStorage.getItem("token")?.toString()=='0' || localStorage.getItem("token")?.toString()==''){
            this.closeSesion();
        }else{
            
            //aqui se debe verificar si ese token existe en el backend
            let tokenRegistered:any=localStorage.getItem("token")?.toString();
            
            this.loginService.verifyToken(tokenRegistered.toString()).subscribe((e:any)=>{
           
                if(e.response.length==1  ){
                     this.openSesion(route);
                }
                else{
                    this.closeSesion();
                }
             
               
            })
            
         
        }
   }

   public closeSesion(){
    let tokenRegistered:any=localStorage.getItem("token")?.toString();
            
    this.loginService.removeToken('0').subscribe(()=>{
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
    })
        

    }

    public openSesion(route:string){
        //localStorage.removeItem("token");
        this.router.navigate([`/${route}`]);

    }



}