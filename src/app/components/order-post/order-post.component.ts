import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-post',
  templateUrl: './order-post.component.html',
  styleUrls: ['./order-post.component.css']
})
export class OrderPostComponent implements OnInit {
  orderForm: FormGroup;
  subscription: Subscription | undefined;
  products: any = ['laptop-m1', 'phone', 'webcam', 'headset', 'wfh desk', 'curved monitor', 'keyboard'];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    )
  {
    this.orderForm = new FormGroup({
      customer: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      product: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  changeProduct(e: any) {
    this.orderForm.get('product')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSubmit() {
    console.log('new', this.orderForm.value);

    const newOrder: Order = {
      prodOrderId: Guid.create().toString(),
      customerName: this.orderForm.value.customer,
      productName: this.orderForm.value.product,
      price: this.orderForm.value.price,
    }

    this.orderService.postOrder(newOrder);
    this.orderForm.reset();
  }

  onBack(){
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
