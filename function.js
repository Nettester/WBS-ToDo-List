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
    const text = (id) => document.querySelector("#tr_id_"+id+".text").textContent;
    const tableRow = elementById(id);
    const rowElement = tableRow.getElementsByClassName("text");
    
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