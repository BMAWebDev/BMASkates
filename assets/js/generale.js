const logoutBtn = document.querySelector('#page-header').querySelector('#logout');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    window.location.href = `${window.location.origin}/logout`;
  });
}
