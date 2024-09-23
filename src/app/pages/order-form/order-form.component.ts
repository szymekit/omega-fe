import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {DeliveryType, Order, PaymentType} from '../../models/order.model';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {saveOrder} from "../../state/actions/order.actions";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatOption,
    MatSelect,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatError,
    MatLabel,
    MatButton,
    NgIf,
    NgForOf,
    /* Angular Material Modules */]
})
export class OrderFormComponent {
  orderForm: FormGroup;
  paymentTypes: PaymentType[] = ['Cash', 'Card', 'Transfer', 'BLIK'];
  deliveryTypes: DeliveryType[] = ['Courier', 'Personal Pickup', 'Service Point Pickup'];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ order: Order }>,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      paymentType: ['', Validators.required],
      deliveryType: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      deliveryAddress: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        houseNumber: ['', Validators.required],
        apartmentNumber: [''],
        postalCode: ['', Validators.required],
        city: ['', Validators.required]
      }),
      users: this.fb.array([])
    });
  }

  get users(): FormArray {
    return this.orderForm.get('users') as FormArray;
  }

  addUser(): void {
    const userGroup: FormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      apartmentNumber: [''],
      postalCode: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.users.push(userGroup);
  }

  removeUser(index: number): void {
    this.users.removeAt(index);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const order: Order = this.orderForm.value;
      this.store.dispatch(saveOrder({order}));
      this.router.navigate(['/summary']);
    }
  }
}
