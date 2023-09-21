// api of all category 
const loadCategoryItem = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json(); 
     const categoryContainer = document.getElementById('category-container');
    data.data.forEach(category => {
        categoryContainer.innerHTML += `
        <button onclick="handleCategoryItems('${category.category_id}')" class="btn focus:bg-[#FF1F3D] active:bg-red-300 focus:text-white hover:bg-[#FF1F3D] hover:text-white bg-[#46454546] text-[#252525d3] normal-case btn-sm font-normal" id="${category.category_id}">${category.category}</button>
        `;      
    });    
    
}

// handling category button
let cardData =[];
const handleCategoryItems = async (id) => {   
    const res = await fetch (`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();   
    cardData = data.data;
    mainContainer(cardData);
}

const mainContainer = (data) => { 
    const videoContainer = document.getElementById('video-container');
    const blankCategoryContainer = document.getElementById('blank-category');
    
    videoContainer.innerHTML = '';
    blankCategoryContainer.innerHTML = '';
    data.length ? data.forEach(video =>{    
        videoContainer.innerHTML += `     
        <div class="w-full relative">
            <img src=${video.thumbnail} alt="" class="w-full rounded-xl h-56 mb-6 relative">
            ${video.others.posted_date ? `<div class="absolute px-3 py-2 rounded-md bg-black bottom-28 right-3 text-white text-xs">${makeTime(video.others.posted_date)}</div>` : ''}
            <div class="flex items-start gap-5">
                <img src=${video.authors[0].profile_picture} alt="" class="w-10 h-10 rounded-full">
                <div class="space-y-2">
                    <h5 class="font-bold text-base">${video.title}</h5>
                    <p class="text-[#171717B2] text-sm font-normal">${video.authors[0].profile_name}
                    ${video.authors[0].verified ? '<img src="./images/fi_10629607.svg" alt="" class="inline">' :'' }
                    </p>
                    <p class="text-[#171717B2] text-sm font-normal"><span>${video.others.views}</span> views</p>
                </div>
            </div>
        </div>
        `;
    }) : blankCategoryContainer.innerHTML=`
           <img src="./images/icon.png" alt="" class="w-32 mx-auto">
           <h2 class="font-bold text-3xl text-center pt-4">Oops!! sorry, there is no <br> content here</h2>
            `;        
}

// sortedItem by view
function sortedItem () {
    cardData.sort((item1,item2)=>{
        return (+item2.others.views.slice(0,-1) - +item1.others.views.slice(0,-1));
    })
    mainContainer(cardData);
}


// second to hour and minutes conversion
const makeTime = (value) =>{
    const sec = parseFloat(value); 
    const hour = Math.floor(sec / 3600);  
    const remainingSec = (sec % 3600);
    const min = Math.floor(remainingSec / 60);
    const hourDisplay = hour > 0 ? hour + (hour>1? ' hrs':' hr') :'';
    const minuteDisplay = min > 0 ? min + (min > 1? ' mins':' min') :'';
    return(`${hourDisplay} ${minuteDisplay} ago`);  
}


// initially all button clicked and all category to be shown
handleCategoryItems('1000');
loadCategoryItem()


// Root page
const handleBlogPage = () =>{
    window.location.href = 'blog.html'
}
const redirectToNewPage = () => {
    window.location.href = 'index.html';
}
