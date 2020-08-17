import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/dashboard/list/list.component';
import { RegisterComponent } from './components/dashboard/register/register.component';



const routes: Routes = [
  { path: '', redirectTo: "auth", pathMatch: "full" },
  {path: 'auth', component: AuthComponent},
  { path: 'dashboard', component: DashboardComponent,
    children: [
              { path: 'register', component: RegisterComponent },
              { path: 'list', component: ListComponent }
  ]

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
