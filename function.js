const text= document.getElementsByClassName("text");
const list= document.getElementById("list");

let idCounter = 1;

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
function del(id) {
    
    return true;
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
function checked() {
    let elem, cell, elem2, cell2, temp;
    // *** //
    for ( let row = 0; row < idCounter; row++ )
    {
        elem = document.getElementById("tr" + row);
        // *** //
        cell = elem.getElementsByTagName("td");
        // *** //
        if ( cell[0].getElementsByTagName("input")[0].checked == false )
        {
            for ( let nex = 0; nex < idCounter; nex++ )
            {
                if ( row != nex )
                {
                    elem2 = document.getElementById("tr" + nex);
                    // *** //
                    cell2 = elem2.getElementsByTagName("td");
                    // *** //
                    temp = cell[0].getElementsByTagName("input")[0].checked;
                    cell[0].getElementsByTagName("input")[0].checked = cell2[0].getElementsByTagName("input")[0].checked;
                    cell2[0].getElementsByTagName("input")[0].checked = temp;
                    // *** //
                    temp = cell[1].innerHTML;
                    cell[1].innerHTML = cell2[1].innerHTML;
                    cell2[1].innerHTML = temp;
                }
            }
        }
    }
    // *** //
    return true;
}

