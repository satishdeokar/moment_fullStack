import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentsRoutingModule } from './moments-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateMomentComponent } from './components/create-moment/create-moment.component';
import { MomentListComponent } from './components/moment-list/moment-list.component';


@NgModule({
  declarations: [CreateMomentComponent, MomentListComponent],
  imports: [
    CommonModule,
    MomentsRoutingModule,
    SharedModule
  ]
})
export class MomentsModule { }
