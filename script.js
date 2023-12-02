const articleBoxTemplate = document.querySelector("[data-article-template]") // (2)
const articleBoxContainer = document.querySelector("[data-article-container]")
const searchInput = document.querySelector("[data-search]")

let articles = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    articles.forEach(article => {
        const isVisible = article.title.toLowerCase().includes(value) || article.id.toString().toLowerCase().includes(value)
        article.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://jsonplaceholder.typicode.com/photos")
    .then(res => res.json())  // (1) folosim fetch() API ca sa luam datele din acel link
    /*
        .then(data => {
            articles = data.map(article => {
                const box = articleBoxTemplate.content.cloneNode(true).children[0]
                const title = box.querySelector("[data-title]")
                const content = box.querySelector("[data-content]")
                const url = box.querySelector("[data-url]")
                title.textContent = article.title
                //content.textContent = article.email
                url.textContent = article.url
    
                const anchor = document.createElement('a');
                anchor.href = article.url;
                anchor.target = '_blank';
                anchor.appendChild(box.cloneNode(true));
                box.replaceWith(anchor);
    */
    .then(data => {
        articles = data.map(article => {
            const box = articleBoxTemplate.content.cloneNode(true).children[0]
            const title = box.querySelector("[data-title]")
            const content = box.querySelector("[data-content]")
            const url = box.querySelector("[data-url]")
            title.textContent = article.title
            content.textContent = article.id

            url.href = article.url // set the href attribute of the url element
            url.target = "_blank"

            articleBoxContainer.append(box)
            return { title: article.title, id: article.id, url: article.url, element: box }
        })
    })