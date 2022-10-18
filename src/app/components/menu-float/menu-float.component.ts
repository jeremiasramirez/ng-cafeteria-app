import { Component, Input, OnInit } from '@angular/core'; 
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-menu-float',
  templateUrl: './menu-float.component.html',
  styleUrls: ['./menu-float.component.css'],
  providers:[
    SesionService  
  ]
})
export class MenuFloatComponent implements OnInit {
  @Input('color') color:string='';

  constructor(public session:SesionService) { }

  ngOnInit(): void {
  }
  public to(route:string){
    this.session.routeTo(route);
  }

}
