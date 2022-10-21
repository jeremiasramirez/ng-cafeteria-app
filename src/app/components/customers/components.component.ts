import { Component, OnChanges, OnInit } from '@angular/core';  
import { ClientsService } from 'src/app/services/clients.service';
import { CustomersService } from 'src/app/services/customers.service';
import { LoginService } from 'src/app/services/login.service';
import { SesionService } from 'src/app/services/sesion.service';
 
@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: [
    './customers.component.css' 
],
  providers:[
    SesionService,
    LoginService,
    CustomersService,
    ClientsService
  ]
})
export class CustomersComponent implements OnInit {

  public formName:string = '';
  public formEmail:string = '';
  public formEditName:string = '';
  public formEditEmail:string = '';
  public formEditId:number = 0;


  public dateStart:any = new Date().toString().substring(0,16);
  public isFormValidated:any='';
  public existContainerEdit:boolean=false;




  constructor(
    public clientsService:ClientsService,
    public customerService:CustomersService,
    public loginService:LoginService,
    public sessionServices:SesionService) { }
    public isCharginData:boolean=true;
    public customers:customerI[] = [];
    
  ngOnInit (): void {


    this.sessionServices.verifiedSession('customers');



    this.getAllCustomer();

 

  }

  public getAllCustomer(){
    
    
    this.clientsService.getAllClients()
    .subscribe((customer)=>{
      this.customers=customer.response;  
    });

  }


  public setNewCustomer(){
     
    if(this.formName.length>5 && this.formEmail.length>5){
      this.isFormValidated='true';
     
      this.clientsService.setClientes(this.formName,this.formEmail,this.dateStart)
      .subscribe((posted)=>{
        this.getAllCustomer();
        this.resetForm()
      });

    }else{
      this.isFormValidated='false';
    }

   


  }

  public resetForm(){
   this.formName=''
   this.formEmail=''
  }

  public getCustomerByClick(customer:customerI){
    this.existContainerEdit=true;


    this.formEditName=customer.nombre;
    this.formEditEmail=customer.email;
    this.formEditId=customer.id;

 
  }

  public updateCustomer(){
    this.clientsService.updateClient(this.formEditId,this.formEditName,this.formEditEmail,this.dateStart)
    .subscribe((e)=>{
      this.getAllCustomer();
      
    })
  }

  



  public addCustomer(){
     
    this.setNewCustomer()
    
  }
  

}

// interfaces

interface customerI{
  id:number,
  nombre:string,
  email:string,
  fechaRegistro:string,
  idUsuario:number
}