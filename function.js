let text=document.getElementById("text");
let list=document.getElementById("list");
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
    let tableRow = document.querySelector(`#tr_id_${id}`);
    // get td with todo-text
    let todoTd = tableRow.querySelector(".text");
    // get value of the td
    let todoValue = todoTd.innerHTML;
    // get edit-button
    let editButton = tableRow.querySelector(`.editButton`);
    console.log(todoValue);
    // clear td
    todoTd.innerText="";
    // set input-field with todo-text
    todoTd.innerHTML = `<input type="text" value="${todoValue}">`
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