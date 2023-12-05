// Clear the cart when the product page loads
localStorage.removeItem('cartItems');

// Modify the addToCart function to accept the price parameter
function addToCart(productId, price) {
    const cartItem = {
        id: productId,
        name: `Product ${productId}`,
        price: price,
        quantity: 0,
    };

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
}

// Example usage with dynamic prices
addToCart(1, 10.99);
addToCart(2, 20.99);
addToCart(3, 30.99);
addToCart(4, 10.99);
addToCart(5, 20.99);


function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const li = document.createElement('li');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('input', (event) => updateCartItemQuantity(item.id, event.target.value));

        li.textContent = `${item.name} - $${item.price.toFixed(2)} - Quantity: `;
        li.appendChild(quantityInput);
        cartItemsContainer.appendChild(li);
    });
}

function updateCartItemQuantity(productId, newQuantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItem = cartItems.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity = parseInt(newQuantity, 10);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartUI();
    }
}

function showCheckoutForm() {
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    checkoutFormContainer.classList.remove('hidden');
}

function checkout(event) {
    event.preventDefault();

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        alert('Your cart is empty. Add items before checking out.');
    } else {
        const shippingAddressInput = document.getElementById('shipping-address');
        const customerNameInput = document.getElementById('customer-name');
        const customerEmailInput = document.getElementById('customer-email');
        const customerPhoneInput = document.getElementById('customer-phone');

        const shippingAddress = shippingAddressInput.value;
        const customerName = customerNameInput.value;
        const customerEmail = customerEmailInput.value;
        const customerPhone = customerPhoneInput.value;

        if (shippingAddress && customerName && customerEmail && customerPhone) {
            const orderDetails = `Order placed successfully! We will call you for verification. \nPayment method: Cash on Delivery\nShipping Address: ${shippingAddress}\nName: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}`;

            alert(orderDetails);

            localStorage.removeItem('cartItems');
            updateCartUI();
            hideCheckoutForm();

            // Redirect to the index.html page after placing the order
            window.location.href = 'index.html';

            // Close the modal after redirecting
            hideCheckoutForm();
        } else {
            alert('All fields are required to complete the checkout.');
        }
    }
}

function showCheckoutForm() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'block';
}

/*
function hideCheckoutForm() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'none';
}

*/


function hideCheckoutForm() {
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    checkoutFormContainer.classList.add('hidden');
}


function returnToHome() {
    // Redirect to the index.html page
    window.location.href = 'index.html';

    // Close the modal after redirecting
    hideCheckoutForm();
}

updateCartUI();
