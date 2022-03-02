import Head from 'next/head'
import { useEffect, useState } from 'react';
import swal from 'sweetalert'
import {BsFillMoonStarsFill, BsGithub} from 'react-icons/bs'
export default function Home() {
  // declare your apikey
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // declare all states (used to show data)
  const [gas, setGas] = useState("~~");
  const [price, setPrice] = useState("~~~.~~");
  const [level, setLevel] = useState("~~~ 😵‍💫");
  const [secondsSince, setSecondsSince] = useState("~");
  const [dark, setDark] = useState(false);
  
  // enables dark mode (keeps value on refresh)
  function darkFunction(){
      if(typeof window !== 'undefined'){
        if(localStorage.getItem('dark') !== "dark on"){
          localStorage.setItem('dark', "dark on");
          setDark(true)
        } else {
          localStorage.setItem('dark', false);
          setDark(false)
        }
      }
  }
  
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

    // if there is no error, parse and display the data
    if(myStatus===true){
      // take object to json
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
      setSecondsSince(timeSince)
    }, 1000);
  }

  // onload, set dark mode and call the api
  useEffect(() => {
    if(typeof window !== 'undefined'){
      if(localStorage.getItem('dark') === "dark on"){setDark(true)}
      else {setDark(false)}
    }
    callApi()
    timeFunction()
  }, [])
   
 
  return (
    <div className={`${dark ? 'h-screen  bg-gray-900 w-screen ' : 'h-screen  bg-gray-200 w-screen '} `} >
      <Head>
        <title>ETH Gas Tracker | simplegwei</title>
        <meta name="description" content="Track the transaction fees of Ethereum using our simple and blazing fast gas tracker!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex px-7 md:px-20 pt-12 md:pt-12 justify-end h-fit">
        <button className='hover:cursor-pointer pr-6'> 
          <a target="_blank" rel="noreferrer" href='https://github.com/aleemrehmtulla/simplegwei'>
            <BsGithub size={40} className={`${dark ? 'fill-white' : 'fill-black'}`}/>
          </a> 
        </button> 
        <button className='hover:cursor-pointer' onClick={darkFunction} >
          <BsFillMoonStarsFill size={40} className={`${dark ? 'fill-white' : 'fill-black'}`} />
        </button>
      </div>

      <div className='pt-20 md:pt-24'>
        <div className=" text-center">
          <h1 className={`${dark ? 'text-gray-300' : 'text-black'} text-4xl md:text-6xl  font-bold `} >ETH Gas Tracker</h1>
          <p className={`${dark ? 'text-gray-300' : 'text-black'} font-semibold  text-xl md:text-3xl pt-2 `}>ETH Price ${price} USD</p>
        </div>
    
        <div className="grid place-content-center mt-8 mr-3 ml-3 ">
          <div className={`${dark ? 'border-gray-300' : 'border-black'} text-center border-solid px-9 py-8 md:px-32 md:py-18 rounded-3xl border-[6px]  w-fit  `} >
            <div className='flex'>
              <h1 className={`${dark ? 'text-gray-300' : 'text-black'} text-8xl md:font-bold font-semibold`}>
                {gas}
              </h1>
              <h1 className='text-7xl pt-3 pl-1'>
                ⛽️
              </h1>
            </div>
            <p className={`${dark ? 'text-gray-300' : 'text-black'} text-2xl pt-1 w-full font-medium `} >This is {level}</p>
            <p className={`${dark ? 'text-gray-300' : 'text-black'} pt-1`}>Last updated {secondsSince} seconds ago</p> 
          </div>
        </div>

      </div>

    </div>
  )
}
