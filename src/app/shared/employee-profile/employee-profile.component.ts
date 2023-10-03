import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  employeeInfo: any;

  constructor(private modalRef: MatDialogRef<EmployeeProfileComponent>) {}

  ngOnInit(): void {
  }

  closeDialog() {
    this.modalRef.close()
  }

}
