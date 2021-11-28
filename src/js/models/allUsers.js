export default class Users {
    constructor() {
        this.users = [];
        this.restore()
    }

    getAllUsers() {
        return this.users;
    }; 
    
    addUser(user) {
        this.users.push(user);
        return axios.post("http://127.0.0.1:5000/api/adduser",user).then(e=>{
            let message = e.data.message
            return message
        })
        //localStorage.setItem('users', JSON.stringify(this.users));
    };
    
    restore() {
        const storage = JSON.parse(localStorage.getItem('users'));
        if(storage) {
            this.users = storage;
        }
    };

    reset() {
        if(JSON.parse(localStorage.getItem('users'))) {
            localStorage.removeItem('users');
        }
    }
}