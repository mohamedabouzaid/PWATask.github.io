let postselect,postcontainer;
//BOM load
window.addEventListener('load',async function(){

    selectPost=this.document.getElementById('selectPost');
    divPost=this.document.getElementById('divPost');
    selectPost.addEventListener('change',await display);

    await fillselect();
   if(this.navigator.serviceWorker){
     try{
         //link to service worker
        await this.navigator.serviceWorker.register('./sw.js');
     }
     catch(err){
         //no register
        console.log("SW Not Registered",err);
     }
   }
   else{
    console.log("Service worker Not Supported");
   }





})


async function fillselect(){
    // loading posts from https://jsonplaceholder.typicode.com/posts
    let resp=await fetch("https://jsonplaceholder.typicode.com/posts");
    let jsobjects=await resp.json();
    // console.log(jsobjects);
    selectPost.innerHTML=jsobjects.map(post=>{
        return `<option value="${post.id}">${post.title}</option>`
    })
}
async function display(event){
// console.log(event.target.value);
let targetpost = await fetch(`https://jsonplaceholder.typicode.com/posts/${event.target.value}`);
let postasjs=await targetpost.json();
divPost.innerHTML=`
    <div style="border:2px solid black;padding:10px;background-color:lightblue;margin:10px auto;width:80%">
        <h2 style="padding:10px;border:2px solid black;text-align:center;background-color:lightgray;">${postasjs.title}</h2>
        <p style="margin:10px auto;text-align:center;background-color:light;">${postasjs.body}</p>
    </div>
`;
}