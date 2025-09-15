(function() {
    let selectedProductForEdit = null;
    function setupModalFocusManagement() {
        const editProductModal = document.getElementById('editProductModal');
        if (!editProductModal) return;
        editProductModal.removeAttribute('tabindex');
        editProductModal.addEventListener('show.bs.modal', function (e) {
            this.dataset.lastFocusedElement = document.activeElement?.id || '';
        });
        editProductModal.addEventListener('shown.bs.modal', function () {
            const firstInput = this.querySelector('input:not([type="hidden"]):not([disabled])');
            const closeButton = this.querySelector('.btn-close');
            if (firstInput) {
                firstInput.focus();
            } else if (closeButton) {
                closeButton.focus();
            }
        });
        editProductModal.addEventListener('hide.bs.modal', function (e) {
            const allFocusable = this.querySelectorAll('*');
            allFocusable.forEach(el => {
                if (el === document.activeElement) {
                    el.blur();
                }
            });
        });
        editProductModal.addEventListener('hidden.bs.modal', function () {
            const lastFocusedId = this.dataset.lastFocusedElement;
            if (lastFocusedId) {
                const lastElement = document.getElementById(lastFocusedId);
                if (lastElement) {
                    lastElement.focus();
                }
            } else {
                document.body.focus();
            }
        });
    }
    function searchProducts() {
        const searchTerm = document.getElementById('productSearchEdit').value;
        const categoryFilter = document.getElementById('productCategoryFilter').value;
        const sampleProducts = [
            {
                id: 1,
                name: 'گوشی سامسونگ Galaxy S23',
                code: 'SAM-001',
                category: 'electronics',
                price: '25,000,000',
                stock: 15,
                status: 'active',
                image: 'placeholder-image.jpg'
            },
            {
                id: 2,
                name: 'کتاب آموزش برنامه‌نویسی',
                code: 'BOOK-001',
                category: 'books',
                price: '150,000',
                stock: 50,
                status: 'active',
                image: 'placeholder-image.jpg'
            }
        ];
        displayProductList(sampleProducts);
    }
    function displayProductList(products) {
        const tableBody = document.getElementById('productTableBody');
        const productList = document.getElementById('productListForEdit');
        let html = '';
        products.forEach(product => {
            const statusBadge = product.status === 'active' ? 'bg-success' : product.status === 'inactive' ? 'bg-danger' : 'bg-warning';
            const statusText = product.status === 'active' ? 'فعال' : product.status === 'inactive' ? 'غیرفعال' : 'پیش‌نویس';
            html += `
                <tr>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="selectProductForEdit(${product.id}, '${product.name}')">
                            انتخاب
                        </button>
                    </td>
                    <td>
                        <img src="${product.image}" alt="${product.name}" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;">
                    </td>
                    <td>${product.name}</td>
                    <td>${product.code}</td>
                    <td>${getCategoryName(product.category)}</td>
                    <td>${product.price} تومان</td>
                    <td>${product.stock}</td>
                    <td><span class="badge ${statusBadge}">${statusText}</span></td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
        productList.style.display = 'block';
    }
    function selectProductForEdit(productId, productName) {
        selectedProductForEdit = productId;
        document.getElementById('selectedProductName').textContent = productName;
        document.getElementById('selectedProductInfo').style.display = 'block';
        document.getElementById('productListForEdit').style.display = 'none';
        document.getElementById('editProductForm').style.display = 'block';
        document.getElementById('deleteProductBtn').style.display = 'inline-block';
        document.getElementById('saveEditDraftBtn').style.display = 'inline-block';
        document.getElementById('updateProductBtn').style.display = 'inline-block';
        loadProductData(productId);
    }
    function loadProductData(productId) {
        const productData = {
            id: productId,
            name: 'گوشی سامسونگ Galaxy S23',
            code: 'SAM-001',
            category: 'electronics',
            brand: 'Samsung',
            price: '25000000',
            discountPrice: '22000000',
            stock: 15,
            minStock: 5,
            description: 'گوشی هوشمند با امکانات پیشرفته',
            tags: 'گوشی، سامسونگ، هوشمند',
            status: 'active',
            featured: true,
            digital: false,
            shipping: true,
            notification: true,
            mainSection: true,
            position: '2',
            sectionType: 'featured',
            displayNote: 'جدیدترین مدل',
            specifications: [
                {name: 'رنگ', value: 'مشکی'},
                {name: 'حافظه', value: '128GB'}
            ]
        };
        document.getElementById('editProductId').value = productData.id;
        document.getElementById('editProductName').value = productData.name;
        document.getElementById('editProductCode').value = productData.code;
        document.getElementById('editProductCategory').value = productData.category;
        document.getElementById('editProductBrand').value = productData.brand;
        document.getElementById('editProductPrice').value = parseInt(productData.price).toLocaleString('en-US');
        document.getElementById('editProductDiscountPrice').value = parseInt(productData.discountPrice).toLocaleString('en-US');
        document.getElementById('editProductStock').value = productData.stock;
        document.getElementById('editProductMinStock').value = productData.minStock;
        document.getElementById('editProductDescription').value = productData.description;
        document.getElementById('editProductTags').value = productData.tags;
        document.getElementById('editProductStatus').value = productData.status;
        document.getElementById('editProductFeatured').checked = productData.featured;
        document.getElementById('editProductDigital').checked = productData.digital;
        document.getElementById('editProductShipping').checked = productData.shipping;
        document.getElementById('editProductNotification').checked = productData.notification;
        document.getElementById('editProductMainSection').checked = productData.mainSection;
        document.getElementById('editProductPosition').value = productData.position;
        document.getElementById('editProductSectionType').value = productData.sectionType;
        document.getElementById('editProductDisplayNote').value = productData.displayNote;
        if (productData.mainSection) {
            toggleEditMainSectionSettings();
        }
        loadEditSpecifications(productData.specifications);
        document.getElementById('currentProductImage').innerHTML = `
            <img src="product-image-${productId}.jpg" alt="${productData.name}" class="img-thumbnail" style="width: 100px;">
        `;
    }
    function loadEditSpecifications(specifications) {
        const container = document.getElementById('editSpecifications');
        container.innerHTML = '';
        specifications.forEach(spec => {
            const specRow = document.createElement('div');
            specRow.className = 'row specification-row mb-2';
            specRow.innerHTML = `
                <div class="col-md-5">
                    <input type="text" class="form-control" value="${spec.name}" placeholder="نام مشخصه">
                </div>
                <div class="col-md-5">
                    <input type="text" class="form-control" value="${spec.value}" placeholder="مقدار">
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-outline-danger btn-sm w-100" onclick="removeEditSpecification(this)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(specRow);
        });
    }
    function addEditSpecification() {
        const container = document.getElementById('editSpecifications');
        const newRow = document.createElement('div');
        newRow.className = 'row specification-row mb-2';
        newRow.innerHTML = `
            <div class="col-md-5">
                <input type="text" class="form-control" placeholder="نام مشخصه (مثال: رنگ)">
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" placeholder="مقدار (مثال: آبی)">
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-outline-danger btn-sm w-100" onclick="removeEditSpecification(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(newRow);
    }
    function removeEditSpecification(button) {
        button.closest('.specification-row').remove();
    }
    function toggleEditMainSectionSettings() {
        const checkbox = document.getElementById('editProductMainSection');
        const settings = document.getElementById('editMainSectionSettings');
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
    function clearSelectedProduct() {
        selectedProductForEdit = null;
        document.getElementById('selectedProductInfo').style.display = 'none';
        document.getElementById('editProductForm').style.display = 'none';
        document.getElementById('productListForEdit').style.display = 'block';
        document.getElementById('deleteProductBtn').style.display = 'none';
        document.getElementById('saveEditDraftBtn').style.display = 'none';
        document.getElementById('updateProductBtn').style.display = 'none';
    }
    function updateProduct() {
        const form = document.getElementById('productEditForm');
        const formData = new FormData(form);
        const price = removeCommas(document.getElementById('editProductPrice').value);
        const discountPrice = removeCommas(document.getElementById('editProductDiscountPrice').value);
        formData.set('price', price);
        formData.set('discountPrice', discountPrice);
        formData.set('productId', selectedProductForEdit);
        const isMainSection = document.getElementById('editProductMainSection').checked;
        formData.set('showInMainSection', isMainSection);
        if (isMainSection) {
            formData.set('mainSectionPosition', document.getElementById('editProductPosition').value);
            formData.set('mainSectionType', document.getElementById('editProductSectionType').value);
            formData.set('mainSectionNote', document.getElementById('editProductDisplayNote').value);
        }
        console.log('محصول به‌روزرسانی شد:', Object.fromEntries(formData));
        document.activeElement.blur();
        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
            modal.hide();
        }, 50);
        alert('محصول با موفقیت به‌روزرسانی شد!');
    }
    function saveEditProductDraft() {
        const form = document.getElementById('productEditForm');
        const formData = new FormData(form);
        formData.set('status', 'draft');
        formData.set('productId', selectedProductForEdit);
        console.log('پیش‌نویس ویرایش ذخیره شد:', Object.fromEntries(formData));
        alert('تغییرات به عنوان پیش‌نویس ذخیره شد!');
    }
    function deleteProduct() {
        if (confirm('آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟')) {
            console.log('محصول حذف شد:', selectedProductForEdit);
            document.activeElement.blur();
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
                modal.hide();
            }, 50);
            alert('محصول با موفقیت حذف شد!');
        }
    }
    function filterProductsByCategory() {
        searchProducts();
    }
    function getCategoryName(category) {
        const categories = {
            'electronics': 'لوازم الکترونیکی',
            'clothing': 'پوشاک',
            'home': 'خانه و آشپزخانه',
            'books': 'کتاب',
            'sports': 'ورزشی'
        };
        return categories[category] || category;
    }
    function removeCommas(value) {
        return value.replace(/,/g, '');
    }
    function formatNumber(input) {
        let value = input.value.replace(/,/g, '');
        if (value && !isNaN(value)) {
            input.value = Number(value).toLocaleString('en-US');
        }
    }
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🎯 مودال ویرایش محصول آماده شد');
        setupModalFocusManagement();
        const editProductModal = document.getElementById('editProductModal');
        if (editProductModal) {
            editProductModal.addEventListener('hide.bs.modal', function () {
                const focusedElement = this.querySelector(':focus');
                if (focusedElement) {
                    focusedElement.blur();
                }
            });
            editProductModal.addEventListener('hidden.bs.modal', function () {
                document.body.focus();
            });
        }
        const editPriceInputs = document.querySelectorAll('#editProductPrice, #editProductDiscountPrice');
        if (editPriceInputs.length > 0) {
            editPriceInputs.forEach(input => {
                input.addEventListener('input', function(e) {
                    let value = e.target.value;
                    value = value.replace(/[^\d,]/g, '');
                    e.target.value = value;
                    formatNumber(e.target);
                });
                input.addEventListener('blur', function() {
                    formatNumber(this);
                });
                input.addEventListener('paste', function() {
                    setTimeout(() => {
                        formatNumber(this);
                    }, 10);
                });
                input.addEventListener('keypress', function(e) {
                    const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
                    if (allowedKeys.includes(e.key)) return;
                    if (!/\d/.test(e.key)) {
                        e.preventDefault();
                    }
                });
            });
        }
    });
    window.searchProducts = searchProducts;
    window.selectProductForEdit = selectProductForEdit;
    window.clearSelectedProduct = clearSelectedProduct;
    window.updateProduct = updateProduct;
    window.saveEditProductDraft = saveEditProductDraft;
    window.deleteProduct = deleteProduct;
    window.addEditSpecification = addEditSpecification;
    window.removeEditSpecification = removeEditSpecification;
    window.toggleEditMainSectionSettings = toggleEditMainSectionSettings;
    window.filterProductsByCategory = filterProductsByCategory;
    window.formatNumber = formatNumber;
})();