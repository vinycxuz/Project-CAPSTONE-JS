import RenderHeader from "../controller/RenderHeader.controller.js";
import RenderTable from "../controller/RenderTable.controller.js";
import API from "../controller/Api.controller.js"

if (!localStorage.getItem('@kenzie-habits:token')) {
  window.location.href = './src/views/login.html';
}

RenderHeader.render();

RenderTable.renderAll();

document.getElementById('btnConcluidos').addEventListener('click', () => {
  RenderTable.renderConcluded();
});

document.getElementById('btnTodos').addEventListener('click', () => {
  RenderTable.renderAll();
})

////// Criaçãdos botões que abrem modals e faz logout.


///Buttons
const btnEditPerfil       = document.getElementById("editProfileBtn");
const btnLogout           = document.getElementById("logoutBtn")
const btnCriarTask        = document.getElementById("btnCriar")
const inserirBtn          = document.getElementById('inserirBtn');
const saveEditPerfil      = document.getElementById('btnSaveProfileChanges');
const saveEditTask = document.getElementById('btnSaveTaskChanges');

const btnCloseEditPerfil  = document.getElementById("closePerfil");
const btnCloseCriarTask   = document.getElementById("closeCriarTask");
const btnCloseEditHabit   = document.getElementById("closeEditHabito")
const btnCloseApagarTask  = document.getElementById("closeApagarTask")
const btnCancelAPagarTask = document.getElementById("cancelar")
const btnApagarTask       = document.getElementById("excluir")
const btnExcluirTask      = document.getElementById("btnExcluirTask")


///Modasl
const modalEditPerfil     = document.getElementById("modalEditPerfil");
const modalCriarTask      = document.getElementById("modalCriarHabito")
const modalEditHabito     = document.getElementById("modalEditHabito")
const modalExcluirTask    = document.getElementById("modalDeletarHabito")

// Botões de requisições
inserirBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const title = document.getElementById('titleCreate').value;
  const description = document.getElementById('descriptionCreate').value;
  const category = document.getElementById('categoryCreate').value;
  const body = {
    "habit_title": title,
    "habit_description": description,
    "habit_category": category
  };
  const newTask = await API.createHabit(body);
  console.log(newTask);
  window.location.reload();
});

saveEditPerfil.addEventListener('click', async (event) => {
  event.preventDefault();
  const name = document.getElementById('editUsrNameInput').value;
  const img = document.getElementById('editUsrImageInput').value;
  const body = {};
  if (name) {
    body.usr_name = name;
  }
  if (img) {
    body.usr_image = img;
  }
  const response = await API.updateProfile(body);
  localStorage.setItem('@kenzie-habits:usrImage', response.usr_image);
  localStorage.setItem('@kenzie-habits:usrName', response.usr_name);
  window.location.reload();

});

saveEditTask.addEventListener('click', async (event) => {
  event.preventDefault();
  const title = document.getElementById('inputTitle').value;
  const description = document.getElementById('inputDescription').value;
  const category = document.getElementById('select').value;
  const habitId = document.getElementById('habitIdHolder').value;
  const status = document.getElementById('statusCheckbox');
  const body = {
    "habit_title": title,
    "habit_description": description,
    "habit_category": category
  };
  if (status.checked) {
    await API.completeHabit(habitId);
  }

  const response = await API.editHabit(habitId, body);

  window.location.reload();
})

btnApagarTask.addEventListener("click",  async (event) => {
  event.preventDefault();
  const habitId = document.getElementById('habitIdHolder').value;
  await API.deleteHabit(habitId)
  window.location.reload()
})

btnEditPerfil.addEventListener("click", event =>{
  modalEditPerfil.style.display = "block"
})
  btnCloseEditPerfil.addEventListener("click", event =>{
    modalEditPerfil.style.display = "none"
  })
  btnExcluirTask.addEventListener("click", event =>{
    event.preventDefault();
    modalExcluirTask.style.display= "block"
  })
    btnCloseApagarTask.addEventListener("click",event => {
      modalExcluirTask.style.display= "none"
    })
    btnCancelAPagarTask.addEventListener("click",event => {
      modalExcluirTask.style.display= "none"
    })


btnLogout.addEventListener("click", event => {
  console.log("Logout");
  localStorage.removeItem('@kenzie-habits:token');
  localStorage.removeItem('@kenzie-habits:usrImage');
  localStorage.removeItem('@kenzie-habits:usrName');
  window.location.href = "./src/views/login.html"
})

btnCriarTask.addEventListener("click", event =>{
  modalCriarTask.style.display = "block"
})
  btnCloseCriarTask.addEventListener("click", event =>{
    modalCriarTask.style.display = "none"
  })

  btnCloseEditHabit.addEventListener("click",event => {
    modalEditHabito.style.display = "none"
  })

