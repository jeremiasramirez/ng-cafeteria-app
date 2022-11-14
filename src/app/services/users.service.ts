import { Injectable } from "@angular/core" 
import { ajax } from 'rxjs/ajax';

@Injectable()

export class UsersService {
    
      
   constructor(){  }


   public getAllUsers(){
      return ajax.get(`https://localhost:7279/users/all`)
   }

   public postUser(name:string,email:string,usertype:string,state:string,clave:string,sesionkey:string){ 
      return ajax.post(`https://localhost:7279/users/new?name=${name}&usertype=${usertype}&state=${state}&clave=${clave}&sessionkey=${sesionkey}&email=${email}`)
   }

   public updateUser(id:number,name:string,email:string,date:string){
     return ajax.post(`https://localhost:7279/clientes/update?id=${id}&name=${name}&email=${email}&date=${date}`)
   }
   
   public removeUser(id:number){
     return ajax.post(`https://localhost:7279/clientes/delete?id=${id}`)
   }


}