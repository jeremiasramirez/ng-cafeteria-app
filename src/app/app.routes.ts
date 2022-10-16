import { Routes,RouterModule as RM} from "@angular/router";
import { CustomersComponent } from "./components/customers/components.component";

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
        path: 'customers',
        component: CustomersComponent
    }
]
export var ROUTES = RM.forRoot(ROUTEAPP);
