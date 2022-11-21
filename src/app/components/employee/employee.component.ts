import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
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
  public formState:string=''
  public formUserType:string='';
  public formEmployeeCedula:string='';
  public formEditEmployeeCedula:string=''
  public formEditEmployeeTanda:string=''
  public formEditEmployeeCargo:string=''
  public formEditEmployeeDatepost:string=''
  public formEditEmployeeState:string=''
  public formEditEmployeeId?:any
  public formEmployeeTanda:string='';
  public formEmployeeCargo:string='';
  public formEmployeeDatePost:string = new Date().toString().substring(0,16);
  public formPass?:any;
  public isActiveShowEmployee:boolean=false;
 
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


  constructor(public account:AccountService,public loginService:LoginService,public serviceEmployee:EmployeeService,
    public sessionServices:SesionService) {  }


  ngOnInit(): void {
    if(localStorage.getItem("token")?.length){
      this.sessionServices.verifiedSession('employee');
      this.getAccountByToken();
      this.getAllEmployees()
    }
    else{
      this.sessionServices.routeTo("/login")
    }
  }

  public passInfoToUpdateForm(employe:EmployeesI){
    // this.exist__window__edit=true
    // this.openAndCloseMenuSelection()
    // id:number,name:string,email:string,cedula:string,
    // tanda:string,state:string,cargo:string
    // changing data
    this.formEditEmployeeId=employe.id;
     this.formEditName=employe.nombre;
     this.formEditEmail=employe.emails; 
     this.formEditEmployeeCedula=employe.cedula;
     this.formEditEmployeeTanda=employe.tanda;
     this.formStateEdit=employe.estado;
     this.formEditEmployeeCargo=employe.cargo;
    this.formEmployeeDatePost=employe.fechaIngreso;
     console.log(employe);
   
  }

  public openAndCloseMenuSelection(){
    this.exist__window__edit=true
    
    timer(1).subscribe(()=>this.existMenuSelection=false)
  }

  public openCardEmployee(employe:EmployeesI){
    this.existMenuSelection=true
    this.exist__window__edit=false
     
    this.passInfoToUpdateForm(employe);
  }



  public updateEmployee(){
     
   
     
    // if(this.formName.length &&  this.formEmployeeCedula.length&&  this.formEmployeeTanda.length &&
    //   this.formEmployeeDatePost.length && this.formState.length && this.formEmployeeCargo.length && this.formEmail.length ){
      if(
        this.formEditEmployeeId && this.formEditName&& this.formEditEmployeeCedula&&this.formEditEmployeeTanda&&
        this.formEmployeeDatePost && this.formStateEdit &&
        this.formEditEmployeeCargo&&this.formEditEmail
      ){ 
      this.serviceEmployee.updateEmployee(this.formEditEmployeeId, this.formEditName, this.formEditEmployeeCedula,this.formEditEmployeeTanda,
        this.formEmployeeDatePost, this.formStateEdit,
        this.formEditEmployeeCargo,this.formEditEmail)
       .subscribe((user)=>{
        this.getAllEmployees()
        this.exist__window__edit=false
       })

    }
    else{
    
      this.isFormValidated='false'
      
    }
  }


  public deleteEmployee(){
   
    
      
      this.serviceEmployee.removeEmploye(this.formEditEmployeeId)
       .subscribe((user)=>{
        this.existMenuSelection=false
        this.getAllEmployees();
       })
    }
    
 



  public postEmployee(){
    
    
    
    if(this.formName.length &&  this.formEmployeeCedula.length&&  this.formEmployeeTanda.length &&
       this.formEmployeeDatePost.length && this.formState.length && this.formEmployeeCargo.length &&
      this.formEmail.length
      ){
      
      this.serviceEmployee.postEmployee(this.formName, this.formEmployeeCedula,
        this.formEmployeeTanda,this.formEmployeeDatePost,this.formState,this.formEmployeeCargo, this.formEmail)
       .subscribe(( )=>{  
        this.getAllEmployees()
        this.isFormValidated='true'
        this.exist__window__add=false
       })

    }
    else{ 
      this.activatedAndDisableErrorMsj() 
    }
  }
  
  public activatedAndDisableErrorMsj(){
    this.isFormValidated='false'
    timer(3000).subscribe(()=>{
      this.isFormValidated='true'
    })
  }

  public activatedAndDisableSelection(){
    this.isActiveShowEmployee=true;
    timer(3).subscribe(()=>{
      this.existMenuSelection=false
    })
  }


  public getAccountByToken(){
        
    let token:any=localStorage.getItem("token")?.toString();
    
    this.account.getUserByToken(token)
    .subscribe((user)=>{
       
        if(user.response[0].tipoDeUsuario!="Admin"){
          this.sessionServices.routeTo('home');
          // console.log(user.response[0]);
          
        }
         

    }) 

}

 

public getAllEmployees(){
    
  this.serviceEmployee.getAllEmployees()
  .subscribe((employee)=>{
    // console.log(employee.response);
    
    this.employees=employee.response;
      
    // this.lenAllCustomers=Math.ceil(this.customers.length / 6) ;
  });

}






}


interface EmployeesI{
  id:number;
  nombre:string;
  cedula:string;
  tanda:string;
  fechaIngreso:string;
  estado:string;
  cargo:string;
  email:string;
  emails:string;
 
}