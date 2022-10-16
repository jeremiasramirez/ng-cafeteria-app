import { Injectable } from "@angular/core" 
import { ajax } from 'rxjs/ajax';

@Injectable()

export class AccountService {
    
      
   constructor(){
       
   }


   public getUserByToken(token:string){
    return ajax.get(`https://localhost:7279/login/getbytoken?token=${token}`)
   }
   


}