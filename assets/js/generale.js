const logoutBtn = document.querySelector('#page-header').querySelector('#logout');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    window.location.href = `${window.location.origin}/logout`;
  });
}

const usersPage = document.querySelector('#users-page');
const deleteUserBtns = usersPage?.querySelectorAll('.delete-user');

deleteUserBtns?.forEach((btn) => {
  btn.addEventListener('click', () => {
    fetch(`http://localhost:8080/utilizatori/${btn.dataset.userid}`, {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        alert(response.message);
        window.location.href = `${window.location.origin}`;
      });
  });
});
