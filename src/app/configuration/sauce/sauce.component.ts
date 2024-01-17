import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { PizzaSauce } from 'src/app/models/dto';
import {
  AddPizzaSauceRequest,
  UpdatePizzaSauceRequest,
} from 'src/app/models/request';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sauce',
  templateUrl: './sauce.component.html',
  styleUrl: './sauce.component.scss',
})
export class SauceComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  editMode: boolean = true;

  pizzaSauces!: PizzaSauce[];
  addEditSauceForm!: FormGroup;

  addSauceSubscription!: Subscription;
  deleteSauceSubscription!: Subscription;
  getSaucesSubscription!: Subscription;
  getSauceSubscription!: Subscription;
  updateSauceSubscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService
  ) {}

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

    if (this.updateSauceSubscription) {
      this.updateSauceSubscription.unsubscribe();
    }
  }

  private initializeForm() {
    this.addEditSauceForm = new FormGroup({
      id: new FormControl(null),
      code: new FormControl(null),
      description: new FormControl(null),
    });
  }

  private getSauces() {
    this.loading = true;
    this.getSaucesSubscription = this.apiService.getSauces().subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.toastrService.success(
            'Got all of the sauces from the database',
            response.statusCode.toString()
          );
          this.pizzaSauces = response.pizzaSauces;
        }

        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error(
          'Error occurred while getting the sauces',
          error.status.toString()
        );
        this.loading = false;
      },
    });
  }

  private determineEditMode(request: AddPizzaSauceRequest) {
    const pizzaSauce = this.pizzaSauces.find((x) => x.code == request.code);
    if (pizzaSauce !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  clearSauceForm() {
    this.addEditSauceForm.setValue({
      'id': '',
      'code': '',
      'description': '',
    });
  }

  updatePizzaSauce(i: number) {
    const sauceToUpdate = this.pizzaSauces[i];

    this.addEditSauceForm.setValue({
      'id': sauceToUpdate.id,
      'code': sauceToUpdate.code,
      'description': sauceToUpdate.description,
    });
  }

  deletePizzaSauce(i: number) {
    const sauceToDelete = this.pizzaSauces[i];

    this.toastrService.warning(`Are you sure you want to remove the sauce: ${sauceToDelete.code}? Click on this notification to delete. Otherwise, do nothing.`, 'Remove Sauce')
      .onTap.pipe(take(1)).subscribe(() => this.removeSauce(sauceToDelete));
  }

  removeSauce(sauceToDelete: PizzaSauce) {
    this.loading = true;

    this.deleteSauceSubscription = this.apiService.deleteSauce(sauceToDelete.id).subscribe({
      next: (response) => {
        if (response.statusCode === 204) {
          this.toastrService.success(`Successfully deleted the sauce with code: ${sauceToDelete.code}`, response.statusCode.toString());
          location.reload();
        } else {
          this.toastrService.warning(`Hit a snag while trying to delete the sauce: ${sauceToDelete.code}`, response.statusCode.toString());
        }

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.toastrService.error(`Error occurred while trying to delete the sauce: ${sauceToDelete.code}`, error.status.toString());
      }
    });
  }

  onAddEditSauceFormSubmit() {
    this.loading = true;

    if (this.addEditSauceForm != null) {
      this.editMode = this.determineEditMode(this.addEditSauceForm.value);

      if (!this.editMode) {
        const addSauceRequest = this.addEditSauceForm
          .value as AddPizzaSauceRequest;

        addSauceRequest.appName = 'Pizza Shop UI';

        this.addEditSauceForm.controls['id'].disable();

        this.addSauceSubscription = this.apiService
          .addSauce(addSauceRequest)
          .subscribe({
            next: (response) => {
              if (response.statusCode === 201) {
                this.toastrService.success(
                  `Successfully added the new sauce: ${addSauceRequest.code}`,
                  response.statusCode.toString()
                );
                location.reload();
              }

              this.loading = false;
            },
            error: (error) => {
              this.toastrService.error(
                `Error when adding the new sauce: ${addSauceRequest.code}`,
                error.status.toString()
              );
              this.loading = false;
            },
          });
      } else {
        const updateSauceRequest = this.addEditSauceForm
          .value as UpdatePizzaSauceRequest;

        updateSauceRequest.appName = 'Pizza Shop UI';

        this.addEditSauceForm.controls['id'].disable();

        this.updateSauceSubscription = this.apiService
          .updateSauce(updateSauceRequest)
          .subscribe({
            next: (response) => {
              if (response.statusCode === 200) {
                this.toastrService.success(
                  `Successfully updated the sauce: ${updateSauceRequest.code}`,
                  response.statusCode.toString()
                );
                location.reload();
              }

              this.loading = false;
            },
            error: (error) => {
              this.toastrService.error(
                `Error occurred updating the sauce: ${updateSauceRequest.code}`,
                error.status.toString()
              );
              this.loading = false;
            },
          });
      }
    }
  }
}
