console.log('✅ ماژول لود شد:', {
    ViewOrderModule: !!window.ViewOrderModule,
    EditOrderModule: !!window.EditOrderModule,
    ordersData: window.ViewOrderModule ? Object.keys(window.ViewOrderModule.ordersData) : []
});
if (!window.ordersData) {
    window.ordersData = {
        '#1001': {
            orderNumber: '#1001',
            customerName: 'علی احمدی',
            customerPhone: '09123456789',
            customerAddress: 'تهران، خیابان آزادی، پلاک 123',
            productName: 'لپ تاپ',
            quantity: '1',
            price: '15000000',
            totalPrice: '15,000,000 تومان',
            statusText: 'تایید شده',
            statusClass: 'bg-success',
            orderDate: '1403/06/15',
            note: 'سفارش فوری - تحویل تا فردا'
        },
        '#1002': {
            orderNumber: '#1002',
            customerName: 'فاطمه رضایی',
            customerPhone: '09987654321',
            customerAddress: 'اصفهان، خیابان چهارباغ، پلاک 456',
            productName: 'موبایل',
            quantity: '2',
            price: '4000000',
            totalPrice: '8,000,000 تومان',
            statusText: 'در انتظار',
            statusClass: 'bg-warning',
            orderDate: '1403/06/16',
            note: ''
        },
        '#1003': {
            orderNumber: '#1003',
            customerName: 'محمد صادقی',
            customerPhone: '09111222333',
            customerAddress: 'شیراز، خیابان زند، پلاک 789',
            productName: 'تبلت',
            quantity: '1',
            price: '3500000',
            totalPrice: '3,500,000 تومان',
            statusText: 'آماده ارسال',
            statusClass: 'bg-info',
            orderDate: '1403/06/17',
            note: 'بسته‌بندی ضد ضربه'
        }
    };
}
window.openEditOrderModal = function(orderData) {
    console.log('✏️ باز کردن مودال ویرایش برای:', orderData.orderNumber);
    console.log('📋 داده‌های دریافتی:', orderData);
    document.getElementById('editOrderNumber').textContent = orderData.orderNumber;
    document.getElementById('editCustomerName').value = orderData.customerName;
    document.getElementById('editCustomerPhone').value = orderData.customerPhone || '09000000000';
    document.getElementById('editCustomerAddress').value = orderData.customerAddress || 'آدرس ثبت نشده';
    document.getElementById('editProductName').value = orderData.productName;
    document.getElementById('editQuantity').value = orderData.quantity || '1';
    document.getElementById('editPrice').value = orderData.price || orderData.totalPrice.replace(/[^\d]/g, '');
    document.getElementById('editOrderDate').value = orderData.orderDate || '1403/06/15';
    document.getElementById('editOrderNote').value = orderData.note || '';
    const statusSelect = document.getElementById('editOrderStatus');
    if (statusSelect) {
        const statusValue = getStatusValue(orderData.statusClass);
        statusSelect.value = statusValue;
    }
    updateTotalPrice();
    clearValidationClasses();
}
console.log('✅ ماژول ویرایش سفارش لود شد');
console.log('📊 ordersData:', window.ordersData);
function openEditOrderModal(orderData) {
    console.log('باز کردن مودال برای سفارش:', orderData.orderNumber);
    document.getElementById('editOrderNumber').textContent = orderData.orderNumber;
    document.getElementById('editCustomerName').value = orderData.customerName;
    document.getElementById('editCustomerPhone').value = orderData.customerPhone;
    document.getElementById('editCustomerAddress').value = orderData.customerAddress;
    document.getElementById('editProductName').value = orderData.productName;
    document.getElementById('editQuantity').value = orderData.quantity;
    document.getElementById('editPrice').value = orderData.price;
    document.getElementById('editOrderDate').value = orderData.orderDate;
    document.getElementById('editOrderNote').value = orderData.note || '';
    const statusSelect = document.getElementById('editOrderStatus');
    if (statusSelect) {
        const statusValue = getStatusValue(orderData.statusClass);
        statusSelect.value = statusValue;
    }
    updateTotalPrice();
    clearValidationClasses();
}
function getStatusValue(statusClass) {
    switch(statusClass) {
        case 'bg-warning': return 'pending';
        case 'bg-success': return 'confirmed';
        case 'bg-info': return 'ready';
        case 'bg-secondary': return 'delivered';
        case 'bg-danger': return 'cancelled';
        default: return 'pending';
    }
}
function getStatusDetails(value) {
    switch(value) {
        case 'pending': return { class: 'bg-warning', text: 'در انتظار' };
        case 'confirmed': return { class: 'bg-success', text: 'تایید شده' };
        case 'ready': return { class: 'bg-info', text: 'آماده ارسال' };
        case 'delivered': return { class: 'bg-secondary', text: 'تحویل شده' };
        case 'cancelled': return { class: 'bg-danger', text: 'لغو شده' };
        default: return { class: 'bg-warning', text: 'در انتظار' };
    }
}
function updateTotalPrice() {
    console.log('شروع محاسبه قیمت کل');
    const quantityElement = document.getElementById('editQuantity');
    const priceElement = document.getElementById('editPrice');
    const totalElement = document.getElementById('editTotalPrice');
    if (!quantityElement || !priceElement || !totalElement) {
        console.log('المان‌های ضروری یافت نشدند:', {
            quantity: !!quantityElement,
            price: !!priceElement,
            total: !!totalElement
        });
        return;
    }
    const quantity = parseInt(quantityElement.value) || 0;
    const price = parseInt(priceElement.value) || 0;
    const total = quantity * price;
    console.log('محاسبه:', { quantity, price, total });
    totalElement.textContent = total.toLocaleString('fa-IR') + ' تومان';
}
function clearValidationClasses() {
    const formControls = document.querySelectorAll('#editOrderForm .form-control, #editOrderForm .form-select');
    formControls.forEach(control => {
        control.classList.remove('is-valid', 'is-invalid');
    });
}
function validateForm() {
    let isValid = true;
    const requiredFields = [
        'editCustomerName',
        'editCustomerPhone',
        'editCustomerAddress',
        'editProductName',
        'editQuantity',
        'editPrice'
    ];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            if (field) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
            }
            isValid = false;
        } else {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
        }
    });
    const phoneField = document.getElementById('editCustomerPhone');
    const phonePattern = /^09\d{9}$/;
    if (phoneField && phoneField.value && !phonePattern.test(phoneField.value)) {
        phoneField.classList.add('is-invalid');
        phoneField.classList.remove('is-valid');
        isValid = false;
    }
    const quantityField = document.getElementById('editQuantity');
    const priceField = document.getElementById('editPrice');
    if (quantityField && parseInt(quantityField.value) < 1) {
        quantityField.classList.add('is-invalid');
        quantityField.classList.remove('is-valid');
        isValid = false;
    }
    if (priceField && parseInt(priceField.value) < 0) {
        priceField.classList.add('is-invalid');
        priceField.classList.remove('is-valid');
        isValid = false;
    }
    return isValid;
}
function saveOrderChanges() {
    console.log('شروع ذخیره تغییرات');
    if (!validateForm()) {
        showErrorMessage('لطفاً تمام فیلدهای ضروری را به درستی پر کنید.');
        return;
    }
    const orderNumber = document.getElementById('editOrderNumber').textContent;
    const customerName = document.getElementById('editCustomerName').value.trim();
    const customerPhone = document.getElementById('editCustomerPhone').value.trim();
    const customerAddress = document.getElementById('editCustomerAddress').value.trim();
    const productName = document.getElementById('editProductName').value.trim();
    const quantity = document.getElementById('editQuantity').value;
    const price = document.getElementById('editPrice').value;
    const orderDate = document.getElementById('editOrderDate').value;
    const orderNote = document.getElementById('editOrderNote').value.trim();
    const orderStatus = document.getElementById('editOrderStatus').value;
    const totalPrice = (parseInt(quantity) * parseInt(price)).toLocaleString('fa-IR') + ' تومان';
    const statusDetails = getStatusDetails(orderStatus);
    ordersData[orderNumber] = {
        orderNumber: orderNumber,
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: customerAddress,
        productName: productName,
        quantity: quantity,
        price: price,
        totalPrice: totalPrice,
        statusText: statusDetails.text,
        statusClass: statusDetails.class,
        orderDate: orderDate,
        note: orderNote
    };
    console.log('داده‌های بروزرسانی شده:', ordersData[orderNumber]);
    updateTableRow(orderNumber, ordersData[orderNumber]);
    const modal = bootstrap.Modal.getInstance(document.getElementById('editOrderModal'));
    if (modal) {
        modal.hide();
    }
    showSuccessMessage('سفارش با موفقیت بروزرسانی شد.');
}
function updateTableRow(orderNumber, orderData) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        if (row.cells[0].textContent.trim() === orderNumber) {
            row.cells[1].textContent = orderData.customerName;
            row.cells[2].textContent = orderData.productName;
            row.cells[3].textContent = orderData.totalPrice;
            const statusBadge = row.cells[4].querySelector('.badge');
            if (statusBadge) {
                statusBadge.textContent = orderData.statusText;
                statusBadge.className = `badge ${orderData.statusClass}`;
            }
        }
    });
}
function showSuccessMessage(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = createToastContainer();
    }
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white bg-success border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-check-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toast = new bootstrap.Toast(document.getElementById(toastId), {
        delay: 4000
    });
    toast.show();
    document.getElementById(toastId).addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}
function showErrorMessage(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = createToastContainer();
    }
    const toastId = 'toast-error-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white bg-danger border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toast = new bootstrap.Toast(document.getElementById(toastId), {
        delay: 5000
    });
    toast.show();
    document.getElementById(toastId).addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '1055';
    document.body.appendChild(container);
    return container;
}
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM بارگذاری شد');
    document.body.addEventListener('click', function(e) {
        const editBtn = e.target.closest('.btn-outline-warning[data-bs-target="#editOrderModal"]');
        if (editBtn) {
            console.log('دکمه ویرایش کلیک شد');
            const row = editBtn.closest('tr');
            const orderNumber = row.cells[0].textContent.trim();
            console.log('شماره سفارش:', orderNumber);
            if (ordersData[orderNumber]) {
                openEditOrderModal(ordersData[orderNumber]);
            } else {
                console.error('سفارش یافت نشد:', orderNumber);
            }
        }
    });
    setTimeout(() => {
        const quantityInput = document.getElementById('editQuantity');
        const priceInput = document.getElementById('editPrice');
        if (quantityInput) {
            quantityInput.addEventListener('input', function() {
                console.log('تعداد تغییر کرد:', this.value);
                updateTotalPrice();
            });
        }
        if (priceInput) {
            priceInput.addEventListener('input', function() {
                console.log('قیمت تغییر کرد:', this.value);
                updateTotalPrice();
            });
        }
        const phoneInput = document.getElementById('editCustomerPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                const phonePattern = /^09\d{9}$/;
                const phone = this.value;
                if (phone && !phonePattern.test(phone)) {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                } else if (phone) {
                    this.classList.add('is-valid');
                    this.classList.remove('is-invalid');
                } else {
                    this.classList.remove('is-invalid', 'is-valid');
                }
            });
        }
        const saveBtn = document.getElementById('saveOrderChanges');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                console.log('دکمه ذخیره کلیک شد');
                saveOrderChanges();
            });
        }
        const editModal = document.getElementById('editOrderModal');
        if (editModal) {
            editModal.addEventListener('hidden.bs.modal', function() {
                clearValidationClasses();
            });
        }
    }, 500);
});
function getStatusDetails(value) {
    switch(value) {
        case 'pending': return { class: 'bg-warning', text: 'در انتظار' };
        case 'confirmed': return { class: 'bg-success', text: 'تایید شده' };
        case 'ready': return { class: 'bg-info', text: 'آماده ارسال' };
        case 'delivered': return { class: 'bg-secondary', text: 'تحویل شده' };
        case 'cancelled': return { class: 'bg-danger', text: 'لغو شده' };
        default: return { class: 'bg-warning', text: 'در انتظار' };
    }
}
function updateTotalPrice() {
    const quantityElement = document.getElementById('editQuantity');
    const priceElement = document.getElementById('editPrice');
    const totalElement = document.getElementById('editTotalPrice');
    if (!quantityElement || !priceElement || !totalElement) return;
    const quantity = parseInt(quantityElement.value) || 0;
    const price = parseInt(priceElement.value) || 0;
    const total = quantity * price;
    totalElement.textContent = total.toLocaleString('fa-IR') + ' تومان';
}
function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function removeCommas(str) {
    return str.replace(/,/g, '');
}
function clearValidationClasses() {
    const formControls = document.querySelectorAll('#editOrderForm .form-control, #editOrderForm .form-select');
    formControls.forEach(control => {
        control.classList.remove('is-valid', 'is-invalid');
    });
}
function validateForm() {
    let isValid = true;
    const requiredFields = [
        'editCustomerName',
        'editCustomerPhone',
        'editCustomerAddress',
        'editProductName',
        'editQuantity',
        'editPrice'
    ];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            isValid = false;
        } else {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
        }
    });
    const phoneField = document.getElementById('editCustomerPhone');
    const phonePattern = /^09\d{9}$/;
    if (phoneField.value && !phonePattern.test(phoneField.value)) {
        phoneField.classList.add('is-invalid');
        phoneField.classList.remove('is-valid');
        isValid = false;
    }
    const quantityField = document.getElementById('editQuantity');
    const priceField = document.getElementById('editPrice');
    if (parseInt(quantityField.value) < 1) {
        quantityField.classList.add('is-invalid');
        quantityField.classList.remove('is-valid');
        isValid = false;
    }
    if (parseInt(priceField.value) < 0) {
        priceField.classList.add('is-invalid');
        priceField.classList.remove('is-valid');
        isValid = false;
    }
    return isValid;
}
function saveOrderChanges() {
    if (!validateForm()) {
        showErrorMessage('لطفاً تمام فیلدهای ضروری را به درستی پر کنید.');
        return;
    }
    const orderNumber = document.getElementById('editOrderNumber').textContent;
    const customerName = document.getElementById('editCustomerName').value.trim();
    const customerPhone = document.getElementById('editCustomerPhone').value.trim();
    const customerAddress = document.getElementById('editCustomerAddress').value.trim();
    const productName = document.getElementById('editProductName').value.trim();
    const quantity = document.getElementById('editQuantity').value;
    const price = document.getElementById('editPrice').value;
    const orderDate = document.getElementById('editOrderDate').value;
    const orderNote = document.getElementById('editOrderNote').value.trim();
    const orderStatus = document.getElementById('editOrderStatus').value;
    const totalPrice = (parseInt(quantity) * parseInt(price)).toLocaleString('fa-IR') + ' تومان';
    const statusDetails = getStatusDetails(orderStatus);
    ordersData[orderNumber] = {
        orderNumber: orderNumber,
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: customerAddress,
        productName: productName,
        quantity: quantity,
        price: price,
        totalPrice: totalPrice,
        statusText: statusDetails.text,
        statusClass: statusDetails.class,
        orderDate: orderDate,
        note: orderNote
    };
    updateTableRow(orderNumber, ordersData[orderNumber]);
    const modal = bootstrap.Modal.getInstance(document.getElementById('editOrderModal'));
    modal.hide();
    showSuccessMessage('سفارش با موفقیت بروزرسانی شد.');
}
function updateTableRow(orderNumber, orderData) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        if (row.cells[0].textContent.trim() === orderNumber) {
            row.cells[1].textContent = orderData.customerName;
            row.cells[2].textContent = orderData.productName;
            row.cells[3].textContent = orderData.totalPrice;
            const statusBadge = row.cells[4].querySelector('.badge');
            if (statusBadge) {
                statusBadge.textContent = orderData.statusText;
                statusBadge.className = `badge ${orderData.statusClass}`;
            }
        }
    });
}
function showSuccessMessage(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = createToastContainer();
    }
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white bg-success border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-check-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toast = new bootstrap.Toast(document.getElementById(toastId), {
        delay: 4000
    });
    toast.show();
    document.getElementById(toastId).addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}
function showErrorMessage(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = createToastContainer();
    }
    const toastId = 'toast-error-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white bg-danger border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toast = new bootstrap.Toast(document.getElementById(toastId), {
        delay: 5000
    });
    toast.show();
    document.getElementById(toastId).addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '1055';
    document.body.appendChild(container);
    return container;
}
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-outline-warning[data-bs-target="#editOrderModal"]')) {
            const button = e.target.closest('.btn-outline-warning');
            const row = button.closest('tr');
            const orderNumber = row.cells[0].textContent.trim();
            console.log('شماره سفارش کلیک شده:', orderNumber);
            if (ordersData[orderNumber]) {
                setTimeout(() => {
                    openEditOrderModal(ordersData[orderNumber]);
                }, 100);
            }
        }
    });
    const quantityInput = document.getElementById('editQuantity');
    const priceInput = document.getElementById('editPrice');
    if (quantityInput) {
        quantityInput.addEventListener('input', function() {
            updateTotalPrice();
            console.log('تعداد تغییر کرد:', this.value);
        });
    }
    if (priceInput) {
        priceInput.addEventListener('input', function() {
            updateTotalPrice();
            console.log('قیمت تغییر کرد:', this.value);
        });
    }
    const phoneInput = document.getElementById('editCustomerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            const phonePattern = /^09\d{9}$/;
            const phone = this.value;
            if (phone && !phonePattern.test(phone)) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else if (phone) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            } else {
                this.classList.remove('is-invalid', 'is-valid');
            }
        });
    }
    const saveBtn = document.getElementById('saveOrderChanges');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            console.log('دکمه ذخیره کلیک شد');
            saveOrderChanges();
        });
    }
    const editForm = document.getElementById('editOrderForm');
    if (editForm) {
        editForm.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                saveOrderChanges();
            }
        });
    }
    const editModal = document.getElementById('editOrderModal');
    if (editModal) {
        editModal.addEventListener('hidden.bs.modal', function() {
            clearValidationClasses();
        });
    }
    updateTotalPrice();
});
window.EditOrderModule = (function() {
    'use strict';
    let moduleInitialized = false;
    const ordersData = {
        '#1001': {
            orderNumber: '#1001',
            customerName: 'علی احمدی',
            customerPhone: '09123456789',
            customerAddress: 'تهران، خیابان آزادی، پلاک 123',
            productName: 'لپ تاپ',
            quantity: '1',
            price: '15000000',
            totalPrice: '15,000,000 تومان',
            statusText: 'تایید شده',
            statusClass: 'bg-success',
            orderDate: '1403/06/15',
            note: 'سفارش فوری - تحویل تا فردا'
        },
    };
    function initModule() {
        if (moduleInitialized) return;
        console.log('EditOrderModule initialized');
        setupEventListeners();
        moduleInitialized = true;
    }
    function setupEventListeners() {
        const quantityInput = document.getElementById('editQuantity');
        const priceInput = document.getElementById('editPrice');
        if (quantityInput) {
            quantityInput.addEventListener('input', updateTotalPrice);
        }
        if (priceInput) {
            priceInput.addEventListener('input', updateTotalPrice);
        }
    }
    function openEditOrderModal(orderData) {
        console.log('باز کردن مودال برای سفارش:', orderData.orderNumber);
        document.getElementById('editOrderNumber').textContent = orderData.orderNumber;
        document.getElementById('editCustomerName').value = orderData.customerName;
        document.getElementById('editCustomerPhone').value = orderData.customerPhone;
        document.getElementById('editCustomerAddress').value = orderData.customerAddress;
        document.getElementById('editProductName').value = orderData.productName;
        document.getElementById('editQuantity').value = orderData.quantity;
        document.getElementById('editPrice').value = orderData.price;
        document.getElementById('editOrderDate').value = orderData.orderDate;
        document.getElementById('editOrderNote').value = orderData.note || '';
        const statusSelect = document.getElementById('editOrderStatus');
        if (statusSelect) {
            const statusValue = getStatusValue(orderData.statusClass);
            statusSelect.value = statusValue;
        }
        updateTotalPrice();
        clearValidationClasses();
        const modal = new bootstrap.Modal(document.getElementById('editOrderModal'));
        modal.show();
    }
    document.addEventListener('DOMContentLoaded', initModule);
    return {
        openEditOrderModal: openEditOrderModal,
        ordersData: ordersData,
    };
})();
window.openEditOrderModal = window.EditOrderModule.openEditOrderModal;
window.ordersData = window.EditOrderModule.ordersData;