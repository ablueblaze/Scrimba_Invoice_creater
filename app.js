const washCarBtn = document.getElementById('wash-car');
const mowLawnBtn = document.getElementById('mow-lawn');
const pullWeedsBtn = document.getElementById('pull-weeds');
const invoiceItems = document.getElementById('invoice-items');

const lineItem = (itemName, price) => {
    return `
        <article class="line-item" data-line-item="${itemName}">
            <div class="name-section">
                <p class="item-name">${itemName}</p>
                <button class="remove-btn" data-price="${price}" data-remove-btn="${itemName}">remove</button>
            </div>
            <div class="price-section">
                <p class="price">$${price}</p>
            </div>
        </article>
    `;
};

let currentItems = [];
let currentPrices = [];

const isDuplicate = (itemName) => {
    if (currentItems.includes(itemName)) {
        return true;
    }
    return false;
};

const appendItemWrapper = (itemName, itemPrice) => {
    if (isDuplicate(itemName)) {
        return;
    }
    invoiceItems.insertAdjacentHTML('beforeend', lineItem(itemName, itemPrice));
    currentItems.push(itemName);
    currentPrices.push(itemPrice);
};

const updateTotal = () => {
    const total = document.getElementById('total');
    total.innerText = `$${currentPrices.reduce((pre, cur) => pre + cur, 0)}`;
};

const removeItem = (itemName) => {
    const toDelete = document.querySelector(`[data-line-item="${itemName}"]`);
    toDelete.remove();
};

updateTotal();

washCarBtn.addEventListener('click', () => {
    appendItemWrapper('Wash Car', 10);
    updateTotal();
});

mowLawnBtn.addEventListener('click', () => {
    appendItemWrapper('Mow Lawn', 20);
    updateTotal();
});

pullWeedsBtn.addEventListener('click', () => {
    appendItemWrapper('Pull Weeds', 30);
    updateTotal();
});

invoiceItems.addEventListener('click', (e) => {
    const itemName = e.target.dataset.removeBtn;
    const itemPrice = e.target.dataset.price;
    if (itemName) {
        const lineItem = document.querySelector(
            `[data-line-item="${itemName}"]`
        );
        currentItems.splice(currentItems.indexOf(itemName), 1);
        currentPrices.splice(currentPrices.indexOf(parseInt(itemPrice)), 1);
        lineItem.remove();
        updateTotal();
    }
});
