import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';


const routes: Routes = [
  { path: '',   redirectTo: 'user/landing', pathMatch: 'full' }
  ,{
    path: 'user',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'landing',
        loadChildren: () => import('./featured/landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./featured/user-management/user-management.module').then(m => m.UserManagementModule)
      },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
       {
        path: 'moments',
        loadChildren: () => import('./featured/moments/moments.module').then(m => m.MomentsModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./featured/error/error.module').then(m => m.ErrorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
