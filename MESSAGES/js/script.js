
        document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.querySelector('.sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            let overlay = null;
            
            if (!sidebar || !sidebarToggle) {
                console.error('Required elements not found!');
                return;
            }
            
            // ایجاد overlay
            function createOverlay() {
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'sidebar-overlay';
                    document.body.appendChild(overlay);
                    
                    overlay.addEventListener('click', function() {
                        closeSidebar();
                    });
                }
                return overlay;
            }
            
            // باز کردن sidebar
            function openSidebar() {
                sidebar.classList.add('show');
                const overlayElement = createOverlay();
                overlayElement.classList.add('show');
                document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول
            }
            
            // بستن sidebar
            function closeSidebar() {
                sidebar.classList.remove('show');
                if (overlay) {
                    overlay.classList.remove('show');
                    setTimeout(() => {
                        if (overlay && !overlay.classList.contains('show')) {
                            overlay.remove();
                            overlay = null;
                        }
                    }, 300);
                }
                document.body.style.overflow = ''; // برگرداندن اسکرول
            }
            
            // رویداد کلیک برای toggle
            sidebarToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (sidebar.classList.contains('show')) {
                    closeSidebar();
                } else {
                    openSidebar();
                }
            });
            
            // بستن با کلید Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && sidebar.classList.contains('show')) {
                    closeSidebar();
                }
            });
            
            // تنظیم مجدد در تغییر سایز پنجره
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 1115 && sidebar.classList.contains('show')) {
                    closeSidebar();
                }
            });
        });

        // تابع برای مدیریت overlay (اختیاری)
        function toggleOverlay() {
            let overlay = document.querySelector('.sidebar-overlay');
            
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
                
                // بستن sidebar با کلیک روی overlay
                overlay.addEventListener('click', function() {
                    document.querySelector('.sidebar').classList.remove('show');
                    this.remove();
                });
            } else {
                overlay.remove();
            }
        }

        document.getElementById('sidebarToggle').addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('show');
        });

        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.addEventListener('click', function() {
                document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        document.addEventListener('click', function(event) {
            const sidebar = document.querySelector('.sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            
            // تغییر شرط از 768 به 1200
            if (window.innerWidth <= 1115 && !sidebar.contains(event.target) && event.target !== sidebarToggle) {
                sidebar.classList.remove('show');
            }
        });

        // مدیریت کلیک روی پیام‌ها
        document.querySelectorAll('.message-item').forEach(item => {
            item.addEventListener('click', function() {
                // حذف کلاس active از همه
                document.querySelectorAll('.message-item').forEach(msg => {
                    msg.classList.remove('active');
                });
                // اضافه کردن کلاس active به آیتم کلیک شده
                this.classList.add('active');
                // حذف کلاس unread
                this.classList.remove('unread');
            });
        });

        // مدیریت فیلترها
        document.querySelectorAll('.filter-badge').forEach(filter => {
            filter.addEventListener('click', function() {
                // حذف کلاس active از همه
                document.querySelectorAll('.filter-badge').forEach(f => {
                    f.classList.remove('active');
                });
                // اضافه کردن کلاس active به فیلتر کلیک شده
                this.classList.add('active');
            });
        });

        // نمایش مودال نوشتن پیام
        document.querySelector('.compose-btn').addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('composeModal'));
            modal.show();
        });

        // جستجو در پیام‌ها
        const searchInput = document.querySelector('.message-search input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.message-item').forEach(item => {
                const sender = item.querySelector('.message-sender').textContent.toLowerCase();
                const subject = item.querySelector('.message-subject').textContent.toLowerCase();
                const preview = item.querySelector('.message-preview').textContent.toLowerCase();
                
                if (sender.includes(searchTerm) || subject.includes(searchTerm) || preview.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });