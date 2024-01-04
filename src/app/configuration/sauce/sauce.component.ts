import { Component } from '@angular/core';
import { PizzaSauce } from 'src/app/models/dto';

@Component({
  selector: 'app-sauce',
  templateUrl: './sauce.component.html',
  styleUrl: './sauce.component.scss'
})
export class SauceComponent {
  loading!: boolean;
  pizzaSauces!: PizzaSauce[];
}
