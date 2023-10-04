import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductCatalogComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatTabsModule,
    MatDialogModule,
    TableModule,
    InputTextModule,
    NgApexchartsModule,
    FormsModule,
  ],
  exports: [ProductComponent],
})
export class ProductModule {}
