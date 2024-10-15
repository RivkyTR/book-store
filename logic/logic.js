import books from "./data.json" with {type: 'json'}

window.onload = (event) => {
    if (localStorage.length === 0)
        books.books.forEach((value, key) => {
            localStorage.setItem(value.id, JSON.stringify(value));
        });
    setTable(getArrayBooks());
    document.getElementById("title-header").addEventListener("click", () => sortAccording("title"));
    document.getElementById("price-header").addEventListener("click", () => sortAccording("price"));
    document.getElementById("new-book").addEventListener("click", () => addBook());
    document.getElementById("decrement").addEventListener("click", decrementRate);
    document.getElementById("increment").addEventListener("click", incrementRate);
};

function setTable(arrayBooks) {
    //This function add all the books that were taked from the local storage to the table
    const tableBody = document.getElementById('elements');
    tableBody.innerHTML = "";

    for (let i = 0; i < arrayBooks.length; i++) {
        const book = arrayBooks[i];
        addRow(book);

        if(i===0)//By the first book in tableupdate the right side with his details
            showDetails(book);
    }
}

function readBook(bookId) {
    const book = returnsbook(bookId);
    const form = document.getElementById("connectionWithUser");
    const central = document.getElementById("central");

    form.style.display = "flex"; 
    form.innerHTML="";
    //Adds the form where the user could read the summary of the book, and  than elso rate it
    const html = `<div class="welcome">
            <h2>${book.title}</h2>
        </div>
        <div class="book-description" style="justify-content: space-around">
            <img style="width: 30%" src="../pictures/pic.jpg">
            <div class="desc">
                <p>Price: ${book.price}</p>
                <p>Rate: 
                    <div class="rate-look">
                        <button id="decrement-after-reading">-</button>
                        <span class="rateValue">${book.rate}</span>
                        <button id="increment-after-reading">+</button>
                    </div>
                </p>
            </div>
        </div>
            <div class="content">
                <p>${book.content}</p>
            </div>
        `;
    form.insertAdjacentHTML("beforeend", html);
    document.getElementById("decrement-after-reading").addEventListener("click", decrementRate);
    document.getElementById("increment-after-reading").addEventListener("click", incrementRate);
    
    setTimeout(() => {
        central.addEventListener('click', handleClickOutside);
    },0);
}

function updateBookDetails(bookId) {
    const book = returnsbook(bookId);
    const form = document.getElementById("connectionWithUser");
    form.style.display = "flex"; 
    form.innerHTML="";
    //Adds the form that the user could update details of a chosen book
    const html = `<div class="welcome">
            <h1>Update Book</h1>
            <h1>----------------</h1>
        </div>
        <form id="book-form">
            <label for="title">Title</label>
            <input type="text" id="title" value="${book.title}">
            <label  for="price">Price</label>
            <input type="text" id="price" value="${book.price}">
            <label for="url">Cover Image URL</label>
            <input type="text" id="url" value="${book.picture}">
            <label for="rate">Rate</label>
            <input type="number" id="rate" max="10" min="0" value="${book.rate}">
            <label for="content">Content</label>
            <textarea style="color: black" id="content" name="content" rows="4" cols="50" >${book.content}</textarea>
            <button type="submit" id="add-book">Update</button>
        </form>`;
    form.insertAdjacentHTML("beforeend", html);

    document.getElementById("book-form").addEventListener("submit", function(event){
        event.preventDefault();
        //updates the book properties with the updated data
        book.title = this.title.value;
        book.price = parseFloat(this.price.value);
        book.content = this.content.textContent;
        book.picture = this.picture;
        localStorage.setItem(book.id, JSON.stringify(book));
    
        setTable(getArrayBooks());
        this.reset();
        document.getElementById("connectionWithUser").style.display = "none"; 
    });

    setTimeout(() => {
        central.addEventListener('click', handleClickOutside);
    },0);
}

function deleteBook(bookId) {
    localStorage.removeItem(bookId);
    setTable(getArrayBooks());
}

function addBook(){
    const form = document.getElementById("connectionWithUser");
    form.style.display = "flex"; 
    form.innerHTML="";
    //Add form for the user to add a book
    const html = `
        <div class="welcome">
            <h1>+ New Book</h1>
            <h1>----------------</h1>
        </div>
        <form id="book-form">
            <label for="id">Id</label>
            <input type="number" id="id">
            <label for="title">Title</label>
            <input type="text" id="title">
            <label  for="price">Price</label>
            <input type="text" id="price">
            <label for="url">Cover Image URL</label>
            <input type="text" id="url">
            <label for="rate">Rate</label>
            <input type="number" id="rate" max="10" min="0">
            <button type="submit" id="add-book">Add</button>
        </form>`;
    form.insertAdjacentHTML("beforeend", html);
    
    //Add the new details to a new book
    document.getElementById("book-form").addEventListener("submit", function(event){
        event.preventDefault();
        
        const newBook = {"id": parseInt(this.id.value),
            "title": this.title.value,
            "price": parseFloat(this.price.value),
            "content": "",
            "picture": this.url.value,
            "rate": parseInt(this.rate.value)
        };
        localStorage.setItem(newBook.id, JSON.stringify(newBook));
        
        addRow(newBook);
        this.reset();
        document.getElementById("connectionWithUser").style.display = "none"; 
    });

    setTimeout(() => {
        central.addEventListener('click', handleClickOutside);
    },0);
}

function addRow(book){
    //Add row to the table
    const tableBody = document.getElementById('elements');
    const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = book.id;
        row.appendChild(idCell);

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        row.appendChild(titleCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = book.price;
        row.appendChild(priceCell);

        const readButtonCell = document.createElement('td');
        const readButton = document.createElement('button');
        readButton.className = 'btn';
        readButton.textContent = 'Read';
        readButtonCell.appendChild(readButton);
        row.appendChild(readButtonCell);

        const updateButtonCell = document.createElement('td');
        const updateButton = document.createElement('button');
        updateButton.className = 'btn';
        updateButton.textContent = 'Update';
        updateButtonCell.appendChild(updateButton);
        row.appendChild(updateButtonCell);

        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        const deleteIcon = document.createElement('i');
        deleteIcon.className ="fa fa-trash-o";
        deleteButton.appendChild(deleteIcon);
        deleteButton.className = 'btn';
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);
        
        // Append the row to the table body
        tableBody.appendChild(row);
        row.addEventListener("click", () => showDetails(book));
        deleteButtonCell.addEventListener("click", ()=> deleteBook(book.id));
        readButtonCell.addEventListener("click", ()=> readBook(book.id));
        updateButtonCell.addEventListener("click", ()=> updateBookDetails(book.id));
}

function showDetails(book) {
    //performes details on the book on the left side of screen
    document.getElementById("book-details").setAttribute("book-id",book.id);
    document.getElementById("book-name").innerText = book.title;
    document.getElementById("image-book").src = "../pictures/pic.jpg";
    document.getElementById("price").innerText = book.price;
    const rateSpans = document.querySelectorAll('.rateValue');
    rateSpans.forEach(span => {
        span.innerText = book.rate;
    });
}

function sortAccording(chosenValue) {
    const books = getArrayBooks();
    const sortedBooks = [...books].sort((a, b) => {
        if (chosenValue === 'title') {
            return a.title.localeCompare(b.title);
        } else if (chosenValue === 'price') {
            return a.price - b.price;
        }
    });
    // Update the table with sorted books
    setTable(sortedBooks);
}

function decrementRate(){
    const bookId = document.getElementById("book-details").getAttribute("book-id");
    const book = returnsbook(bookId);
    
    if(book.rate > 0 ){
        book.rate = book.rate - 1;
        localStorage.setItem(book.id,JSON.stringify(book));
    }
    showDetails(book); 
}

function incrementRate(){
    const bookId = document.getElementById("book-details").getAttribute("book-id");
    const book = returnsbook(bookId);

    if(book.rate < 10 ){
        book.rate += 1;
        localStorage.setItem(book.id,JSON.stringify(book));
    }
    showDetails(book);
}

function getArrayBooks(){
    //This function returns an array of books that was taken from the local storage
    const books = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        books.push(value);
    }
    return books;
}

function returnsbook(bookId){
    //This function returns a book object with the gven id
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key == bookId){
            return JSON.parse(localStorage.getItem(key));
        }
    }
}

function handleClickOutside(event) {
    //This function handles the times that the user clicks out of the form that poped up
    //it takes away the form to the main screen
    const form = document.getElementById("connectionWithUser");
    const central = document.getElementById("central");
    console.log(event.clientX);
    console.log(event.clientY);
    console.log(form.getBoundingClientRect());
    
    
    const clickX = event.clientX;
    const clickY = event.clientY;
    const rect = form.getBoundingClientRect();
    
    const isOutside = clickX < rect.left || clickX > rect.right || 
    clickY < rect.top || clickY > rect.bottom;
    
    if (isOutside) {
        console.log("Clicked outside the form at: ", { x: clickX, y: clickY });
        form.style.display = "none"; 
        
        central.removeEventListener("click", handleClickOutside);
        form.innerHTML="";
    }
}