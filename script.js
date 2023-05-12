function book(name, author, pageCount, read) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.info = function() {
        let prefix = '';
        if (!read) {
            prefix = 'not'
        }
        return `${name} by ${author}, ${pageCount} pages, ${prefix} read.`
    }
}

function showForm() {
    formPopUp.classList.remove('hidden');
    console.log('Done');
}


function addBookToLibrary() {
    
}

function createCard(book) {
    const card = document.createElement("div");
    const cardName = document.createElement("div");
    const cardAuthor = document.createElement("div");
    const cardPageLength = document.createElement("div");
    const cardRead = document.createElement("div");
    const readImage = document.createElement("img");
    card.classList.add('card');
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
}


let myLibrary = [];
const theHobbit = new book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const lordOfTheFlies = new book('The Lord of the Flies', 'William Golding', 204, true);
const nineteenEightyFour = new book('1984', 'George Orwell', 243, false);
const container = document.querySelector('.container');
const formPopUp = document.getElementById('open-form');
const addButton = document.getElementById('add');
const closeForm = document.getElementById('close-form');
myLibrary.push(theHobbit);
myLibrary.push(lordOfTheFlies);
myLibrary.push(nineteenEightyFour);
myLibrary.forEach((element) => createCard(element));
console.log(theHobbit.info());
addButton.addEventListener("click", function () {
    formPopUp.classList.remove('hidden')
});
closeForm.addEventListener("click", function () {
    formPopUp.classList.add('hidden')
});

