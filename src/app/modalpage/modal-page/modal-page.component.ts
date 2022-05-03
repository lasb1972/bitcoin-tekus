import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

  priceEUR:0
  priceUSD:0

  constructor(navParams: NavParams) {
    this.priceEUR=navParams.get('priceEUR');
    this.priceUSD=navParams.get('priceUSD');
  }

  ngOnInit() {}

  salir(){
    window.close(); 
  }


}

