// featching book's api
alert('working')
let bookContainer = document.querySelector('#bookContainerId')
let viewChangeBtn = document.querySelector('#viewChangeBtn')

// function for search 

function SearchBar(){
    let input = document.querySelector('#input').value
        input = input.toLocaleLowerCase();
        console.log(input);

    let bookTitleArray = document.querySelectorAll('.bookTitle')
        console.log(bookTitleArray[0].getAttribute('id'));

    let bookDivArray = document.querySelectorAll('.book')
        

    for(let i = 0; i < bookTitleArray.length; i++){
        if(!bookTitleArray[i].innerHTML.toLowerCase().includes(input)){
            bookDivArray[i].style.display = 'none'
            
        } else{
            bookDivArray[i].style.display = 'list-item'

        }
    }
    
    
}

 // function for details button
 function DetailsButton(id){
    let bookTitle = document.querySelector(`#bookTitle${id}`).innerText
    let bookAuthorName = document.querySelector(`#bookAuthorName${id}`).innerText
    let bookDiscription = document.querySelector(`#bookDiscription${id}`).innerText
    let bookPreviewLink = document.querySelector(`#bookPreviewLinkText${id}`).innerText
    let bookThumbnailLink = document.querySelector(`#thumbnailLink${id}`).innerText
    // let bookPublisher = document.querySelector(`#bookPublisher${countId}`).innerHTMl
    
    


    let bookDivArray = document.querySelectorAll('.book')
    let previewCard = document.querySelector('.previewCard')
    let card = document.createElement('div')
        card.setAttribute('id',`bookId${id}`)
        card.classList.add('card')
        card.innerHTML = `<div class="preview-card">
        <div class="preview-left">
          <img src="${bookThumbnailLink}" alt="Book Cover" class="book-image">
        </div>
        <div class="preview-right">
          <h3 class="book-title">${bookTitle}  </h3>
          <p class="book-author">${bookAuthorName}</p>
          <p class="book-publisher"></p>

          <div class="book-meta">
            <span class="rating">⭐4.5/5</span>
            <span class="pages">📖 320 pages</span>
            <span class="genre">🏷️ Fiction</span>
          </div>
          <p class="book-description">Discription:-> ${bookDiscription}</p>
          <a href="${bookPreviewLink}"> <button class="read-btn">Read Now</button></a>
          <button class="close-preview" onclick = "DetailCardClose()"></button>
        </div>
      </div>`;

      previewCard.appendChild(card)
     //  Card Show
      bookDivArray.forEach((book) => {
        book.style.display = 'none'
      })

 }

//  Function to close detail card 
function DetailCardClose(){
    let bookDivArray = document.querySelectorAll('.book')
    bookDivArray.forEach((book) => {
        book.style.display = 'list-item'
    })

    let deleteCard = document.querySelector('.card')
        deleteCard.remove(deleteCard)

}

// BOOK Data Featch 
async function BookDataFeatch(){
    let bookApi = await fetch('https://api.freeapi.app/api/v1/public/books')
    return await bookApi.json()
}



window.addEventListener('load',async () => {
    let bookData = await BookDataFeatch();
    let bookArray = bookData.data.data; // book list array main 0 to 9
    
    let countId = 0;
//  BookArray mai se Book alag karna 
    bookArray.forEach((book) => {
        countId += 1;
        // book container ke chield 
        let bookDiv = document.createElement('div')
            bookDiv.classList.add('book')
            bookDiv.classList.add(`bookDiv${countId}`)
            
        // book thumbanil
        let thumbnail = document.createElement('img')
           
            let thumbanilLink = document.createElement('p')
                thumbanilLink.innerText = book.volumeInfo.imageLinks.smallThumbnail
                thumbanilLink.setAttribute('id',`thumbnailLink${countId}`)
                thumbanilLink.style.display = 'none'
            thumbnail.setAttribute('src',`${thumbanilLink.innerText}`)
        
            
        //  book info's store 
        let bookInfoDiv = document.createElement('div')
            bookInfoDiv.setAttribute('id',`bookInfoDiv${countId}`)
            bookInfoDiv.classList.add('BookInfo')
            

        // book infos like title,author,publisher,previewlink,buylink
        let bookTitle = document.createElement('h3')
            bookTitle.classList.add('bookTitle')
            bookTitle.setAttribute('id',`bookTitle${countId}`)
            // bookTitle.setAttribute('id',`title${countId}`)
            bookTitle.innerText = book.volumeInfo.title

        let bookAuthorName = document.createElement('p')
            bookAuthorName.classList.add('authorName')
            bookAuthorName.setAttribute('id',`bookAuthorName${countId}`)
            bookAuthorName.innerText = `By ${book.volumeInfo.authors}`
            bookAuthorName.style.display = 'none'
        
        let bookPublisher = document.createElement('p')
            bookPublisher.classList.add('publisherDateAndName')
            bookPublisher.setAttribute('id',`bookPublisher${countId}`)
            bookPublisher.innerHTML = `Pubelesier:-> ${book.volumeInfo.publisher} || publised on:-> ${book.volumeInfo.publishedDate}`
            bookPublisher.style.display = 'none'



        // let previewLinkContainer = document.createElement('div')
        //     previewLinkContainer.setAttribute('id',`previewLinkContainer${countId}`)
        //     previewLinkContainer.classList.add('previewLinkContainer')

        let bookPreviewLinkText = document.createElement('p')
            bookPreviewLinkText.setAttribute('id',`bookPreviewLinkText${countId}`)
            bookPreviewLinkText.innerText = book.volumeInfo.previewLink
            bookPreviewLinkText.style.display = 'none'

        // let bookPreviewLink = document.createElement('a')
        //     bookPreviewLink.classList.add('previewLink')
        //     bookPreviewLink.setAttribute('href',`${bookPreviewLinkText}`)
        //     bookPreviewLink.innerText = `Preview Link`
        //     previewLinkContainer.appendChild(bookPreviewLink)

        let cardButton = document.createElement('button')
            cardButton.classList.add('detais')
            cardButton.classList.add('button-4')
            cardButton.setAttribute('id',`dtails${countId}`)
            cardButton.setAttribute('onclick',`DetailsButton(${countId})`)
            cardButton.innerText = 'details'

        let bookDiscription = document.createElement('p')
            bookDiscription.setAttribute('id',`bookDiscription${countId}`)
            bookDiscription.style.display = 'none'
            bookDiscription.innerText = book.volumeInfo.description




        // let buyLinkContainer = document.createElement('div')
        //     buyLinkContainer.classList.add('buyLinkContainer')

        // let bookBuyLink = document.createElement('a')
        //     bookBuyLink.classList.add('buyLink')
        //     bookBuyLink.setAttribute('href',`${book.}`)
        //     bookBuyLink.innerText = `Buy Link`
        //     buyLinkContainer.appendChild(bookBuyLink)
            
        bookDiv.appendChild(thumbnail)
        bookInfoDiv.appendChild(thumbanilLink) // display none
        bookInfoDiv.appendChild(bookTitle)
        bookInfoDiv.appendChild(bookAuthorName) // display none
        bookInfoDiv.appendChild(bookDiscription) // display none
        bookInfoDiv.appendChild(bookPublisher) // display none
        // bookInfoDiv.appendChild(previewLinkContainer)
        bookInfoDiv.appendChild(cardButton) 
        bookInfoDiv.appendChild(bookPreviewLinkText) // display none
        // bookInfoDiv.appendChild(buyLinkContainer)
        bookDiv.appendChild(bookInfoDiv)
        bookContainer.appendChild(bookDiv)  



    
        

        
    });
})

viewChangeBtn.addEventListener('click', () => {
    if(bookContainer.className == 'bookContainerGrid'){
        bookContainer.classList.remove('bookContainerGrid')
    }else{
        bookContainer.classList.add('bookContainerGrid')
    }

})










