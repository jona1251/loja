const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsConteiner = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartounter = document.getElementById("cart-count")
const addressiInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = []

//Abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal()
    cartModal.style.display = "flex"
    
})


closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none"
})

menu.addEventListener("click",function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        //adicionar noo carrinho
      addToCart(name,price)
    }
})


//Funçao par aadicinarno carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name )
    if(existingItem){
        existingItem.quantity += 1
    }else{cart.push({
         name,
         price,
         quantity: 1,
    
        })

    }

    updateCartModal()
}

//Atualizar o carrinho 
function updateCartModal(){
    cartItemsConteiner.innerHTML = ""
    let total = 0 

    cart.forEach(item => {
        const cartItemsElement = document.createElement("div")
         cartItemsElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemsElement.innerHTML = `
         <div class="flex items-center justify-between">
            <div>
             <p class="font-bold">${item.name}</p>
             <p>Qtd: ${item.quantity}</p>
             <p class="font-medium mt-2">R$ ${item.price.toFixed(1)}</p>
            </div>
          
          
            <button class="remove-btn" data-name="${item.name}">
              Remover
            </button>
          
         </div>
        
        `
        total += item.price * item.quantity
        cartItemsConteiner.appendChild(cartItemsElement)
    })
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    cartounter.innerHTML = cart.length
}
//remover item
cartItemsConteiner.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")
        console.log(name)
        removeITemcart(name)
        
    }

})
function removeITemcart(name){
    const index = cart.findIndex(item => item.name === name)
    if(index !== -1){
        const item = cart[index]

        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}



addressiInput.addEventListener("input", function(event){
    let inputValue = event.target.inputValue

    if(inputValue !== ""){
        addressiInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

//finalizar pedido
checkoutBtn.addEventListener("click", function(){
    /* const isOpen = checkOpen()
    if(!isOpen){
        alert("Esta Fechado ")
        return
    }
 */


    if(cart.length === 0 ) return

    if(addressiInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressiInput.classList.add("border-red-500")
        return
    }

    //Enviar o pedido para api whats
    const cartItems = cart.map((item) => {
        return
        ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
    }).join("")
    const message = encodeURIComponent(cartItems)
    const phone = "97606-2197"
    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressiInput.value}`, "_blank")

//verifica se esta aberto 
function checkOpen(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 17 && hora < 23
    //true = aberto 
}


 const spanintem = document.getElementById("date-span")
 const isOpen = checkOpen()

if(isOpen){
    spanintem.classList.remove("bg-red-500")
    spanintem.classList.add("bg-green-600")
}else{
    spanintem.classList.remove("bg-green-600")
    spanintem.classList.add("bg-red-500")
 }
})