import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Topping, ToppingType } from 'src/app/models/dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-topping',
  templateUrl: './topping.component.html',
  styleUrl: './topping.component.scss'
})
export class ToppingComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  editMode: boolean = true;

  toppings!: Topping[];
  toppingTypes!: ToppingType[];
  addEditToppingForm!: FormGroup;

  // #region Subscriptions
  addToppingSubscription!: Subscription;
  deleteToppingSubscription!: Subscription;
  getToppingsSubscription!: Subscription;
  getToppingTypesSubscription!: Subscription;
  getToppingSubscription!: Subscription;
  updateToppingSubscription!: Subscription;  
  // #endregion

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getToppings();
    this.getToppingTypes();
  }

  ngOnDestroy(): void {
    if (this.addToppingSubscription) {
      this.addToppingSubscription.unsubscribe();
    }

    if (this.deleteToppingSubscription) {
      this.deleteToppingSubscription.unsubscribe();
    }

    if (this.getToppingSubscription) {
      this.addToppingSubscription.unsubscribe();
    }

    if (this.getToppingsSubscription) {
      this.getToppingsSubscription.unsubscribe();
    }

    if (this.updateToppingSubscription) {
      this.updateToppingSubscription.unsubscribe();
    }

    if (this.getToppingTypesSubscription) {
      this.getToppingTypesSubscription.unsubscribe();
    }
  }

  private initializeForm() {
    this.addEditToppingForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
      type: new FormControl(null)
    });
  }

  private getToppingTypes() {
    this.loading = true;

    this.getToppingTypesSubscription = this.apiService.getToppingTypes().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.toastrService.success(`Successfully got all of the topping types`, response.statusCode.toString());
          this.toppingTypes = response.toppingTypes;
        } else {
          this.toastrService.warning(`Error occurred while getting all the topping types`, response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error(`Error occurred while getting the topping types`, error.status.toString());
        this.loading = false;
      }
    })
  }

  private getToppings() {
    this.loading = true;

    this.getToppingsSubscription = this.apiService.getToppings().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.toastrService.success('Successfully got all of the toppings from the database', response.statusCode.toString());
          this.toppings = response.toppings;
        } else {
          this.toastrService.warning('Hit a snag while getting the toppings from the database', response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error('Error when getting all of the toppings from the database', error.status.toString());
        this.loading = false;
      }
    });
  }

  clearToppingForm() {
    this.addEditToppingForm.setValue({
      id: '',
      name: '',
      description: '',
      type: ''
    });
  }

  onAddEditToppingFormSubmit() {
    console.log('To be implemented');
  }

  deleteTopping(i: number) {
    console.log(`Deleting the topping located: ${i}`);
  }

  updateTopping(i: number) {
    const toppingToUpdate = this.toppings[i];

    this.addEditToppingForm.setValue({
      id: toppingToUpdate.id,
      name: toppingToUpdate.name,
      type: toppingToUpdate.type,
      description: toppingToUpdate.description
    });
  }
}
