import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) file!: ElementRef<any>;
  @ViewChild('catalogfileInput', { static: false })
  catalogfiles!: ElementRef<any>;

  leadEngineersList: any[] = [];
  techSupportList: any[] = [];
  catalogImages: any[] = [];
  primaryImage: string = '';
  columnList: any[] = [];
  productListCount: number = 0;
  createProductForm: FormGroup = new FormGroup({});
  leadEngineerData: any;
  techSupportData: any;

  constructor(
    private modalRef: MatDialogRef<AddProductComponent>,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getLeadEngineerList();
    this.getTechSupportList();
    this.initializeForm();
  }

  getLeadEngineerList() {
    this.dataService.getLeadEngineerList().subscribe((res: any) => {
      this.leadEngineersList = res;
    });
  }

  getTechSupportList() {
    this.dataService.getTechSupportList().subscribe((res: any) => {
      this.techSupportList = res;
    });
  }

  initializeForm() {
    let formGroup: any = {};
    this.columnList.forEach((control) => {
      formGroup[control.field] = [''];
    });

    this.createProductForm = this.formBuilder.group(formGroup);
    console.log(this.createProductForm);
  }

  openFileDialog() {
    this.file.nativeElement.click();
  }

  openCatalogFileDialog() {
    this.catalogfiles.nativeElement.click();
  }

  uploadFiles(event: any, type: string) {
    if (event?.target && event.target?.files && event.target.files?.length) {
      if (type === 'catalog') this.catalogImages = [];
      const files = event.target.files;
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          // console.log(event.target.result.split(';base64,')[1]);
          if (type === 'primary') {
            this.primaryImage = event.target.result;
          } else if (type === 'catalog') {
            this.catalogImages.push(event.target.result);
          }
        };
        console.log('catalogImages', this.catalogImages);
      });
    }
  }

  onLeadEngineerChange(event: any) {
    this.leadEngineerData = this.leadEngineersList.find(
      (engg) => engg?.Employee_ID == event?.target.value
    );
    console.log(
      event?.target?.value,
      this.leadEngineerData,
      this.leadEngineersList
    );
  }

  onTechSupportChange(event: any) {
    this.techSupportData = this.techSupportList.find(
      (engg) => engg?.Employee_ID == event?.target.value
    );
    console.log(
      event?.target?.value,
      this.techSupportData,
      this.techSupportList
    );
  }

  onSubmit() {
    let payload = {
      Product_ID: this.productListCount + 1,
      Product_Name: this.createProductForm?.value.Product_Name,
      Product_Cost: this.createProductForm?.value.Product_Cost,
      Product_Sale_Price: this.createProductForm?.value.Product_Sale_Price,
      Product_Retail_Price: this.createProductForm?.value.Product_Retail_Price,
      Product_Current_Inventory: Number(
        this.createProductForm?.value.Product_Current_Inventory
      ),
      Product_Backorder: Number(this.createProductForm?.value.Product_Backorder),
      Product_Manufacturing: Number(this.createProductForm?.value.Product_Manufacturing),
      product: {
        Product_Image: this.primaryImage.split(';base64,')[1],
        Product_Support_ID: this.techSupportData?.Employee_ID,
        Product_Engineer_ID: this.leadEngineerData?.Employee_ID,
        Product_Current_Inventory: Number(
          this.createProductForm?.value.Product_Current_Inventory
        ),
        Product_Backorder: Number(this.createProductForm?.value.Product_Backorder),
        Product_Manufacturing: Number(
          this.createProductForm?.value.Product_Manufacturing
        ),
        Product_Barcode: null,
        Product_Primary_Image: this.primaryImage.split(';base64,')[1],
        Product_Cost: this.createProductForm?.value.Product_Cost,
        Product_Sale_Price: this.createProductForm?.value.Product_Sale_Price,
        Product_Retail_Price: this.createProductForm?.value.Product_Retail_Price,
        Product_Consumer_Rating: 0,
        SSMA_TimeStamp: 'AAAAAAAAFik=',
      },
      catalog: {
        Product_Image1: this.catalogImages[0]?.split(';base64,')[1] || '',
        Product_Image2: this.catalogImages[1]?.split(';base64,')[1] || '',
        Product_Image3: this.catalogImages[2]?.split(';base64,')[1] || '',
        Product_Image4: this.catalogImages[3]?.split(';base64,')[1] || '',
      },
      leadEngineer: this.leadEngineerData,
      techSupport: this.techSupportData,
    };

    this.modalRef.close(payload)
  }

  closeDialog() {
    this.modalRef.close();
  }
}
