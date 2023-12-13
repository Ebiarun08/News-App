const apiKey ="681d86f6317349c8aabf5c944403ebe9";
const api ="https://newsapi.org/v2/top-headlines?country=in&apiKey=681d86f6317349c8aabf5c944403ebe9";

const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container")
//"in" stands for india
 const country = "in";
 const options=["general","entertainment","health","science","sports","technology"];

 //100 requests per day

 let requestURL ;


 //create card from data
 const generateUI = (articles)=>{
    for(let item of articles){
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML =`<div class= "news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt=""/>
        </div>
        <div class ="newscontent">
            <div class="news-title"
                ${item.title}
            </div>
            <div class = "news-description">
            ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target = "_blank" class="view-button">Read More</a>
        </div>`
     container.appendChild(card);       
    }
 };
 //News API call
 const getNews = async () =>{
    container.innerHTML="";
    let response = await fetch (requestURL);
    if (!response.ok){
        alert("Data unavailable at the moment. Please try again later");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles)
 };


 //Category selection

 const selectCategory =(e,category)=>{
    let options = document.querySelectorAll(".option");
    options.forEach((element)=>{
        element.classList.remove("active")
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
 };

 //Options Buttons 
 const createOptions=()=>{
    for (let i of options){
        optionsContainer.innerHTML += `<button class="option ${i=="general"?"active":""}" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
 }

 const  init=()=>{
    optionsContainer.innerHTML="";
    getNews();
    createOptions();
 };

 window.onload =()=>{
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apikey=${apiKey}`;
    init();

 }