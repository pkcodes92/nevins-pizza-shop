import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { ConfigurationRoutingModule } from './config/configuration-routing.module';
import { ToppingTypeComponent } from './topping-type/topping-type.component';
import { ToppingComponent } from './topping/topping.component';
import { SauceComponent } from './sauce/sauce.component';
import { PizzaSizeComponent } from './pizza-size/pizza-size.component';
import { CrustComponent } from './crust/crust.component';

@NgModule({
  declarations: [
  
    ToppingTypeComponent,
       ToppingComponent,
       SauceComponent,
       PizzaSizeComponent,
       CrustComponent
  ],
  imports: [
    CommonModule,
    ConfigComponent,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
