import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {
  
  constructor(private modalRef: MatDialogRef<ConfirmationPopupComponent>) {}

  closeDialog(value: any) {
    this.modalRef.close(value)
  }
}
