document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
    updateBatchActions();
});
document.querySelectorAll('.product-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateBatchActions);
});
function updateBatchActions() {
    const checkedBoxes = document.querySelectorAll('.product-checkbox:checked');
    const batchActions = document.getElementById('batchActions');
    const selectedCount = batchActions.querySelector('.selected-count');
    if (checkedBoxes.length > 0) {
        batchActions.style.display = 'block';
        selectedCount.textContent = `${checkedBoxes.length} محصول انتخاب شده`;
    } else {
        batchActions.style.display = 'none';
    }
}
document.querySelectorAll('.priority-order button').forEach(button => {
    button.addEventListener('click', function() {
        const isUp = this.querySelector('.fa-arrow-up');
        const orderSpan = this.parentElement.querySelector('span');
        let currentOrder = parseInt(orderSpan.textContent);
        if (isUp && currentOrder > 1) {
            orderSpan.textContent = currentOrder - 1;
        } else if (!isUp) {
            orderSpan.textContent = currentOrder + 1;
        }
    });
});
function toggleView() {
    alert('تغییر نمای محصولات');
}
document.querySelectorAll('.upload-box, .upload-box-small').forEach(box => {
    box.addEventListener('click', function() {
        const input = this.querySelector('input[type="file"]');
        if (input) {
            input.click();
        }
    });
});
document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function(e) {
        const files = e.target.files;
        if (files.length > 0) {
            console.log('Files selected:', files);
        }
    });
});
document.querySelectorAll('.form-switch input').forEach(switchInput => {
    switchInput.addEventListener('change', function() {
        const label = this.nextElementSibling;
        if (this.checked) {
            label.textContent = 'فعال';
        } else {
            label.textContent = 'غیرفعال';
        }
    });
});
document.querySelectorAll('.btn-outline-danger').forEach(button => {
    button.addEventListener('click', function() {
        if (confirm('آیا از حذف این محصول اطمینان دارید؟')) {
            console.log('Product deleted');
        }
    });
});
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        console.log('Searching for:', searchTerm);
    });
}
const categorySelect = document.querySelector('.form-select');
if (categorySelect) {
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        console.log('Filtering by category:', selectedCategory);
    });
}
function setupProductSearch() {
    const searchInput = document.querySelector('.search-box input');
    const productRows = document.querySelectorAll('.products-table tbody tr');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        productRows.forEach(row => {
            const productName = row.querySelector('td:nth-child(3) strong')?.textContent.toLowerCase() || '';
            const productCode = row.querySelector('td:nth-child(3) small')?.textContent.toLowerCase() || '';
            const category = row.querySelector('td:nth-child(4)')?.textContent.toLowerCase() || '';
            const price = row.querySelector('td:nth-child(5)')?.textContent || '';
            const matchFound =
                productName.includes(searchTerm) ||
                productCode.includes(searchTerm) ||
                category.includes(searchTerm) ||
                price.includes(searchTerm);
            if (searchTerm === '' || matchFound) {
                row.style.display = '';
                row.style.opacity = '1';
            } else {
                row.style.display = 'none';
                row.style.opacity = '0';
            }
        });
        updateSearchResults();
    });
    addClearButton();
}
function updateSearchResults() {
    const visibleRows = document.querySelectorAll('.products-table tbody tr[style=""], .products-table tbody tr:not([style*="display: none"])');
    const totalRows = document.querySelectorAll('.products-table tbody tr').length;
    let resultCounter = document.querySelector('.search-results-counter');
    if (!resultCounter) {
        resultCounter = document.createElement('small');
        resultCounter.className = 'search-results-counter text-muted d-block mt-2';
        document.querySelector('.search-box').appendChild(resultCounter);
    }
    if (visibleRows.length < totalRows) {
        resultCounter.textContent = `${visibleRows.length} محصول از ${totalRows} محصول یافت شد`;
        resultCounter.style.display = 'block';
    } else {
        resultCounter.style.display = 'none';
    }
}
function addClearButton() {
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox.querySelector('input');
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'position-relative';
    searchInput.parentNode.insertBefore(inputWrapper, searchInput);
    inputWrapper.appendChild(searchInput);
    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn btn-sm position-absolute top-50 translate-middle-y';
    clearBtn.style.cssText = 'left: 10px; border: none; background: none; color: #6c757d; display: none; z-index: 10;';
    clearBtn.innerHTML = '<i class="fas fa-times"></i>';
    clearBtn.type = 'button';
    inputWrapper.appendChild(clearBtn);
    searchInput.addEventListener('input', function() {
        clearBtn.style.display = this.value ? 'block' : 'none';
    });
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        clearBtn.style.display = 'none';
        searchInput.focus();
    });
}
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .products-table tbody tr {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .search-box input {
        padding-left: 40px;
    }
    .search-results-counter {
        font-size: 0.875rem;
        margin-right: 5px;
    }
    .search-highlight {
        background-color: #fff3cd;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }
`;
document.head.appendChild(styleSheet);
document.addEventListener('DOMContentLoaded', setupProductSearch);
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('جستجو برای:', this.value);
        }
    });
});