import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfirmationPopupComponent,
    AddProductComponent,
    EmployeeProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
