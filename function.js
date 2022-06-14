const text= document.getElementsByClassName("text");
const list= document.getElementById("list");

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
function checked() {
    return true;
}

