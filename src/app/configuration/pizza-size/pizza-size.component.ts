import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PizzaSize } from 'src/app/models/dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pizza-size',
  templateUrl: './pizza-size.component.html',
  styleUrl: './pizza-size.component.scss'
})
export class PizzaSizeComponent implements OnInit, OnDestroy {
  loading!: boolean;
  editMode: boolean = true;
  
  pizzaSizes!: PizzaSize[];
  addEditPizzaSizeForm!: FormGroup;

  // #region Subscriptions
  addPizzaSizeSubscription!: Subscription;
  getPizzaSizesSubscription!: Subscription;
  updatePizzaSizeSubscription!: Subscription;
  deletePizzaSizeSubscription!: Subscription;
  getPizzaSizeSubscription!: Subscription;
  // #endregion

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService) {    
  }

  ngOnInit() {
    this.initializeForm();
    this.getPizzaSizes();
  }

  ngOnDestroy() {
    if (this.addPizzaSizeSubscription) {
      this.addPizzaSizeSubscription.unsubscribe();
    }

    if (this.getPizzaSizesSubscription) {
      this.getPizzaSizesSubscription.unsubscribe();
    }

    if (this.updatePizzaSizeSubscription) {
      this.updatePizzaSizeSubscription.unsubscribe();
    }

    if (this.deletePizzaSizeSubscription) {
      this.deletePizzaSizeSubscription.unsubscribe();
    }

    if (this.getPizzaSizeSubscription) {
      this.getPizzaSizeSubscription.unsubscribe();
    }
  }

  private initializeForm() {
    this.addEditPizzaSizeForm = new FormGroup({
      'id': new FormControl(null),
      'code': new FormControl(null),
      'description': new FormControl(null)
    });
  }

  private getPizzaSizes() {
    this.loading = true;

    this.getPizzaSizesSubscription = this.apiService.getSizes().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.toastrService.success(`Successfully gotten the pizza sizes`, response.statusCode.toString());
          this.pizzaSizes = response.pizzaSizes;
        } else {
          this.toastrService.warning(`Hit a snag with getting the pizza sizes`, response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error(`Error occurred getting the pizza sizes`, error.status.toString());
        this.loading = false;
      }
    })
  }
}
