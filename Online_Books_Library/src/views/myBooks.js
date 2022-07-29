import { html } from '../../node_modules/lit-html/lit-html.js';
import { bookPreview } from './common.js';
import { getMyBook } from '../api/data.js';
import { getUserData } from '../util.js';

const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length == 0 ?
    html`<p class="no-books">No books in database!</p>` :
    html`<ul class="my-books-list">${books.map(bookPreview)}</ul>`}
</section>`;

export async function myBooksView(ctx) {
    const userData = getUserData()
    const books = await getMyBook(userData.id);
    ctx.render(myBooksTemplate(books));
}