import { useEffect, useState } from "react";
import "./App.css" ;
import image from "./assets/currcon.png" ;
function App() {
  const [exchange,setExchange] =useState({}) ;
  const [amount,setAmount] = useState(1) ;
  const [fromCurrency , setFromCurrency] = useState("USD") ;
  const [convertedAmount,setConvertedAmount] = useState(0) ;
  const [toCurrency , setToCurrency] = useState("INR") ;
  
  const API = `https://v6.exchangerate-api.com/v6/a912078e97411f4c2fb3ed8f/latest/${fromCurrency}` ;
  const fetchApi=async()=>{
    try{
      const res = await fetch(API) ; 
      const data = await res.json() ;
      console.log(data) ;
      setExchange(data.conversion_rates) ;
    }catch(error){
      console.log("there is a error") ;
      console.log(error.message) ;
    }
  }
  useEffect(()=>{
    fetchApi() ;
  },[fromCurrency]);

  useEffect(()=>{
    if(exchange && exchange[toCurrency]){
      setConvertedAmount((amount*exchange[toCurrency]).toFixed(2)) ;
    }
  },[amount,fromCurrency,toCurrency,exchange]);

  return (
    <>
      <div className="card">
        <img src={image} alt="test" />
        <h1 className="text-6x1">CURRENCY CONVERTER</h1>
        
        <div className="currency_exchange">

          <div className="input_container">
            <label htmlFor="amount" className="input_label">Amount : </label>
            <input type="number" className="input_field" value={amount} onChange={(e)=>parseFloat(setAmount(e.target.value)) || 0}/>
          </div>

          <div className="input_container">
            <label htmlFor="from_currency" name="from_currency" className="input_label">From Currency : </label>
            <select name="from_currency" value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)} >
              {
                Object.keys(exchange).map(currency =>(
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))
              }
            </select>           
          </div>

          <div className="input_container">
            <label htmlFor="to_currency" name="to_currency" className="input_label">To Currency : </label>
            <select name="to_currency" value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)} >
            {
                Object.keys(exchange).map(currency =>(
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))
              }
            </select>
          </div>

        </div>

        <div className="output">
          <h2>Converted Amount : <b>{convertedAmount}</b></h2>
        </div>
      </div>
    </>
  )
}

export default App
