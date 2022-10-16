import { Component, OnChanges, OnInit } from '@angular/core'; 
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
    LoginService
  ]
})
export class CustomersComponent implements OnInit {

  constructor(
    public loginService:LoginService,
    public sessionServices:SesionService) { }

    
  ngOnInit (): void {
    this.sessionServices.verifiedSession('customers');
  }

}
