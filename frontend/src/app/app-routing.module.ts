import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/guards/auth.guard';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: "",  redirectTo:'login', pathMatch:'full'},
  { path: "login", component: LoginComponent},
  { path: "tasks", component: TaskComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
