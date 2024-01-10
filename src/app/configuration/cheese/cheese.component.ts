import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cheese } from 'src/app/models/dto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cheese',
  templateUrl: './cheese.component.html',
  styleUrl: './cheese.component.scss'
})
export class CheeseComponent implements OnInit, OnDestroy {
  loading!: boolean;
  cheeses!: Cheese[];

  constructor(private apiService: ApiService, private toastService: ToastrService){

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }
}
