import API from "../controller/Api.controller.js"


export default class HabitTask {
    constructor(task){
        this.id             = task.habit_id;
        this.title          = task.habit_title;
        this.description    = task.habit_description;
        this.category       = task.habit_category;
        this.status         = task.habit_status;
    }

    renderTableRow(){
        const trTask        = document.createElement("tr");
        const tdStatus      = document.createElement("td");
        tdStatus.classList.add('checkboxStatus');
        const status        = document.createElement("input");
        status.type         = "checkbox";
        status.checked      = this.status;
        status.id           = this.id;
        
        status.addEventListener("click", event =>{
            if (this.status == false){
            this.completarTask()
            }else{
                status.checked = true
            }
        })
        
        tdStatus.append(status);

        const tdTitle       = document.createElement("td");
        tdTitle.classList.add('tituloTable');
        tdTitle.innerText   = this.title;
        
        const tdDescription     = document.createElement("td");
        tdDescription.classList.add('textBox');
        tdDescription.innerText = this.description;
        
        const tdCategory        = document.createElement("td");
        tdCategory.classList.add('listCategory');
        const categorySpan      = document.createElement("span");
        categorySpan.classList.add('categoriaLista');
        categorySpan.innerText  = this.category;
        tdCategory.append(categorySpan);

        
        const tdEdit            = document.createElement("td");
        tdEdit.classList.add('editPoints');
        tdEdit.innerText        = "..."
        tdEdit.id               = this.id
        // 
        tdEdit.addEventListener('click', event =>{
            const modalEdit           = document.getElementById("modalEditHabito")
            const inputTitle          = document.getElementById("inputTitle")
            const inputDescription    = document.getElementById("inputDescription")
            const selectCategory      = document.getElementById("select")
            const statusCheckbox = document.getElementById('statusCheckbox')
            const idInput = document.getElementById('habitIdHolder')

            modalEdit.style.display = "block"

            inputTitle.value            = this.title
            inputDescription.value      = this.description
            selectCategory.value        = this.category
            statusCheckbox.checked      = this.status
            idInput.value = this.id
            
        } )
        
        if (this.status == true){
            tdTitle.style.textDecoration = "line-through";
            trTask.style.backgroundColor = "#F1F3F5";
        }

        trTask.append(tdStatus,tdTitle,tdDescription,tdCategory,tdEdit);

        return trTask;
    }

    async completarTask(){
       
            await API.completeHabit(this.id);
            window.location.reload()
        
    }
    
}