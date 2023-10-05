import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { AddProductComponent } from 'src/app/shared/add-product/add-product.component';
import { ConfirmationPopupComponent } from 'src/app/shared/confirmation-popup/confirmation-popup.component';
import { Subject, takeUntil } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicColumn', { static: false }) dynamicColTemplate!: TemplateRef<any>;
  @Output() onProductChange = new EventEmitter();
  productData: any[] = [];
  cols: any[] = [];
  activeColumns: any[] = [];
  inActiveColumns: any[] = [];
  selectedColumn: string = '';
  selectedProduct: any;
  filterText: any;
  filteredData: any[] = [];

  onDestroy$: Subject<void> = new Subject();

  constructor(private modal: MatDialog, private dataService: DataService) { }

  ngOnInit(): void {
    this.getColumnData();
    this.getProductsData();
    this.filteredData = this.productData;
  }

  getColumnData() {
    this.dataService.getColsData().pipe(takeUntil(this.onDestroy$)).subscribe((res: any) => {
      if (res?.cols && res?.cols?.length) {
        this.cols = res?.cols;
        this.updateColumns(this.cols);
      }
    });
  }

  updateColumns(columns: any) {
    this.activeColumns = [...columns?.filter((col: any) => col.isActive)];
    this.inActiveColumns = [...columns?.filter((col: any) => !col.isActive)];
  }

  filterData() {
    this.filteredData = this.productData?.filter((item) => {
      return item.Product_Name?.toLowerCase().includes(
        this.filterText?.toLowerCase()
      );
    });
  }
  getProductsData() {
    this.dataService.getProductData().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      if (res?.ProductData && res?.ProductData?.length) {
        this.productData = res.ProductData;
        this.selectedProduct = this.productData[0];
        this.onRowSelect(this.selectedProduct);
      }
    });
  }

  onRowSelect(event: any) {
    this.selectedProduct = event;
    this.emitSelectedProduct();
  }

  emitSelectedProduct() {
    this.onProductChange.emit(this.selectedProduct);
  }

  openAddNewProduct() {
    const componentRef = this.modal.open(AddProductComponent, {
      width: '60vw',
      height: '34vw',
      panelClass: 'add-product',
    });
    componentRef.componentInstance.columnList = this.cols;
    componentRef.componentInstance.productListCount = this.productData?.length;
    componentRef.afterClosed().subscribe((res: any) => {
      if (res?.Product_ID) {
        this.filteredData.push(res);
        this.filteredData = [...this.filteredData];
      }
    });
  }

  confirmationProduct() {
    const componentRef = this.modal.open(ConfirmationPopupComponent, {
      minWidth: '30vw',
      width: '20vw',
      height: '10vw',
      panelClass: 'confirmation-product',
    });
    componentRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe((res: any) => {
      if (this.selectedProduct && res) {
        const index = this.filteredData?.findIndex(
          (ele) => ele.Product_ID == this.selectedProduct.Product_ID
        );
        if (index > -1) {
          this.filteredData?.splice(index, 1);
          this.filteredData = [...this.filteredData];
          this.selectedProduct = {};
          this.emitSelectedProduct();
        }
      }
    });
  }

  openDynamicColPopup() {
    this.modal.open(this.dynamicColTemplate, {
      minWidth: '30vw',
      width: '40vw',
      height: '39vw',
      panelClass: 'dynamicCol',
    });
  }

  onSelection(header: string) {
    this.selectedColumn = header;
  }

  addColumn() {
    if (
      this.inActiveColumns?.findIndex(
        (cols: any) => cols?.header == this.selectedColumn
      ) > -1
    ) {
      this.cols.find(
        (cols: any) => cols?.header == this.selectedColumn
      ).isActive = true;
      this.updateColumns(this.cols);
    }
  }

  removeColumn() {
    if (
      this.activeColumns?.findIndex(
        (cols: any) => cols?.header == this.selectedColumn
      ) > -1
    ) {
      this.cols.find(
        (cols: any) => cols?.header == this.selectedColumn
      ).isActive = false;
      this.updateColumns(this.cols);
    }
  }

  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Product.xlsx');
  }

  closeDialog() {
    this.modal.closeAll();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
