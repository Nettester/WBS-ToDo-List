let text=document.getElementById("text");
let list=document.getElementById("list");
let idCounter = 5;
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
function del() {
    return true;
}

/*
   David 
*/
function edit() {
    return true;
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

