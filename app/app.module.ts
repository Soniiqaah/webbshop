import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService }  from './product.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductDetailComponent,
    ProductsComponent,
  ],
  providers: [
    ProductService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
