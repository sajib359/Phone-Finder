console.log('Js Connected successfully');

const loadData = ()=>{
        const searchBtn = document.getElementById('search-input');
        const searchText = searchBtn.value;
        console.log(searchText);
        searchBtn.value=" ";

        const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res=> res.json())
    .then(data =>console.log(data))
}