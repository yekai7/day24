import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  postOrder(order: Order):Promise<any>{
    return this.http.post('/api/order', order).toPromise();
  }

}
