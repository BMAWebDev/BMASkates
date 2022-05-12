function isEmailValid(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(regex)) return true;

  return false;
}

const validateForm = () => {
  const form = document.forms['formular'];
  const prenume = form['prenume'].value.trim();
  const nume = form['nume'].value.trim();
  const username = form['username'].value.trim();
  const email = form['email'].value.trim();
  const password = form['password'].value.trim();
  const confirm_password = form['confirm-password'].value.trim();

  if (!prenume || !nume || !username || !email || !password || !confirm_password) {
    alert('Campurile cu * sunt obligatorii');
    return false;
  }

  if (password != confirm_password) {
    alert('Parolele nu se potrivesc');
    return false;
  }

  const reg = new RegExp(/^[a-z -]+$/i);
  if (!reg.test(prenume) || !reg.test(nume)) {
    alert('Numele si prenumele nu au un format valid');
    return false;
  }

  // alte 2 validari:
  if (!isEmailValid(email)) {
    alert('Emailul nu este valid');
    return false;
  }

  const regUsername = new RegExp(/^[a-z-_0-9]+$/i);
  if (!regUsername.test(username)) {
    alert('Usernameul nu este valid');
    return false;
  }

  return true;
};
