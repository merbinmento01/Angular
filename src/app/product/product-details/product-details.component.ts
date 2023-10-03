import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  
  @Input() selectedProduct: any;
  catalogImages: any[] = ['img1', 'img2', 'img3', 'img4'];

  ngOnInit(): void {
    console.log('selectedProduct', this.selectedProduct);
    
  }

}
