import {elements, elementStrings, clear, clearFields, updatePattern, renderOne, renderTwo, renderThree,renderFour} from './views/base';
import swal from 'sweetalert';
import User from './models/userModel';
import Users from './models/allusers';
import { FileDB } from './models/UserFile';
import {dashboardpage,addFiles} from "./views/dashboard"
import {addfileform} from "./views/Addfiles"
import { getDocId, getPreviewScreen } from './views/PreviewScreen';
// Reloads
const state = {error:0};
window.addEventListener('load', () => {
    state.filedb = new FileDB()
    state.users = new Users();
    
    try{
        state.current = JSON.parse(localStorage.getItem("curr_user"))
    }
    catch(e){
        state.current = null
    }
    if(state.current){
        showDashboard()
    }
    
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
        console.log(e)
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
        renderFour("register")
        let button = document.querySelector(elementStrings.nextFR)
        console.log(button)
        button.addEventListener("click",(e)=>{
            let answer = document.querySelector(elementStrings.securityquest)
            console.log(answer.value)
            if(answer.value.length == 0){
                swal("Please enter your anwser")
            }
            else{
                state.current.addAnswer(answer.value)
                console.log(state.current)
                let message = state.users.addUser(state.current);
                message.then(e=>{
                    if(e == "success"){
                        swal('Registration successful!');
                        clear()
                    }
                    else{
                        swal('Registration Fail!');
                        clear()
                    }
                })
            }
        })
         
        
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
            state.error = 0
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
                state.error = 0
                renderThree('login');
            }
        }
    }

    //3. Grid
    if(e.target.matches(elementStrings.nextHL)) {
        const graphicMatch = oLevelThree();
        if(graphicMatch) {
            clear();
            localStorage.setItem("curr_user",JSON.stringify(state.current))
            state.error = 0
            showDashboard()
            // if(state.error >= 3){
            //     renderFour("login")
            //     oLvelFour()
            // }
            // else{
            //     clear();
            //     localStorage.setItem("curr_user",JSON.stringify(state.current))
            //     showDashboard()
            // }
            
        }
    }
});

const oLevelOne = (users) => {

    if(document.querySelector(elementStrings.formOne).checkValidity()) {
        let user = document.querySelector(elementStrings.username).value
        let passw = document.querySelector(elementStrings.password).value
        let user_list = users.getAllUsers()
        console.log(user_list)
        const found = user_list.find(el => el.username === user);
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
        return true;
    }
};

const oLevelTwo = () => {
    
    if(document.querySelector(elementStrings.formTwo).checkValidity()) {
        const pattern = document.querySelector(elementStrings.pattern).value;
        const match = state.current.comparePattern(pattern);
        if(!match) {
            swal('The color pattern you entered does not match that associated with the username!');
            state.error += 1
            console.log(state.error)
            if(state.error >=3){
                renderFour("login")
                oLvelFour()
            }
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
        state.error += 1
        if(state.error >=3){
            renderFour("login")
            oLvelFour()
        }
        return false;
    }
    return true;
}
;

const oLvelFour = ()=>{
    let loginbtn = document.querySelector("#login--four")
    console.log(loginbtn)
    loginbtn.addEventListener("click",(e)=>{
        let answer = document.querySelector(elementStrings.securityquest)
        let check = state.current.compareAnswer(answer.value)
        if(check){
            clear();
            localStorage.setItem("curr_user",JSON.stringify(state.current))
            state.error = 0
            showDashboard()
        }
        else{
            swal("Wrong answer")
        }
    })
}
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
        swal("Reset all User")
    }
 clear();
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                                    dashboard                                                */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const showDashboard = ()=>{
    
    state.filedb.getAllFiles(state.current).then(e=>{
        let rows = addFiles(e)
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
        setDeletebtn()
        setPreviewbtn()
        setaddFolder()
        setPrivacybtn()
        setLogoutBtn()
    })
    
}

// file delete control

export const deleteFile = (key)=>{
    state.filedb.removefile(key).then(()=>{
        showDashboard()
    })
}

const setDeletebtn = ()=>{
    for (let i = 0; i < elements.file_delete_btns.length; i++) {
        elements.file_delete_btns.item(i).addEventListener("click",(e)=>{
            deleteFile(e.path[2].getElementsByTagName("input")[0].value)
        })
    }
}



const setPreviewbtn = ()=>{
    for (let i = 0; i < elements.preview_btns.length; i++) {
        elements.preview_btns.item(i).addEventListener("click",(e)=>{
            let fileid = e.path[2].getElementsByTagName("input")[0].value
            axios.post("http://127.0.0.1:5000/api/preview",{fileid:fileid}).then(e=>{
                console.log(e);
                let previewscreen = getPreviewScreen(e.data)
                elements.preview[0].innerHTML = previewscreen
                setPreviewClosebtn()
            })
        })
    }
}
const setPrivacybtn = ()=>{
    for (let i = 0; i < elements.privacy_btns.length; i++) {
        elements.privacy_btns.item(i).addEventListener("click",(e)=>{
            let fileid = e.path[2].getElementsByTagName("input")[0].value
            axios.post("http://127.0.0.1:5000/api/privacy",{file_id:fileid}).then(e=>{
                showDashboard()
            })
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
        state.filedb.addFile(state.current)
        showDashboard()
    })
}
const setLogoutBtn = ()=>{
    elements.logout_btn.item(0).addEventListener("click",e=>{
        localStorage.removeItem("curr_user")
        window.location.reload()
        
    })
}
const setaddFolder = ()=>{
    elements.newfolder_btn.item(0).addEventListener("click",(e)=>{
        state.filedb.addFolder(state.current)
    })
}

