function selectAllTables() {
    document.querySelectorAll('#backupModal input[type="checkbox"][value]').forEach(checkbox => {
        checkbox.checked = true;
    });
    updateBackupPreview();
}
function deselectAllTables() {
    document.querySelectorAll('#backupModal input[type="checkbox"][value]').forEach(checkbox => {
        checkbox.checked = false;
    });
    updateBackupPreview();
}
function updateBackupPreview() {
    const backupType = document.querySelector('input[name="backupType"]:checked').value;
    const selectedTables = Array.from(document.querySelectorAll('#backupModal input[type="checkbox"][value]:checked'))
        .map(cb => cb.nextElementSibling.textContent.trim());
    const compress = document.getElementById('compressBackup').checked;
    const encrypt = document.getElementById('encryptBackup').checked;
    let typeText = '';
    switch(backupType) {
        case 'full': typeText = 'پشتیبان‌گیری کامل'; break;
        case 'data': typeText = 'فقط دیتا'; break;
        case 'files': typeText = 'فقط فایل‌ها'; break;
    }
    const preview = `
        <strong>نوع:</strong> ${typeText}<br>
        <strong>جداول:</strong> ${selectedTables.length > 0 ? selectedTables.join(', ') : 'هیچ جدولی انتخاب نشده'}<br>
        <strong>فشرده‌سازی:</strong> ${compress ? 'بله' : 'خیر'}<br>
        <strong>رمزگذاری:</strong> ${encrypt ? 'بله' : 'خیر'}
    `;
    document.getElementById('backupPreview').innerHTML = preview;
}
function startBackup() {
    const selectedTables = Array.from(document.querySelectorAll('#backupModal input[type="checkbox"][value]:checked'))
        .map(cb => cb.value);
    if (selectedTables.length === 0) {
        alert('لطفاً حداقل یک جدول را انتخاب کنید.');
        return;
    }
    const encrypt = document.getElementById('encryptBackup').checked;
    const password = document.getElementById('encryptionPassword').value;
    if (encrypt && (!password || password.length < 8)) {
        alert('رمز عبور رمزگذاری باید حداقل 8 کاراکتر باشد.');
        return;
    }
    document.getElementById('progressSection').style.display = 'block';
    document.getElementById('startBackupBtn').disabled = true;
    simulateBackupProgress();
}
function simulateBackupProgress() {
    let progress = 0;
    const progressBar = document.getElementById('backupProgressBar');
    const progressText = document.getElementById('progressText');
    const steps = [
        'در حال آماده‌سازی...',
        'در حال پشتیبان‌گیری از جداول...',
        'در حال فشرده‌سازی...',
        'در حال رمزگذاری...',
        'در حال نهایی‌سازی...',
        'تکمیل شد!'
    ];
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        progressBar.textContent = Math.round(progress) + '%';
        progressText.textContent = steps[Math.floor((progress / 100) * (steps.length - 1))];
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                alert('پشتیبان‌گیری با موفقیت تکمیل شد!');
                $('#backupModal').modal('hide');
                document.getElementById('progressSection').style.display = 'none';
                document.getElementById('startBackupBtn').disabled = false;
                progressBar.style.width = '0%';
                progressBar.textContent = '0%';
            }, 1000);
        }
    }, 500);
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('encryptBackup').addEventListener('change', function() {
        const passwordSection = document.getElementById('encryptionPasswordSection');
        if (this.checked) {
            passwordSection.style.display = 'block';
            passwordSection.classList.add('fade-in');
        } else {
            passwordSection.style.display = 'none';
            document.getElementById('encryptionPassword').value = '';
        }
        updateBackupPreview();
    });
    document.querySelectorAll('input[name="backupType"]').forEach(radio => {
        radio.addEventListener('change', updateBackupPreview);
    });
    document.querySelectorAll('#backupModal input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateBackupPreview);
    });
    updateBackupPreview();
});