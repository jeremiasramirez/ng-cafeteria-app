import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'], 

  providers: [
    SesionService,
    LoginService ,
    AccountService,
  ]
})
export class RecordComponent implements OnInit {


  constructor(public session:SesionService,
    public account:AccountService,
    public login:LoginService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")?.length){
      this.session.verifiedSession('record');
      // this.getAllCustomer();
    }else{
      this.session.routeTo("/login");
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
