
//static cash
let cacheName='staticCash'
let cachedAssets=[
 './index.html',
 './about.html',
 './style.css',
 './app.js',
 './assets/home.jpg',
 './assets/profile.jpg',
 './fallback.json',
 './profile.html',
 './assets/profile.jpg'

]


//install
self.addEventListener('install',async function(){
    //create cash
    let creatCash= await caches.open(cacheName)
    await creatCash.addAll(cachedAssets)
    //skip waiting in change in ws 
    await self.skipWaiting();
    //console.log('install');

});

//active
self.addEventListener('activate',function(){
   // console.log('iactive');

});


//fetch
self.addEventListener('fetch',async function(event){
    //console.log('featch');
    if(!navigator.onLine){  
     //get data from cash
      return await event.respondWith(DataCash(event.request));
    }else{
       //get data from network
      console.log('online');
      return await event.respondWith(networkCash(event.request));
    }

});


async function DataCash(req){
    //get data from cash
    console.log('cash');
    return await caches.match(req)||await caches.match('fallback.json'); 
}
async function networkCash(req){
    console.log('network');
    // dynamic cash
    let dynamicCash=await caches.open('dynamicCache');
    let response=await fetch(req);
    await dynamicCash.put(req,response.clone());
    return response;
}
