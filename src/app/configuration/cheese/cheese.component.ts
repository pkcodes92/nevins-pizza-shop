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

  ngOnInit() {}

  ngOnDestroy() {}
}
