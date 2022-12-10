import { Injectable } from "@angular/core" 
import { ajax } from 'rxjs/ajax';

@Injectable()

export class FacturationService {
    
      
   constructor(){}


   public getAllFacturations(){
     return ajax.get(`https://localhost:7279/facturation/all`)
   }

   public setNewSale(name:string,product:string,quantity:number,subtotal:number,total:number,status:string){
     return ajax.post(`https://localhost:7279/facturation/new?name=${name}&productname=${product}&cantidad=${quantity}&subtotal=${subtotal}&total=${total}&estado=${status}`)
   }

   public updateFaturation(id:number,status:string ){
    return ajax.post(`https://localhost:7279/facturation/update?id=${id}&status=${status}`)
  }


   public getAllArticles(){
     return ajax.get(`https://localhost:7279/menus/allarticle`)
   }

   public setFacturation(name:string,email:string,date:string){
     return ajax.post(`https://localhost:7279/clientes/new?name=${name}&email=${email}&date=${date}`)
   }

   


}