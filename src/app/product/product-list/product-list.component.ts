import { Component, OnInit } from '@angular/core';
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

  productData: any[] = [];

  constructor(private modal: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData() {
    this.dataService.getProductData().subscribe((res) => {
      this.productData = res;
      console.log('productData', this.productData);
      
    })
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
