import { Component, OnInit } from '@angular/core';  
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { FacturationService } from 'src/app/services/facturacion.service';
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
    FacturationService
  ]
}) 
export class SalesComponent implements OnInit {

  public existLoading:boolean=false;
  public clientSelected?:any;
  public productSelected:string="Seleccione";
  public cuantity:number = 1;
  public allArticlesFromMenu:articlesI[] = []
  public priceForArticleSelected:number=1;
  public subtotal:number=1;
  public total:number=1;

  constructor(
    
    public session:SesionService,
    public account:AccountService,
    public facturation:FacturationService,
    public login:LoginService) { 
      // console.log(localStorage.getItem("nameclient"));
      this.clientSelected=localStorage.getItem("nameclient")
    }

  ngOnInit(): void {
    if(localStorage.getItem("token")?.length){
      this.session.verifiedSession('sales/');
      this.getAllArticles();
    }else{
      this.session.routeTo("/login");
    }
  }

  public calculatePrice(price:number,cuantity:number){
    this.subtotal=price * cuantity;
  }

  
  public searchArticle(data:string){
    let filtered=this.allArticlesFromMenu.filter((element)=>{
      return element.nombre.toLowerCase().includes(data);
    })

    if(filtered.length==0 || data.length==0) this.getAllArticles();
    this.allArticlesFromMenu=filtered;
    
    
  }
  
  public setNewSale(){
    
    
    //loading,porq ya se realizo la venta
    this.total=(this.subtotal * this.cuantity) * 1.18;
    this.subtotal=(this.subtotal * this.cuantity);
    this.facturation.setNewSale(this.clientSelected,this.productSelected,this.cuantity,
      this.subtotal,this.total,'p').subscribe((ok)=>{
        this.existLoading=true;
        
        console.log("insertado");
        timer(1400).subscribe(()=>{
          this.existLoading=false;
          this.session.routeTo('record');
        })
        

    })
  }
  public getAllArticles(){

    this.facturation.getAllArticles().subscribe((data)=>{
      this.allArticlesFromMenu=data.response;
      console.log(this.allArticlesFromMenu);
      
    })


  }

  public incrementCuantity(){
    this.cuantity+=1;
    // this.calculatePrice(this.priceForArticleSelected,this.cuantity)
  }

  public decrementCuantity(){
    if(this.cuantity>1){
      this.cuantity-=1;
      // this.calculatePrice(this.priceForArticleSelected,this.cuantity)
    }
  }


  public pay(){
    console.log('Paying');
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

interface articlesI{
  cantidad:number;
  id:number;
  idCategoria:number;
  nombre:string;
  precio:number;
}