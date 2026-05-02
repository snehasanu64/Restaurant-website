let cart = JSON.parse(localStorage.getItem('chickpetCart')) || [];

function updateQty(name, change, price = 0) {
    let item = cart.find(item => item.name === name);
    if (!item && change > 0) {
        cart.push({ name, price, qty: 1 });
    } else if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    localStorage.setItem('chickpetCart', JSON.stringify(cart));
    
    if (typeof updateCart === 'function') updateCart();
    updateMenuDisplays();
}

function updateMenuDisplays() {
    document.querySelectorAll('.menu-card').forEach(card => {
        const span = card.querySelector('.qty-display-menu');
        if (!span) return;
        
        const itemName = span.getAttribute('data-item');
        const item = cart.find(i => i.name === itemName);
        const qty = item ? item.qty : 0;
        
        span.textContent = qty;
        
        const addBtn = card.querySelector('.add-btn');
        const qtyControl = card.querySelector('.qty-control-menu');
        
        if (qty > 0) {
            addBtn.style.display = 'none';
            qtyControl.style.display = 'flex';
        } else {
            addBtn.style.display = 'flex';
            qtyControl.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateMenuDisplays();
    if (typeof updateCart === 'function') updateCart();
});
