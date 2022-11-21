import { Component } from "@angular/core";
import { Router } from "@angular/router"; 
import { timer } from "rxjs";
import { LoginService } from "src/app/services/login.service";
import { SesionService } from "src/app/services/sesion.service";
 
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css'
    ] ,
    providers:[
        LoginService,
        SesionService
    ]
})

export class LoginComponent{
    public user:string = ' ';
    public password:string = '';
    public isFormEnabled:boolean=true;
    public isLogged:any;
    public isLoadingMenu:boolean =false;
      
    ngOnInit(){
        if(localStorage.getItem("token")?.length){
            this.sesionService.verifiedSession('home');
            this.openAndCloseCircleLoadingMenu();
        }
        else{
            this.sesionService.routeTo("/login")
        }
     }
    constructor(
        public sesionService:SesionService,
        public route:Router, public loginService:LoginService){ }

       
    
        public openAndCloseCircleLoadingMenu(){
            this.isLoadingMenu=true;
    
            timer(800).subscribe(()=>{
                this.isLoadingMenu=false;
            });
    
        }

        
    public getUser(){
       this.verified();
    }

   
    public verified(){
        if(this.user!='' && this.password!=''){

            this.loginService.signIn(this.user,this.password)
            
            .then((user)=>{
                //console.log(user.data);
//user.data[0]
                if(user.data[0]){
                    this.isLogged=true;

                    //generating token++
                    let newToken=Math.random() * 10000000 +"-"+ Math.sqrt(Math.random() * 10000000 ) + this.user.substring(3,5);

                    this.loginService.setToken(this.user,this.password,newToken.toString()).subscribe((e)=>{
                        
                        localStorage.setItem("token",newToken.toString())
                         
                   
                       setTimeout(() => {
                        this.route.navigate(['/home'])
                   }, 2000);
                        
                   });
                   
                    
                      

                     }
                     else{
                        this.isLogged=false;
                     }
                    }
                     )


                   
                }else{
                    this.isLogged=false;
                 
                }
            


            

            
             
           
        }
         


    }












    
 