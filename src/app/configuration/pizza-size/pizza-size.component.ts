import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { PizzaSize } from 'src/app/models/dto';
import { AddPizzaSizeRequest, UpdatePizzaSizeRequest } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-pizza-size',
    templateUrl: './pizza-size.component.html',
    styleUrl: './pizza-size.component.scss',
    standalone: false
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

  private determineEditMode(request: AddPizzaSizeRequest) {
    const pizzaSize = this.pizzaSizes.find(g => g.code == request.code);
    if (pizzaSize !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  clearPizzaSizeForm() {
    this.addEditPizzaSizeForm.setValue({
      'id': '',
      'code': '',
      'description': ''
    });
  }

  updatePizzaSize(i: number) {
    const pizzaSizeToUpdate = this.pizzaSizes[i];

    this.addEditPizzaSizeForm.setValue({
      'id': pizzaSizeToUpdate.id,
      'code': pizzaSizeToUpdate.code,
      'description': pizzaSizeToUpdate.description
    });
  }

  deletePizzaSize(i: number) {
    const pizzaSizeToDelete = this.pizzaSizes[i];

    this.toastrService.warning(`Are you sure you want to remove the pizza size: ${pizzaSizeToDelete.code}? Click the popup to continue. Otherwise, not clicking this popup will not delete the pizza size.`, 'Remove Pizza Size')
      .onTap.pipe(take(1)).subscribe(() => this.removePizzaSize(pizzaSizeToDelete));
  }

  removePizzaSize(pizzaSizeToDelete: PizzaSize) {
    this.loading = true;

    this.deletePizzaSizeSubscription = this.apiService.deleteSize(pizzaSizeToDelete.id).subscribe({
      next: (response) => {
        if (response.statusCode === 204) {
          this.toastrService.success(`Successfully deleted the pizza size with the code: ${pizzaSizeToDelete.code}`, response.statusCode.toString());
          location.reload();
        } else {
          this.toastrService.warning(`Hit a snag while trying to delete the pizza size with the code: ${pizzaSizeToDelete.code}`, response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error(`Error occurred while trying to delete the pizza size with the code: ${pizzaSizeToDelete.code}`, error.status.toString());
        this.loading = false;
      }
    });
  }

  onAddEditPizzaSizeFormSubmit() {
    this.loading = true;

    if (this.addEditPizzaSizeForm != null) {
      this.editMode = this.determineEditMode(this.addEditPizzaSizeForm.value);

      if (!this.editMode) {
        const addRequest = this.addEditPizzaSizeForm.value as AddPizzaSizeRequest;

        addRequest.appName = "Nevins Pizza App";

        this.addEditPizzaSizeForm.controls['id'].disable();

        this.addPizzaSizeSubscription = this.apiService.addSize(addRequest).subscribe({
          next: (response) => {
            if (response.statusCode === 201) {
              this.toastrService.success(`Successfully added the new pizza size with the code: ${addRequest.code}`, response.statusCode.toString());
              location.reload();
            } else {
              this.toastrService.warning(`Hit a snag while trying to add the new pizza size with the code: ${addRequest.code}`, response.statusCode.toString());
            }

            this.loading = false;
          },
          error: (error) => {
            this.toastrService.error(`Error occurred while trying to add the new pizza size with the code: ${addRequest.code}`, error.status.toString());
            this.loading = false;
          }
        });
      } else {
        const updateRequest = this.addEditPizzaSizeForm.value as UpdatePizzaSizeRequest;

        updateRequest.appName = "Nevins Pizza App";

        this.addEditPizzaSizeForm.controls['id'].disable();

        this.updatePizzaSizeSubscription = this.apiService.updateSize(updateRequest).subscribe({
          next: (response) => {
            if (response.statusCode === 200) {
              this.toastrService.success(`Successfully updated the pizza size with the code: ${updateRequest.code}`, response.statusCode.toString());
              location.reload();
            } else {
              this.toastrService.warning(`Almost updated the pizza size with the code: ${updateRequest.code}`, response.statusCode.toString());
            }

            this.loading = false;
          },
          error: (error) => {
            this.toastrService.error(`Error occurred while trying to update the crust with the code: ${updateRequest.code}`, error.status.toString());
            this.loading = false;
          }
        });
      }
    }
  }
}
