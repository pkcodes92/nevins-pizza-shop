import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-hourglass"></div>',
    styleUrl: './loading-spinner.component.scss',
    standalone: false
})
export class LoadingSpinnerComponent {
    
}