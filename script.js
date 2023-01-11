// let success = (suc)=>{
// console.log(suc)
// }
// let failure = (fail)=>{
//     console.log(fail)
// }
// navigator.geolocation.getCurrentPosition(success,failure);
const cancelBtn = document.querySelector('.cancelBtn');
const searchForPlacesBtn = document.querySelector('.searchBtn') 
const firstPage = document.querySelector('#firstPage');
const searchPageContainer = document.querySelector('.searchPageContainer');
cancelBtn.addEventListener('click',()=>{
    firstPage.style.display = 'flex'
    searchPageContainer.style.display = 'none'
})
searchForPlacesBtn.addEventListener('click',()=>{
    firstPage.style.display = 'none'
    searchPageContainer.style.display = 'flex'
})
firstPage.style.display = 'flex'
searchPageContainer.style.display = 'none'
let kuda = '{temp:43,\
    wind}';