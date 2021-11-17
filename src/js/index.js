import {elements, elementStrings, clear, clearFields, updatePattern, renderOne, renderTwo, renderThree} from './views/base';
import swal from 'sweetalert';
import User from './models/userModel';
import Users from './models/allusers';
import { FileDB } from './models/UserFile';
import {dashboardpage,addFiles} from "./views/dashboard"
import {addfileform} from "./views/Addfiles"
import { getDocId, getPreviewScreen } from './views/PreviewScreen';
// Reloads
const state = {};
window.addEventListener('load', () => {
    state.filedb = new FileDB()
    state.users = new Users();
    if(localStorage.getItem("curr_user")){
        showDashboard()
    }
    //document.body.innerHTML = getPreviewScreen("1cstQmXvVCsdVAze5NmzTfIPt4Y7oE_RR")
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
            showDashboard()
            
        }
    }
});

const oLevelOne = (users) => {

    if(document.querySelector(elementStrings.formOne).checkValidity()) {
        let user = document.querySelector(elementStrings.username).value
        let passw = document.querySelector(elementStrings.password).value
        const found = users.getAllUsers().find(el => el.username === user);
        if(!found) {
            swal('There is no matching account for the username you entered!');
            return false;
        }
        state.current = found;
        Object.setPrototypeOf(state.current, User.prototype);
        const match = state.current.comparePassword(passw);

        if(!match) {
            swal('Username and password do not match!');
            return false;
        }
        localStorage.setItem("curr_user",JSON.stringify(user))
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                                    dashboard                                                */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const showDashboard = ()=>{
    let rows = addFiles(state.filedb.getAllFiles())
    let dashboard = ``
    if (rows.length){
        dashboard = dashboardpage.replace("%_rows%",rows)
    }
    else{
        dashboard = dashboardpage.replace("%_rows%","Nothing to show")
    }
    elements.mainBody.innerHTML = dashboard
    elements.newfile_btn.item(0).addEventListener("click",(e)=>{
        showAddFile()
    })
    console.log(elements)
    setDeletebtn()
    setPreviewbtn()
}

// file delete controll

export const deleteFile = (key)=>{
    state.filedb.removefile(key)
}

const setDeletebtn = ()=>{
    for (let i = 0; i < elements.file_delete_btns.length; i++) {
        elements.file_delete_btns.item(i).addEventListener("click",(e)=>{
            deleteFile(e.path[2].getElementsByTagName("input")[0].value)
            showDashboard()
        })
    }
}

const setPreviewbtn = ()=>{
    console.log("preview btn")
    for (let i = 0; i < elements.preview_btns.length; i++) {
        elements.preview_btns.item(i).addEventListener("click",(e)=>{
            let url = e.path[2].getElementsByTagName("a")[0].href
            let doc_id = getDocId(url)
            let previewscreen = getPreviewScreen(doc_id)
            elements.preview[0].innerHTML = previewscreen
            setPreviewClosebtn()
        })
    }
}
const setPreviewClosebtn = ()=>{
    elements.preview_close_btn[0].addEventListener("click",()=>{
        showDashboard()
    })
}
// addfiles show
export const showAddFile = ()=>{
    elements.mainBody.innerHTML = addfileform
    elements.addFile_btn.item(0).addEventListener("click",(e)=>{
        let data = {}
        data.title = document.getElementsByName("file_name").item(0).value
        data.link = document.getElementsByName("file_link").item(0).value
        data.key = (Number.parseInt((Math.random()*1000).toString())).toString()
        state.filedb.addFile(data)
        showDashboard()
    })
}

