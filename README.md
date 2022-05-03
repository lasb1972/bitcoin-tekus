# bitcoin-tekus
reto tecnico desarrollador fullstack aplicaciones

0) API usada fue: coingecko 
1) Se ha creado un listado de precios en dolares(USD) con el cual cerro el Bitcoin (precio de cierre)
    durante las 2 ultimas semanas y dia actual. 
	
	Metodo usado para esto: getPriceCoinXRangeDates
	Api usada: https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?id=bitcoin&vs_currency=usd&from=${fromUnix}&to=${toUnix}
	          
			        donde fromUnix y toUnix son las fechas Desde y Hasta que solicita la Api de coingecko  y deben estar en formato Unix
    					
					
					
2) El precio para el día actual en la lista, se muestra en tiempo real y el mismo se actualiza automaticamente cada 60 segundos.
    
	Metodo usado para esto: getPriceActualBitcoin
	Api usada: https://api.coingecko.com/api/v3/coins/bitcoin
	
3) El precio para el resto de días en la lista es estático y equivale al precio de cierre de dicha fecha en 
dólares (USD).  

    Sobre este punto, ya la solucion que di en el punto 1) solventa este paso 3)
	
4) Al presionar un día de la lista se mostrará una nueva pantalla mostrando el detalle del día 
seleccionado.

    Metodo usado para dar solucion a este punto:  getDetails(f)   donde f es una fecha con formato: DD-MM-AAAA  (Este formato es necesario ya que la APi de coingecko lo necesita asi como parametro)
	Api usada: `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${f}`
    Nota: solo se muestra el precio en Dólar (USD) y Euro (EUR). No se muestra el precio en moneda colombiana(COP) ya que  la API coingecko no lo pone a disposicion 


	Nota Finales: 1) la Fecha Desde(from) y Fecha_Hasta(to) de dos semanas las he ingresado en la pagina 'home.page.ts'
	              2) El proyecto fue creado o ionic
                3) Se uso Electron		
