import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path: "",  redirectTo:'login', pathMatch:'full'},
  { path: "**",  redirectTo:'login', pathMatch:'full'},
  { path: "login", component: LoginComponent},
  { path: "tasks", component: TaskComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
