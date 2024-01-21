import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ToppingType } from 'src/app/models/dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-topping-type',
  templateUrl: './topping-type.component.html',
  styleUrl: './topping-type.component.scss'
})
export class ToppingTypeComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  editMode: boolean = true;

  toppingTypes!: ToppingType[];
  addEditToppingTypeForm!: FormGroup;

  // #region Subscriptions
  addToppingTypeSubscription!: Subscription;
  getToppingTypesSubscription!: Subscription;
  getToppingTypeSubscription!: Subscription;
  updateToppingTypeSubscription!: Subscription;
  deleteToppingTypeSubscription!: Subscription;
  // #endregion

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getToppingTypes();
  }

  ngOnDestroy(): void {
    if (this.addToppingTypeSubscription) {
      this.addToppingTypeSubscription.unsubscribe();
    }
    
    if (this.getToppingTypeSubscription) {
      this.getToppingTypeSubscription.unsubscribe();
    }
    
    if (this.getToppingTypesSubscription) {
      this.getToppingTypesSubscription.unsubscribe();
    }

    if (this.updateToppingTypeSubscription) {
      this.updateToppingTypeSubscription.unsubscribe();
    }

    if (this.deleteToppingTypeSubscription) {
      this.deleteToppingTypeSubscription.unsubscribe();
    }
  }

  private initializeForm() {
    this.addEditToppingTypeForm = new FormGroup({
      id: new FormControl(null),
      code: new FormControl(null),
      description: new FormControl(null)
    });
  }

  private getToppingTypes() {
    this.loading = true;

    this.getToppingTypesSubscription = this.apiService.getToppingTypes().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.toastrService.success('Got all of the topping types from the database.', response.statusCode.toString());
        } else {
          this.toastrService.warning('Hit a snag getting all of the topping types', response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error('Error occurred while getting all of the topping types', error.status.toString());
        this.loading = false;
      }
    });
  }
}
