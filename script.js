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
    .then(res => res.json())  // (1) fetch() API ca sa luam datele din acel link

    .then(data => {
        articles = data.map(article => {
            const box = articleBoxTemplate.content.cloneNode(true).children[0]
            const title = box.querySelector("[data-title]")
            const content = box.querySelector("[data-content]")
            //const url = box.querySelector("[data-url]")
            title.textContent = article.title
            content.textContent = article.id

            //url.href = article.url // set the href attribute of the url element
            //url.target = "_blank"

            articleBoxContainer.append(box)
            return {
                title: article.title, id: article.id, //url: article.url,
                element: box
            }
        })
    })

//Buton pentru rezolutie mica
document.querySelector('#check').addEventListener('change', function () {
    var nav = document.querySelector('nav ul');
    if (this.checked) {
        nav.style.left = '0';
    } else {
        nav.style.left = '-100%';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const articleZone = document.querySelector('.article_zone');
    const overlay = document.querySelector('.overlay');

    articleZone.addEventListener('click', function (event) {
        const clickedArticle = event.target.closest('.article');
        if (!clickedArticle) return;

        const closeButton = clickedArticle.querySelector('.close_button');
        if (closeButton) {
            clickedArticle.classList.toggle('expanded');

            if (clickedArticle.classList.contains('expanded')) {
                closeButton.style.display = 'block';
                overlay.style.display = 'block'; // Show the overlay when an article is expanded
                document.body.classList.add('no-scroll'); // Disable scrolling on the main site
            } else {
                closeButton.style.display = 'none';
                overlay.style.display = 'none'; // Hide the overlay when an article is collapsed
                document.body.classList.remove('no-scroll'); // Enable scrolling on the main site
            }
        }
    });

    articleZone.addEventListener('click', function (event) {
        const closeButton = event.target.closest('.close_button');
        if (!closeButton) return;

        const expandedArticle = closeButton.closest('.article');
        if (expandedArticle) {
            expandedArticle.classList.remove('expanded');
            closeButton.style.display = 'none';
            overlay.style.display = 'none'; // Hide the overlay when an article is collapsed
            document.body.classList.remove('no-scroll'); // Enable scrolling on the main site
        }
    });
});

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
