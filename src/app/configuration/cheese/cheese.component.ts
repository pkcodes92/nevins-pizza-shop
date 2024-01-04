import { Component } from '@angular/core';
import { Cheese } from 'src/app/models/dto';

@Component({
  selector: 'app-cheese',
  templateUrl: './cheese.component.html',
  styleUrl: './cheese.component.scss'
})
export class CheeseComponent {
  loading!: boolean;
  cheeses!: Cheese[];
}
