import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';
import { SesionService } from 'src/app/services/sesion.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] ,
  providers:[
    SesionService,
    LoginService,
    AccountService,
    UsersService,
    EmployeeService
  ]
})
export class UsersComponent implements OnInit {
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

 
  // public lenAllCustomers:number=0;
  public dateStart:any = new Date().toString().substring(0,16);
  public isFormValidated:any='true';
  public existContainerEdit:boolean=false;
  public users:usersI[]=[]
  public employees:EmployeesI[]=[];
  public existMenuSelection:boolean=false;

  // public startPage:number=0;
  // public nextPage:number=6;
  // public resultOfTableStart:number=1;


  
  constructor(
    public account:AccountService,
    public loginService:LoginService,
    public usersService:UsersService,
    public employeeService:EmployeeService,
    public sessionServices:SesionService) {

   
     }

    
  ngOnInit (): void {
    this.sessionServices.verifiedSession('users');
    this.getAccountByToken();
    this.getAllUsers()

    this.changeAllEmployeesInSelectCall();
  }

  public addFromEmployee(){
 

   var finded= this.employees.filter((emp)=> emp.emails == this.formEmail );
     
   
    if(finded.length){
      if(finded[0].estado=='Activo'){
        this.formName=finded[0].nombre;
        
      }
    }
    
    
  }
  public changeAllEmployeesInSelectCall(){
    this.changeAllEmployeesInSelect().subscribe((response)=>{
      response.response.forEach((emp:EmployeesI)=>{
        if(emp.estado=='Activo'){
          this.employees=response.response;
        }
      })
    })
  }
  public changeAllEmployeesInSelect(){
    return this.employeeService.getAllEmployees()
  }
 
  
  public searchUser(data:string){
    let filtered=this.users.filter((element)=>{
      return element.email.toLowerCase().includes(data);
    })

    if(filtered.length==0 || data.length==0) this.getAllUsers();
    this.users=filtered;
    
    
  }
 
  public updateUser(){
     
   
     
    if(this.formEditName.length && this.formEditEmail.length && this.formState.length && this.formUserTypeEdit.length && this.formPassEdit?.length){
      
      this.usersService.updateUser(this.formEditId, this.formEditName,this.formEditEmail,this.formUserTypeEdit,this.formStateEdit,this.formPassEdit,'0')
       .subscribe((user)=>{
        
        this.getAllUsers()
       
        this.exist__window__edit=false


       })

    }
    else{
    
      this.isFormValidated='false'
      
    }
  }



  public postUser(){
    
   
    if(this.formName != '' && this.formEmail != '' && this.formState && this.formUserType && this.formPass){
      
      this.usersService.postUser(this.formName,this.formEmail,this.formUserType,this.formState,this.formPass,'0')
       .subscribe(( )=>{  
        this.getAllUsers()
        this.isFormValidated='true'
        this.exist__window__add=false
       })

    }
    else{
    
      this.isFormValidated='false'
      
    }
  }
  


  public deleteUser(){
   
    if(this.formEditId !=null, this.formEditName != '' && this.formEditEmail != '' && this.formState && this.formUserTypeEdit && this.formPassEdit ){
      
      this.usersService.removeUser(this.formEditId)
       .subscribe((user)=>{
        this.existMenuSelection=false
        this.getAllUsers();
       })
    }
    else{
      this.isFormValidated='false'
    }

  }
  
  
 
 
  public getAllUsers(){
    
    this.usersService.getAllUsers()
    .subscribe((user)=>{
      // console.log(user.response);
      
      this.users=user.response;  
      // this.lenAllCustomers=Math.ceil(this.customers.length / 6) ;
    });

  }

  public openCardUser(user:usersI){
    this.existMenuSelection=true
    this.exist__window__edit=false
     
    this.passInfoToUpdateForm(user.id,user.nombre,user.email,user.estado,user.tipoDeUsuario,user.clave);
  }

 

  public passInfoToUpdateForm(id:any,name:string,email:string,state:string,userType:string,pass:string){
    // this.exist__window__edit=true
    // this.openAndCloseMenuSelection()
    
    // changing data
    this.formEditId=id;
     this.formEditName=name;
     this.formEditEmail=email;
     this.formStateEdit=state;
     this.formUserTypeEdit=userType;
     this.formPassEdit=pass;

  }

  public openAndCloseMenuSelection(){
    this.exist__window__edit=true
    
    timer(1).subscribe(()=>this.existMenuSelection=false)
  }


  public getAccountByToken(){
        
    let token:any=localStorage.getItem("token")?.toString();
    
    this.account.getUserByToken(token)
    .subscribe((user)=>{
       
        if(user.response[0].tipoDeUsuario!="Admin"){
          this.sessionServices.routeTo('home');
        }
         

    }) 

}

}

interface usersI{
   clave:string;
   email:string;
   estado:string;
   id:string;
   nombre:string;
   sessionKey:string;
   tipoDeUsuario:string;
}
interface EmployeesI{
  nombre:string;
  cedula:string;
  tanda:string;
  fechaIngreso:string;
  estado:string;
  cargo:string;
 email:string;
 emails:string;
}