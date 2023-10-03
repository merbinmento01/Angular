import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeProfileComponent } from 'src/app/shared/employee-profile/employee-profile.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  
  @Input() selectedProduct: any;
  catalogImages: any[] = ['img1', 'img2', 'img3', 'img4'];

  constructor(private modal: MatDialog) {}

  ngOnInit(): void {
    console.log('selectedProduct', this.selectedProduct);
  }

  openEmployeeInfo(employeeInfo: any) {
    const componentRef = this.modal.open(EmployeeProfileComponent, {
      minWidth: '30vw',
      width: '60vw',
      height: '32vw',
      panelClass: 'profile'
    })

    componentRef.componentInstance.employeeInfo = employeeInfo;
  }

}
