let selectedUsers = [];
let allUsers = [];
function loadUsers() {
    allUsers = [
        { id: 1, name: 'علی احمدی', email: 'ali@example.com', status: 'active', vip: false },
        { id: 2, name: 'فاطمه کریمی', email: 'fateme@example.com', status: 'active', vip: false },
        { id: 3, name: 'محمد رضایی', email: 'mohammad@example.com', status: 'active', vip: true },
        { id: 4, name: 'زهرا حسینی', email: 'zahra@example.com', status: 'inactive', vip: false },
        { id: 5, name: 'حسن موسوی', email: 'hasan@example.com', status: 'active', vip: true }
    ];
    displayUsers(allUsers);
}
function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    if (!usersList) return;
    usersList.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'form-check mb-2';
        userDiv.innerHTML = `
            <input class="form-check-input user-checkbox" type="checkbox"
                   value="${user.id}" id="user${user.id}" onchange="updateSelectedCount()">
            <label class="form-check-label" for="user${user.id}">
                <i class="fas fa-${user.vip ? 'crown' : 'user'} me-2 ${user.vip ? 'text-warning' : ''}"></i>
                <strong>${user.name}</strong>
                <small class="text-muted d-block">${user.email}</small>
                ${user.vip ? '<span class="badge bg-warning text-dark">VIP</span>' : ''}
                ${user.status === 'inactive' ? '<span class="badge bg-secondary">غیرفعال</span>' : ''}
            </label>
        `;
        usersList.appendChild(userDiv);
    });
}
function searchUsers() {
    const searchInput = document.getElementById('userSearch');
    if (!searchInput) return;
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
}
function selectAllUsers() {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    updateSelectedCount();
}
function selectActiveUsers() {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        const userId = parseInt(checkbox.value);
        const user = allUsers.find(u => u.id === userId);
        checkbox.checked = user && user.status === 'active';
    });
    updateSelectedCount();
}
function selectVipUsers() {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        const userId = parseInt(checkbox.value);
        const user = allUsers.find(u => u.id === userId);
        checkbox.checked = user && user.vip;
    });
    updateSelectedCount();
}
function updateSelectedCount() {
    const checkedBoxes = document.querySelectorAll('.user-checkbox:checked');
    const count = checkedBoxes.length;
    const countElement = document.getElementById('selectedCount');
    if (countElement) {
        countElement.textContent = `${count} کاربر انتخاب شده`;
    }
    selectedUsers = Array.from(checkedBoxes).map(checkbox => parseInt(checkbox.value));
}
function updateCharacterCount() {
    const messageBody = document.getElementById('messageBody');
    const countElement = document.getElementById('characterCount');
    if (!messageBody || !countElement) return;
    const count = messageBody.value.length;
    countElement.textContent = count;
    if (count > 500) {
        countElement.style.color = '#dc3545';
    } else if (count > 300) {
        countElement.style.color = '#ffc107';
    } else {
        countElement.style.color = '#007bff';
    }
}
function toggleScheduleField() {
    const scheduledRadio = document.getElementById('sendScheduled');
    const scheduledField = document.getElementById('scheduledTimeField');
    if (!scheduledRadio || !scheduledField) return;
    if (scheduledRadio.checked) {
        scheduledField.style.display = 'block';
        scheduledField.classList.add('fade-in');
    } else {
        scheduledField.style.display = 'none';
    }
}
function changeMessageType() {
    const messageType = document.querySelector('input[name="messageType"]:checked');
    const subjectField = document.getElementById('subjectField');
    const attachmentField = document.getElementById('attachmentField');
    if (!messageType || !subjectField || !attachmentField) return;
    const type = messageType.value;
    if (type === 'sms') {
        subjectField.style.display = 'none';
        attachmentField.style.display = 'none';
    } else if (type === 'email') {
        subjectField.style.display = 'block';
        attachmentField.style.display = 'block';
    } else if (type === 'notification') {
        subjectField.style.display = 'block';
        attachmentField.style.display = 'none';
    }
}
function previewMessage() {
    const messageType = document.querySelector('input[name="messageType"]:checked');
    const subjectElement = document.getElementById('messageSubject');
    const bodyElement = document.getElementById('messageBody');
    const previewContent = document.getElementById('previewContent');
    if (!messageType || !bodyElement || !previewContent) return;
    const subject = subjectElement ? subjectElement.value : '';
    const body = bodyElement.value;
    const selectedCount = selectedUsers.length;
    let content = `
        <div class="preview-content">
            <h6>نوع پیام: ${getMessageTypeLabel(messageType.value)}</h6>
            <p><strong>تعداد گیرندگان:</strong> ${selectedCount} نفر</p>
    `;
    if (subject) {
        content += `<p><strong>موضوع:</strong> ${subject}</p>`;
    }
    content += `
            <p><strong>متن پیام:</strong></p>
            <div class="border p-3 bg-white rounded">
                ${body.replace(/\n/g, '<br>')}
            </div>
        </div>
    `;
    previewContent.innerHTML = content;
    const previewModal = new bootstrap.Modal(document.getElementById('previewMessageModal'));
    previewModal.show();
}
function getMessageTypeLabel(type) {
    switch(type) {
        case 'email': return 'ایمیل';
        case 'sms': return 'پیامک';
        case 'notification': return 'اعلان سایت';
        default: return 'نامشخص';
    }
}
function sendGroupMessage() {
    if (selectedUsers.length === 0) {
        alert('لطفاً حداقل یک کاربر انتخاب کنید.');
        return;
    }
    const messageTypeElement = document.querySelector('input[name="messageType"]:checked');
    const subjectElement = document.getElementById('messageSubject');
    const bodyElement = document.getElementById('messageBody');
    const sendTimeElement = document.querySelector('input[name="sendTime"]:checked');
    const scheduledDateTimeElement = document.getElementById('scheduledDateTime');
    if (!messageTypeElement || !bodyElement || !sendTimeElement) return;
    const messageType = messageTypeElement.value;
    const subject = subjectElement ? subjectElement.value : '';
    const body = bodyElement.value;
    const sendTime = sendTimeElement.value;
    const scheduledDateTime = scheduledDateTimeElement ? scheduledDateTimeElement.value : null;
    if (!body.trim()) {
        alert('لطفاً متن پیام را وارد کنید.');
        return;
    }
    const messageData = {
        recipients: selectedUsers,
        type: messageType,
        subject: subject,
        body: body,
        sendTime: sendTime,
        scheduledDateTime: sendTime === 'scheduled' ? scheduledDateTime : null
    };
    console.log('ارسال پیام گروهی:', messageData);
    const modal = bootstrap.Modal.getInstance(document.getElementById('sendGroupMessageModal'));
    if (modal) modal.hide();
    alert(`پیام برای ${selectedUsers.length} کاربر ${sendTime === 'now' ? 'ارسال شد' : 'زمان‌بندی شد'}!`);
}
function saveMessageDraft() {
    const messageTypeElement = document.querySelector('input[name="messageType"]:checked');
    const subjectElement = document.getElementById('messageSubject');
    const bodyElement = document.getElementById('messageBody');
    if (!messageTypeElement || !bodyElement) return;
    const messageData = {
        recipients: selectedUsers,
        type: messageTypeElement.value,
        subject: subjectElement ? subjectElement.value : '',
        body: bodyElement.value,
        status: 'draft'
    };
    console.log('پیش‌نویس ذخیره شد:', messageData);
    alert('پیام به عنوان پیش‌نویس ذخیره شد!');
}
function initializeGroupMessageModal() {
    console.log('🎯 راه‌اندازی مودال پیام گروهی...');
    loadUsers();
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.removeEventListener('input', searchUsers);
        userSearch.addEventListener('input', searchUsers);
    }
    const messageBody = document.getElementById('messageBody');
    if (messageBody) {
        messageBody.removeEventListener('input', updateCharacterCount);
        messageBody.addEventListener('input', updateCharacterCount);
    }
    const messageTypeRadios = document.querySelectorAll('input[name="messageType"]');
    messageTypeRadios.forEach(radio => {
        radio.removeEventListener('change', changeMessageType);
        radio.addEventListener('change', changeMessageType);
    });
    const sendTimeRadios = document.querySelectorAll('input[name="sendTime"]');
    sendTimeRadios.forEach(radio => {
        radio.removeEventListener('change', toggleScheduleField);
        radio.addEventListener('change', toggleScheduleField);
    });
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.removeEventListener('change', handleSelectAll);
        selectAllCheckbox.addEventListener('change', handleSelectAll);
    }
    console.log('✅ مودال پیام گروهی راه‌اندازی شد');
}
function handleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.user-checkbox');
    if (selectAllCheckbox && checkboxes.length > 0) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateSelectedCount();
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGroupMessageModal);
} else {
    initializeGroupMessageModal();
}