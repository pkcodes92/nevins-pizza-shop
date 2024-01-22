import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { ToppingType } from 'src/app/models/dto';
import { AddToppingTypeRequest, UpdateToppingTypeRequest } from 'src/app/models/request';
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

  private determineEditMode(request: AddToppingTypeRequest) {
    const toppingType = this.toppingTypes.find(g => g.code == request.code);
    if (toppingType !== undefined) {
      return true;
    } else {
      return false;
    }
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

  clearToppingTypeForm() {
    this.addEditToppingTypeForm.setValue({
      id: '',
      code: '',
      description: ''
    });
  }

  onAddEditToppingTypeFormSubmit() {
    this.loading = true;

    if (this.addEditToppingTypeForm != null) {
      this.editMode = this.determineEditMode(this.addEditToppingTypeForm.value);

      if (!this.editMode) {
        const addRequest = this.addEditToppingTypeForm.value as AddToppingTypeRequest;

        addRequest.appName = 'Nevins Pizza App';

        this.addEditToppingTypeForm.controls['id'].disable();

        this.addToppingTypeSubscription = this.apiService.addToppingType(addRequest).subscribe({
          next: (response) => {
            if (response.statusCode === 201) {
              this.toastrService.success(`Successfully added the topping type: ${addRequest.code}`, response.statusCode.toString());
              location.reload();
            } else {
              this.toastrService.warning(`Successfully created the new topping type: ${addRequest.code}`, response.statusCode.toString());
            }

            this.loading = false;
          },
          error: (error) => {
            this.toastrService.error(`Error occurred when adding the topping type: ${addRequest.code}`, error.status.toString());
            this.loading = false;
          }
        });
      } else {
        const updateRequest = this.addEditToppingTypeForm.value as UpdateToppingTypeRequest;

        updateRequest.appName = "Nevins Pizza Shop";

        this.addEditToppingTypeForm.controls['id'].disable();

        this.updateToppingTypeSubscription = this.apiService.updateToppingType(updateRequest).subscribe({
          next: (response) => {
            if (response.statusCode === 200) {
              this.toastrService.success(`Successfully updated the topping type: ${updateRequest.code}`, response.statusCode.toString());
              location.reload();
            } else {
              this.toastrService.warning(`There was an error updating the topping type: ${updateRequest.code}`, response.statusCode.toString());
            }

            this.loading = false;
          },
          error: (error) => {
            this.toastrService.error(`Error occurred while updating the topping type: ${updateRequest.code}`, error.status.toString());
            this.loading = false;
          }
        });
      }
    }
  }

  deleteToppingType(i: number) {
    const toppingTypeToDelete = this.toppingTypes[i];

    this.toastrService.warning(`Are you sure you want to remove the topping type: ${toppingTypeToDelete.code}? Click on this popup to delete. Otherwise, do not do anything.`,
      'Remove Topping Type')
      .onTap
      .pipe(take(1))
      .subscribe(
        () => this.removeToppingType(toppingTypeToDelete)
      );
  }

  removeToppingType(toppingTypeToDelete: ToppingType) {
    this.loading = true;

    this.deleteToppingTypeSubscription = this.apiService.deleteToppingType(toppingTypeToDelete.id).subscribe({
      next: (response) => {
        if (response.statusCode === 204) {
          this.toastrService.success(`Successfully deleted the topping type: ${toppingTypeToDelete.code}`, response.statusCode.toString());
          location.reload();
        }
      },
      error: (error) => {
        this.toastrService.error(`Error occurred while trying to delete the topping type: ${toppingTypeToDelete.code}`, error.status.toString());
        this.loading = false;
      }
    })
  }

  updateToppingType(i: number) {
    const toppingTypeToUpdate = this.toppingTypes[i];

    this.addEditToppingTypeForm.setValue({
      id: toppingTypeToUpdate.id,
      code: toppingTypeToUpdate.code,
      description: toppingTypeToUpdate.description
    });
  }
}
