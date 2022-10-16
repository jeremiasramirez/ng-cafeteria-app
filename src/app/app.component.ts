import { Component } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
 
  ]
})
export class AppComponent  {
  public showTheme={
    show:true
  }
  public themeName ={
    menu: "menu--blue-dark",
    theme: "theme--blue-dark"
  }
  public bodys=document.getElementById("body");
  public classNew = "themeActived"
   
 
  constructor( ){
    
    this.validateTheme()
  }
  ngOnInit(){
   // this.feature.change("Covid control")
  }



  public validateTheme(){
 
    if (localStorage.getItem("theme")){
      this.themeName.menu="menu--black"
      this.themeName.theme= "theme--black"
    //  this.bodys.classList.add(this.classNew)
    }
    else{
     
      this.themeName.menu="menu--blue-dark"
      this.themeName.theme= "theme--blue-dark"
   //   this.bodys.classList.remove(this.classNew)
    }

  }
  public activeTheme(){
    
      
    if(this.showTheme.show){
      this.showTheme.show=false
    }
    else{
      this.showTheme.show=true
    }
    
    

  }
  public clearTheme(){
    localStorage.removeItem("theme")
    this.validateTheme()
    this.showTheme.show=true
  }
   
 
  public darkTheme(){
 


    if (!localStorage.getItem("theme")){
      localStorage.setItem("theme", "actived")
      this.themeName.menu="menu--black"
      this.themeName.theme= "theme--black"
     // this.bodys.classList.add(this.classNew)
      this.validateTheme()
      this.showTheme.show=true
     


    }

  }
 
   

} 
