import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ShopService } from '../shop.service';
import { Order, OrderDetail } from '../model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  orderForm: FormGroup;
  orderDetails: FormArray;

  constructor(private fb: FormBuilder, private shopSvc: ShopService) { }

  ngOnInit() {
    this.orderDetails = this.fb.array([])
    this.orderForm = this.createForm(this.orderDetails);
  }

  addOrderDetails() {
    this.orderDetails.push(this.createOrderDetails())
  }

  removeOrderDetails(index: number) {
    this.orderDetails.removeAt(index)
  }

  checkOut() {
    const order: Order = {
      email: this.orderForm.value.email,
      orderDetails: []
    }
    for (let g = 0; g < this.orderDetails.length; g++) {
      const fg: FormGroup = this.orderDetails.controls[g] as FormGroup;
      order.orderDetails.push({
        description: fg.value.description,
        quantity: parseInt(fg.value.quantity) || 1
      } as OrderDetail)
    }
    this.shopSvc.postOrder(order).then(()=>{
      console.log('created');
      this.orderDetails = this.fb.array([]);
      this.orderForm.controls.orderDetails = this.orderDetails;
      // this.orderForm.reset();
    })
  }

  private createForm(od: FormArray = null): FormGroup {
    return (
      this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.email]),
        orderDetails: od || this.fb.array([])
      })
    )
  }

  private createOrderDetails(): FormGroup {
    return (
      this.fb.group({
        description: this.fb.control('', [Validators.required]),
        quantity: this.fb.control('1', [Validators.required, Validators.min(1)])
      })
    )
  }
}
