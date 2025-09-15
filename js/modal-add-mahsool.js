function addSpecification() {
    const specificationsDiv = document.getElementById('specifications');
    const newRow = document.createElement('div');
    newRow.className = 'row specification-row';
    newRow.innerHTML = `
        <div class="col-md-5">
            <input type="text" class="form-control" placeholder="نام مشخصه (مثال: رنگ)">
        </div>
        <div class="col-md-5">
            <input type="text" class="form-control" placeholder="مقدار (مثال: آبی)">
        </div>
        <div class="col-md-2">
            <button type="button" class="btn btn-outline-danger btn-sm w-100" onclick="removeSpecification(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    specificationsDiv.appendChild(newRow);
}
function removeSpecification(button) {
    const specificationsDiv = document.getElementById('specifications');
    if (specificationsDiv.children.length > 1) {
        button.closest('.specification-row').remove();
    }
}
function formatNumber(input) {
    let cursorPosition = input.selectionStart;
    let oldLength = input.value.length;
    let value = input.value.replace(/[^\d]/g, '');
    if (value === '') {
        input.value = '';
        return;
    }
    let formattedValue = parseInt(value).toLocaleString('en-US');
    input.value = formattedValue;
    let newLength = input.value.length;
    let lengthDiff = newLength - oldLength;
    let newPosition = cursorPosition + lengthDiff;
    setTimeout(() => {
        input.setSelectionRange(newPosition, newPosition);
    }, 0);
}
function removeCommas(value) {
    return value.replace(/[^\d]/g, '');
}
function saveProduct() {
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);
    const price = removeCommas(document.getElementById('productPrice').value);
    const discountPrice = removeCommas(document.getElementById('productDiscountPrice').value);
    formData.set('price', price);
    formData.set('discountPrice', discountPrice);
    console.log('محصول ذخیره شد:', Object.fromEntries(formData));
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();
    alert('محصول با موفقیت اضافه شد!');
}
function saveProductDraft() {
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);
    const price = removeCommas(document.getElementById('productPrice').value);
    const discountPrice = removeCommas(document.getElementById('productDiscountPrice').value);
    formData.set('price', price);
    formData.set('discountPrice', discountPrice);
    formData.set('status', 'draft');
    console.log('پیش‌نویس ذخیره شد:', Object.fromEntries(formData));
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();
    alert('محصول به عنوان پیش‌نویس ذخیره شد!');
}
document.addEventListener('DOMContentLoaded', function() {
    const priceInputs = document.querySelectorAll('#productPrice, #productDiscountPrice');
    priceInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            if (!/^\d*$/.test(e.data) && e.data !== null) {
                return;
            }
            formatNumber(this);
        });
        input.addEventListener('blur', function() {
            formatNumber(this);
        });
        input.addEventListener('paste', function(e) {
            setTimeout(() => {
                formatNumber(this);
            }, 10);
        });
        input.addEventListener('keypress', function(e) {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
            if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
            }
        });
    });
});
function toggleMainSectionSettings() {
    const checkbox = document.getElementById('productMainSection');
    const settings = document.getElementById('mainSectionSettings');
    if (checkbox.checked) {
        settings.style.display = 'block';
        settings.style.opacity = '0';
        setTimeout(() => {
            settings.style.transition = 'opacity 0.3s ease';
            settings.style.opacity = '1';
        }, 10);
    } else {
        settings.style.transition = 'opacity 0.3s ease';
        settings.style.opacity = '0';
        setTimeout(() => {
            settings.style.display = 'none';
        }, 300);
    }
}
function saveProduct() {
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);
    const price = removeCommas(document.getElementById('productPrice').value);
    const discountPrice = removeCommas(document.getElementById('productDiscountPrice').value);
    formData.set('price', price);
    formData.set('discountPrice', discountPrice);
    const isMainSection = document.getElementById('productMainSection').checked;
    formData.set('showInMainSection', isMainSection);
    if (isMainSection) {
        const position = document.getElementById('productPosition').value;
        const sectionType = document.getElementById('productSectionType').value;
        const displayNote = document.getElementById('productDisplayNote').value;
        formData.set('mainSectionPosition', position);
        formData.set('mainSectionType', sectionType);
        formData.set('mainSectionNote', displayNote);
    }
    console.log('محصول ذخیره شد:', Object.fromEntries(formData));
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();
    alert('محصول با موفقیت اضافه شد!');
}
function saveProductDraft() {
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);
    const price = removeCommas(document.getElementById('productPrice').value);
    const discountPrice = removeCommas(document.getElementById('productDiscountPrice').value);
    formData.set('price', price);
    formData.set('discountPrice', discountPrice);
    formData.set('status', 'draft');
    const isMainSection = document.getElementById('productMainSection').checked;
    formData.set('showInMainSection', isMainSection);
    if (isMainSection) {
        const position = document.getElementById('productPosition').value;
        const sectionType = document.getElementById('productSectionType').value;
        const displayNote = document.getElementById('productDisplayNote').value;
        formData.set('mainSectionPosition', position);
        formData.set('mainSectionType', sectionType);
        formData.set('mainSectionNote', displayNote);
    }
    console.log('پیش‌نویس ذخیره شد:', Object.fromEntries(formData));
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();
    alert('محصول به عنوان پیش‌نویس ذخیره شد!');
}