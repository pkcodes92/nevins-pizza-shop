import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Crust } from 'src/app/models/dto';
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

  constructor(private apiService: ApiService, private toastrService: ToastrService) {

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
}
