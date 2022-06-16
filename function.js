// localStorage
const storedToDos = () => localStorage.getItem('ToDos');
const safeTodo = (id,text) => localStorage.setItem('ToDos' , {id,text});

// global selectors
const tableRow = (rowId) => document.querySelector(`#tr_id_${rowId}`);
const text = document.getElementById("text");
let list = document.getElementById("list");

// image Source
const acceptImage = "./images/accept.png";
const editImage = "./images/edit.png";
const deleteImage = "./images/delete.png";

// button constructor name = [edit,del,accept]
//const generateButton = (rowId,name,imgSrc) => `<input type="image" class="${name}Button" onclick="${name}(${rowId})" src="${imgSrc}" alt="${name}"></td>`;
const generateEditButton = (rowId) => `<input type="image" class="editButton" onclick="editToDo(${rowId})" src="${editImage}" alt="Edit"></td>`
const generateDeleteButton = (rowId) => `<input type="image" class="delButton" onclick="del(${rowId})" src="${deleteImage}" alt="Delete"></td>`
const generateAcceptButton = (rowId) => `<input type="image" class="acceptButton" onclick="acceptEdit(${rowId})" src="${acceptImage}" alt="Accept"></td>`

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
    zeile.innerHTML +=`<td><input type="image" class="editButton" onclick="editToDo(${idCounter})" src="${editImage}" alt="Edit"></td>`;
    zeile.innerHTML +=`<td><input type="image" class="delButton" onclick="del(${idCounter})" src="${deleteImage}" alt="Delete"></td>`;


    idCounter++;
    return true;
}

/*
    Seo

    del tr with id
*/  
function del(index) {
    const tableDelete = document.querySelector(`#tr_id_${index}`);
    const isExecuted = confirm("Are you sure to delete this row?");
    if(isExecuted === true){
        tableDelete.remove();
    }

}


/*
   David 
*/
function editToDo(rowId) {
    // get table row
    const row = tableRow(rowId);
    // get td with todo-text
    const todoTd = row.querySelector(".text");
    // get value of the td
    const todoValue = todoTd.innerHTML;
    // get edit-button
    const editButton = row.querySelector(`.editButton`);
    // clear todo-text
    todoTd.innerText="";
    // clear edit button and edit image
    editButton.remove();
    // set input-field with todo-text
    todoTd.innerHTML = `<input type="text" class="editInput" value="${todoValue}">`;
    // set accept button in third td
    row.querySelector("td:nth-child(3)").innerHTML = generateAcceptButton(rowId);
}

function acceptEdit(rowId) {
    // get table row
    const row = tableRow(rowId);
    // get td with todo-text
    const todoTd = row.querySelector(".text");
    // get text-input element / accept button
    const editInput = todoTd.querySelector(".editInput");
    const acceptButton = row.querySelector(".acceptButton");
    // get value of the text-input element
    const todoValue = editInput.value;
    // remove input text-field / accept Button / image
    editInput.remove();
    acceptButton.remove();
    // set todo-text / edit button
    todoTd.innerHTML = todoValue;
    row.querySelector("td:nth-child(3)").innerHTML = generateEditButton(rowId);
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
