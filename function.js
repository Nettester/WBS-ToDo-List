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
function edit() {
    return true;
}

/*
  Abdulaziz  
*/
function checked() {
    return true;
}

