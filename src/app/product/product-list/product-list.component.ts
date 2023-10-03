import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { AddProductComponent } from 'src/app/shared/add-product/add-product.component';
import { CustomFilterPopupComponent } from 'src/app/shared/custom-filter-popup/custom-filter-popup.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Output() onProductChange = new EventEmitter();
  productData: any[] = [];
  selectedProduct: any;

  constructor(private modal: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData() {
    this.dataService.getProductData().subscribe((res) => {
      this.productData = res;
      this.selectedProduct = this.productData[0];
      this.emitSelectedProduct();
      console.log('productData', this.productData);
    })
  }

  emitSelectedProduct() {
    this.onProductChange.emit(this.selectedProduct);
  }

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
