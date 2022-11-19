import { Injectable } from "@angular/core" 
import { ajax } from 'rxjs/ajax';
 
@Injectable()

export class EmployeeService {
    
      
   constructor(){  }
 
   public getAllEmployees(){
      return ajax.get(`https://localhost:7279/employee/all`)
   }

   public postEmployee(name:string,cedula:string,  tanda:string, datepost:string,state:string,cargo:string,email:string){ 
      return ajax.post(`https://localhost:7279/employee/new?name=${name}&cedula=${cedula}&tanda=${tanda}&datepost=${datepost}&state=${state}&cargo=${cargo}&email=${email}`)
   }
 
   public updateEmployee(id:number, name:string,cedula:string,  tanda:string, datepost:string,state:string,cargo:string,email:string){
     return ajax.post(`https://localhost:7279/employee/update?id=${id}&name=${name}&cedula=${cedula}&tanda=${tanda}&datepost=${datepost}&state=${state}&cargo=${cargo}&email=${email}`)
   }

  
   
//    public removeUser(id:number){
//      return ajax.post(`https://localhost:7279/users/delete?id=${id}`)
//    }


}