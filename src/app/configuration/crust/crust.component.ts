import { Component, OnDestroy, OnInit } from '@angular/core';
import { Crust } from 'src/app/models/dto';

@Component({
  selector: 'app-crust',
  templateUrl: './crust.component.html',
  styleUrl: './crust.component.scss'
})
export class CrustComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  editMode: boolean = true;
  crusts!: Crust[];

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      
  }
}
