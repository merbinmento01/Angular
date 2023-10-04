import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {

  @Output() emitFileChange = new EventEmitter();
  
  constructor(private modalRef: MatDialogRef<ConfirmationPopupComponent>) {}

  closeDialog(type?: any) {
    if(type == 'yes'){
      this.emitFileChange.emit();
      this.modalRef.close();
    }else{
      this.modalRef.close();
    }
  }
}
