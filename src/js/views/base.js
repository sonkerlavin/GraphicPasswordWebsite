import * as Grid from './gridView';

export const elements = {
    loginTop: document.querySelector('#login'),
    registerTop: document.querySelector('#register'),
    register: document.querySelector('.register'),
    login: document.querySelector('.login'),
    remove: document.querySelector('#remove'),
    mainBody:document.body,
    newfile_btn:document.getElementsByClassName("db_addfile"),
    newfolder_btn:document.getElementsByClassName("db_addfolder"),
    addFile_btn:document.getElementsByClassName("bn33"),
    file_delete_btns:document.getElementsByClassName("file_delete_btn"),
    preview_btns:document.getElementsByClassName("preview_btn"),
    privacy_btns:document.getElementsByClassName("privacy_btn"),
    preview_close_btn:document.getElementsByClassName("preview_close_btn"),
    preview:document.getElementsByClassName("preview"),
    logout_btn:document.getElementsByClassName("logout_btn"),

};

export const elementStrings = {
    formOne: '#form--1',
    formTwo: '#form--2',
    group: '.form__group',
    icon: '.circle',
    username: '#username',
    password: '#password',
    pattern: '#pattern',
    reset: '#reset',
    nextOR: '#register--one',
    nextTR: '#register--two',
    nextHR: '#register--three',
    nextOL: '#login--one',
    nextTL: '#login--two',
    nextHL: '#login--three',
    drag: '.graphic__row--drag',
    drop: '.graphic__row--drop',
}

const markups = {
    one: 
    `<div class="container">
        <div class="container__form">
            <div class="margin-bottom center-text">
                <h2 class="sub-heading">Level One</h2>
                <p class="paragraph">%_DESCRIPTION%</p>
            </div>
            <form onsubmit="event.preventDefault();" class="form" id="form--1" autocomplete="off">
                <div class="form__group">
                    <input type="text" class="form__input" placeholder="username" id="username" minlength="3" required />
                    <label for="username" class="form__label">username</label>
                </div>
                <div class="form__group">
                    <input type="password" class="form__input" placeholder="password" id="password" minlength="6" required />
                    <label for="password" class="form__label">password</label>
                </div>
                <div class="form__group">
                    <button id="%_BTNLEVEL%" class="btn btn--primary">Next &rarr;</button>
                </div>
            </form>
        </div>
    </div>`,

    two: 
    `<div class="container">
        <div class="container__icons">
            <div class="margin-bottom center-text">
                <h2 class="sub-heading">Level Two</h2>
                <p class="paragraph">%_DESCRIPTION%</p>
            </div>
            <div class="row">
                <div class="col-1-of-5">&nbsp;</div>
                    <div class="col-1-of-5">
                        <span id="red" class="circle circle--red">&nbsp;</span>
                    </div>
                    <div class="col-1-of-5">
                        <span id="green" class="circle circle--green">&nbsp;</span>
                    </div>
                    <div class="col-1-of-5">
                        <span id="blue" class="circle circle--blue">&nbsp;</span>
                    </div>
                    <div class="col-1-of-5">&nbsp;</div>
                </div>
            </div>
            <div class="container__form">
            <form class="form" id="form--2" autocomplete="off">
                <div class="form__group">
                    <input type="password" class="form__input" placeholder="RGB pattern" id="pattern" required readonly />
                    <label for="pattern" class="form__label">pattern</label>
                </div>
                <div class="form__group">
                    <button type="button" id="reset" class="btn btn--primary">Reset</button>
                    <button type="button" id="%_BTNLEVEL%" class="btn btn--primary btn--right">Next &rarr;</button>
                </div>
            </form>
        </div>
    </div>
</div>`,

    three: `
    <div class="container">
        <div class="container__form">
            <div class="margin-bottom center-text">
            <h2 class="sub-heading">Level Three</h2>
            <p class="paragraph">%_DESCRIPTION%</p>
        </div>
        <div class="graphic margin-bottom">%_GRID%</div>
        <div class="form__group">
            <button type="button" id="%_BTNLEVEL%" class="btn btn--primary">%_BTNDESC%</button>
        </div>
    </div>`,
};

const replacements = {
    oneLD: 'Please enter your username and password.',
    oneRD: 'Please choose username and password. Username must be at least 3 characters and password must be at least 6 characters.',
    twoLD: 'Please click on the colors below in the order you picked during registration.',
    twoRD: 'Please click on the colors below in any order to create a pattern.',
    threeLD: 'Please drag and drop the images below to the locations you specified during registration.',
    threeRD: 'Please drag and drop the images below to your preferred locations to create a graphical pattern.'
};

const placeholders = {
    description: '%_DESCRIPTION%',
    buttonLevel:'%_BTNLEVEL%',
    buttonDescription: '%_BTNDESC%',
    gridPlaceholder: '%_GRID%',
};

export const clear = () => {
    elements.register.innerHTML = '';
    elements.login.innerHTML = '';
};

export const clearFields = () => {
    const fields = document.querySelectorAll('input');
    fields.forEach(el =>  el.value = '');
}

export const updatePattern = (color) => {
    const cur = document.querySelector(elementStrings.pattern).value
    const update = cur.concat(`${color}`);
    document.querySelector(elementStrings.pattern).value = update;
}

export const renderOne = (type) => {
    let markup = markups.one.replace(placeholders.buttonLevel, `${type}--one`);
    if (type === 'login') {
        markup = markup.replace(placeholders.description, replacements.oneLD);
        elements.login.innerHTML = markup;
    } else if (type === 'register') {
        markup = markup.replace(placeholders.description, replacements.oneRD);
        elements.register.innerHTML = markup;
    }
    
};

export const renderTwo = (type) => {
let markup = markups.two.replace(placeholders.buttonLevel, `${type}--two`);
    if (type === 'login') {
        markup = markup.replace(placeholders.description, replacements.twoLD);
        elements.login.innerHTML = markup;
    } else if (type === 'register') {
        markup = markup.replace(placeholders.description, replacements.twoRD);
        elements.register.innerHTML = markup;
    }
}

export const renderThree = (type) => {
    let markup = markups.three.replace(placeholders.buttonLevel, `${type}--three`);
    markup = markup.replace(placeholders.gridPlaceholder, Grid.create());
    markup = markup.replace(placeholders.buttonDescription, type);
     if (type === 'login') {
        markup = markup.replace(placeholders.description, replacements.threeLD);
        elements.login.innerHTML = markup;
    } else if (type === 'register') {
        markup = markup.replace(placeholders.description, replacements.threeRD);
        elements.register.innerHTML = markup;
    }
    Grid.addImages();
}



