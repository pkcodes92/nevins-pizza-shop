import { Component } from '@angular/core';
import { ToppingType } from 'src/app/models/dto';

@Component({
  selector: 'app-topping-type',
  templateUrl: './topping-type.component.html',
  styleUrl: './topping-type.component.scss'
})
export class ToppingTypeComponent {
  loading!: boolean;
  toppingTypes!: ToppingType[];
}
