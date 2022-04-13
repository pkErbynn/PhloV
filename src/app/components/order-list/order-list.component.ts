import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string | undefined;
  private subscription: Subscription | undefined;
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.isLoading = false;
      },
      (err: string) => {
        this.errorMessage = err;
        this.isLoading = false;
      }
    );
  }

  onNewOrder() {
    this.router.navigate(["/new"]);
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
