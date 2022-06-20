// localStorage
const storedToDos = () => localStorage.getItem('ToDos');
const safeTodo = (id,text) => localStorage.setItem('ToDos' , {id,text});
const delTodo = (id,text) => localStorage.removeItem('ToDos' , {id,text});


// global selectors
const tableRow = (rowId) => document.querySelector(#tr_id_${rowId});
const text = document.getElementById("text");
let list = document.getElementById("list");
/*
    {
        ToDoList : {
            props : {
                name : "name",
                date : "date",
                totalLifetime : numElements,
                totalCurrent : numElements,
                totalChecked : numElements,
                totalUnchecked : numElements,
            }
            toDoELements : []
        }
    }
*/
function newTodo( _name, _date ){
    return {
        name : _name, 
        date : _date,
        totalLifetime : null,
        totalCurrent : null,
        totalChecked : null,
        totalUnchecked : null,
        item : [] 
    };
}


class Manager{
    constructor(){
        // todos arry 
        this._todoArray=[];
        // atuell todo
        this._currentToDo = null;
    }
    addToDo(name, datum) {
        this._todoArray.push(newTodo(name, datum));
    }
    selectTodo(namelabel){
        for(let i=0; i<this._todoArray.length; i++){
            if(this._todoArray[i].name === namelabel ){
                this._currentToDo = i;
                break;
            }
        }
    }
    addItem(check, text){
        if(this._currentToDo === null){
            console.log("keine todo ausgewaehlt");
        }else{
            const target = this._todoArray[this._currentToDo];
            if(check === true){
                target.totalChecked++;
            }else{
                target.totalUnchecked++;
            }
            target.item.push([check, text]);
            target.totalCurrent++;
        }
    }
    removeItem(index){
        if(this._currentToDo === null){
            console.log("keine todo ausgewaehlt");
        }else{
            const target = this._todoArray[this._currentToDo];
            target.item.splice(index,1);
        }
    }
    removeToDo(name){
        for(let i=0; i<this._todoArray.length; i++){
            if(this._todoArray[i].name === namelabel ){
                this._todoArray.splice(i, 1);
                return;
            }
        }
    }
    // anzahle der todolist 
    uploadAll(){
        localStorage.setItem('todoCount',this._todoArray.length);
        for(let i=0; i<this._todoArray.length; i++){
            let todolist = this._todoArray[i];
            let name = "todo."+i;
            localStorage.setItem(name, todolist.name);
            localStorage.setItem(name+".current", todolist.totalCurrent);
            localStorage.setItem(name+".checked", todolist.totalChecked);
            localStorage.setItem(name+".unChecked", todolist.totalUnchecked);
            for(let x=0; x<todolist.item.length; x++){
                localStorage.setItem(name+".item.check."+x, todolist.item[x][0]);
                localStorage.setItem(name+".item.text."+x, todolist.item[x][1]);
                
            }
        }

    }
    uploadToDo(){
        if(this._currentToDo === null){
            console.log("keine todo ausgewaehlt");
        }else{
            let todolist = this._todoArray[this._currentToDo];
            let name = "todo."+this._currentToDo;
            localStorage.setItem(name, todolist.name);
            localStorage.setItem(name+".current", todolist.totalCurrent);
            localStorage.setItem(name+".checked", todolist.totalChecked);
            localStorage.setItem(name+".unChecked", todolist.totalUnchecked);
            for(let x=0; x<todolist.item.length; x++){
                localStorage.setItem(name+".item.check."+x, todolist.item[x][0]);
                localStorage.setItem(name+".item.text."+x, todolist.item[x][1]);
                
            }
        }

    }
    downloadAll(){
        const menge = localStorage.getItem("todoCount");
        let index = 0;
        for(let m=0; m < menge; m++){
            let name = "todo."+index;
            let target = newTodo(name, " ");
            target.name = name;
            target.totalCurrent= localStorage.getItem(name+".current");
            target.totalChecked= localStorage.getItem(name+".checked");
            target.totalUnchecked= localStorage.getItem(name+".unchecked");
            for(let l=0; l<target.totalCurrent; l++){
                let value = [];
                value.push(localStorage.getItem(name+".item.check."+l));
                value.push(localStorage.getItem(name+".item.text."+l));
                target.item.push(value);
                value = [];
            }
    

        }
    }

    
}
// name : _name, 
//         date : _date,
//         totalLifetime : null,
//         totalCurrent : null,
//         totalChecked : null,
//         totalUnchecked : null,
//         item : [] 


const acceptImage = "./images/accept.png";
const editImage = "./images/edit.png";
const deleteImage = "./images/delete.png";

let idCounter = 1;
/*
    Achim

    tr get id
*/
function add() {
  
    let zeile = list.insertRow(0);


    zeile.id = `tr_id_${idCounter}`;
    zeile.innerHTML = `<td><input type="checkbox" class="form-check-input" value="checkedValue" ></td> `;
    zeile.innerHTML +=`<td class="text"></td>`;
    zeile.innerHTML +=`<td><input type="image" class="editButton" onclick="edit(${idCounter})" src="${editImage}" alt="Edit"></td>`;
    zeile.innerHTML +=`<td><input type="image" class="delButton" onclick="del(${idCounter})" src="./images/delete.png" alt="Delete"></td>`;


    idCounter++;
    return true;
}

/*
    Seo

    del tr with id
*/  
function del(index) {
    const rowDelete = document.querySelector(`#tr_id_${index}`);
    // delete variable erstellen.  
    const isExecuted = confirm("Are you sure to delete this row?");
    if(isExecuted === true){
        rowDelete.remove();
    }

}


/*
   David 
*/
function edit(id) {
    // get table row
    const tableRow = document.querySelector(`#tr_id_${id}`);
    // get td with todo-text
    const todoTd = tableRow.querySelector(".text");
    // get value of the td
    const todoValue = todoTd.innerHTML;
    // get edit-button
    const editButton = tableRow.querySelector(`.editButton`);
    // clear todo-text
    todoTd.innerText="";
    // clear edit button and edit image
    editButton.remove();
    // set input-field with todo-text
    todoTd.innerHTML = `<input type="text" class="editInput" value="${todoValue}">`;
    // generate accept edit button as image
    const acceptEditButton = `<input type="image" class="acceptButton" onclick="acceptEdit(${id})" src="${acceptImage}" alt="Accept">`;
    // set accept button in third td
    tableRow.querySelector("td:nth-child(3)").innerHTML = acceptEditButton;
}

function acceptEdit(id) {
    // get table row
    const tableRow = document.querySelector(`#tr_id_${id}`);
    // get td with todo-text
    const todoTd = tableRow.querySelector(".text");
    // get text-input element / accept button
    const editInput = todoTd.querySelector(".editInput");
    const acceptButton = tableRow.querySelector(".acceptButton");
    // get value of the text-input element
    const todoValue = editInput.value;
    // generate edit-button (image as button)
    const editButton = `<input type="image" class="editButton" onclick="edit(${id})" src="${editImage}" alt="Edit">`;
    // remove input text-field / accept Button / image
    editInput.remove();
    acceptButton.remove();
    // set todo-text / edit button
    todoTd.innerHTML = todoValue;
    tableRow.querySelector("td:nth-child(3)").innerHTML = editButton;
}


/*
  Abdulaziz  
*/
function checked ()
{
    let elem, cell, next = 0;
    let hook = [];
    let norm = [];
    // *** //
    last_checked_rows = 0;
    // *** //
    for ( let row = 0; row < idCounter; row++ )
    {
        elem = document.getElementById("tr_id_" + row);
        // *** //
        cell = elem.getElementsByTagName("td");
        // *** //
        if ( cell[0].getElementsByTagName("input")[0].checked == true )
            hook.push(cell[1].innerText);
        else
            norm.push(cell[1].innerText);
    }
    // *** //
    for ( let row of norm )
    {
        elem = document.getElementById("tr_id_" + next);
        // *** //
        cell = elem.getElementsByTagName("td");
        // *** //
        cell[0].getElementsByTagName("input")[0].checked = false;
        // *** //
        cell[1].innerText = row;
        // *** //
        next++;
    }
    // *** //
    for ( let row of hook )
    {
        elem = document.getElementById("tr_id_" + next);
        // *** //
        cell = elem.getElementsByTagName("td");
        // *** //
        cell[0].getElementsByTagName("input")[0].checked = true;
        // *** //
        cell[1].innerText = row;
        // *** //
        next++;
    }
    // *** //

    return true;
}

setInterval( function () {
        checked();
}, 500);




