import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { getUserData } from "./util.js";
import { logout } from './api/api.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { homeView } from './views/home.js';
import { createView } from './views/create.js';
import { myBooksView } from './views/myBooks.js';
import { searchView } from './views/search.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';

const root = document.getElementById('site-content');

document.getElementById('logoutBtn').addEventListener('click', (e) =>{
    logout()
    updateUserNav()
    page.redirect('/')
});

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/myBooks', myBooksView);
page('/search', searchView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateUserNav = updateUserNav;

    next();
}

function renderMain(templateResult) {
    render(templateResult, root);
}

export function updateUserNav() {
    const userData = getUserData();
    if(userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}