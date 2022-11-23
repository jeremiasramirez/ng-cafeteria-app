import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { MenusService } from 'src/app/services/menus.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
  providers: [
    SesionService,
    LoginService ,
    AccountService,
    MenusService
  ]
})
export class MenusComponent implements OnInit {

  public allCategory:categoryI[] = [];
  public allArticles:articlesI[] = []
  public existsSelectionActions:boolean=false;


  constructor(
    public menus:MenusService,
    public session:SesionService,
    public account:AccountService,
    public login:LoginService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")?.length){
      this.session.verifiedSession('menus');
      this.getAllCategory();
      this.getAllArticles()
    }else{
      this.session.routeTo("/login");
    }
  }

  //all category
  public getAllCategory(){
    this.menus.getAllCategories()
    .subscribe((category)=>{

      console.log(category.response);
      this.allCategory=category.response;  
  
    });
  }

  
  //all articles
  public getAllArticles(){
    this.menus.getAllArticles()
    .subscribe((article)=>{

      console.log(article.response);
      this.allArticles=article.response;  
  
    });
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





interface categoryI{
  id:number;
  nombre:string;
}

interface articlesI{
  cantidad:number;
  id:number;
  idCategoria:number;
  nombre:string;
  precio:number;
}