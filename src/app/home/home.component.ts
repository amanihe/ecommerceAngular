import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  liste = [ 
    { image:"assets/packpc.jpg",
    nom : "télévision", 
  prix : 15
    }, 
    { image:"assets/packpc.jpg",
      nom : "pack pc", 
    prix : 15
    }, 
    {image:"assets/packpc.jpg",
    nom : "téléphone", 
  prix : 15
    }, 
    {image:"assets/packpc.jpg",
    nom : " unité de pc", 
  prix : 15
    }  
    ] ;
    liste2 = [ 
      { image:"assets/manette.jpg",
      nom : "télévision", 
    prix : 15.25
      }, 
      { image:"assets/manette.jpg",
        nom : "pack pc", 
      prix : 17.55
      }, 
      {image:"assets/manette.jpg",
      nom : "téléphone", 
    prix : 22.99
      }, 
      {image:"assets/manette.jpg",
      nom : " unité de pc", 
    prix : 9.98
      }  
      ] ;
  constructor() { }

  ngOnInit(): void {
  }

}
