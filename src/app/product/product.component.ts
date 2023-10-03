import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  selectedProduct: any;

  onProductChange(event: any) {
    this.selectedProduct = event;    
  }

}
