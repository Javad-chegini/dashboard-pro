function saveUser() {
    const form = document.getElementById('addUserForm');
    if (form.checkValidity()) {
        const userData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            role: document.getElementById('userRole').value,
            status: document.getElementById('userStatus').value,
            address: document.getElementById('userAddress').value,
            sendWelcomeEmail: document.getElementById('sendWelcomeEmail').checked
        };
        const saveBtn = event.target;
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>در حال ذخیره...';
        saveBtn.disabled = true;
        setTimeout(() => {
            console.log('کاربر جدید:', userData);
            showToast('کاربر جدید با موفقیت اضافه شد!', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
            modal.hide();
            form.reset();
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }, 1500);
    } else {
        form.classList.add('was-validated');
        showToast('لطفاً تمام فیلدهای الزامی را پر کنید!', 'error');
    }
}
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '1060';
    document.body.appendChild(container);
    return container;
}
document.getElementById('addUserModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('addUserForm').reset();
    document.getElementById('addUserForm').classList.remove('was-validated');
});