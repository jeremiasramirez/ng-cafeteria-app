import { Routes,RouterModule as RM} from "@angular/router";
import { CustomersComponent } from "./components/customers/components.component";
import { EmployeeComponent } from "./components/employee/employee.component";

//components
import { HomeComponent } from "./components/home/home.component";

import { LoginComponent } from "./components/login/login.component";
import { MenusComponent } from "./components/menus/menus.component";
import { RecordComponent } from "./components/record/record.component";
import { SalesComponent } from "./components/sales/sales.component";
import { StartComponent } from "./components/start/start.component";
import { UsersComponent } from "./components/users/users.component";
 

const ROUTEAPP :Routes=[
     {
        path: '',
        component: StartComponent
    },
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
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'employee',
        component: EmployeeComponent
    },
    {
        path: 'sales',
        component: SalesComponent
    },
    {
        path: 'menus',
        component: MenusComponent
    },
    {
        path: 'record',
        component: RecordComponent
    },
    {
        path: '**',
        component: StartComponent
    },
]
export var ROUTES = RM.forRoot(ROUTEAPP);
