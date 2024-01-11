import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  editMode: boolean = false;

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

  }

  private initializeForm() {
    
  }
}
