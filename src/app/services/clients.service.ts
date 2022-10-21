import { Injectable } from "@angular/core" 
import { ajax } from 'rxjs/ajax';

@Injectable()

export class ClientsService {
    
      
   constructor(){  }


   public getAllClients(){
        return ajax.get(`https://localhost:7279/clientes/all`)
   }

   public setClientes(name:string,email:string,date:string){
        return ajax.post(`https://localhost:7279/clientes/new?name=${name}&email=${email}&date=${date}`)
   }

   public updateClient(id:number,name:string,email:string,date:string){
     return ajax.post(`https://localhost:7279/clientes/update?id=${id}&name=${name}&email=${email}&date=${date}`)
   }
   
   public removeClient(id:number){
     return ajax.post(`https://localhost:7279/clientes/delete?id=${id}`)
   }


}