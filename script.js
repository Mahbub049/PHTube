const categories = document.getElementById('btn-category');
const videoContainer = document.getElementById('videosContainer');
const sorted = document.getElementById('sorting');
let selectedCategory = 1000;
let sortByView = false;

sorted.addEventListener('click',()=>{
    sortByView = true;
    categoryByID(selectedCategory,sortByView)
})

const jsonCategory = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categories = data.data;
    categoryShow(categories);
    
}

const categoryShow = category => {
    category.forEach(cat => {
        const catBtn = document.createElement('button');
        catBtn.classList = `catClass font-medium px-5 py-2 rounded-md bg-[#25252526]` ;
        catBtn.innerText = cat.category;
        catBtn.addEventListener('click', () => {
            categoryByID(cat.category_id);
            const btns = document.getElementsByClassName('catClass');
            for(const btn of btns){
                    btn.classList.remove('bg-[#FF1F3D]', 'text-white')
                    btn.classList.add('bg-[#25252526]')
                }
                catBtn.classList.add('bg-[#FF1F3D]', 'text-white')
                catBtn.classList.remove('bg-[#25252526]')
        });
        categories.appendChild(catBtn);
    });
}

function categoryByID(categoryID, sorting){
    fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
    .then(response=> response.json())
    .then(data=>{
        selectedCategory = categoryID;
        const videos = data.data;
        const checking = {data};
        console.log(videos.others)
        if(sorting){
            videos.sort((a,b)=>{
                const firstVideo = a.others?.views;
                const secondVideo = b.others?.views;
                const firstTotalView = parseFloat(firstVideo.replace('K','')) || 0;
                const secondTotalView = parseFloat(secondVideo.replace('K','')) || 0;
                return secondTotalView - firstTotalView;
            })
        }
        videoContainer.innerHTML = ``;
        if(videos.length === 0){
            document.getElementById('noVideos').classList.remove('hidden');
        }
        else{
            document.getElementById('noVideos').classList.add('hidden');
        }
        videos.forEach(video => {
            // console.log(video)
            let verifiedImg = ``
            if(video.authors[0]?.verified === true){
                verifiedImg = `./images/verify.png`;
            }
            const videoCard = document.createElement('div');
            videoCard.classList = `card w-96 bg-base-100`;
            videoCard.innerHTML = `
            <div class="relative">
                <figure class="px-10 pt-10">
                    <img class="h-[200px]" src="${video.thumbnail}" alt="Shoes" class="rounded-xl" />
                  </figure>
                  <span class="text-white text-lg p-1 bg-black absolute right-12 bottom-2 rounded-md">3hrs 56 min ago</span>
            </div>
            <div class="mt-5 mx-10 flex gap-3">
                <div class="mt-3">
                    <img class="w-[40px] rounded-full" src="${video.authors[0]?.profile_picture}" alt="">
                </div>
                <div>
                    <h3 class="font-bold leading-7">${video.title}</h3>
                    <div class="grid grid-cols-2 gap-2 items-center">
                        <p class="mt-1">${video.authors[0]?.profile_name}</p>
                        <img src="${verifiedImg}" alt="">
                    </div>
                    <p class="mt-1">${video.others?.views} views</p>
                </div>
            </div>
            `      
            videoContainer.appendChild(videoCard);      
        });
    })
}

jsonCategory()
categoryByID(selectedCategory, sortByView)
