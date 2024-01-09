import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PizzaSauce } from 'src/app/models/dto';

@Component({
  selector: 'app-sauce',
  templateUrl: './sauce.component.html',
  styleUrl: './sauce.component.scss'
})
export class SauceComponent implements OnInit, OnDestroy {
  loading!: boolean;
  pizzaSauces!: PizzaSauce[];
  addEditSauceForm!: FormGroup;

  addSauceSubscription!: Subscription;
  deleteSauceSubscription!: Subscription;
  getSaucesSubscription!: Subscription;
  getSauceSubscription!: Subscription;
  updateSubscription!: Subscription;

  ngOnInit(): void {
      this.initializeForm();
  }

  ngOnDestroy(): void {
      if (this.addSauceSubscription) {
        this.addSauceSubscription.unsubscribe();
      }

      if (this.deleteSauceSubscription) {
        this.deleteSauceSubscription.unsubscribe();
      }

      if (this.getSaucesSubscription) {
        this.getSaucesSubscription.unsubscribe();
      }

      if (this.getSauceSubscription) {
        this.getSauceSubscription.unsubscribe();
      }

      if (this.updateSubscription) {
        this.updateSubscription.unsubscribe();
      }
  }

  private initializeForm() {
    this.addEditSauceForm = new FormGroup({
      'id': new FormControl(null),
      'code': new FormControl(null),
      'description': new FormControl(null)
    });
  }

  clearSauceForm() {
    this.addEditSauceForm.setValue({
      'id': '',
      'code': '',
      'description': ''
    });
  }

  updatePizzaSauce(i: number) {
    let sauceToUpdate = this.pizzaSauces[i];

    this.addEditSauceForm.setValue({
      'id': sauceToUpdate.id,
      'code': sauceToUpdate.code,
      'description': sauceToUpdate.description
    });
  }

  deletePizzaSauce(i: number) {
    let sauceToDelete = this.pizzaSauces[i];

    console.log(`Going to delete sauce with the ID: ${sauceToDelete.id}`);
  }

  onAddEditSauceFormSubmit() {
    console.log('Making sure to have things determining whether to add or edit');
  }
}
