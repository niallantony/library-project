function book(name, author, pageCount, read) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.id = name.replace(/\s/g, "");
    this.info = function() {
        let prefix = '';
        if (!read) {
            prefix = 'not'
        }
        return `${name} by ${author}, ${pageCount} pages, ${prefix} read.`
    }
}

function submitBook(event) {
    event.preventDefault();
    const newBook = new book(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
    myLibrary.push(newBook);
    formPopUp.classList.add('hidden');
    createCard(newBook);
    bookForm.reset();
}

function switchRead() {
    const currentBook = myLibrary.find((book) => book.id === currentSelectID);
    const readStatus = document.getElementById(`${currentSelectID}img`)
    currentBook.toggleRead();
    readStatus.src = currentBook.read ? './images/read.svg' : './images/not-read.svg';
    console.log(currentBook);
    console.log(readStatus);
}

function openEdit(event) {
    editPopUp.classList.remove('hidden');
    currentSelectID = this.id;
    console.log(currentSelectID);
    console.log(event);
    const clickedBook = myLibrary.find((book) => book.id === currentSelectID);
    const currentTitle = document.createElement('div');
    const currentAuthor = document.createElement('div');
    const currentPageLength = document.createElement('div');
    const currentRead = document.createElement('img');
    currentTitle.textContent = clickedBook.name;
    currentAuthor.textContent = clickedBook.author;
    currentPageLength.textContent = clickedBook.pageCount;
    currentRead.src = clickedBook.read ? './images/read.svg' : './images/not-read.svg';
    currentTitle.classList.add('edit-title');
    currentAuthor.classList.add('edit-author');
    currentPageLength.classList.add('edit-pages');
    currentRead.classList.add('edit-read');
    editCard.appendChild(currentTitle);
    editCard.appendChild(currentAuthor);
    editCard.appendChild(currentPageLength);
    editCard.appendChild(currentRead);
}

function deleteEntry() {
    const findBook = myLibrary.find((book) => book.id === currentSelectID);
    const deleteIndex = myLibrary.indexOf(findBook);
    const deleteCard = document.getElementById(currentSelectID);
    console.log(deleteCard);
    myLibrary.splice(deleteIndex,1);
    container.removeChild(deleteCard);
    currentSelectID = 0 
}

function clearEdit() {
    const deleteName = document.querySelector('.edit-title');
    const deleteAuthor = document.querySelector('.edit-author');
    const deletePages = document.querySelector('.edit-pages');
    const deleteRead = document.querySelector('.edit-read');
    editCard.removeChild(deleteAuthor);
    editCard.removeChild(deleteName);
    editCard.removeChild(deletePages);
    editCard.removeChild(deleteRead);
}

function createCard(book) {
    const card = document.createElement("div");
    const cardName = document.createElement("div");
    const cardAuthor = document.createElement("div");
    const cardPageLength = document.createElement("div");
    const cardRead = document.createElement("div");
    const readImage = document.createElement("img");
    card.classList.add('card');
    card.setAttribute('id',book.id);
    readImage.setAttribute('id', `${book.id}img`);
    cardName.classList.add('title');
    cardAuthor.classList.add('author');
    cardPageLength.classList.add('pagelength');
    cardRead.classList.add('read');
    container.insertBefore(card,addButton);
    card.appendChild(cardName);
    card.appendChild(cardAuthor);
    card.appendChild(cardPageLength);
    card.appendChild(cardRead);
    cardName.textContent = book.name;
    cardAuthor.textContent = book.author;
    cardPageLength.textContent = book.pageCount;
    readImage.src = book.read ? './images/read.svg' : './images/not-read.svg';
    cardRead.appendChild(readImage);
    card.addEventListener("click", openEdit, false);
}


let myLibrary = [];

book.prototype.toggleRead = function() {
    this.read = !this.read;
}

const theHobbit = new book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const lordOfTheFlies = new book('The Lord of the Flies', 'William Golding', 204, true);
const nineteenEightyFour = new book('1984', 'George Orwell', 243, false);
const container = document.querySelector('.container');
const formPopUp = document.getElementById('open-form');
const addButton = document.getElementById('add');
const closeForm = document.getElementById('close-form');
const bookForm = document.querySelector('.book-input');

const formTitle = document.getElementById('formTitle');
const formAuthor = document.getElementById('formAuthor');
const formPages = document.getElementById('formPages');
const formRead = document.getElementById('formRead');
const formSubmit = document.getElementById('formSubmit');

const editPopUp = document.getElementById('edit-popup');
const editCard = document.getElementById('edit-card');
const closeEdit = document.getElementById('edit-card');
const deleteButton = document.getElementById('edit-delete');
const editButton = document.getElementById('edit');
let currentSelectID = '';

myLibrary.push(theHobbit);
myLibrary.push(lordOfTheFlies);
myLibrary.push(nineteenEightyFour);
myLibrary.forEach((element) => createCard(element));
addButton.addEventListener("click", function () {
    formPopUp.classList.remove('hidden')
});
closeForm.addEventListener("click", function () {
    formPopUp.classList.add('hidden')
});
closeEdit.addEventListener("click", function () {
    editPopUp.classList.add('hidden');
    clearEdit();
});
editButton.addEventListener("click", switchRead);

deleteButton.addEventListener("click",deleteEntry);
formSubmit.addEventListener("click", submitBook, false);
