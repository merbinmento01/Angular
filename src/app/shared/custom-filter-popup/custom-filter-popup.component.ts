import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-filter-popup',
  templateUrl: './custom-filter-popup.component.html',
  styleUrls: ['./custom-filter-popup.component.scss']
})
export class CustomFilterPopupComponent {

  constructor(private modalRef: MatDialogRef<CustomFilterPopupComponent>) {}

  closeDialog() {
    this.modalRef.close()
  }

}
