import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showVar: boolean = false;

    toggleChild(){
        this.showVar = !this.showVar;
        console.log(this.showVar )
    }
}
