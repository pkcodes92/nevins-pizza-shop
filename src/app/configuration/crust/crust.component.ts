import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Crust } from 'src/app/models/dto';

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
  // #endregion

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      
  }
}
