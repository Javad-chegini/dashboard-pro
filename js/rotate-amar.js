document.getElementById('toggleStats').addEventListener('click', function() {
    const statsContent = document.getElementById('statsContent');
    const toggleBtn = this;
    const icon = toggleBtn.querySelector('i');
    if (statsContent.classList.contains('collapsed')) {
        statsContent.classList.remove('collapsed');
        toggleBtn.classList.remove('collapsed');
        icon.style.transform = 'rotate(0deg)';
    } else {
        statsContent.classList.add('collapsed');
        toggleBtn.classList.add('collapsed');
        icon.style.transform = 'rotate(180deg)';
    }
});
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});