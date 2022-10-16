import { Injectable } from "@angular/core"
import axios from "axios";
import { ajax } from 'rxjs/ajax';

@Injectable()

export class LoginService {
    
      
   constructor(){
       
   }
   
   public setToken(email:string,pass:string,token:string){
      return ajax.post(`https://localhost:7279/login/setsessionkey?email=${email}&password=${pass}&token=${token}`);
   }

   public removeToken(newtoken:string){
      return ajax.post(`https://localhost:7279/login/removesessionkey?newtoken=${newtoken}`);
   }

  public getToken(){
      
  }

  public verifyToken(token:string){
   return ajax.get(`https://localhost:7279/login/verifysessionkey?token=${token}`)
  }

   public signIn(email:string,pass:string){
      return axios.get(`https://localhost:7279/login/sign?email=${email}&pass=${pass}`)

   }

   public verificationIfIsLogged(){
      
   }



}