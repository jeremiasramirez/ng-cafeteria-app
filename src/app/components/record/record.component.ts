import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FacturationService } from 'src/app/services/facturacion.service';
import { LoginService } from 'src/app/services/login.service';
import { SesionService } from 'src/app/services/sesion.service';
import { read, utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'], 

  providers: [
    SesionService,
    LoginService ,
    AccountService,
    FacturationService
  ]
})
export class RecordComponent implements OnInit {

  public records:any[]=[];

  constructor(
    public facturation:FacturationService,
    public session:SesionService,
    public account:AccountService,
    public login:LoginService) { 


    
    }



  ngOnInit(): void {
    if(localStorage.getItem("token")?.length){
      this.session.verifiedSession('record');
      this.getAllFacturation();
    }else{
      this.session.routeTo("/login");
    }
  }

  public getAllFacturation(){

    this.facturation.getAllFacturations().subscribe((fact)=>{
      this.records=fact.response;
      console.log(this.records);
      
    });


  }
  public completed(id:number,status:string){
    this.facturation.updateFaturation(id,status).subscribe((ok)=>{
      this.getAllFacturation();
      
    })
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
interface RecordI {
  Nombre: string;
  Producto: string;
  Cantidad: string;
  Estado: string;
  Subtotal: string;
  Total: string;
}