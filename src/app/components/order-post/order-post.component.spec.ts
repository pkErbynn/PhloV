import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPostComponent } from './order-post.component';

describe('OrderPostComponent', () => {
  let component: OrderPostComponent;
  let fixture: ComponentFixture<OrderPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
