import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { AddProductComponent } from 'src/app/shared/add-product/add-product.component';
import { ConfirmationPopupComponent } from 'src/app/shared/confirmation-popup/confirmation-popup.component';
import { CustomFilterPopupComponent } from 'src/app/shared/custom-filter-popup/custom-filter-popup.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Output() onProductChange = new EventEmitter();
  productData: any[] = [];
  cols: any[] = [];
  selectedProduct: any;
  filterText: any;
  filteredData: any[] = [];
  constructor(private modal: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'Product_Name', header: 'Product Name' },
      { field: 'Product_Cost', header: 'Cost' },
      { field: 'Product_Sale_Price', header: 'Sale Price' },
      { field: 'Product_Retail_Price', header: 'Retail Price' },
      { field: 'Product_Current_Inventory', header: 'Inventory' },
      { field: 'Product_Manufacturing', header: 'Manufacturing' },
      { field: 'Product_Backorder', header: 'Backorder' },
    ];
    this.getProductsData();
    this.filteredData = this.productData;
  }
  filterData() {
    this.filteredData = this.productData.filter((item) => {
      return item.Product_Name.toLowerCase().includes(
        this.filterText.toLowerCase()
      );
    });
  }
  getProductsData() {
    this.dataService.getProductData().subscribe((res) => {
      this.productData = res.ProductData;
      this.selectedProduct = this.productData[0];
      this.onRowSelect(this.selectedProduct);
      console.log('productData', this.productData);
    });
  }

  onRowSelect(event: any) {
    this.selectedProduct = event;
    this.emitSelectedProduct();
  }

  emitSelectedProduct() {
    this.onProductChange.emit(this.selectedProduct);
  }

  openCustomFIlter() {
    this.modal.open(CustomFilterPopupComponent, {
      minWidth: '30vw',
      width: '80vw',
      height: '45vw',
      panelClass: 'custom-filter',
    });
  }

  openAddNewProduct() {
    this.modal.open(AddProductComponent, {
      minWidth: '30vw',
      width: '80vw',
      height: '45vw',
      panelClass: 'add-product',
    });
  }
  confirmationProduct() {
    this.modal.open(ConfirmationPopupComponent, {
      minWidth: '30vw',
      width: '20vw',
      height: '10vw',
      panelClass: 'confirmation-product',
    });
  }
}
