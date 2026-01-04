const cart = document.getElementById("cart-container");
const cartCount = document.getElementById("cartValue");
const cartCount2 = document.getElementById("cartValueMob");
const priceDetails = document.getElementById("priceDetails");
const empty = document.getElementById("cart-page");
const details = document.getElementById("details");
const totalMrp = document.getElementById("totalMrp");
const discount = document.getElementById("discount");
const totalAmount = document.getElementById("totalAmount");
const orderBtn = document.getElementById("orderBtn");
const cartMain = document.getElementById("cartMain");

const month = new Date().toLocaleString("en-IN", {
  month: "short",
});

const day = new Date().getDate();

window.addEventListener("load", () => {
  loadCart();
});

var cartArr = JSON.parse(localStorage.getItem("cart")) || [];

const loadCart = () => {
  
  

  let itemPrice =0;

  let actualItemPrice = 0;

  cartCount.innerText = cartArr.length;
  cartCount2.innerText = cartArr.length;

  cart.innerHTML = "";

  if (cartArr.length === 0) {
    empty.innerHTML=`<div class="flex flex-col items-center pl-30">
              <img src="./images/empty-cart.svg" alt="..." class="w-100 h-100">
              <p class="font-semibold text-xl">Oops...Cart is empty</p> 
            </div>`
    

    return;
  }
  console.log(cartArr.length);

  cartArr.forEach((val, index) => {
    const cartItem = document.createElement("div");

    cartItem.className =
      "bg-white  py-2 mb-1  flex flex-row justify-between border border-gray-400";

    cartItem.innerHTML = `<div class="ml-4 flex  gap-10">
                  <div><img src="${
                    val.img
                  }" alt="..." class="w-40 h-40 mx-auto my-auto p-1"></div>

                  <div class="flex flex-col justify-center">
                    <p class="font-black text-xl">${val.pName}</p>
                    <div class="grid grid-cols-1 lg:grid-cols-2 lg:w-25">
                      <p class="font-semibold">₹${val.price}</p>
                      <p class="line-through text-red-300">₹${
                        val.actualPrice
                      }</p>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-1">
                      <p class="">Delivery between</p>
                      <p class="font-semibold">${day + 2} ${month} - ${
      day + 4
    } ${month} </p>
                    </div>

                  </div>
                </div>
                <div class="mr-4">
                  <button class="font-semibold text-gray-600" onclick="removeItem(${index})">X</button>
                </div>
                
                `;

    cart.appendChild(cartItem);

    itemPrice += val.price;

    actualItemPrice += val.actualPrice;
    

  });
  details.innerHTML=`PRICE DETAILS (${cartArr.length} Items)`
  totalMrp.innerHTML = `₹${actualItemPrice}`
  totalAmount.innerHTML = `₹${itemPrice}`
  discount.innerHTML=`₹${actualItemPrice-itemPrice}`
  
};


function removeItem(index) {
//   let cartArr = JSON.parse(localStorage.getItem("cart")) || [];

  cartArr.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cartArr));
  loadCart();
}

orderBtn.addEventListener('click', () =>{
    orderPlaced();
})

function orderPlaced(){
    cartCount.innerText = 0
   cartCount2.innerText = 0
   cartArr.splice(0, cartArr.length)
localStorage.setItem("cart", JSON.stringify(cartArr));


    cartMain.innerHTML = `<div >
      <div class="flex flex-col items-center my-30">
      <video width="320" height="240" autoplay loop>
        <source src="./images/orderPlaced.mp4" type="video/mp4">
        
      </video>
      <p class="font-bold text-2xl mt-3 text-blue-500">Order placed! Your package is on the way 🚚💨</p>

      <a href="./index.html"><button class="mt-7 bg-red-400 text-white rounded px-3 py-3">Shop More</button></a>
    </div>
    </div>`

    

}
