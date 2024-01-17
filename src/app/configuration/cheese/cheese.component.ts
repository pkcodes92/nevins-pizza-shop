import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cheese } from 'src/app/models/dto';
import { AddCheeseRequest, UpdateCheeseRequest } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cheese',
  templateUrl: './cheese.component.html',
  styleUrl: './cheese.component.scss',
})
export class CheeseComponent implements OnInit, OnDestroy {
  loading!: boolean;
  editMode!: boolean;

  cheeses!: Cheese[];
  addEditCheeseForm!: FormGroup;

  // #region Subscriptions
  addCheeseSubscription!: Subscription;
  updateCheeseSubscription!: Subscription;
  getCheesesSubscription!: Subscription;
  getCheeseSubscription!: Subscription;
  deleteCheeseSubscription!: Subscription;
  // #endregion

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getCheeses();
    this.initializeForm();
  }

  ngOnDestroy() {
    if (this.addCheeseSubscription) {
      this.addCheeseSubscription.unsubscribe();
    }

    if (this.updateCheeseSubscription) {
      this.updateCheeseSubscription.unsubscribe();
    }

    if (this.getCheeseSubscription) {
      this.getCheeseSubscription.unsubscribe();
    }

    if (this.getCheesesSubscription) {
      this.getCheesesSubscription.unsubscribe();
    }

    if (this.deleteCheeseSubscription) {
      this.deleteCheeseSubscription.unsubscribe();
    }
  }

  private getCheeses() {
    this.loading = true;

    this.getCheesesSubscription = this.apiService.getCheeses().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.toastrService.success('Successfully got the cheeses', response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error('Error occurred while getting the cheeses', error.status.toString());
        this.loading = false;
      }
    });
  }

  private initializeForm() {
    this.addEditCheeseForm = new FormGroup({
      'id': new FormControl(null),
      'code': new FormControl(null),
      'description': new FormControl(null)
    });
  }

  private determineEditMode(request: AddCheeseRequest) {
    const cheese = this.cheeses.find(g => g.code == request.code);
    if (cheese !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  clearCheeseForm() {
    this.addEditCheeseForm.setValue({
      'id': '',
      'code': '',
      'description': ''
    });
  }

  deleteCheese(i: number) {
    const cheeseToDelete = this.cheeses[i];

    console.log(`Going to delete the cheese with the ID: ${cheeseToDelete.id}`);
  }

  updateCheese(i: number) {
    const cheeseToUpdate = this.cheeses[i];

    this.addEditCheeseForm.setValue({
      'id': cheeseToUpdate.id,
      'code': cheeseToUpdate.code,
      'description': cheeseToUpdate.description
    });
  }

  onAddEditCheeseFormSubmit() {
    this.loading = true;

    if (this.addEditCheeseForm != null) {
      this.editMode = this.determineEditMode(this.addEditCheeseForm.value);

      if (!this.editMode) {
        const addRequest = this.addEditCheeseForm.value as AddCheeseRequest;

        addRequest.appName = "Nevins Pizza App";

        this.addEditCheeseForm.controls['id'].disable();

        this.addCheeseSubscription = this.apiService.addCheese(addRequest).subscribe({
          next: (response) => {
            if (response.statusCode === 201) {
              this.toastrService.success(`Successfully added the cheese with the code: ${addRequest.code}`, response.statusCode.toString());
              location.reload();
            } else {
              this.toastrService.warning(`Successfully created the new cheese with the code: ${addRequest.code}`, response.statusCode.toString());
            }

            this.loading = false;
          },
          error: (error) => {
            this.toastrService.error(`Error when adding the cheese: ${addRequest.code}`, error.status.toString());
            this.loading = false;
          }
        });
      } else {
        const updateRequest = this.addEditCheeseForm.value as UpdateCheeseRequest;

        updateRequest.appName = "Nevins Pizza App";

        this.addEditCheeseForm.controls['id'].disable();

        this.updateCheeseSubscription = this.apiService.updateCheese(updateRequest).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.statusCode === 200) {
              this.toastrService.success(`Successfully updated the cheese with the code: ${updateRequest.code}`, response.statusCode.toString());
              location.reload();
            } else {
              this.toastrService.warning(`There was an error updating the cheese with the code: ${updateRequest.code}`, response.statusCode.toString());
            }
          },
          error: (error) => {
            this.toastrService.error(`Error occurred while updating the cheese with code: ${updateRequest.code}`, error.status.toString());
            this.loading = false;
          }
        });
      }
    }
  }
}
