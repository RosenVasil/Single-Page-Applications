import { getAllBooks, searchBooks } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js';
import { bookPreview } from './common.js';

const searchTemplate = (books, onSearch, params = '') => html`
<section id="search-page" class="dashboard">
    <h1>Find Book</h1>
    <form @submit=${onSearch}>
        <input type="text" name="search" value=${params}>
        <input type="submit" value="Search">
    </form>

    ${books.length == 0 ?
        html`<p class="no-books">No results!</p>` :
        html`<ul class="other-books-list">${books.map(bookPreview)}</ul>`}
</section>`;

export async function searchView(ctx) {
    let params = ctx.querystring.split('=')[1];
    let books = [];

    if (params) {
        books = await searchBooks(decodeURIComponent(params));
    } else {
        books = await getAllBooks();
    }

    function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get('search');

        if(search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }

    ctx.render(searchTemplate(books, onSearch, params));
}