import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CustomFilterPopupComponent } from './custom-filter-popup/custom-filter-popup.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfirmationPopupComponent,
    AddProductComponent,
    CustomFilterPopupComponent,
    EmployeeProfileComponent,
    ImagePreviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
