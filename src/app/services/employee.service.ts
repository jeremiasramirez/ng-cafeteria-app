import { Injectable } from "@angular/core" 
import { ajax } from 'rxjs/ajax';
 
@Injectable()

export class EmployeeService {
    
      
   constructor(){  }
 
   public getAllEmployees(){
      return ajax.get(`https://localhost:7279/employee/all`)
   }

//    public postUser(name:string,email:string,usertype:string,state:string,clave:string,sesionkey:string){ 
//       return ajax.post(`https://localhost:7279/users/new?name=${name}&usertype=${usertype}&state=${state}&clave=${clave}&sessionkey=${sesionkey}&email=${email}`)
//    }
 
//    public updateUser(id:number,name:string,email:string,usertype:string,state:string,clave:any,sesionkey:string){
//      return ajax.post(`https://localhost:7279/users/update?id=${id}&name=${name}&usertype=${usertype}&state=${state}&clave=${clave}&sessionkey=${sesionkey}&email=${email}`)
//    }

  
   
//    public removeUser(id:number){
//      return ajax.post(`https://localhost:7279/users/delete?id=${id}`)
//    }


}