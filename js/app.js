console.log('Js Connected successfully');


const loadData = ()=>{
        const searchBtn = document.getElementById('search-input');
        const searchText = searchBtn.value;
        console.log(searchText);
        searchBtn.value="";

        const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res=> res.json())
    .then(data =>displaySearch(data.data))
}
const displaySearch=phones=>{
    console.log(phones);
    // for(let phone of phones){
    //     console.log(phone);
    // }
    const title = document.getElementById('search-title');
    const h2 = document.createElement('h2');
    h2.classList.add('result-title');
    h2.innerText='Your Searching Result are Displayed'

    title.appendChild(h2);
    phones.forEach(phone => {
        console.log(phone);
        let searchDisplay = document.getElementById('display-searchResult');
        console.log(searchDisplay);
        
        const div = document.createElement('div');
        div.classList.add('phones')

        div.innerHTML=`
        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mt-6">
        <a href="#">
            <img  class="rounded-t-lg mx-auto pt-6 " src="${phone.image}" alt="" />
        </a>
        <div class="p-5">
            
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${phone.phone_name}</h5>
                <div>
                <h6 class="mb-2 text-xl  tracking-tight text-gray-900 dark:text-white">Band: ${phone.brand}</h6>
                </div>
        
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

            <button onclick="loadId('${phone.slug}')" class="bg-cyan-500 hover:bg-cyan-600 p-3 rounded">More Details</button>
        </div>
    </div>
`;

                        searchDisplay.appendChild(div);
    });
}

const loadId = phoneId=>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>moreDetails(data.data))
}

const moreDetails =finderId=>{
    console.log(finderId);
    const detailsResult = document.getElementById('details');
    detailsResult.innerHTML=`<div class="max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mt-6">
    <a href="#">
        <img  class="rounded-t-lg mx-auto pt-6 " src="${finderId.image}" alt="" />
    </a>
    <div class="p-5">
        
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Band Name :${finderId.name}</h5>
            <div class="flex">
            <h6 class="mb-2 text-l  tracking-tight text-gray-900 dark:text-white">Band : ${finderId.brand} </h6>
            <p class="mb-2   tracking-tight text-gray-900 dark:text-blue font-mono">${finderId.releaseDate} </p>
            
            </div>
            <div class="bg-sky-200 ">
            <span>Main Feature: </span>
            <ul class="">
            <li>Storage : ${finderId.mainFeatures.storage}</li>
            <li>Display Size : ${finderId.mainFeatures.displaySize}</li>
            <li>ChipSet : ${finderId.mainFeatures.chipSet}</li>
            <li>memory : ${finderId.mainFeatures.memory}</li>
            <li>sensors : ${finderId.mainFeatures.sensors}</li>
            </ul>
            </div>
            

            <a class="bg-cyan-500 hover:bg-cyan-600 p-3 rounded mt-6" href="https://www.amazon.com/s?k=mobile&rh=n%3A7072561011&dc&crid=1NAE47BMXZ93M&qid=1646136075&rnid=2941120011&sprefix=mobile%2Caps%2C496&ref=sr_nr_n_3">Buy Now</a>
    </div>
</div>
`;


}