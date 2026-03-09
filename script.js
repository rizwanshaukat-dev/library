class Library {
constructor() {
    this.Books=[];
    this.bindEvents();
}
openCard(){
    document.querySelector(".bookInputCard").showModal();
}
closeCard(){
    document.querySelector(".bookInputCard").close()
}
addBooks(){
    const title=document.getElementById("bookName").value;
    const author=document.getElementById("authName").value;
    const pages=document.getElementById("pages").value;
    const read_status=document.getElementById("readStat").value;

    const book ={
        bookId:crypto.randomUUID(),
        title,
        author,
        pages,
        read_status
    };
    this.Books.push(book);
    const container = document.querySelector(".bookInputCard");
    const cardInputs = container.querySelectorAll("input,select");
    cardInputs.forEach(input=>{
        input.value="";
    })
    this.displayBooks();

}
displayBooks(){
    const container= document.querySelector(".bookContainer")
    container.innerHTML="";
    for (const{bookId,title,author,pages,read_status}of this.Books) {
        const newDiv= document.createElement("div");
        newDiv.classList.add("book-card")
        newDiv.setAttribute("data-index",bookId)
        newDiv.innerHTML=`
        <div class="card-content">
        <h3>${title}</h3>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Pages:</strong> ${pages}</p>
        <p><strong>Status:</strong> ${read_status}</p>
    </div>
    <div class="card-actions">
        <button class="upd-btn btn">Change Status</button>
        <button class="dlt-btn btn">Delete</button>
    </div>
`;
    container.appendChild(newDiv);
    }
}
bindEvents(){
document.querySelector(".bookContainer").addEventListener("click", (e) => {
if (e.target.classList.contains("dlt-btn")) {
        const card = e.target.closest(".book-card");
        const idToRemove = card.getAttribute("data-index");
        const index = this.Books.findIndex(book => book.bookId === idToRemove);
        if (index !== -1) {
            this.Books.splice(index, 1); // Remove from array
            this.displayBooks();  
    }
}
if (e.target.classList.contains("upd-btn")) {
        const card = e.target.closest(".book-card");
        const id = card.getAttribute("data-index");
        const book = this.Books.find(book => book.bookId === id);

        if (book) {
            book.read_status = book.read_status === "Read" ? "Not Read" : "Read";
            this.displayBooks();
        }
    }
});
}
}
const library=new Library();
document.getElementById("submit-btn").onclick = () => library.addBooks();
document.getElementById("addbook-btn").onclick = () => library.openCard();
document.getElementById("closeBtn").onclick= () => library.closeCard();