import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cheese } from 'src/app/models/dto';
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
    private toastService: ToastrService
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
          this.toastService.success('Successfully got the cheeses', response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastService.error('Error occurred while getting the cheeses', error.status.toString());
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
}
