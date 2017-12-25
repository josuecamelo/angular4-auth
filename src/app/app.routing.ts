import {LoginComponent} from "./login/login.component";
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {ProductListComponent} from "./products/product-list/product-list.component";
import {AuthGuardRouterService} from "./services/auth-guard-router.service";

const appRoutes:Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    /*{
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuardRouterService]
    },*/
    {
        path: 'products/list',
        component: ProductListComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);

export default routing;