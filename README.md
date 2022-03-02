# simplegwei ⛽️

## What is this?

An amazingly simple and blazing fast gas tracker for Ethereum. All is open source, with a straightforward API to call giving everything from current gas, to historical data.


![DEMO](https://user-images.githubusercontent.com/60443878/156424147-eddde549-e280-4477-987b-8a7f85e78201.gif)




## Deployments 💻

Vercel: https://simplegwei.com

## For development 🧑‍💻

### Scripts

````npm install````

```npm run dev```


### Important notes

This is a super simple repo- everything is in ```index.js``` and only uses 2 external libraries! You'll need to ensure a <b>valid api key </b> in your .env file which I mention below

- Run npm install && npm run dev, then go to http://localhost:3000/
- Edit frontend in index.js
- Styling itegrated with tailwind

## Make your own (API)

While there's not automated proccess (yet), shoot me a DM for key

&#x2a; more documentation to come &#x2a;

Get current gas:

```
const res = await fetch("https://api.simplegwei.com/currentgas", {
      method: "POST",
      headers: {"authorization": your_api_key, 'Content-Type': 'application/json' },
      }).catch(function() {
        console.log("errored")
 });
```

## Connect with me 🤗

https://twitter.com/aleemrehmtulla

https://aleemrehmtulla.com

https://www.linkedin.com/in/aleemrehmtulla/
