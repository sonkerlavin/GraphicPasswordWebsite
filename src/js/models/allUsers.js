export default class Users {
    constructor() {
        this.users = [];
    }

    getAllUsers() {
        return this.users;
    }; 
    
    addUser(user) {
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
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