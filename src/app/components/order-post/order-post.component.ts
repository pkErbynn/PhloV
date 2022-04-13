import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-post',
  templateUrl: './order-post.component.html',
  styleUrls: ['./order-post.component.css']
})
export class OrderPostComponent implements OnInit {
  orderForm: FormGroup;
  subscription: Subscription | undefined;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    )
  {
    this.orderForm = new FormGroup({
      customer: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      product: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.orderForm.value);
    // this.orderService.addOrder(this.orderForm.value);
    this.router.navigate(["/new"]);
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
