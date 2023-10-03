import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { NgApexchartsModule } from 'ng-apexcharts';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductCatalogComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatTabsModule,
    MatDialogModule,
    TableModule,
    InputTextModule,
    NgApexchartsModule
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
