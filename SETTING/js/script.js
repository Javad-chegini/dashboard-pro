
        document.addEventListener('click', function(event) {
            const sidebar = document.querySelector('.sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            
            // تغییر شرط از 768 به 1200
            if (window.innerWidth <= 1115 && !sidebar.contains(event.target) && event.target !== sidebarToggle) {
                sidebar.classList.remove('show');
            }
        });

        // Select All Functionality
        document.getElementById('selectAll').addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.user-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateBulkActions();
        });

        // Individual checkbox handler
        document.querySelectorAll('.user-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allCheckboxes = document.querySelectorAll('.user-checkbox');
                const checkedCheckboxes = document.querySelectorAll('.user-checkbox:checked');
                const selectAllCheckbox = document.getElementById('selectAll');
                
                if (checkedCheckboxes.length === allCheckboxes.length) {
                    selectAllCheckbox.checked = true;
                    selectAllCheckbox.indeterminate = false;
                } else if (checkedCheckboxes.length > 0) {
                    selectAllCheckbox.checked = false;
                    selectAllCheckbox.indeterminate = true;
                } else {
                    selectAllCheckbox.checked = false;
                    selectAllCheckbox.indeterminate = false;
                }
                updateBulkActions();
            });
        });

        // Update bulk actions visibility
        function updateBulkActions() {
            const checkedCheckboxes = document.querySelectorAll('.user-checkbox:checked');
            // اینجا می‌تونی منطق نمایش/عدم نمایش دکمه‌های عملیات گروهی رو اضافه کنی
        }

        // Search function
        function searchUsers() {
            const searchValue = document.getElementById('searchInput').value.toLowerCase();
            const rows = document.querySelectorAll('#usersTableBody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Clear Filters Function
        function clearFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('statusFilter').selectedIndex = 0;
            document.getElementById('roleFilter').selectedIndex = 0;
            document.getElementById('dateFilter').value = '';
            
            // نمایش همه ردیف‌ها
            const rows = document.querySelectorAll('#usersTableBody tr');
            rows.forEach(row => {
                row.style.display = '';
            });
        }

        // User Management Functions
        function editUser(userId) {
            alert(`ویرایش کاربر با ID: ${userId}`);
            // اینجا می‌تونی مودال ویرایش رو باز کنی
        }

        function viewUser(userId) {
            alert(`نمایش جزئیات کاربر با ID: ${userId}`);
            // اینجا می‌تونی مودال نمایش جزئیات رو باز کنی
        }

        function toggleUserStatus(userId) {
            if (confirm('آیا از تغییر وضعیت این کاربر اطمینان دارید؟')) {
                alert(`تغییر وضعیت کاربر با ID: ${userId}`);
                // اینجا درخواست AJAX برای تغییر وضعیت
            }
        }

        function deleteUser(userId) {
            if (confirm('آیا از حذف این کاربر اطمینان دارید؟ این عمل قابل بازگشت نیست.')) {
                alert(`حذف کاربر با ID: ${userId}`);
                // اینجا درخواست AJAX برای حذف
            }
        }

        function bulkAction(action) {
            const selectedUsers = document.querySelectorAll('.user-checkbox:checked');
            if (selectedUsers.length === 0) {
                alert('لطفاً حداقل یک کاربر را انتخاب کنید.');
                return;
            }

            const userIds = Array.from(selectedUsers).map(cb => {
                return cb.getAttribute('data-user-id');
            });

            let confirmMessage = '';
            switch(action) {
                case 'activate':
                    confirmMessage = `آیا از فعال کردن ${userIds.length} کاربر انتخاب شده اطمینان دارید؟`;
                    break;
                case 'deactivate':
                    confirmMessage = `آیا از غیرفعال کردن ${userIds.length} کاربر انتخاب شده اطمینان دارید؟`;
                    break;
                case 'delete':
                    confirmMessage = `آیا از حذف ${userIds.length} کاربر انتخاب شده اطمینان دارید؟ این عمل قابل بازگشت نیست.`;
                    break;
            }

            if (confirm(confirmMessage)) {
                alert(`${action} برای کاربران: ${userIds.join(', ')}`);
                // اینجا درخواست AJAX برای عملیات گروهی
            }
        }

        function exportUsers() {
            alert('در حال آماده‌سازی فایل Excel...');
            // اینجا می‌تونی درخواست برای خروجی Excel بفرستی
        }

        function saveUser() {
            const form = document.getElementById('addUserForm');
            const formData = new FormData(form);
            
            // بررسی تطبیق رمز عبور
            if (formData.get('password') !== formData.get('confirmPassword')) {
                alert('رمز عبور و تکرار آن باید یکسان باشند.');
                return;
            }
            
            // اینجا درخواست AJAX برای ذخیره کاربر
            alert('کاربر جدید با موفقیت اضافه شد!');
            
            // بستن مودال و پاک کردن فرم
            const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
            modal.hide();
            form.reset();
        }

        // Live search
        document.getElementById('searchInput').addEventListener('input', searchUsers);

        // Filter change handlers
        document.getElementById('statusFilter').addEventListener('change', applyFilters);
        document.getElementById('roleFilter').addEventListener('change', applyFilters);
        document.getElementById('dateFilter').addEventListener('change', applyFilters);

        function applyFilters() {
            const searchValue = document.getElementById('searchInput').value.toLowerCase();
            const statusFilter = document.getElementById('statusFilter').value;
            const roleFilter = document.getElementById('roleFilter').value;
            const dateFilter = document.getElementById('dateFilter').value;
            
            const rows = document.querySelectorAll('#usersTableBody tr');
            
            rows.forEach(row => {
                let showRow = true;
                const text = row.textContent.toLowerCase();
                
                // Search filter
                if (searchValue && !text.includes(searchValue)) {
                    showRow = false;
                }
                
                // Status filter
                if (statusFilter) {
                    const statusBadge = row.querySelector('td:nth-child(6) .badge').textContent.trim();
                    let statusValue = '';
                    if (statusBadge === 'فعال') statusValue = 'active';
                    else if (statusBadge === 'غیرفعال') statusValue = 'inactive';
                    else if (statusBadge === 'مسدود') statusValue = 'banned';
                    
                    if (statusValue !== statusFilter) {
                        showRow = false;
                    }
                }
                
                // Role filter
                if (roleFilter) {
                    const roleBadge = row.querySelector('td:nth-child(5) .badge').textContent.trim();
                    let roleValue = '';
                    if (roleBadge === 'ادمین') roleValue = 'admin';
                    else if (roleBadge === 'کاربر عادی') roleValue = 'user';
                    else if (roleBadge === 'کاربر ویژه') roleValue = 'vip';
                    
                    if (roleValue !== roleFilter) {
                        showRow = false;
                    }
                }
                
                row.style.display = showRow ? '' : 'none';
            });
        }