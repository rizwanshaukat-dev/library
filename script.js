const Books=[];
function Book(title,author,pages,read_status) {
    this.bookId=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read_status=read_status;
}
function addBooks(){
    const title=document.getElementById("bookName").value;
    const author=document.getElementById("authName").value;
    const pages=document.getElementById("pages").value;
    const read_status=document.getElementById("readStat").value;

    const book = new Book(title,author,pages,read_status);
    Books.push(book);

}
function displayBooks(){
    const container= document.getElementById("bookContainer")
    for (const{bookId,title,author,pages,read_status}of Books) {
        const newDiv= document.createElement("div");
        newDiv.classList.add("book-card")
        newDiv.setAttribute("data-index",bookId)
        newDiv.innerHTML=`
        <p>Book Title:  ${title}</p>
        <p>Book Author: ${author}</p>
        <p>Total Pages: ${pages}</p>
        <p>Read Status: ${read_status}</p>
        <button class="upd-btn btn">Change read Status</button>
        <button class="dlt-btn btn">Delete the Book</button>
        `
    container.appendChild(newDiv);
    }
}
document.getElementById("bookContainer").addEventListener("click", (e) => {
if (e.target.classList.contains("delete-btn")) {
        const card = e.target.closest(".book-card");
        const Index = card.dataset.index;
        const index = Books.findIndex(book => book.bookId === Index);
        Books.splice(index, 1);
        displayBooks(); 
    }
});