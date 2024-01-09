import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ToppingTypeComponent } from './topping-type/topping-type.component';
import { ToppingComponent } from './topping/topping.component';
import { SauceComponent } from './sauce/sauce.component';
import { PizzaSizeComponent } from './pizza-size/pizza-size.component';
import { CrustComponent } from './crust/crust.component';
import { CheeseComponent } from './cheese/cheese.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      ConfigComponent,
      ToppingTypeComponent,
      ToppingComponent,
      SauceComponent,
      PizzaSizeComponent,
      CrustComponent,
      CheeseComponent
    ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    ReactiveFormsModule
  ]
})
export class ConfigurationModule { }
