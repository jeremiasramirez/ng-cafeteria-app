import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers:[
    SesionService,
    LoginService
  ]
})
export class StartComponent   {
  public images:any[] = [];
  public allImages:any[] = []
  public isLoading:boolean=false;

  public currentImage:number=0;


  constructor(
    public loginS:LoginService,
    public session:SesionService) { 
    this.setToImages();
  }

  public setToImages(){
    this.images=[
      { id: 1,  name:'../../../assets/imgs/slide/image1.jpg' },
      {  id: 2,  name:'../../../assets/imgs/slide/image2.jpg' },
      {  id: 3, name:'../../../assets/imgs/slide/image3.jpg' }
    ]
  }


   public nextImage(){
    let lenImgs = this.images.length-1;
      if(this.currentImage<lenImgs){
        this.currentImage+=1
      }
      else{
        this.currentImage=0
      }
    
   }


   public backImage(){
    let lenImgs = this.images.length-1;
      if(this.currentImage>0){
        this.currentImage-=1
      }
      else{
        this.currentImage=lenImgs
      }
    
   }


   public continue(){
    this.isLoading=true;

    timer(1200).subscribe(()=>{
      this.session.routeTo('login')
    });

   }
  

}
