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

}