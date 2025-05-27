
// GLOBAL VARIABLES
// Store cart items and total
let cartItems = [];
let totalPrice = 0;


// LOGIN FUNCTION
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "customer" && password === "1") {
        window.location.href = "menuPage.html"; // go to menu page
    } else if (email === "rider" && password === "2") {
        window.location.href = "riderPage.html"; // go to admin page
    } else if (email === "vendor" && password === "3") {
        window.location.href = "vendorPage.html"; // go to admin page
    }
    else {
        alert("Please enter both email and password.");
    }
}


// ADD TO CART FUNCTION
function addToCart(itemName, itemPrice) {
    let found = false;

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === itemName) {
            cartItems[i].quantity += 1;
            found = true;
            break;
        }
    }

    if (!found) {
        cartItems.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }

    totalPrice += itemPrice;
    alert("Added to Cart!");

    updateCartDisplay();
}


// UPDATE CART DISPLAY
function updateCartDisplay() {
    const cartList = document.getElementById("cartList");
    const totalSpan = document.getElementById("totalPrice");

    if (!cartList || !totalSpan) return; // avoid error on pages without cart

    cartList.innerHTML = "";

    cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.quantity} - RM${(item.price * item.quantity).toFixed(2)} `;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteItem(index);

        li.appendChild(deleteBtn);
        cartList.appendChild(li);
    });

    totalSpan.textContent = totalPrice.toFixed(2);
}


// DELETE ITEM FROM CART
function deleteItem(index) {
    const item = cartItems[index];
    totalPrice -= item.price * item.quantity;
    cartItems.splice(index, 1);

    updateCartDisplay();
}


// GO TO PAYMENT PAGE
function gotonext() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Save cart to localStorage to access it in payment page
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
    window.location.href = "paymentPage.html";
}

function gotoback() {
    window.location.href = "menuPage.html";
}


// PAY FUNCTION
function payNow() {
    const storedCart = localStorage.getItem("cartItems");
    const storedTotal = localStorage.getItem("totalPrice");
    const address = document.getElementById("address").value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

    if (!storedCart || storedCart.length === 0) {
        alert("No items to pay!");
        return;
    }

    if (!address) {
        alert("Please enter your address.");
        return;
    }

    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    // You can log or send this data somewhere if needed
    console.log("Address:", address);
    console.log("Payment Method:", paymentMethod);
    alert("Payment Successful! Thank you ❤️");

    // Clear localStorage after payment
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalPrice");

    // Go back to menu or thank you page
    gotoback();
}



// SEARCH FUNCTION
function searchFood() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    const searchValue = searchInput.value.toLowerCase();
    const foodItems = document.querySelectorAll(".vendor-section");

    foodItems.forEach(item => {
        const itemName = item.querySelector("p").textContent.toLowerCase();
        item.style.display = itemName.includes(searchValue) ? "block" : "none";
    });
}


// INITIALIZE PAYMENT PAGE
function loadPaymentDetails() {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const storedTotal = localStorage.getItem("totalPrice") || "0.00";

    const cartList = document.getElementById("cartList");
    const totalSpan = document.getElementById("totalPrice");

    if (cartList && totalSpan) {
        cartList.innerHTML = "";
        storedCart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} x${item.quantity} - RM${(item.price * item.quantity).toFixed(2)}`;
            cartList.appendChild(li);
        });
        totalSpan.textContent = storedTotal;
    }
}
//---------------------------------------------------------
// RIDER PAGE
function toggleStatus() {
    const checkbox = document.getElementById("riderToggle");
    const statusText = document.getElementById("statusText");
    const notificationSection = document.querySelector("notifications");

    if (checkbox.checked) {
        statusText.textContent = "Online";
        statusText.style.color = "green";
        alert("You are now online!");

        notificationSection.style.display = "block"; // show notification
    } else {
        statusText.textContent = "Offline";
        statusText.style.color = "red";
        alert("You are now offline!");

        notificationSection.style.display = "none"; // hide notification
    }
}

function goToDeliveryPage(orderId) {
    //localStorage.setItem("orderId", orderId);
    window.location.href = "deliveryPage.html";
}

function confirmDelivery() {
    //const orderId = localStorage.getItem("orderId");
    //if (orderId) {
        alert(`Order #123 has been delivered!`);
        //localStorage.removeItem("orderId");
        window.location.href = "riderPage.html"; 
   // } else {
   //     alert("No order to confirm!");
    //}
}

//---------------------------------------------------------
// VENDOR PAGE
function goToDeliveryCustomerPage() {
    window.location.href = "foodPage.html";
}

function toggleStatusVendor() {
    const checkbox = document.getElementById("riderToggle");
    const statusText = document.getElementById("statusText");

    if (checkbox.checked) {
        statusText.textContent = "Online";
        statusText.style.color = "green";
        alert("You vendor now open!");
    } else {
        statusText.textContent = "Offline";
        statusText.style.color = "red";
        alert("You vendor now closed!");
    }
}

function findRider() {
        alert(`Rider ID 123 has been assigned to your order!`);
        
        window.location.href = "vendorPage.html"; 
}

function toggleAvailability(button) {
    if (button.textContent === "Available") {
        button.textContent = "Unavailable";
        button.style.backgroundColor = "red";
        button.style.color = "white";
    } else {
        button.textContent = "Available";
        button.style.backgroundColor = "green";
        button.style.color = "white";
    }
}

function goToAvailablePage(){
    window.location.href = "availablePage.html";
}

