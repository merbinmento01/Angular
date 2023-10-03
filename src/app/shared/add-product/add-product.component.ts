import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  leadEngineersList: any[] = [];
  techSupportList: any[] = [];

  constructor(private modalRef: MatDialogRef<AddProductComponent>, private dataService: DataService) {}

  ngOnInit(): void {
    this.getLeadEngineerList();
    this.getTechSupportList();
  }

  getLeadEngineerList() {
    this.dataService.getLeadEngineerList().subscribe((res: any) => {
      this.leadEngineersList = res;
    })
  }

  getTechSupportList() {
    this.dataService.getTechSupportList().subscribe((res: any) => {
      this.techSupportList = res;
    })
  }

  closeDialog() {
    this.modalRef.close()
  }

}
