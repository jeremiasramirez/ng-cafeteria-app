import { Component, OnChanges, OnInit } from '@angular/core';  
import { timer } from 'rxjs';
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

  public lenAllCustomers:number=0;
  public dateStart:any = new Date().toString().substring(0,16);
  public isFormValidated:any='';
  public existContainerEdit:boolean=false;
  public existWindowAddClient:boolean=false;
  public startPage:number=0;
  public nextPage:number=6;
  public resultOfTableStart:number=1;

  constructor(
    public clientsService:ClientsService,
    public customerService:CustomersService,
    public loginService:LoginService,
    public sessionServices:SesionService) { }
    public isCharginData:boolean=true;
    public customers:customerI[] = [];
    
  ngOnInit (): void {
   
    if(localStorage.getItem("token")?.length){
      this.sessionServices.verifiedSession('customers');
      this.getAllCustomer();
    }else{
      this.sessionServices.routeTo("/login");
    }
    
  }

  public getAllCustomer(){
    
    this.clientsService.getAllClients()
    .subscribe((customer)=>{
      this.customers=customer.response;  
      this.lenAllCustomers=Math.ceil(this.customers.length / 6) ;
    });

  }


  public setNewCustomer(){
     
    if(this.formName.length>5 && this.formEmail.length>5){
      this.isFormValidated='true';
     
      this.clientsService.setClientes(this.formName,this.formEmail,this.dateStart)
      .subscribe((posted)=>{
        this.getAllCustomer();
        this.resetForm()
        this.existWindowAddClient=false
      });

    }else{
      this.isFormValidated='false';
      timer(3000).subscribe(()=>{
        this.isFormValidated='true';
      })
    }

   
  }

  public resetForm(){
   this.formName=''
   this.formEmail=''
  }

  public searchCustomer(data:string){
    let filtered=this.customers.filter((element)=>{
      return element.email.toLowerCase().includes(data);
    })

    if(filtered.length==0 || data.length==0) this.getAllCustomer();
    else this.customers=filtered;
    
    
  }

  public getCustomerByClick(customer:customerI){
    this.existContainerEdit=true;


    this.formEditName=customer.nombre;
    this.formEditEmail=customer.email;
    this.formEditId=customer.id;

 
  }


  public deleteCustomer(){
    this.clientsService.removeClient(this.formEditId)
    .subscribe((ok)=>{
      this.getAllCustomer();
      this.existContainerEdit=false;
    })
  }


  public updateCustomer(){
    this.clientsService.updateClient(this.formEditId,this.formEditName,this.formEditEmail,this.dateStart)
    .subscribe((e)=>{
      this.getAllCustomer();
      this.existContainerEdit=false
      
    })
  }

  



  public addCustomer(){
    this.setNewCustomer()
  }

  public backSlidePage(){
    
    if(this.startPage>this.lenAllCustomers){
      this.startPage-=6
      this.resultOfTableStart-=1;
      this.nextPage-=6
    } 


  }
  public nextSliedPage(){


    if(this.resultOfTableStart<this.lenAllCustomers){
      this.startPage+=6
      this.resultOfTableStart+=1;
      this.nextPage+=6
    }
    else{
      this.startPage=0
      this.resultOfTableStart=1;
      this.nextPage=6
    }


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