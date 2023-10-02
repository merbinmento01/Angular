import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from 'src/app/shared/add-product/add-product.component';
import { CustomFilterPopupComponent } from 'src/app/shared/custom-filter-popup/custom-filter-popup.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  constructor(private modal: MatDialog) {}

  openCustomFIlter() {
    this.modal.open(CustomFilterPopupComponent, {
      minWidth: '30vw',
      width: '80vw',
      height: '45vw',
      panelClass: 'custom-filter'
    })
  }

  openAddNewProduct() {
    this.modal.open(AddProductComponent, {
      minWidth: '30vw',
      width: '80vw',
      height: '45vw',
      panelClass: 'add-product'
    })
  }

}
