import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';
import { SesionService } from 'src/app/services/sesion.service';
 
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[
    SesionService,
    LoginService ,
    AccountService,
    EmployeeService
  ]
})
export class EmployeeComponent implements OnInit {
  public exist__window__add:boolean=false;
  public formName:string = '';
  public formEmail:string = ' ';
  public formState:string='Activo'
  public formUserType:string='';
  public formPass?:any;
 
  public formEditName:string = '';
  public formEditEmail:string = '';
  public formStateEdit:string='Activo'
  public formUserTypeEdit:string='';
  public formPassEdit?:string;
  public formEditId:number = 0;
  public exist__window__edit:boolean=false
  public employees:EmployeesI[]=[]
 
  // public lenAllCustomers:number=0;
  public dateStart:any = new Date().toString().substring(0,16);
  public isFormValidated:any='true';
  public existContainerEdit:boolean=false;
  
  public existMenuSelection:boolean=false;
  constructor( 
    public account:AccountService,
    public loginService:LoginService, 
    public serviceEmployee:EmployeeService,
    public sessionServices:SesionService) {  }

  ngOnInit(): void {
    this.sessionServices.verifiedSession('employee');
    this.getAccountByToken();

    this.getAllEmployees()
  }

  public getAccountByToken(){
        
    let token:any=localStorage.getItem("token")?.toString();
    
    this.account.getUserByToken(token)
    .subscribe((user)=>{
       
        if(user.response[0].tipoDeUsuario!="Admin"){
          this.sessionServices.routeTo('home');
          console.log(user.response[0]);
          
        }
         

    }) 

}

 

public getAllEmployees(){
    
  this.serviceEmployee.getAllEmployees()
  .subscribe((employee)=>{
    console.log(employee.response);
    
    this.employees=employee.response;
      
    // this.lenAllCustomers=Math.ceil(this.customers.length / 6) ;
  });

}






}


interface EmployeesI{
  nombre:string;
  cedula:string;
  tanda:string;
  fechaIngreso:string;
  estado:string;
  cargo:string;
  email:string;
 
}