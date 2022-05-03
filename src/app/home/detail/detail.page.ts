import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  price_EUR=0
  price_USD=0

  constructor(private activateRoute:ActivatedRoute,
            private servicesCoin: ServicesService) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      const date = paramMap.get('date')
      this.detail(date)
   })
  }
  

  //Devuelve el detalle(precio) del dia seleccionado en moneda EUR y USD
  //NOTA: en el detalle no muestro el precio en moneda colombiana(COP) ya que 
  //la API coingecko no lo pone a disposicion
  //Esto cumple con los requerimientos cuatro(4) y cinco(5)
  detail(f:string){
 

    let date=f.split('/')
    let d =date[0]
    let m =date[1]
    let a= date[2]

    //Este formato es necesario ya que la APi de coingecko lo necesita asi como parametro
    f=d+'-'+m+'-'+a

    
    this.servicesCoin.getDetails(f).subscribe(res=>{
      this.price_EUR=res.market_data.current_price.eur
      this.price_USD=res.market_data.current_price.usd

  
    })
  }




}



