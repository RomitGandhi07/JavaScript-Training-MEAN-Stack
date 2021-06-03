import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { ViewProductComponent } from './view-product/view-product.component';
import {NotFoundComponent} from './not-found/not-found.component'

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent, canActivate: [NotLoggedInGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  {path: 'signup', component: RegisterComponent, canActivate: [LoggedInGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [NotLoggedInGuard]},
  {path: 'products/add', component: AddProductComponent, canActivate: [NotLoggedInGuard]},
  {path: 'products/:id', component: ViewProductComponent, canActivate: [NotLoggedInGuard]},
  {path: 'products/:id/edit', component: EditProductComponent, canActivate: [NotLoggedInGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
