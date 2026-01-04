const topWearC = document.getElementById("men-top-container");
const bottomWearC = document.getElementById("men-bottom-container");
const footWearC = document.getElementById("men-foot-wear-container");
const accessoriesC = document.getElementById("men-accessories-container");
const womenTop = document.getElementById("women-top-container");
const womenBottom = document.getElementById("women-bottom-container");
const womenFoot = document.getElementById("women-foot-wear-container");
const womenAccessories = document.getElementById("women-accessories-container");
const kidsTop = document.getElementById("kids-top-container");
const kidsBottom = document.getElementById("kids-bottom-container");
const kidsFoot = document.getElementById("kids-foot-wear-container");
const kidsAccessories = document.getElementById("kids-accessories-container");
const decors = document.getElementById("decors");
const appliances = document.getElementById("appliances");
const tools = document.getElementById("tools");
const essentials = document.getElementById("essentials");


window.addEventListener("load", () => {
  loadData();
});

const loadData = () => {
  fetch("products.json")
    .then((response) => {
      return response.json();
    })
    .then((products) => {
      products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className =
          "bg-white h-80 mx-4 my-4 xl:my-2 rounded-lg flex flex-col justify-between";

        card.innerHTML = `
  <div class="my-auto">
    <img src="${product.img}" alt="${product.pName}" class=" w-40 h-40 mx-auto">
  </div>

  <div class="my-4 text-center">
    <p class=" font-black text-xl">${product.pName}</p>

    <div class="flex flex-row justify-center py-2">
      <p class=" font-semibold">₹${product.price}</p>
      <p class=" pl-3 line-through text-red-300">₹${product.actualPrice}</p>
    </div>

    <button class="bg-orange-400 px-2 py-1 rounded hover:bg-gray-800 hover:text-white add-to-cart" >
      Add to Cart
    </button>
  </div>
`;
        const cartBtn = card.querySelector(".add-to-cart")
          cartBtn.addEventListener("click", () =>{
            addToCart(product)
          })
          

        let productType = product.type;
        let category = product.category;

        const containerMap = {
          men: {
            topWear: topWearC,
            bottomWear: bottomWearC,
            footWear: footWearC,
            accessories: accessoriesC,
          },
          women: {
            topWear: womenTop,
            bottomWear: womenBottom,
            footWear: womenFoot,
            accessories: womenAccessories,
          },
          kids: {
            topWear: kidsTop,
            bottomWear: kidsBottom,
            footWear: kidsFoot,
            accessories: kidsAccessories,
          },
          home: {
            decors: decors,
            tools: tools,
            appliances: appliances,
            essentials: essentials,
          },
        };

        containerMap[category]?.[productType]?.appendChild(card);
      });
    })
    .catch((err) => console.error(err));
};



let cartAr = JSON.parse(localStorage.getItem("cart")) || [];

const loadToLocal = () =>{
  localStorage.setItem("cart", JSON.stringify(cartAr))
}

const addToCart = (product) =>{
    let item = {}

    item.img = product.img;
    item.pName = product.pName;
    item.price = product.price;
    item.actualPrice = product.actualPrice; 

    cartAr.push(item)
    loadToLocal();

    alert("Added to cart ✅")

    
}
 