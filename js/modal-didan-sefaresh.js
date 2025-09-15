console.log('✅ ماژول لود شد:', {
    ViewOrderModule: !!window.ViewOrderModule,
    EditOrderModule: !!window.EditOrderModule,
    ordersData: window.ViewOrderModule ? Object.keys(window.ViewOrderModule.ordersData) : []
});
window.ViewOrderModule = (function() {
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
            price: '15,000,000 تومان',
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
            price: '4,000,000 تومان',
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
            price: '3,500,000 تومان',
            totalPrice: '3,500,000 تومان',
            statusText: 'آماده ارسال',
            statusClass: 'bg-info',
            orderDate: '1403/06/17',
            note: 'بسته‌بندی ضد ضربه'
        }
    };
    function initModule() {
        if (moduleInitialized) return;
        console.log('ViewOrderModule initialized');
        setupEventListeners();
        moduleInitialized = true;
    }
    function setupEventListeners() {
        const editOrderBtn = document.getElementById('editOrderBtn');
        if (editOrderBtn) {
            editOrderBtn.replaceWith(editOrderBtn.cloneNode(true));
            document.getElementById('editOrderBtn').addEventListener('click', function() {
                const orderNumber = document.getElementById('viewOrderNumber').textContent;
                const viewModal = bootstrap.Modal.getInstance(document.getElementById('viewOrderModal'));
                if (viewModal) {
                    viewModal.hide();
                }
                if (window.lazyLoader) {
                    window.lazyLoader.loadModule('edit-order').then(() => {
                        if (typeof openEditOrderModal === 'function' && window.EditOrderModule) {
                            const orderData = window.EditOrderModule.ordersData[orderNumber];
                            if (orderData) {
                                setTimeout(() => {
                                    openEditOrderModal(orderData);
                                }, 300);
                            } else {
                                showErrorMessage('اطلاعات سفارش برای ویرایش یافت نشد!');
                            }
                        }
                    }).catch(error => {
                        console.error('Error loading edit module:', error);
                        showErrorMessage('خطا در بارگیری ماژول ویرایش');
                    });
                } else {
                    showErrorMessage('سیستم بارگذاری ماژول در دسترس نیست');
                }
            });
        }
    }
    function openViewOrderModal(orderData) {
        console.log('باز کردن مودال مشاهده برای سفارش:', orderData.orderNumber);
        document.getElementById('viewOrderNumber').textContent = orderData.orderNumber;
        document.getElementById('viewCustomerName').textContent = orderData.customerName;
        document.getElementById('viewCustomerPhone').textContent = orderData.customerPhone;
        document.getElementById('viewCustomerAddress').textContent = orderData.customerAddress;
        document.getElementById('viewProductName').textContent = orderData.productName;
        document.getElementById('viewQuantity').textContent = orderData.quantity;
        document.getElementById('viewPrice').textContent = orderData.price;
        document.getElementById('viewTotalPrice').textContent = orderData.totalPrice;
        document.getElementById('viewOrderDate').textContent = orderData.orderDate;
        const statusElement = document.getElementById('viewOrderStatus');
        if (statusElement) {
            statusElement.textContent = orderData.statusText;
            statusElement.className = `badge fs-6 ${orderData.statusClass}`;
        }
        const noteSection = document.getElementById('viewNoteSection');
        const noteElement = document.getElementById('viewOrderNote');
        if (orderData.note && orderData.note.trim() !== '') {
            if (noteElement) noteElement.textContent = orderData.note;
            if (noteSection) noteSection.style.display = 'block';
        } else {
            if (noteSection) noteSection.style.display = 'none';
        }
        const modalElement = document.getElementById('viewOrderModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            console.error('View order modal element not found');
        }
    }
    document.addEventListener('DOMContentLoaded', initModule);
    return {
        openViewOrderModal: openViewOrderModal,
        ordersData: ordersData,
        initModule: initModule
    };
})();
window.openViewOrderModal = window.ViewOrderModule.openViewOrderModal;