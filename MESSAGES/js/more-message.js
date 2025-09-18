function replyMessage() {
    document.getElementById('quickReply').style.display = 'block';
    document.getElementById('replyTextarea').focus();
    document.querySelector('.reply-header span').textContent = 'در حال پاسخ به: علی محمدی';
}
function replyAllMessage() {
    document.getElementById('quickReply').style.display = 'block';
    document.getElementById('replyTextarea').focus();
    document.querySelector('.reply-header span').textContent = 'در حال پاسخ به همه';
    showToast('حالت پاسخ به همه فعال شد');
}
function forwardMessage() {
    const modal = new bootstrap.Modal(document.getElementById('forwardModal'));
    modal.show();
}
function toggleStar(button) {
    const isStarred = button.classList.contains('starred');
    if (isStarred) {
        button.classList.remove('starred');
        button.innerHTML = '<i class="fas fa-star"></i> نشان‌گذاری';
        showToast('نشان برداشته شد');
    } else {
        button.classList.add('starred');
        button.innerHTML = '<i class="fas fa-star"></i> حذف نشان';
        button.style.background = '#ffc107';
        button.style.color = 'white';
        showToast('پیام نشان‌گذاری شد');
    }
}
function deleteMessage() {
    if (confirm('آیا از حذف این پیام اطمینان دارید؟')) {
        showToast('پیام با موفقیت حذف شد', 'danger');
        setTimeout(() => {
            document.querySelector('.messages-main').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-envelope-open"></i>
                    <p>پیامی برای نمایش وجود ندارد</p>
                </div>
            `;
        }, 1000);
    }
}
function printMessage() {
    window.print();
}
function markAsUnread() {
    const activeItem = document.querySelector('.message-item.active');
    if (activeItem) {
        activeItem.classList.add('unread');
    }
    showToast('پیام به حالت خوانده نشده تغییر یافت');
}
function downloadAttachment(filename) {
    showToast(`در حال دانلود ${filename}...`);
    setTimeout(() => {
        showToast(`${filename} با موفقیت دانلود شد`, 'success');
    }, 2000);
}
function closeQuickReply() {
    document.getElementById('quickReply').style.display = 'none';
    document.getElementById('replyTextarea').value = '';
}
function sendReply(event) {
    event.preventDefault();
    const replyText = document.getElementById('replyTextarea').value;
    if (replyText.trim()) {
        showToast('پاسخ شما با موفقیت ارسال شد', 'success');
        closeQuickReply();
    } else {
        showToast('لطفاً متن پاسخ را وارد کنید', 'warning');
    }
}
function saveDraft() {
    const replyText = document.getElementById('replyTextarea').value;
    if (replyText.trim()) {
        localStorage.setItem('messageDraft', replyText);
        showToast('پیش‌نویس ذخیره شد', 'info');
    }
}
function attachFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e) => {
        const files = e.target.files;
        showToast(`${files.length} فایل انتخاب شد`);
    };
    input.click();
}
function insertEmoji() {
    const emojis = ['😊', '👍', '❤️', '🎉', '✅', '🙏', '😍', '🤝'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const textarea = document.getElementById('replyTextarea');
    textarea.value += emoji;
    textarea.focus();
}
function insertImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            showToast('تصویر انتخاب شد: ' + file.name);
        }
    };
    input.click();
}
function showToast(message, type = 'primary') {
    const toastHtml = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed bottom-0 start-0 p-3';
        document.body.appendChild(container);
    }
    const toastElement = document.createElement('div');
    toastElement.innerHTML = toastHtml;
    document.getElementById('toastContainer').appendChild(toastElement.firstChild);
    const toast = new bootstrap.Toast(toastElement.firstChild);
    toast.show();
}