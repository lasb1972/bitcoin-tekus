import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from '../services/services.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  listprices=[]
  price_EUR=0
  price_USD=0
  dolarDayActual=0
  timeActual=''

  
  listpricesOffLine=[]
  price_EUR_OffLine=0
  price_USD_OffLine=0
  dolarDayActualOffLine=0



  //Formatemaos la fecha actual
  formatDateActual(date){   
    let res=''

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10){
     res=`/0${month}/${year}`
    }else{
     res=`/${month}/${year}`
    }

    if(day<10){
      res=`0${day}`+res
    }else{
      res=`${day}`+res
    } 

     return res
  }
 
  constructor(private servicesCoin: ServicesService,
              public modalController: ModalController) {

                this.servicesCoin.getPriceActualBitcoin().subscribe(res=>{
                  this.dolarDayActual=res.market_data.current_price.usd
                })  
 
    this.timeActual=this.formatDateActual(new Date())  

}



  from = '15/04/2022'
  to='03/05/2022' 

  ngOnInit(): void {
 


    

    //Se busca el historial de precios(de cierre) para Bitcoin dado el rango de fechas [from(Fecha Desde), to(Fecha Hasta)]
    this.getPrices()
    //Se busca precio del Bitcoin para el dia de hoy
    this.getPriceActualBitcoin()

   
    
    setInterval(()=>{
      if (navigator.onLine){
        
        console.log("Estamos onLine")
      }else{
        this.saveData()
        console.log("Estamos OffLine")                  }    
    },5000)

  }

  saveData(){
   //this.price_EUR=this.price_EUR_OffLine
  }

  
  getPriceActualBitcoin(){
    //Llamamos al servicio que nos devuelve el precio actual del bitcoin 
    //Se actualiza cada 60 segundos el dia actual en la lista
    //Esto cumple con el requerimiento dos(2)
    setInterval(()=>{
      this.servicesCoin.getPriceActualBitcoin().subscribe(res=>{
        this.dolarDayActual=res.market_data.current_price.usd
      })    
    },60000)
  }
  
  //Devuelve el historial de precios(de cierre) para Bitcoin en el rango de fecha [from,to]
  //Esto cumple con el requerimiento uno(1) y tres(3)
  getPrices(){
    this.servicesCoin.getPriceCoinXRangeDates(this.from,this.to).subscribe(res=>{
      res.prices.map(data =>{
            //El ultimo cierre es cuando la hora del dia es 23H
            //por eso solo selecciono todos los Date(data[0]).getHours()===23
            if(new Date(data[0]).getHours()===23){

                  this.listprices.push(
                                  {
                                    fecha:this.formatDateActual(new Date(data[0])),//.toLocaleDateString(),
                                    price:data[1]
                                  }
                              )
            }

      })

    })
      
  }


  salir(){
    
  }

  


}


