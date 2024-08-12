import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';

const routes: Routes = [
  { path: "" , redirectTo: "change-password" , pathMatch: "full" },
  { path: "change-password", component: ChangePasswordComponent },
  { path: "change-user-data", component: ChangeUserDataComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
