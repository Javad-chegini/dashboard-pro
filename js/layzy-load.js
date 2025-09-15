document.addEventListener('DOMContentLoaded', function() {
    const lazyLoadButtons = document.querySelectorAll('.lazy-load-modal');
    const loadedResources = new Set();
    console.log('🚀 تعداد دکمه‌های lazy load:', lazyLoadButtons.length);
    
    lazyLoadButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            const jsUrl = this.dataset.jsSrc;
            const cssUrl = this.dataset.cssSrc;
            const htmlUrl = this.dataset.htmlSrc; // اضافه شد
            const htmlContainer = this.dataset.htmlContainer || '#modals-container'; // اضافه شد
            const modalTarget = this.dataset.bsTarget;
            const orderId = this.dataset.orderId;
            
            console.log('🔍 کلیک روی دکمه:', {
                modalTarget: modalTarget,
                orderId: orderId,
                jsUrl: jsUrl,
                cssUrl: cssUrl,
                htmlUrl: htmlUrl // اضافه شد
            });
            
            const row = this.closest('tr');
            let orderData = null;
            
            if (row && (modalTarget === '#viewOrderModal' || modalTarget === '#editOrderModal')) {
                const orderNumber = row.cells[0]?.textContent.trim();
                const customerName = row.cells[1]?.textContent.trim();
                const productName = row.cells[2]?.textContent.trim();
                const totalPrice = row.cells[3]?.textContent.trim();
                const statusBadge = row.cells[4]?.querySelector('.badge');
                const statusText = statusBadge ? statusBadge.textContent.trim() : '';
                const statusClass = statusBadge ? Array.from(statusBadge.classList).find(c => c.startsWith('bg-')) : '';
                
                orderData = {
                    orderNumber: orderNumber,
                    customerName: customerName,
                    productName: productName,
                    totalPrice: totalPrice,
                    statusText: statusText,
                    statusClass: statusClass
                };
                console.log('📊 داده‌های استخراج شده از جدول:', orderData);
            }
            
            try {
                const promises = [];
                
                // لود HTML - اولویت اول
                if (htmlUrl && !loadedResources.has(htmlUrl)) {
                    console.log('📝 لود HTML:', htmlUrl);
                    promises.push(loadHTML(htmlUrl, htmlContainer));
                    loadedResources.add(htmlUrl);
                }
                
                // لود CSS
                if (cssUrl && !loadedResources.has(cssUrl)) {
                    console.log('📄 لود CSS:', cssUrl);
                    promises.push(loadCSS(cssUrl));
                    loadedResources.add(cssUrl);
                }
                
                // لود JS
                if (jsUrl && !loadedResources.has(jsUrl)) {
                    console.log('📜 لود JS:', jsUrl);
                    promises.push(loadJS(jsUrl));
                    loadedResources.add(jsUrl);
                }
                
                if (promises.length > 0) {
                    const originalContent = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    this.disabled = true;
                    
                    await Promise.all(promises);
                    
                    this.innerHTML = originalContent;
                    this.disabled = false;
                    
                    // زمان بیشتر برای اطمینان از لود کامل HTML
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                
                // ادامه کد قبلی برای باز کردن مودال...
                if (modalTarget === '#viewOrderModal' && orderData) {
                    console.log('👁️ باز کردن مودال مشاهده');
                    if (window.ViewOrderModule && typeof window.ViewOrderModule.openViewOrderModal === 'function') {
                        const fullOrderData = window.ViewOrderModule.ordersData[orderData.orderNumber];
                        if (fullOrderData) {
                            window.ViewOrderModule.openViewOrderModal(fullOrderData);
                        } else {
                            window.ViewOrderModule.openViewOrderModal(orderData);
                        }
                    } else {
                        console.error('❌ ViewOrderModule یافت نشد');
                        fillViewModalManually(orderData);
                        const modal = new bootstrap.Modal(document.querySelector(modalTarget));
                        modal.show();
                    }
                } else if (modalTarget === '#editOrderModal' && orderData) {
                    console.log('✏️ باز کردن مودال ویرایش برای:', orderData.orderNumber);
                    if (window.ordersData && window.ordersData[orderData.orderNumber]) {
                        const fullOrderData = window.ordersData[orderData.orderNumber];
                        console.log('📦 داده کامل از ordersData:', fullOrderData);
                        if (typeof window.openEditOrderModal === 'function') {
                            window.openEditOrderModal(fullOrderData);
                        } else {
                            console.error('❌ تابع openEditOrderModal یافت نشد');
                        }
                    } else {
                        console.log('⚠️ داده کامل یافت نشد، استفاده از داده‌های جدول');
                        const basicOrderData = {
                            orderNumber: orderData.orderNumber,
                            customerName: orderData.customerName,
                            customerPhone: '09000000000',
                            customerAddress: 'آدرس ثبت نشده',
                            productName: orderData.productName,
                            quantity: '1',
                            price: orderData.totalPrice.replace(/[^\d]/g, ''),
                            totalPrice: orderData.totalPrice,
                            statusText: orderData.statusText,
                            statusClass: orderData.statusClass,
                            orderDate: '1403/06/15',
                            note: ''
                        };
                        if (typeof window.openEditOrderModal === 'function') {
                            window.openEditOrderModal(basicOrderData);
                        }
                    }
                } else {
                    console.log('📋 باز کردن مودال عمومی:', modalTarget);
                    const modal = new bootstrap.Modal(document.querySelector(modalTarget));
                    modal.show();
                }
            } catch (error) {
                console.error('❌ خطا در بارگذاری:', error);
                alert('خطا در بارگذاری فایل‌ها!');
                this.disabled = false;
            }
        });
    });
});

// تابع جدید برای لود HTML
function loadHTML(url, containerSelector) {
    return new Promise((resolve, reject) => {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error('❌ Container یافت نشد:', containerSelector);
            reject(new Error(`Container not found: ${containerSelector}`));
            return;
        }
        
        // بررسی که آیا HTML قبلاً لود شده
        if (container.querySelector(`[data-loaded-from="${url}"]`)) {
            console.log('⚡ HTML قبلاً لود شده:', url);
            resolve();
            return;
        }
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // ایجاد یک wrapper div با attribute مخصوص
                const wrapper = document.createElement('div');
                wrapper.setAttribute('data-loaded-from', url);
                wrapper.innerHTML = html;
                
                // اضافه کردن به container
                container.appendChild(wrapper);
                
                console.log('✅ HTML لود شد:', url);
                resolve();
            })
            .catch(error => {
                console.error('❌ خطا در لود HTML:', url, error);
                reject(error);
            });
    });
}

function fillViewModalManually(orderData) {
    console.log('🔧 پر کردن دستی مودال با:', orderData);
    const elements = {
        'viewOrderNumber': orderData.orderNumber,
        'viewCustomerName': orderData.customerName,
        'viewProductName': orderData.productName,
        'viewTotalPrice': orderData.totalPrice
    };
    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value || '-';
        }
    }
    const statusElement = document.getElementById('viewOrderStatus');
    if (statusElement && orderData.statusText) {
        statusElement.textContent = orderData.statusText;
        statusElement.className = `badge fs-6 ${orderData.statusClass || 'bg-secondary'}`;
    }
}
function loadCSS(href) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`link[href="${href}"]`)) {
            console.log('⚡ CSS قبلاً لود شده:', href);
            resolve();
            return;
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => {
            console.log('✅ CSS لود شد:', href);
            resolve();
        };
        link.onerror = () => {
            console.error('❌ خطا در لود CSS:', href);
            reject(new Error(`Failed to load CSS: ${href}`));
        };
        document.head.appendChild(link);
    });
}
function loadJS(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            console.log('⚡ JS قبلاً لود شده:', src);
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => {
            console.log('✅ JS لود شد:', src);
            resolve();
        };
        script.onerror = () => {
            console.error('❌ خطا در لود JS:', src);
            reject(new Error(`Failed to load JS: ${src}`));
        };
        document.body.appendChild(script);
    });
}