import Head from 'next/head'
import { useEffect, useState } from 'react';
import swal from 'sweetalert'
export default function Home() {
  const [gas, setGas] = useState("~~");
  const [price, setPrice] = useState("~~~.~~");
  const [level, setLevel] = useState("~~~ 😵‍💫");
  const [secondsSince, setSecondsSince] = useState("~");
  
  // declare your apikey
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
  async function callApi(){
    // set a status to catch errors
    let myStatus = true

    // call the api
    const res = await fetch("https://api.simplegwei.com/currentgas", {
      method: "POST",
      headers: {"authorization": apiKey, 'Content-Type': 'application/json' },
      }).catch(function() {
        swal("Oops!", "You have lost connection ser!", "error");
        myStatus = false
    });

    if(myStatus===true){
    const result = await res.json()
      
    // set gas and eth price
    setPrice(result.eth)
    const gas = result.gas / 1000000000;
    setGas(Math.round(gas * 1) / 1)         
      
    // set level acording to gas
    if(gas > 120){setLevel("high 😡")}
    else if(gas > 70){setLevel("medium 😐")}
    else if(gas < 70){setLevel("low 😄")}

    // return time this function was called
    const timeAtfetch = new Date().getTime()
    return timeAtfetch
    }
  }


  async function timeFunction(){
    // grab the last time it was called
    let fetchedTime = await callApi()

    // every second, figure out how long since last update- if more than 6 seconds, call the api again
    setInterval( async ()  => {
      const timeSince = Math.floor((Date.now() - fetchedTime) / 1000)
     
      if(timeSince >= 6){fetchedTime = await callApi()}
     
      setSecondsSince(timeSince)}, 1000);
  }

  useEffect(() => {
    callApi()
    timeFunction()
  }, [])
   
 
  return (
    <div className='h-screen w-screen grid pb-20 md:pb-0  place-content-center bg-gray-200'>
      <Head>
        <title>ETH Gas Tracker | simplegwei</title>
        <meta name="description" content="Track the transaction fees of Ethereum using our simple and blazing fast gas tracker!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <div className=" text-center">
        <h1 className='text-4xl md:text-6xl  font-bold'>ETH Gas Tracker</h1>
        <p className='font-semibold text-xl md:text-3xl pt-2'>ETH Price ${price} USD</p>
      </div>
    
      <div className="grid place-content-center mt-8 mr-3 ml-3 ">
        <div className='text-center border-solid px-9 py-8 md:px-32 md:py-18 rounded-3xl border-[6px] border-black  w-fit '>
            <div className='flex'><h1 className='text-8xl md:font-bold font-semibold'>{gas}</h1><h1 className='text-7xl pt-3 pl-1'>⛽️</h1></div>
            <p className='text-2xl w-full font-medium pt-4'>This is {level}</p>
            <p className='pt-4'>Last updated {secondsSince} seconds ago</p> 
        </div>
      </div>

    </div>
  )
}
