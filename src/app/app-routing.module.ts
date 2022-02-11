import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/guards/auth-guard.guard';
import { IsLoggedInGuard } from './auth/guards/is-logged-in.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    component: HomeComponent, path: 'home', canActivate: [AuthGuard]
  },
  {
    component: LoginComponent, path: 'login', canActivate: [IsLoggedInGuard]
  },
  {
    component: ProfileComponent, path: 'profile', canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
