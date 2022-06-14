let text=document.getElementById("text");
let list=document.getElementById("list");
const acceptImage = "./images/accept.png";
const editImage = "./images/edit.png";
const deleteImage = "./images/delete.png";

let idCounter = 0;
/*
    Achim

    tr get id
*/
function add() {
    

    idCounter++;
    return true;
}

/*
    Seo

    del tr with id
*/  
function del(index) {
    const tableDelet = document.querySelector(`#tr_id_${index}`);
    const isExecuted = confirm("Are you sure to delete this row?");
    if(isExecuted === true){
        tableDelet.parentNode.remove();
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