import {elements, elementStrings, clear, clearFields, updatePattern, renderOne, renderTwo, renderThree} from './views/base';
import swal from 'sweetalert';
import User from './models/userModel';
import Users from './models/allusers';

// Reloads
const state = {};
window.addEventListener('load', () => {
    state.users = new Users();
    state.users.restore();
});

// Registeration Controller
elements.registerTop.addEventListener('click', () => {
    clear();
    renderOne('register');
    state.current = new User();
});

elements.register.addEventListener('click', e => {

    //1. Username and Password
    if(e.target.matches(elementStrings.nextOR)) {
        const created = rLevelOne(state.users);
        if(created) {
            clear();
            renderTwo('register');  
        }
    } 

    //2. RGB Pattern
    if(e.target.matches(elementStrings.icon)) {
        const color = e.target.closest(elementStrings.icon).id;
        updatePattern(color);

    } else if(e.target.matches(`${elementStrings.group}, ${elementStrings.group} *`)) {

        if(e.target.closest(elementStrings.reset)) {
            clearFields();

        } else if(e.target.closest(elementStrings.nextTR)) {
            const patternAdded = rLevelTwo();
            if(patternAdded) {
                clear();
                renderThree('register');
            }
        }
    }
    
    //3. Grid
    if(e.target.matches(elementStrings.nextHR)) {
        rLevelThree();
        clear();
        state.users.addUser(state.current);
        swal('Registration successful!');
    }
});

const rLevelOne = (users) => {
    if(document.querySelector(elementStrings.formOne).checkValidity()) {
        const unique = state.current.addUsernameAndPassword(
            document.querySelector(elementStrings.username).value, 
            document.querySelector(elementStrings.password).value,
            users.getAllUsers()
        );
        if(!unique) {
            swal('A user with the same username already exists! Please choose another username.');
            clearFields();
            return false;
        }
        return true;
    }
};

const rLevelTwo = () => {
    if(document.querySelector(elementStrings.formTwo).checkValidity()) {
        const pattern = document.querySelector(elementStrings.pattern).value;
        if(pattern === '') {
            swal('Color pattern cannot be empty! Please click on the color icons to choose a pattern.');
            return false;

        } else if(pattern.length < 6) {
            swal('Color pattern must contain at least 2 colors!');
            clearFields();
            return false;

        } else {
            state.current.addPattern(pattern);
            return true;
        }
    }
};

const rLevelThree = () => {
    let grid = '';
    const cells = document.querySelectorAll(elementStrings.drop)
    const cellsArr = Array.prototype.slice.call(cells);
    cellsArr.forEach(el => {
        if(el.firstChild) {
            grid += `${el.id}${el.firstChild.id}`
            
        }
    });
    state.current.addGrid(grid);
};

// Log in Controller
elements.loginTop.addEventListener('click', () => {
    clear();
    renderOne('login');
});

elements.login.addEventListener('click', e => {

    //1. Password
    if(e.target.matches(elementStrings.nextOL)) {
        const passwordMatch = oLevelOne(state.users);
        if(passwordMatch) {
            clear();
            renderTwo('login');  
        }
    }

    //2. RGB Pattern
    if(e.target.matches(elementStrings.icon)) {
        const color = e.target.closest(elementStrings.icon).id;
        updatePattern(color);

    } else if(e.target.matches(`${elementStrings.group}, ${elementStrings.group} *`)) {

        if(e.target.closest(elementStrings.reset)) {
            clearFields();

        } else if(e.target.closest(elementStrings.nextTL)) {
            const patternMatch = oLevelTwo();
            if(patternMatch) {
                clear();
                renderThree('login');
            }
        }
    }

    //3. Grid
    if(e.target.matches(elementStrings.nextHL)) {
        const graphicMatch = oLevelThree();

        if(graphicMatch) {
            clear();
            swal('Log in successful!');
        }
    }
});

const oLevelOne = (users) => {

    if(document.querySelector(elementStrings.formOne).checkValidity()) {
        const found = users.getAllUsers().find(el => el.username === document.querySelector(elementStrings.username).value);
        if(!found) {
            swal('There is no matching account for the username you entered!');
            return false;
        }
        state.current = found;
        Object.setPrototypeOf(state.current, User.prototype);
        const match = state.current.comparePassword(document.querySelector(elementStrings.password).value);

        if(!match) {
            swal('Username and password do not match!');
            return false;
        }
        
        return true;
    }
};

const oLevelTwo = () => {
    if(document.querySelector(elementStrings.formTwo).checkValidity()) {
        const pattern = document.querySelector(elementStrings.pattern).value;
        const match = state.current.comparePattern(pattern);
        if(!match) {
            swal('The color pattern you entered does not match that associated with the username!');
            clearFields();
            return false;
        }
        return true;
    }
};

const oLevelThree = () => {
    let grid = '';
    const cells = document.querySelectorAll(elementStrings.drop)
    const cellsArr = Array.prototype.slice.call(cells);
    cellsArr.forEach(el => {
        if(el.firstChild) {
            grid += `${el.id}${el.firstChild.id}`
            
        }
    });
    const match = state.current.compareGrid(grid);
    if(!match) {
        swal('The current locations of the images do not match those associated with the username!');
        return false;
    }
    return true;
}
;

// Drag and Drop
document.addEventListener('dragover', e => {
    e.preventDefault();
});

document.addEventListener('drop', e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('image').split('.');
    if (e.target.matches(`${elementStrings.drop}, ${elementStrings.drop} *`)) {
        const cell = e.target.closest(`${elementStrings.drop}`);
        if (!cell.firstChild) {
            cell.appendChild(document.getElementById(data[0]));
            document.getElementById(data[1]).innerHTML = '';
        }
    }
});

document.addEventListener('dragstart', e => {
    e.dataTransfer.setData('image', `${e.target.id}.${e.target.closest(`${elementStrings.drop}`).id}`);
});

// Reset all users
elements.remove.addEventListener('click', () => {
    if(state.users) {
        state.users.reset();
        state.users = new Users();
    }

    clear();
})