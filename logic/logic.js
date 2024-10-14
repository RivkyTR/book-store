import books from "./data.json" with {type: 'json'}


window.onload = (event) => {
    if (localStorage.length === 0)
        books.books.forEach((value, key) => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    setBooks();
};

function setBooks() {
    const tableBody = document.getElementById('elements');
    tableBody.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const book = JSON.parse(localStorage.getItem(key));
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
        deleteButton.className = 'btn';
        deleteButton.textContent = 'Delete';
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        // Append the row to the table body
        tableBody.appendChild(row);
        row.addEventListener("click", () => showDetails(book));
        deleteButtonCell.addEventListener("click", ()=> Delete(book.title));
    }
}


function showDetails(book) {
    document.getElementById("book-name").innerText = book.title;
    document.getElementById("image-book").src = "../pictures/pic.jpg";
    document.getElementById("price").innerText = book.price;
    // document.getElementById("rateValue").innerText = book.rate;
}

function sortAccording(chosenValue) {
    const books = returnsArrayBooks();
    const sortedBooks = [...books].sort((a, b) => {
        if (chosenValue === 'title') {
            return a.title.localeCompare(b.title);
        } else if (chosenValue === 'price') {
            return a.price - b.price;
        }
    });
    // Update the table with sorted books
    updateTable(sortedBooks);
}

function updateTable(sortedBooks) {
    const tableBody = document.getElementById('elements');
    tableBody.innerHTML = "";

    for (let i = 0; i < sortedBooks.length; i++) {
        const book = sortedBooks[i];
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
        deleteButton.className = 'btn';
        deleteButton.textContent = 'Delete';
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);
        

        // Append the row to the table body
        tableBody.appendChild(row);
        row.addEventListener("click", () => showDetails(book));
        deleteButtonCell.addEventListener("click", ()=> Delete(book.title));
    }
}
function get() {

}
function put() {

}

function Delete(title) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (JSON.parse(localStorage.getItem(key)).title === title)
            localStorage.removeItem(key);
    }
    setBooks();
}

function post() {
    
}

function returnsArrayBooks(){

    const books = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        books.push(value);
    }
    return books;
}

document.getElementById("title-header").addEventListener("click", () => sortAccording("title"));
document.getElementById("price-header").addEventListener("click", () => sortAccording("price"));