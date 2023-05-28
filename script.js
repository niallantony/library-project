const Library = (() => {
  let myLibrary = [];

  const removeBook = (book) => {
    const deleteIndex = myLibrary.indexOf(book);
    myLibrary.splice(deleteIndex, 1);
  }

  const addBook = (book) => {
    myLibrary.push(book);
  }

  const getBook = (id) => {
    return myLibrary.find((book) => book.id === id);
  }

  return {addBook,getBook, removeBook}

})();

const displayController = (() => {
  const container = document.querySelector(".container");
  const formPopUp = document.getElementById("open-form");
  const addButton = document.getElementById("add");
  const closeForm = document.getElementById("close-form");
  const bookForm = document.querySelector(".book-input");

  const formTitle = document.getElementById("formTitle");
  const formAuthor = document.getElementById("formAuthor");
  const formPages = document.getElementById("formPages");
  const formRead = document.getElementById("formRead");
  const formSubmit = document.getElementById("formSubmit");

  const editPopUp = document.getElementById("edit-popup");
  const editCard = document.getElementById("edit-card");
  const closeEdit = document.getElementById("edit-card");
  const deleteButton = document.getElementById("edit-delete");

  addButton.addEventListener("click", function () {
    formPopUp.classList.remove("hidden");
  });
  closeForm.addEventListener("click", function () {
    formPopUp.classList.add("hidden");
  });
  closeEdit.addEventListener("click", function () {
    editPopUp.classList.add("hidden");
    clearEdit();
  });


  deleteButton.addEventListener("click", Library.deleteEntry);
  formSubmit.addEventListener("click", submitBook, false);

  function submitBook(event) {
    event.preventDefault();
    formPopUp.classList.add("hidden");
    if (formTitle.value === "") {
      return;
    }
    const newBook = new Book(
      formTitle.value,
      formAuthor.value,
      formPages.value,
      formRead.checked
    );
    Library.addBook(newBook);
    newBook.createCard()
    bookForm.reset();
  }

  function clearEdit() {
    const deleteName = document.querySelector(".edit-title");
    const deleteAuthor = document.querySelector(".edit-author");
    const deletePages = document.querySelector(".edit-pages");
    const deleteRead = document.querySelector(".edit-read");
    editCard.removeChild(deleteAuthor);
    editCard.removeChild(deleteName);
    editCard.removeChild(deletePages);
    editCard.removeChild(deleteRead);
  }  

return {editPopUp, editCard, container, addButton}

})();


class Book {

  constructor(name, author, pageCount, read) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;0
  }

  get id() {
    return this.name.replace(/\s/g, "");
  }

  get info() {
    let prefix ='';
    if (!this.read) {
      prefix = 'not';
    }
    return `${name} by ${author}, ${pageCount} pages, ${prefix} read.`;
  }

  set element(value) {
    this._element = value;
  }

  get element() {
    return this._element;
  }

  updateInfo() {
    this.element[1].textContent = this.name;
    this.element[2].textContent = this.author;
    this.element[3].textContent = this.pageCount;
    this.element[4].src = this.read ? "./images/read.svg" : "./images/not-read.svg";
  }

  switchRead(event) {
    this.read = !this.read;
    this.updateInfo();
    event.target.remove();
  }

  deleteEntry() {
    Library.removeBook(this.id);
    const deleteCard = document.getElementById(this.id);
    displayController.container.removeChild(deleteCard);
  }

  createCard() {
    const card = document.createElement("div");
    const cardName = document.createElement("div");
    const cardAuthor = document.createElement("div");
    const cardPageLength = document.createElement("div");
    const cardRead = document.createElement("div");
    const readImage = document.createElement("img");
    card.classList.add("card");
    card.setAttribute("id", this.id);
    readImage.setAttribute("id", `${this.id}img`);
    cardName.classList.add("title");
    cardAuthor.classList.add("author");
    cardPageLength.classList.add("pagelength");
    cardRead.classList.add("read");
    displayController.container.insertBefore(card, displayController.addButton);
    card.appendChild(cardName);
    card.appendChild(cardAuthor);
    card.appendChild(cardPageLength);
    card.appendChild(cardRead);
    cardRead.appendChild(readImage);
    card.addEventListener("click", () => this.openEdit(), false);
    this.element = [card,cardName,cardAuthor,cardPageLength,readImage];
    this.updateInfo();
  }

  openEdit(){
    displayController.editPopUp.classList.remove("hidden");
    const currentTitle = document.createElement("div");
    const currentAuthor = document.createElement("div");
    const currentPageLength = document.createElement("div");
    const currentRead = document.createElement("img");
    currentTitle.textContent = this.name;
    currentAuthor.textContent = this.author;
    currentPageLength.textContent = this.pageCount;
    currentRead.src = this.read
      ? "./images/read.svg"
      : "./images/not-read.svg";
    currentTitle.classList.add("edit-title");
    currentAuthor.classList.add("edit-author");
    currentPageLength.classList.add("edit-pages");
    currentRead.classList.add("edit-read");
    displayController.editCard.appendChild(currentTitle);
    displayController.editCard.appendChild(currentAuthor);
    displayController.editCard.appendChild(currentPageLength);
    displayController.editCard.appendChild(currentRead);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('id','edit-delete');
    deleteButton.addEventListener("click", () => this.deleteEntry());
    displayController.editCard.appendChild(deleteButton);
    const editButton = document.createElement('button');
    editButton.textContent = 'Read';
    editButton.setAttribute('id','edit');
    editButton.addEventListener("click", (event) => this.switchRead(event));
    displayController.editCard.appendChild(editButton);
  }

}
