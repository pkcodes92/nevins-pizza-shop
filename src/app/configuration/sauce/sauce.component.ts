import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PizzaSauce } from 'src/app/models/dto';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private apiService: ApiService, private toastService: ToastrService) {
    
  }

  ngOnInit(): void {
      this.initializeForm();
      this.getSauces();
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

  private getSauces() {
    this.loading = true;
    this.getSaucesSubscription = this.apiService.getAllSauces().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.toastService.success('Got all of the sauces from the database', response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastService.error('Error occurred while getting the sauces', error.status.toString());
        this.loading = false;
      }
    })
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
