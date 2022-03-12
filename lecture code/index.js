//selectors
const toDoInput=document.querySelector(".todo-input");
const toDoButton=document.querySelector(".todoButton");
const toDoList=document.querySelector(".toDoLoist");
const filterOption=document.querySelector(".filter-todos");
//event listenear
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", removeCheck);
filterOption.addEventListener('change',filteredTodos);
document.addEventListener("DOMContentLoaded",getLocalTodos);
// function
function addToDo(e) {
    e.preventDefault(); /*Prevent page refresh */
    //get value input todo
//create new toDo div
const toDoDiv=document.createElement("div");
toDoDiv.classList.add('toDo');
const newToDOHtml=` 
<li>${toDoInput.value}</li>
<span><i class="fa-solid fa-circle-check"></i></span>
<span><i class="fa-solid fa-trash"></i></span>  
</div>`;
toDoDiv.innerHTML=newToDOHtml;
//insert valu toDo in new Div 
// toDoList.appendChild("newToDO")
toDoList.appendChild(toDoDiv);
//save todos in Dom
savedLocalTodo(toDoInput.value);
//reset input
toDoInput.value="";
}

function removeCheck(e) {
    const item=e.target;
    const classList=e.target.classList;
    const arrayClases=[...classList]; /* تبدیل آبجکت به آرایه */
    if(arrayClases[1]==='fa-circle-check'){
        const toDo=item.parentElement.parentElement;
    //Toggle between adding and removing a class name from an element with JavaScript
        toDo.classList.toggle('completed');
    }
    else if(arrayClases[1]==='fa-trash'){
        const toDo=item.parentElement.parentElement;
        removeLocalTodos(toDo);
        toDo.remove();

    }
    
}

function filteredTodos(e) {
    const todos=[...toDoList.childNodes];
    console.log(todos);
        todos.forEach((todoItem) => {
        switch(e.target.value)
        {
            case "all":
            todoItem.style.display= "flex";
            break;

            case "completed":
                if(todoItem.classList.contains("completed"))
                {todoItem.style.display= "flex";}
                else 
                {todoItem.style.display= "none";}
                break;
            case "uncompleted":
                if(!todoItem.classList.contains("completed"))
                {todoItem.style.display= "flex";}
                else
                {todoItem.style.display= "none";}
                break;


        }
    });
}

function savedLocalTodo(todo){
//localstorage.getitem("todos");
//localstorage.setitem("todos", json.stringify('todos'))
let savedTodos=localStorage.getItem("todosKey")?  /* داده هایی که از قبل با کلید todosKey وجود داشته اند را از لوکال استوریج میخوانیم */
JSON.parse(localStorage.getItem("todosKey")) :[];
savedTodos.push(todo);
localStorage.setItem("todosKey", JSON.stringify(savedTodos));
}

function getLocalTodos(){
    let savedTodos=localStorage.getItem("todosKey")?
    JSON.parse(localStorage.getItem("todosKey")) :[];
    savedTodos.forEach((todos)=>{
        const toDoDiv=document.createElement("div");
        toDoDiv.classList.add('toDo');
        const newToDOHtml=` 
        <li>${todos}</li>
        <span><i class="fa-solid fa-circle-check"></i></span>
        <span><i class="fa-solid fa-trash"></i></span>  
        </div>`;
        toDoDiv.innerHTML=newToDOHtml;
        toDoList.appendChild(toDoDiv);  
    })
}

function removeLocalTodos(toDo){
    let savedTodos=localStorage.getItem("todosKey") ?
    JSON.parse(localStorage.getItem("todosKey")) :[];  
    const filterdLocalTodo=savedTodos.filter(
        (t) => t !== toDo.children[0].innerText /* آیتم هایی از لوکال استوریج را بیار که مقدارش با مقدار حذف شده برابر نباشد */
    );
    localStorage.setItem("todosKey", JSON.stringify(filterdLocalTodo));

}