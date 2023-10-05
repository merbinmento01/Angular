import { Injectable } from "@angular/core";
import * as ProductData from '../common-helper/product.json';
import * as colsData from '../common-helper/col-details.json';
import { columnListInterface } from "../common-helper/Interface";
import { Observable, of } from "rxjs";

@Injectable ({
    providedIn: 'root'
})

export class DataService {

    getProductData() :Observable<any> {
        return of(ProductData);
    } 

    getColsData() :Observable<columnListInterface> {
        return of(colsData);
    } 
    
    getLeadEngineerList() :Observable<any> {
        const productData = JSON.parse(JSON.stringify(ProductData));
        const leadEngineerList: any[] = [];
        productData?.ProductData.forEach((product: any) => {
            if(leadEngineerList.findIndex(engineer => engineer?.Employee_ID === product?.leadEngineer?.Employee_ID) < 0 && product?.leadEngineer) {
                leadEngineerList.push(product?.leadEngineer);
            }
        })
        return of(leadEngineerList);
    }

    getTechSupportList() :Observable<any> {
        const productData = JSON.parse(JSON.stringify(ProductData));
        const techSupportList: any[] = [];
        productData?.ProductData.forEach((product: any) => {
            if(techSupportList.findIndex(tech => tech?.Employee_ID === product?.techSupport?.Employee_ID) < 0 && product?.techSupport?.Employee_ID) {
                techSupportList.push(product?.techSupport);
            }
        })
        return of(techSupportList);
    }

}