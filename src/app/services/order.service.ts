import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'https://phlosales.herokuapp.com/api/v1/prodorders';
  // url = 'https://localhost:7028/api/v1/ProdOrders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url).pipe(
      map((orders: Order[]) => {
        console.log('orders', orders);
        return orders;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('err', err);
        return throwError(() => new Error(err.message));
      })
    );
  }

  postOrder(order: Order) {
    console.log('outgoing->', order);
    return this.http.post<Order>(this.url, order).subscribe(res =>
      console.log(res));
  }
}
