import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMomentComponent } from './components/create-moment/create-moment.component';
import { MomentListComponent } from './components/moment-list/moment-list.component';


const routes: Routes = [
  {
    path: 'create-moment',
    component: CreateMomentComponent
  },
  {
    path: 'create-moment/:momentId',
    component: CreateMomentComponent
  },
  {
    path: 'moment-list',
    component: MomentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MomentsRoutingModule { }
