export default class Users {
    constructor() {
        this.users = [];
        this.restore()
    }

    getAllUsers() {
        return this.users
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
        axios.post("http://127.0.0.1:5000/api/getalluser").then(e=>{
            this.users = e.data
        })
    };

    reset() {
        axios.post("http://127.0.0.1:5000/api/resetuser")
    }
}