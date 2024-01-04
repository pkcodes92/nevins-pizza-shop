import { Component } from '@angular/core';
import { Topping } from 'src/app/models/dto';

@Component({
  selector: 'app-topping',
  templateUrl: './topping.component.html',
  styleUrl: './topping.component.scss'
})
export class ToppingComponent {
  loading!: boolean;
  toppings!: Topping[];
}
