document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  let overlay = null;
  if (!sidebar || !sidebarToggle) {
    console.error('Required sidebar elements not found!');
    return;
  }
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
  function openSidebar() {
    sidebar.classList.add('show');
    const overlayElement = createOverlay();
    overlayElement.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
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
    document.body.style.overflow = '';
  }
  sidebarToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (sidebar.classList.contains('show')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar.classList.contains('show')) {
      closeSidebar();
    }
  });
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1115 && sidebar.classList.contains('show')) {
      closeSidebar();
    }
  });
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      if (window.innerWidth < 1115) {
        closeSidebar();
      }
    });
  });
  window.openSidebar = openSidebar;
  window.closeSidebar = closeSidebar;
  window.toggleSidebar = function() {
    if (sidebar.classList.contains('show')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };
});