import { Routes,RouterModule as RM} from "@angular/router";

//components
import { HomeComponent } from "./components/home/home.component";

import { LoginComponent } from "./components/login/login.component";
import { StartComponent } from "./components/start/start.component";
 

const ROUTEAPP :Routes=[
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'home/:category',
        component: HomeComponent
    }
]
export var ROUTES = RM.forRoot(ROUTEAPP);
