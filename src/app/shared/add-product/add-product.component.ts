import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  constructor(private modalRef: MatDialogRef<AddProductComponent>) {}

  closeDialog() {
    this.modalRef.close()
  }

}
