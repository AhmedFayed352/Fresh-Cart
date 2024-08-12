import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    ChangeUserDataComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-left',
      closeButton: true,
      progressBar: true,
      progressAnimation: "increasing"
    })
  ]
})
export class SettingsModule { }
