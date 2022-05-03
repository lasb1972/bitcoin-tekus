import { HttpClient } from '@angular/common/http';

import { Injectable, OnInit } from '@angular/core';
import { Coin } from '../models/Coin';
import { Detail } from '../models/Detail';
import { Actual } from '../models/Actual';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { 
  
  }

  //Devuelve el detalle(precio) del dia seleccionado en moneda EUR y USD
  //NOTA: en el detalle no muestro el precio en moneda colombiana(COP) ya que 
  //la API coingecko no lo pone a disposicion
  getDetails(f:string){
    let URL_API_PRICE_USD_EUR=`https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${f}`
    
    return this.http.get<Detail>(URL_API_PRICE_USD_EUR)
  }

  //
  getPriceCoinXRangeDates(from:string,to:string){
  
    let date = from.split('/')
    let d = date[0]
    let m = date[1]
    let a = date[2] 

    //Convertimos la fecha DESDE(from) entendible por humano a fecha UNIX que solicita la API coingecko
    var fromUnix = Date.parse(`${a}-${m}-${d}T00:00:00`).valueOf()/1000

    console.log("A: "+fromUnix)
     
    date = to.split('/')
    d = date[0]
    m = date[1]
    a = date[2] 
    
    //Convertimos la fecha HASTA(to) entendible por humano a fecha UNIX que solicita la API coingecko
     var toUnix = Date.parse(`${a}-${m}-${d}T00:00:00`).valueOf()/1000

    console.log("B: "+toUnix)

    //Consultamos API coingecko con id=bitcoin, vs_currency=usd, from=fromUnix, to=toUnix
    //Esto cumple con el requerimiento uno(1)
    let URL_API_PRICE_X_RANGE=`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?id=bitcoin&vs_currency=usd&from=${fromUnix}&to=${toUnix}`
    
    return this.http.get<Coin>(URL_API_PRICE_X_RANGE) 
    
  
  }

  getPriceActualBitcoin(){
    //Consultamos API coingecko que nos devuelve el precio actual del bitcoin 
    //Forma parte del requerimiento dos(2)
    let URL_API_PRICE_ACTUAL_BITCOIN_EUR_USD='https://api.coingecko.com/api/v3/coins/bitcoin'
    return this.http.get<Actual>(URL_API_PRICE_ACTUAL_BITCOIN_EUR_USD)
  }


}
