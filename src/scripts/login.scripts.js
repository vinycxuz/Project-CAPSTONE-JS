import API from "../controller/Api.controller.js";

// ao carregar a tela de login, os dados são apagados do localStorage
localStorage.removeItem('@kenzie-habits:token');
localStorage.removeItem('@kenzie-habits:usrImage');
localStorage.removeItem('@kenzie-habits:usrName');


document.getElementById('loginBtn').addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('user').value;
  const password = document.getElementById('password').value;
  await API.login(email, password);
  if (localStorage.getItem('@kenzie-habits:token') != null) {
    location.href = '../../index.html';
  } else {
    document.getElementById('modalPopUp').style.display = 'flex'
    document.getElementById('user').style.border = '3px solid rgba(245, 130, 130, 1)'
    document.getElementById('password').style.border = '3px solid rgba(245, 130, 130, 1)'
  }
}) 

const clique = document.querySelector('.btn-fechar')
const popUp = document.getElementById('modalPopUp');
clique.onclick = function(e){
  e.preventDefault()
  popUp.style.display = 'none'
}