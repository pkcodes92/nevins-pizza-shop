import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { Topping, ToppingType } from 'src/app/models/dto';
import { AddToppingRequest, UpdateToppingRequest } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-topping',
    templateUrl: './topping.component.html',
    styleUrl: './topping.component.scss',
    standalone: false
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

  private determineEditMode(request: AddToppingRequest) {
    const topping = this.toppings.find(g => g.name == request.name);
    if (topping !== undefined) {
      return true;
    } else {
      return false;
    }
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
    this.loading = true;

    if (this.addEditToppingForm != null) {
      this.editMode = this.determineEditMode(this.addEditToppingForm.value);

      if (!this.editMode) {
        const addRequest = this.addEditToppingForm.value as AddToppingRequest;

        addRequest.appName = "Nevins Pizza App";

        this.addEditToppingForm.controls['id'].disable();

        this.addToppingSubscription = this.apiService.addTopping(addRequest).subscribe({
          next: (response) => {
            if (response.statusCode === 201) {
              this.toastrService.success(`Successfully added the topping: ${addRequest.name}`, response.statusCode.toString());
              location.reload();
            } else {
              this.toastrService.warning(`Successfully created the new topping: ${addRequest.name}`, response.statusCode.toString());
            }

            this.loading = false;
          },
          error: (error) => {
            this.toastrService.error(`Error occurred when adding the topping: ${addRequest.name}`, error.status.toString());
            this.loading = false;
          }
        });
      } else {
        const updateRequest = this.addEditToppingForm.value as UpdateToppingRequest;

        updateRequest.appName = "Nevins Pizza Shop";

        this.addEditToppingForm.controls['id'].disable();

        this.updateToppingSubscription = this.apiService.updateTopping(updateRequest).subscribe({
          next: (response) => {
            if (response.statusCode === 200) {
              this.toastrService.success(`Successfully updated the topping: ${updateRequest.name}`, response.statusCode.toString());
              location.reload();
            } else {
              this.toastrService.warning(`There was an error updating the topping: ${updateRequest.name}`, response.statusCode.toString());
            }

            this.loading = false;
          },
          error: (error) => {
            this.toastrService.error(`Error occurred while updating the topping: ${updateRequest.name}`, error.status.toString());
            this.loading = false;
          }
        });
      }
    }
  }

  deleteTopping(i: number) {
    const toppingToDelete = this.toppings[i];

    this.toastrService.warning(`Are you sure you want to remove the topping: ${toppingToDelete.name}? Click on this popup to delete, otherwise do not do anything.`,
      'Remove Topping')
      .onTap
      .pipe(take(1))
      .subscribe(
        () => this.removeTopping(toppingToDelete)
      );
  }

  removeTopping(toppingToDelete: Topping) {
    this.loading = true;

    this.deleteToppingSubscription = this.apiService.deleteTopping(toppingToDelete.id).subscribe({
      next: (response) => {
        if (response.statusCode === 204) {
          this.toastrService.success(`Successfully deleted the topping: ${toppingToDelete.name}`, response.statusCode.toString());
          location.reload();
        } else {
          this.toastrService.warning(`Hit a snag while trying to delete the topping: ${toppingToDelete.name}`, response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error(`Error occurred while trying to delete the topping: ${toppingToDelete.name}`, error.status.toString());
        this.loading = false;
      }
    });
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
