let cartItems;
let trendingCard;
let totalPrice =0;
let total = 0;

function setLocalData(){
    localStorage.setItem('total',total)
}

function getLocalData(){
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    trendingCard = JSON.parse(localStorage.getItem('trendingCard'));

    console.log(cartItems)
    console.log(trendingCard)
}
function updateSelItemsCount(cnt){
    const selItemCnt = document.getElementsByClassName('js-sel-item-cnt')[0];
    selItemCnt.textContent = cnt;
}

function updateTotalPrice(selectedItems){
    const priceField = document.getElementsByClassName('total-price')[0];
    const discountField = document.getElementsByClassName('discount')[0];
    const totalField = document.getElementsByClassName('total')[0];
    selectedItems.forEach((item)=>{
        totalPrice += (item.price*80);
    })
    // totalPrice = selectedItems.reduce((acc,curval)=> acc+curval,0);
    priceField.textContent = totalPrice.toFixed(2);
    let discountPrice = (totalPrice*.1).toFixed(2)
    discountField.textContent = discountPrice ;
    total = totalPrice - discountPrice;
    totalField.textContent = total.toFixed(2);

}

function renderSelectedItems(){
    
    const jsSelItemContainer = document.getElementsByClassName('selected-item')[0];
    let selectedItems = trendingCard.filter(card =>
        cartItems.includes(card.id)
    )
    updateSelItemsCount(selectedItems.length);
    updateTotalPrice(selectedItems);    

    const fragment = document.createDocumentFragment();

    selectedItems.forEach((e)=>{
        const selCard = createSelCard(e.image,e.title,e.price);
        fragment.appendChild(selCard)
    });

    jsSelItemContainer.appendChild(fragment)
}

function createSelCard(imageSrc, title, price) {
    // create elements
    const selCard = document.createElement("div");
    selCard.classList.add("sel-card");
    const img = document.createElement("img");
    img.classList.add("sel-card-img");
    img.src = imageSrc;
    img.alt = "card image";
    const selCardInfo = document.createElement("div");
    selCardInfo.classList.add("sel-card-info");
    const selCardTitle = document.createElement("div");
    selCardTitle.classList.add("sel-card-title");
    const titleTextNode = document.createTextNode(title);
    selCardTitle.appendChild(titleTextNode);
    let priceFormat = price*80;
    const priceTextNode = document.createTextNode(`RS. ${priceFormat.toFixed(2)}`);
    const selCardPrice = document.createElement("div");
    selCardPrice.classList.add("sel-card-text");
    selCardPrice.appendChild(priceTextNode);
    const qtyTextNode = document.createTextNode("QTY. 1");
    const selCardQty = document.createElement("div");
    selCardQty.classList.add("sel-card-text");
    selCardQty.appendChild(qtyTextNode);
  
    // append elements to parent
    selCardInfo.appendChild(selCardTitle);
    selCardInfo.appendChild(selCardPrice);
    selCardInfo.appendChild(selCardQty);
    selCard.appendChild(img);
    selCard.appendChild(selCardInfo);
  
    return selCard;
  }
  



function main(){
    getLocalData();
    renderSelectedItems();
    setLocalData();
}

window.addEventListener('DOMContentLoaded',main);