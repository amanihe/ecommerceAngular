import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  vide: boolean=false;
  constructor(
    private CartService: CartService,
    private service: SharedService,
    private authService: AuthService,
    private router:Router
  ) {}
  
  ngOnInit(): void {

  }

}
