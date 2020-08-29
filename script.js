const textarea = document.getElementById('textarea');
const addButton = document.querySelector('.add-note-button');
const notesContainer = document.querySelector('.notes-container');
let arrNotes = [];

const noteParagraph = document.getElementById('note-paragraph');


const renderNotes = (arr) => {
	notesContainer.innerHTML = '';
    arr.forEach(function(value,index){
        const newNode = createNotesCard(value, index);
        notesContainer.append(newNode);
    });
}

const createNotesCard = (text, id) => {
    const notesCard = document.createElement('div');
    notesCard.className = 'notes-card';
    let notesCardHeading = document.createElement('h2');
    notesCardHeading.className = 'notes-card-heading';
    let notesValue = document.createElement('paragraph');
    notesValue.className = 'notes-value';
    const deleteNoteButton = document.createElement('button');
    deleteNoteButton.className = 'delete-note-button';
    deleteNoteButton.innerText = 'Delete Note';
    notesCardHeading.innerText = `Note ${id + 1}`;
    notesValue.innerText = text;
    deleteNoteButton.addEventListener('click', function(){
    	// console.log(id);
        notesContainer.innerHTML = '';
        console.log(arrNotes.splice(id ,1));
        // console.log(arrNotes);
        renderNotes(arrNotes);
        if(noteParagraph.style.display == 'none' && arrNotes.length == 0){
            noteParagraph.style.display = 'block';
        }
    });
    notesCard.appendChild(notesCardHeading);
    notesCard.appendChild(notesValue);
    notesCard.appendChild(deleteNoteButton);
    return notesCard;
}

// Adding notes ----->
addButton.addEventListener('click', function () {
	if(!textarea.value.trim()) {
    	return;
    }
    const value = textarea.value.trim();
    arrNotes.push(value);
    renderNotes(arrNotes);
    textarea.value = '';
    if(arrNotes.length > 0){
        noteParagraph.style.display = 'none';
    }
});

const searchInput = document.getElementById('search-input');
let searchValue = '';
const searchButton = document.querySelector('.search-submit');
searchButton.addEventListener('click',function(element){
    element.preventDefault();
    searchValue = searchInput.value.toLowerCase();
    console.log(searchValue);
    arrNotes.forEach(function(value,index){
        if(value.includes(searchValue) && searchValue.trim()){
            let searchedCard = arrNotes.splice(index,1);
            renderNotes(searchedCard);
            arrNotes = [searchedCard];
        }
    });
    searchInput.value = '';
});

let hamburger = document.querySelector('.fa-bars');
let form = document.querySelector('.form');
hamburger.addEventListener('click',function(){
    if(form.style.display == 'none'){
        form.style.display = 'flex';
    }
    else{
        form.style.display = 'none';
    }
});