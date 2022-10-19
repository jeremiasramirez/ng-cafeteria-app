import { Component, Input, OnInit } from '@angular/core'; 
import { AccountService } from 'src/app/services/account.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-menu-float',
  templateUrl: './menu-float.component.html',
  styleUrls: ['./menu-float.component.css'],
  providers:[
    SesionService ,
    AccountService
  ]
})
export class MenuFloatComponent implements OnInit {
  @Input('color') color:string='';
  public isAdmin:any = '';
  constructor(public account:AccountService, public session:SesionService) { }

  ngOnInit(): void {
   
    this.verifyIfIsAdmin();
  }

  public verifyIfIsAdmin(){
    let token:any=localStorage.getItem("token")?.toString();
    
    this.account.getUserByToken(token).subscribe((e)=>{
      this.isAdmin=e.response[0].tipoDeUsuario;   
    })
  }
  public to(route:string){
    this.session.routeTo(route);
  }

}
