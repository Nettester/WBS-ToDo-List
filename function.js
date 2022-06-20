// image Source
const acceptImage = "./images/accept.png";
const editImage = "./images/edit.png";
const deleteImage = "./images/delete.png";

// button constructor name = [edit,del,accept]
//const generateButton = (rowId,name,imgSrc) => `<input type="image" class="${name}Button" onclick="${name}(${rowId})" src="${imgSrc}" alt="${name}"></td>`;
const generateEditButton = (rowId) => `<input type="image" class="editButton" onclick="editToDo(${rowId})" src="${editImage}" alt="Edit"></td>`
const generateDeleteButton = (rowId) => `<input type="image" class="delButton" onclick="del(${rowId})" src="${deleteImage}" alt="Delete"></td>`
const generateAcceptButton = (rowId) => `<input type="image" class="acceptButton" onclick="acceptEdit(${rowId})" src="${acceptImage}" alt="Accept"></td>`

// generate text-input
const generateTextInput = (todoValue) => `<input type="text" class="editInput" value="${todoValue}">`

// its used in add-ToDo
let idCounter = 1;

// localStorage
const storedToDos = () => localStorage.getItem('ToDos');
const safeTodo = (id,text) => localStorage.setItem('ToDosList', { 'ToDoElements' : {id,text}});
const delTodo = (id,text) => localStorage.removeItem('ToDos' , {id,text});


// global selectors
const tableRow = (rowId) => document.querySelector(`#tr_id_${rowId}`);
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

/* * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Die Funktion newTodo erzeugt ein neues Objekt,
 * mit den Parametern _name und _date und gibt 
 * das Objekt zurück. Dieses Objekt enthält die
 * Daten zu einer einzigen Todo-Liste.
 * * * * * * * * * * * * * * * * * * * * * * * * * */

function newTodo( _name, _date ){
    return {
        name : _name,           // Name der ToDo-liste
        date : _date,           // Datum
        totalLifetime : null,   // ?
        totalCurrent : null,    // Menge der Einträge insgesamt
        totalChecked : null,    // Menge der erledigten Einträge
        totalUnchecked : null,  // Menge der offenen Einträge
        item : []  // Die Einträge selbst
    };
}


class Manager{
    constructor(){
        // array of ToDos 
        this._todoArray=[]; // Enthält die ToDo-Listen
        // currently ToDo
        this._currentToDo = null; // Gibt den Index der aktuell zu bearbeitenden ToDo-Liste zurück
    }
    // Erstellt eine neue ToDo-Liste
    addToDo(name, datum) {
        this._todoArray.push(newTodo(name, datum));
    }
    // Wählt eine ToDo-Liste, sodass dieser bearbeitet werden kann
    selectTodo(nameLabel){
        // Durchlauf aller ToDo-Listen
        for(let i=0; i<this._todoArray.length; i++){
            // Wenn die Liste mit der gesuchten Name gefunden
            // wird, so wird dessen Index in die currentTodo
            // notiert.
            if(this._todoArray[i].name === nameLabel ){
                this._currentToDo = i;
                break;
            }
        }
    }
    // Fügt ein Eintrag in die gewählte ToDo-Liste
    addItem(check, text){
        // Wenn noch keine ToDo-Liste gewählt ist, gibt es eine Fehlermeldung
        if(this._currentToDo === null){
            console.log("keine todo ausgewaehlt");
        }else{
            // Die aktuelle ToDo-Liste wird verknüpft
            const target = this._todoArray[this._currentToDo];
            // Der Parameter-Check wird geprüft, wenn sie
            // gesetzt ist, wird totalChecked erhöht,
            // andernfalls total unchecked erhöht
            if(check === true){
                target.totalChecked++;
            }else{
                target.totalUnchecked++;
            }
            // Der Eintrag wird in die ToDo-Liste eingefügt
            target.item.push([check, text]);
            // Die Gesamtmenge der Einträge wird erhöht
            target.totalCurrent++;
        }
    }
    // Hier wird ein Eintrag aus der gewählten ToDo-Liste wieder entfernt
    removeItem(index){
        // Wenn noch keine ToDo-Liste gewählt ist, gibt es eine Fehlermeldung
        if(this._currentToDo === null){
            console.log("keine todo ausgewaehlt");
        }else{
            // Die ToDo-Liste wird verknüpft
            const target = this._todoArray[this._currentToDo];
            // Der Eintrag wird entfernt
            target.item.splice(index,1);
        }
    }
    // Hier wird die ToDo-Liste mit dem Namen "name" gelöscht
    removeToDo(name){
        for(let i=0; i<this._todoArray.length; i++){
            // Wenn die ToDo-Liste mit dem Namen "name" gefunden
            // ist...
            if(this._todoArray[i].name === nameLabel ){
                // Wird sie entfernt
                this._todoArray.splice(i, 1);
                return;
            }
        }
    }
    // Die ToDo-Listen werden alle in den localStorage hochgeladen
    uploadAll(){
        // Die Anzahl der ToDo-Liste wird in die localStorage geschrieben
        localStorage.setItem('todoCount',this._todoArray.length);
        // Und die Schleife läuft jede ToDo-Liste durch
        for(let i=0; i<this._todoArray.length; i++){
            // der nächste ToDo-Liste-Objekt wird verknüpft
            let todoList = this._todoArray[i];
            // Ihr wird ein KeyName für die localStorage erzeugt
            let name = "todo."+i;
            // Der Name wird in die localStorage eingetragen
            localStorage.setItem(name, todoList.name);
            // Die Menge aller Einträge werden geschrieben
            localStorage.setItem(name+".current", todoList.totalCurrent);
            // Die Menge aller erledigten Einträge werden geschrieben
            localStorage.setItem(name+".checked", todoList.totalChecked);
            // Die Menge aller offenen Einträge werden geschrieben
            localStorage.setItem(name+".unChecked", todoList.totalUnchecked);
            // Nun werden die Einträge selbst durchlaufen
            for(let x=0; x<todoList.item.length; x++){
                // Der Hook-Zustand eines Eintrags wird in den localStorage geschrieben
                localStorage.setItem(name+".item.check."+x, todoList.item[x][0]);
                // Der Text eines Eintrags wird in den localStorage geschrieben
                localStorage.setItem(name+".item.text."+x, todoList.item[x][1]);
            }
        }
    }
    // Nur die aktuelle ToDo-Liste wird in den localStorage hochgeladen
    uploadToDo(){
        // Wenn noch keine ToDo-Liste gewählt ist, gibt es eine Fehlermeldung
        if(this._currentToDo === null){
            console.log("keine todo ausgewaehlt");
        }else{
            // der nächste ToDo-Liste-Objekt wird verknüpft
            let todoList = this._todoArray[this._currentToDo];
            // Ihr wird ein KeyName für die localStorage erzeugt
            let name = "todo."+this._currentToDo;
            // Der Name wird in die localStorage eingetragen
            localStorage.setItem(name, todoList.name);
            // Die Menge aller Einträge werden geschrieben
            localStorage.setItem(name+".current", todoList.totalCurrent);
            // Die Menge aller erledigten Einträge werden geschrieben
            localStorage.setItem(name+".checked", todoList.totalChecked);
            // Die Menge aller offenen Einträge werden geschrieben
            localStorage.setItem(name+".unChecked", todoList.totalUnchecked);
            // Nun werden die Einträge selbst durchlaufen
            for(let x=0; x<todoList.item.length; x++){
                // Der Hook-Zustand eines Eintrags wird in den localStorage geschrieben
                localStorage.setItem(name+".item.check."+x, todoList.item[x][0]);
                // Der Text eines Eintrags wird in den localStorage geschrieben
                localStorage.setItem(name+".item.text."+x, todoList.item[x][1]);
            }
        }
    }
    // Alle ToDo-Listen im localStorage werden wieder in den Browser-Umgebung zurück geladen
    downloadAll(){
        // Zuerst die Anzahl der ToDo-Listen
        const menge = localStorage.getItem("todoCount");
        // Wir brauchen einen Index für den KeyName und der beginnt bereits bei 0.
        let index = 0;
        // Die Schleife durchläuft nun die localStorage für die ToDo-Listen
        for(let m=0; m < menge; m++){
            // Wir erzeugen wieder einen KeyName für den nächsten ToDo-Liste
            let name = "todo."+index;
            // Nun erzeugen wir einen neuen ToDo-Liste-Objekt
            let target = newTodo(name, " ");
            // Wir lesen den Namen der ToDo-Liste wieder ein
            target.name = localStorage.getItem(name);
            // Anschließend die Menge der Einträge
            target.totalCurrent= localStorage.getItem(name+".current");
            // Anschließend die Menge der erledigten Einträge
            target.totalChecked= localStorage.getItem(name+".checked");
            // Anschließend die Menge der offenen Einträge
            target.totalUnchecked= localStorage.getItem(name+".unchecked");
            // Wir durchlaufen wieder die Einträge selbst
            for(let l=0; l<target.totalCurrent; l++){
                // Erzeugen einen neuen Value-Array
                let value = [];
                // In den Value-Array wird zuerst der nächste Eintrags-Hakenzustand gelesen
                value.push(localStorage.getItem(name+".item.check."+l));
                // dann der Text
                value.push(localStorage.getItem(name+".item.text."+l));
                // Dann wird der Array in den Eintrags-Array der ToDo-Liste eingefügt
                target.item.push(value);
                // und wieder geleert für den nächsten Eintrag
                value = [];
            }
            // das frisch angelegte Objekt wird nun in die Klasse hinzufügt
            this._todoArray.push(target);
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
function editToDo(id) {
    // get table row
    const row = tableRow(id);
    console.log(row);
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
    todoTd.innerHTML = generateTextInput(todoValue);
    // generate accept edit button as image
    const acceptEditButton = generateAcceptButton(id,acceptImage);
    // set accept button in third td
    row.querySelector("td:nth-child(3)").innerHTML = acceptEditButton;
}

function acceptEdit(id) {
    // get table row
    const row = row(id);
    // get td with todo-text
    const todoTd = row.querySelector(".text");
    // get text-input element / accept button
    const editInput = todoTd.querySelector(".editInput");
    const acceptButton = row.querySelector(".acceptButton");
    // get value of the text-input element
    const todoValue = editInput.value;
    // generate edit-button (image as button)
    const editButton = generateEditButton(id,editImage);
    // remove input text-field / accept Button / image
    editInput.remove();
    acceptButton.remove();
    // set todo-text / edit button
    todoTd.innerHTML = todoValue;
    row.querySelector("td:nth-child(3)").innerHTML = editButton;
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
