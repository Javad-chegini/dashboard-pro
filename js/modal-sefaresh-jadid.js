function convertPersianToEnglish(str) {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = str.toString();
    for (let i = 0; i < persianNumbers.length; i++) {
        result = result.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
    }
    return result;
}
function cleanNumber(value) {
    if (!value) return 0;
    let cleaned = convertPersianToEnglish(value);
    cleaned = cleaned.replace(/[^\d]/g, '');
    return parseInt(cleaned) || 0;
}
function formatNumber(number) {
    if (number === 0) return '';
    return number.toLocaleString('fa-IR');
}
function calculateTotal() {
    const quantity = cleanNumber(document.getElementById('productQuantity').value);
    const price = cleanNumber(document.getElementById('productPrice').value);
    const total = quantity * price;
    document.getElementById('totalPrice').textContent = formatNumber(total) + ' تومان';
}
document.getElementById('productPrice').addEventListener('input', function(e) {
    let value = e.target.value;
    let cleanValue = cleanNumber(value);
    if (cleanValue > 0) {
        e.target.value = formatNumber(cleanValue);
    }
    calculateTotal();
});
document.getElementById('productQuantity').addEventListener('input', function(e) {
    let value = e.target.value;
    let cleanValue = cleanNumber(value);
    if (cleanValue > 0) {
        e.target.value = formatNumber(cleanValue);
    }
    calculateTotal();
});
document.getElementById('productPrice').addEventListener('focus', function(e) {
    let cleanValue = cleanNumber(e.target.value);
    if (cleanValue > 0) {
        e.target.value = cleanValue;
    }
});
document.getElementById('productQuantity').addEventListener('focus', function(e) {
    let cleanValue = cleanNumber(e.target.value);
    if (cleanValue > 0) {
        e.target.value = cleanValue;
    }
});
document.getElementById('productPrice').addEventListener('blur', function(e) {
    let cleanValue = cleanNumber(e.target.value);
    if (cleanValue > 0) {
        e.target.value = formatNumber(cleanValue);
    }
    calculateTotal();
});
document.getElementById('productQuantity').addEventListener('blur', function(e) {
    let cleanValue = cleanNumber(e.target.value);
    if (cleanValue > 0) {
        e.target.value = formatNumber(cleanValue);
    }
    calculateTotal();
});
document.getElementById('saveOrderBtn').addEventListener('click', function() {
    const form = document.getElementById('newOrderForm');
    if (form.checkValidity()) {
        const quantity = cleanNumber(document.getElementById('productQuantity').value);
        const price = cleanNumber(document.getElementById('productPrice').value);
        if (quantity <= 0 || price <= 0) {
            alert('لطفاً تعداد و قیمت معتبر وارد کنید!');
            return;
        }
        const orderData = {
            customerName: document.getElementById('customerName').value,
            customerPhone: document.getElementById('customerPhone').value,
            customerAddress: document.getElementById('customerAddress').value,
            productName: document.getElementById('productName').value,
            quantity: quantity,
            price: price,
            totalPrice: quantity * price,
            status: document.getElementById('orderStatus').value,
            note: document.getElementById('orderNote').value
        };
        const newOrderNumber = '#' + (1000 + Math.floor(Math.random() * 9000));
        alert('سفارش با شماره ' + newOrderNumber + ' با موفقیت ثبت شد!\n' +
              'مبلغ کل: ' + formatNumber(orderData.totalPrice) + ' تومان');
        const modal = bootstrap.Modal.getInstance(document.getElementById('newOrderModal'));
        modal.hide();
        resetForm();
        console.log('Order Data:', orderData);
    } else {
        form.reportValidity();
    }
});
function resetForm() {
    document.getElementById('newOrderForm').reset();
    document.getElementById('totalPrice').textContent = '۰ تومان';
}
document.getElementById('newOrderModal').addEventListener('hidden.bs.modal', function () {
    resetForm();
});
calculateTotal();