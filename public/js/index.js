/* eslint-disable */

import { displayMap } from './leaflet';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

const maxBox = document.getElementById('map');
const loginForm = document.querySelector('.form__login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userSettingsForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

if (maxBox) {
  const locations = JSON.parse(maxBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password);
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userSettingsForm)
  userSettingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
  });
