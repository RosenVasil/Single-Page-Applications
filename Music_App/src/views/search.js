import { getAllAlbums, searchAlbums } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../util.js';

let isLogged = getUserData()? true : false;

const searchTemplate = (albums, onSearch, params = '', isLogged) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" value=${params}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <div class="search-result">

        ${albums.length == 0 ?
        html`<p class="no-result">No result.</p>` :
        albums.map(albumCard)}

    </div>
</section>`;

const albumCard = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: ${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>

        ${isLogged == true? html`
            <div class="btn-group">
                <a href="/albums/${album._id}" id="details">Details</a>
            </div>`
            : ''}
    </div>
</div>`;

export async function searchView(ctx) {
    let params = ctx.querystring.split('=')[1];
    let albums = [];

    if (params) {
        albums = await searchAlbums(decodeURIComponent(params));
    } else {
        albums = await getAllAlbums();
    }

    function onSearch(event) {
        event.preventDefault();
        const search = document.getElementById('search-input').value;

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }

    ctx.render(searchTemplate(albums, onSearch, params, isLogged));
}