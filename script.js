const Books=[];
function Book(title,author,pages,read_status) {
    this.bookId=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read_status=read_status;
}
function openCard(){
    const container = document.querySelector(".bookInputCard");
    container.showModal();
}
function closeCard(){
    const container = document.querySelector(".bookInputCard");
    container.close();
}
function addBooks(){
    const title=document.getElementById("bookName").value;
    const author=document.getElementById("authName").value;
    const pages=document.getElementById("pages").value;
    const read_status=document.getElementById("readStat").value;

    const book = new Book(title,author,pages,read_status);
    Books.push(book);
    const container = document.querySelector(".bookInputCard");
    const cardInputs = container.querySelectorAll("input");
    cardInputs.forEach(input=>{
        input.value="";
    })
    displayBooks();

}
function displayBooks(){
    const container= document.querySelector(".bookContainer")
    container.innerHTML="";
    for (const{bookId,title,author,pages,read_status}of Books) {
        const newDiv= document.createElement("div");
        newDiv.classList.add("book-card")
        newDiv.setAttribute("data-index",bookId)
        newDiv.innerHTML=`
        <div class="card-content">
        <h3>${title}</h3>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Pages:</strong> ${pages}</p>
        <div class="status-label">Status: ${read_status}</div>
    </div>
    <div class="card-actions">
        <button class="upd-btn btn">Change Status</button>
        <button class="dlt-btn btn">Delete</button>
    </div>
`;
    container.appendChild(newDiv);
    }
}
document.querySelector(".bookContainer").addEventListener("click", (e) => {
if (e.target.classList.contains("dlt-btn")) {
        const card = e.target.closest(".book-card");
        const idToRemove = card.getAttribute("data-index");
        const index = Books.findIndex(book => book.bookId === idToRemove);
        if (index !== -1) {
            Books.splice(index, 1); // Remove from array
            displayBooks();  
    }
}
if (e.target.classList.contains("upd-btn")) {
        const card = e.target.closest(".book-card");
        const id = card.getAttribute("data-index");
        const book = Books.find(book => book.bookId === id);

        if (book) {
            book.read_status = book.read_status === "Read" ? "Not Read" : "Read";
            displayBooks();
        }
    }
});