import { Component, OnChanges, OnInit } from '@angular/core'; 
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
    CustomersService
  ]
})
export class CustomersComponent implements OnInit {

  public formName:string = '';
  public formEmail:string = '';
  public dateStart:any = new Date().toString().substring(0,16);
  
  
  constructor(
    public customerService:CustomersService,
    public loginService:LoginService,
    public sessionServices:SesionService) { }
    public isCharginData:boolean=true;
    public customers:any[] = [];
    
  ngOnInit (): void {
    this.sessionServices.verifiedSession('customers');

    setTimeout(()=>{
      this.customers= [
        {id:1,name:'Jeremias ramirez', email:'jeremias@gmail.com',date:'tue 9 2022'},
        {id:2,name:'Alexio m', email:'alexiom@gmail.com',date:'tue 22 2022'}
      ]
      this.isCharginData=false
    },1000)
  }

  public getCustomerByClick(customer:customerI){
    console.log(customer)
  }

  public addCustomer(){
     
    this.customers.splice(0,0,{id:2,name:'Alexio m', email:'alexiom@gmail.com',date:'fri 4 2021'})
    
  }
  

}

// interfaces

interface customerI{
  id:number,
  name:string,
  email:string,
  date:string
}