import { Injectable } from "@angular/core" 
import { ajax } from 'rxjs/ajax';
 
@Injectable()

export class MenusService {
    
      
   constructor(){  }
 
   public getAllCategories(){
      return ajax.get(`https://localhost:7279/menus/allcategory`)
   }

   public postCategory(name:string ){ 
       return ajax.post(`https://localhost:7279/menus/newcategory?name=${name}`)
   }







   
//  //
//    public updateEmployee(id:number, name:string,cedula:string,  tanda:string, datepost:string,state:string,cargo:string,email:string){
//      return ajax.post(`https://localhost:7279/employee/update?id=${id}&name=${name}&cedula=${cedula}&tanda=${tanda}&datepost=${datepost}&state=${state}&cargo=${cargo}&email=${email}`)
//    }
 
//    public removeEmploye(id:number){
//      return ajax.post(`https://localhost:7279/employee/delete?id=${id}`)
//    }


}