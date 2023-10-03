import { Injectable } from "@angular/core";
import * as ProductData from '../common-helper/product.json';
import { Observable, of } from "rxjs";

@Injectable ({
    providedIn: 'root'
})

export class DataService {

    getProductData() :Observable<any> {
        return of(ProductData);
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
            if(techSupportList.findIndex(tech => tech?.Employee_ID === product?.leadEngineer?.Employee_ID) < 0 && product?.leadEngineer) {
                techSupportList.push(product?.leadEngineer);
            }
        })
        return of(techSupportList);
    }

}