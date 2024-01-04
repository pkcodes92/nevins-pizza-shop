import { Component } from '@angular/core';
import { PizzaSize } from 'src/app/models/dto';

@Component({
  selector: 'app-pizza-size',
  templateUrl: './pizza-size.component.html',
  styleUrl: './pizza-size.component.scss'
})
export class PizzaSizeComponent {
  loading!: boolean;
  pizzaSizes!: PizzaSize[];
}
