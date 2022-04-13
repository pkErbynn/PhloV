import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'https://phlosales.herokuapp.com/api/v1/prodorders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url).pipe(  // improved with catchError block
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
}
