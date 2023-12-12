import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { ConfigurationRoutingModule } from './config/configuration-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ConfigComponent,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
