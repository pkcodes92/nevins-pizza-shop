import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Crust } from 'src/app/models/dto';
import { AddCrustRequest, UpdateCrustRequest } from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-crust',
  templateUrl: './crust.component.html',
  styleUrl: './crust.component.scss'
})
export class CrustComponent implements OnInit, OnDestroy {
  loading!: boolean;
  editMode: boolean = true;
  
  crusts!: Crust[];
  addEditCrustForm!: FormGroup;

  // #region Subscriptions
  addCrustSubscription!: Subscription;
  getCrustsSubscription!: Subscription;
  updateCrustSubscription!: Subscription;
  deleteCrustSubscription!: Subscription;
  getCrustSubscription!: Subscription;
  // #endregion

  constructor(
    private apiService: ApiService, 
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getCrusts();
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.addCrustSubscription) {
      this.addCrustSubscription.unsubscribe();
    }

    if (this.updateCrustSubscription) {
      this.updateCrustSubscription.unsubscribe();
    }

    if (this.deleteCrustSubscription) {
      this.deleteCrustSubscription.unsubscribe();
    }

    if (this.getCrustSubscription) {
      this.getCrustSubscription.unsubscribe();
    }

    if (this.getCrustsSubscription) {
      this.getCrustsSubscription.unsubscribe();
    }
  }

  private getCrusts() {
    this.loading = true;
    this.getCrustsSubscription = this.apiService.getCrusts().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.toastrService.success('Successfully loaded the crusts', response.statusCode.toString());
          this.crusts = response.crusts;
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error('Error occurred while getting the crusts', error.status.toString());
        this.loading = false;
      }
    });
  }

  private initializeForm() {
    this.addEditCrustForm = new FormGroup({
      'id': new FormControl(null),
      'code': new FormControl(null),
      'description': new FormControl(null)
    });
  }

  private determineEditMode(request: AddCrustRequest) {
    const crust = this.crusts.find(g => g.code == request.code);
    if (crust !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  clearCrustForm() {
    this.addEditCrustForm.setValue({
      'id': '',
      'code': '',
      'description': ''
    });
  }

  updateCrust(i: number) {
    const crustToUpdate = this.crusts[i];

    this.addEditCrustForm.setValue({
      'id': crustToUpdate.id,
      'code': crustToUpdate.code,
      'description': crustToUpdate.description
    });
  }

  deleteCrust(i: number) {
    const crustToDelete = this.crusts[i];

    console.log(`Going to delete the crust with the ID: ${crustToDelete.id}`);
  }

  onAddEditCrustFormSubmit() {
    this.loading = true;

    if (this.addEditCrustForm != null) {
      this.editMode = this.determineEditMode(this.addEditCrustForm.value);

      if (!this.editMode) {
        const addRequest = this.addEditCrustForm.value as AddCrustRequest;

        addRequest.appName = "Nevins Pizza App";

        this.addEditCrustForm.controls['id'].disable();

        this.addCrustSubscription = this.apiService.addCrust(addRequest).subscribe({
          next: (response) => {
            if (response.statusCode === 201) {
              this.toastrService.success(`Successfully added the crust with the code: ${addRequest.code}`, response.statusCode.toString());
              location.reload();
            } else {
              this.toastrService.warning(`Successfully created the new crust with the code: ${addRequest.code}`, response.statusCode.toString());
            }

            this.loading = false;
          },
          error: (error) => {
            this.toastrService.error(`Error occurred while trying to add the new crust: ${addRequest.code}`, error.status.toString());
            this.loading = false;
          }
        });
      } else {
        const updateRequest = this.addEditCrustForm.value as UpdateCrustRequest;

        updateRequest.appName = "Nevins Pizza App";

        this.addEditCrustForm.controls['id'].disable();
      }
    }
  }
}
