import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './basics/navbar/navbar.component';
import { HeaderComponent } from './basics/header/header.component';
import { FooterComponent } from './basics/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './basics/sidebar/sidebar.component';
import { SharedService } from './services/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserMenuComponent } from './basics/user-menu/user-menu.component';
import { CartModule } from './cart/cart.module';
import { CartService } from './services/cart/cart.service';
import { AuthService } from './services/auth/authservice';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    UserMenuComponent,



  ],
  imports: [
    BrowserModule,
    CartModule,
    AppRoutingModule,
    HttpClientModule,
    OrderModule,
    ProductModule,
    FormsModule,
    AuthModule,
    AddressModule,
    ReactiveFormsModule,
    NgChartsModule,
    
  ],
  providers: [
    SharedService,
    CartService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
