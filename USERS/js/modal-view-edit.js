let currentUserId = null;
function editUser(userId) {
    currentUserId = userId;
    const userData = getUserData(userId);
    document.getElementById('editUserName').value = userData.name;
    document.getElementById('editUserEmail').value = userData.email;
    document.getElementById('editUserPhone').value = userData.phone;
    document.getElementById('editUserRole').value = userData.role;
    document.getElementById('editUserStatus').value = userData.status;
    document.getElementById('editUserJoinDate').value = userData.joinDate;
    document.getElementById('editUserLastActivity').value = userData.lastActivity;
    document.getElementById('editUserBio').value = userData.bio || '';
    const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
}
function viewUser(userId) {
    currentUserId = userId;
    const userData = getUserData(userId);
    document.getElementById('viewUserName').textContent = userData.name;
    document.getElementById('viewUserId').textContent = '#' + userData.id;
    document.getElementById('viewUserEmail').textContent = userData.email;
    document.getElementById('viewUserPhone').textContent = userData.phone;
    document.getElementById('viewUserJoinDate').textContent = userData.joinDate;
    document.getElementById('viewUserLastActivity').innerHTML = userData.lastActivityHtml;
    document.getElementById('viewUserBio').textContent = userData.bio || 'توضیحاتی وارد نشده';
    const statusBadge = document.getElementById('viewUserStatusBadge');
    const roleBadge = document.getElementById('viewUserRoleBadge');
    statusBadge.textContent = getStatusText(userData.status);
    statusBadge.className = 'badge fs-6 ' + getStatusClass(userData.status);
    roleBadge.textContent = getRoleText(userData.role);
    roleBadge.className = 'badge ' + getRoleClass(userData.role);
    const modal = new bootstrap.Modal(document.getElementById('viewUserModal'));
    modal.show();
}
function saveUserChanges() {
    const form = document.getElementById('editUserForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const userData = {
        id: currentUserId,
        name: document.getElementById('editUserName').value,
        email: document.getElementById('editUserEmail').value,
        phone: document.getElementById('editUserPhone').value,
        role: document.getElementById('editUserRole').value,
        status: document.getElementById('editUserStatus').value,
        bio: document.getElementById('editUserBio').value
    };
    console.log('ذخیره تغییرات:', userData);
    bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
    showToast('تغییرات با موفقیت ذخیره شد', 'success');
    updateUserInTable(userData);
}
function openEditFromView() {
    bootstrap.Modal.getInstance(document.getElementById('viewUserModal')).hide();
    setTimeout(() => {
        editUser(currentUserId);
    }, 300);
}
function getUserData(userId) {
    const users = {
        1001: {
            id: 1001,
            name: 'احمد محمدی',
            email: 'ahmad@example.com',
            phone: '09121234567',
            role: 'admin',
            status: 'active',
            joinDate: '1403/02/15',
            lastActivity: 'آنلاین',
            lastActivityHtml: '<span class="text-success"><i class="fas fa-circle" style="font-size: 8px;"></i> آنلاین</span>',
            bio: 'ادمین اصلی سیستم'
        },
        1002: {
            id: 1002,
            name: 'مریم احمدی',
            email: 'maryam@example.com',
            phone: '09131234568',
            role: 'premium',
            status: 'active',
            joinDate: '1403/02/20',
            lastActivity: '2 ساعت قبل',
            lastActivityHtml: '<small class="text-muted">2 ساعت قبل</small>',
            bio: 'کاربر فعال و منظم'
        }
    };
    return users[userId] || users[1001];
}
function getStatusText(status) {
    const statusMap = {
        'active': 'فعال',
        'inactive': 'غیرفعال',
        'blocked': 'مسدود'
    };
    return statusMap[status] || 'نامشخص';
}
function getStatusClass(status) {
    const classMap = {
        'active': 'bg-success',
        'inactive': 'bg-warning',
        'blocked': 'bg-danger'
    };
    return classMap[status] || 'bg-secondary';
}
function getRoleText(role) {
    const roleMap = {
        'admin': 'ادمین',
        'premium': 'کاربر ویژه',
        'user': 'کاربر عادی'
    };
    return roleMap[role] || 'نامشخص';
}
function getRoleClass(role) {
    const classMap = {
        'admin': 'bg-primary',
        'premium': 'bg-info',
        'user': 'bg-secondary'
    };
    return classMap[role] || 'bg-secondary';
}
function showToast(message, type = 'success') {
    console.log(`Toast (${type}): ${message}`);
}
function updateUserInTable(userData) {
    console.log('به‌روزرسانی جدول:', userData);
}
function sendMessage() {
    console.log('ارسال پیام به کاربر:', currentUserId);
}