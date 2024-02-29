const categories = document.getElementById('btn-category');

const jsonCategory = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categories = data.data;
    categoryShow(categories);
    
}

const categoryShow = category => {
    category.forEach(cat => {
        const catBtn = document.createElement('button');
        catBtn.classList = `font-medium px-5 py-2 bg-[#25252526] rounded-md active:bg-[#FF1F3D] active:text-white` ;
        catBtn.innerText = cat.category;
        catBtn.addEventListener('click', () => categoryByID(cat.category_id));      
        categories.appendChild(catBtn);
    });
}

function categoryByID(categoryID){
    console.log(categoryID)
}

jsonCategory()