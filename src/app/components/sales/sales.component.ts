import { Component, OnInit } from '@angular/core';  
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ["../../bootstrap/boostrap.css",'./sales.component.css'],
  providers: [
    SesionService,
    LoginService ,
    AccountService,
  ]
}) 
export class SalesComponent implements OnInit {

  public clientSelected?:any;
  public productSelected?:string;
  public cuantity:number = 1;


  constructor(
    
    public session:SesionService,
    public account:AccountService,
    public login:LoginService) { 
  console.log(localStorage.getItem("nameclient"));
      this.clientSelected=localStorage.getItem("nameclient")
    }

  ngOnInit(): void {
    if(localStorage.getItem("token")?.length){
      this.session.verifiedSession('sales/');
      // this.getAllCustomer();
    }else{
      this.session.routeTo("/login");
    }
  }

  public incrementCuantity(){
    this.cuantity+=1;
  }

  public decrementCuantity(){
    if(this.cuantity>1){
      this.cuantity-=1;
    }
  }

  public getAccountByToken(){
        
    let token:any=localStorage.getItem("token")?.toString();
    
    this.account.getUserByToken(token)
    .subscribe((user)=>{
       
        if(user.response[0].tipoDeUsuario!="Admin"){
          this.session.routeTo('home');
        }
         

    }) 

}

}
