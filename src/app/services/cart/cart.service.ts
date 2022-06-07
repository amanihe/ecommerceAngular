import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  addOrder(val: any) {
    return this.http.post(this.APIUrl + '/order/', val);
  }
  addOrderLign(val: any) {
    return this.http.post(this.APIUrl + '/orderLigne/', val);
  }
  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
  constructor(private http: HttpClient) {}
  getOrder(id: any) {
    return this.http.get(this.APIUrl + '/cart/' + id);
  }
  getOrderByUser(id: any) {
    return this.http.get(this.APIUrl + '/orderByUser/' + id);
  }
  getHistory(ord: any) {
    return this.http.get(this.APIUrl + '/orderHistory/' + ord);
  }
  getOrderItem(id: any) {
    return this.http.get(this.APIUrl + '/cartItem/' + id);
  }
  removeOrderItem(id: any) {
    return this.http.delete(this.APIUrl + '/orderLigne/' + id);
  }
  editQte(id: any, val: any) {
    return this.http.put(this.APIUrl + '/editcartItem/' + id, val);
  }
  getProduct(id: any) {
    return this.http.get(this.APIUrl + '/ProductById/' + id);
  }
}
