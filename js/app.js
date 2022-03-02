console.log('Js Connected successfully');


const loadData = ()=>{
        const searchBtn = document.getElementById('search-input');
        const searchText = searchBtn.value;
        console.log(searchText);
        //clear data
        searchBtn.value="";

        if(searchText==0 || searchText==null || searchText==''){
           alert("Please Enter your proper phone name or band ");
        }
       else{
        //Load Data form input
        const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res=> res.json())
        .then(data =>displaySearch(data))
       }
    
}
//Displayed data Our site

const displaySearch=phonesx=>{
   let phones = phonesx.data.slice(0,20);
    console.log(phones);

// searching header code 
    const title = document.getElementById('search-title');
    title.textContent='';
    const h2 = document.createElement('h2');
    h2.classList.add('result-title');
    h2.innerText='Your Searching Result Are Displayed'
    title.appendChild(h2);
    
// displayed All Phone are you searching
    
    let searchDisplay = document.getElementById('display-searchResult');
    searchDisplay.textContent='';
     console.log(searchDisplay);
     const detailsResult = document.getElementById('details');
     detailsResult.textContent='';
   
    phones.forEach(phone => {
    console.log(phone);
    
        
        const div = document.createElement('div');
        div.classList.add('phones')

        div.innerHTML=`
        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mt-6">
        <a href="#">
            <img  class="rounded-t-lg mx-auto pt-6 " src="${phone.image}" alt="" />
        </a>
        <div class="p-5">
            
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">${phone.phone_name}</h5>
                <div>
                <h6 class="mb-2 text-xl  tracking-tight text-gray-900">Band: ${phone.brand}</h6>
                </div>
        
            <p class="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2022 so far, in reverse chronological order.</p>

            <button onclick="loadId('${phone.slug}')" class="bg-cyan-500 hover:bg-cyan-600 p-3 rounded">More Details</button>
        </div>
    </div>
`;

            searchDisplay.appendChild(div);
    });
    //release date condition
 // adding load more button if any more item left to load 
 const moreDiv = document.getElementById('loadMore');

 console.log(phonesx);

 // Load more condition
 if (phonesx.data.slice(20).length !== 0) {
     const lengthofArr = phonesx.data.length;
     restPhone = phonesx.data.slice(21, lengthofArr);
     const loadButton = document.createElement('div');
     loadButton.classList.add("flex");
     loadButton.classList.add("justify-center");
     loadButton.innerHTML = `<button type="button" onclick ="loadAll(restPhone)"
     class="py-2.5 mt-6 px-5 mr-2 mb-2 w-3/5 text-sm font-bold text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">Load More</button>
     `
     moreDiv.appendChild(loadButton);
 }
}
// loading data using Id from API 
const loadId = phoneId=>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>moreDetails(data.data))
}
// dispalyed Details Section 

const moreDetails =finderId=>{
    console.log(finderId);
    document.getElementById("details").scrollIntoView({
        behavior: "smooth"
    });
    const detailsResult = document.getElementById('details');
    detailsResult.textContent='';
    detailsResult.innerHTML=`<div class="max-w-xl bg-white rounded-lg border border-gray-200 shadow-md  mt-6">
        <img  class="rounded-t-lg mx-auto pt-6 " src="${finderId.image}" alt="" />
    <div class="p-5">
        
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Band Name : ${finderId.name}</h5>
            
            <h6 class="mb-2 text-l  tracking-tight text-gray-900 "><span class="font-bold">Band :</span class="font-bold"> ${finderId.brand} </h6>
            <p><span class="font-bold">Release Date: </span> <span class="mb-2 tracking-tight text-gray-900 font-mono">${releaseInfo(finderId.releaseDate)}</span></p>
            
        
            <div class="bg-sky-200 p-6 ">
            <span class="font-bold">Main Feature: </span>
            <ul class="">
            <li> <span class="font-bold">Storage : </span>${finderId.mainFeatures.storage}</li>
            <li><span class="font-bold">Display Size :</span> ${finderId.mainFeatures.displaySize}</li>
            <li><span class="font-bold">ChipSet :</span> ${finderId.mainFeatures.chipSet}</li>
            <li><span class="font-bold">memory :</span> ${finderId.mainFeatures.memory}</li>
            <li> <span class="font-bold">sensors : </span>${finderId.mainFeatures.sensors}</li>
            </ul>
            </div>
            
            <div class="bg-zinc-300  p-6">
            <span class="font-bold"> Other Inrmation: </span>
            <ul class="break-all">
            <li class="break-all"><span class="font-bold">Wlan : </span> ${finderId.others.WLAN}</li>
            <li class="break-all"><span class="font-bold">Bluetooth : </span> : ${finderId.others.Bluetooth}</li>
            <li class="break-all"><span class="font-bold"> GPS : </span> : ${finderId.others.GPS}</li>
            <li><span class="font-bold"> NFC : </span> : ${finderId.others.NFC}</li>
            <li><span class="font-bold">Radio : </span> ${finderId.others.Radio}</li>
            </ul>
            </div>
            

           <button class="bg-cyan-500 hover:bg-cyan-600 p-3 rounded mt-4"><a target=_blank href="https://www.amazon.com/s?k=mobile&rh=n%3A7072561011&dc&crid=1NAE47BMXZ93M&qid=1646136075&rnid=2941120011&sprefix=mobile%2Caps%2C496&ref=sr_nr_n_3">Buy Now</a></button> 
    </div>
</div>
`;

}

//release condition
const releaseInfo = release =>{
    if(release==undefined || release== null || release.lenght == 0){
        return 'Release Date Not Found';
    }
    else{
        return release;
    }
}

// loading more phone 
const loadAll = restPhone => {
    const moreDiv = document.getElementById('loadMore');
    moreDiv.textContent = '';
    const morePhone = document.getElementById('MorePhone');
    restPhone.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mt-6">
        <a href="#">
            <img  class="rounded-t-lg mx-auto pt-6 " src="${phone.image}" alt="" />
        </a>
        <div class="p-5">
            
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">${phone.phone_name}</h5>
                <div>
                <h6 class="mb-2 text-xl  tracking-tight text-gray-900">Band: ${phone.brand}</h6>
                </div>
        
            <p class="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2022 so far, in reverse chronological order.</p>

            <button onclick="loadId('${phone.slug}')" class="bg-cyan-500 hover:bg-cyan-600 p-3 rounded">More Details</button>
        </div>
    </div>
`;

        morePhone.appendChild(div);
    })
}

