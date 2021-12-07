import crypto from 'crypto';

export default class User {
    constructor() {
    }

    addUsernameAndPassword(username, password, allUsers) {
        console.log(allUsers)
        const a = allUsers.map(el => {
            if(el.username === username) {
                return false;
            }
        });
        
        if(a.includes(false)) {
            return false;
        }

        this.username = username;
        this.password = this.encrypt(password);
        return true;
    }

    addPattern(pattern) {
        this.pattern = this.encrypt(pattern);
    }

    addGrid(grid) {
        this.grid = this.encrypt(grid);
    }

    addAnswer(answer) {
        this.answer = this.encrypt(answer);
    }
    comparePassword(password) {
        return this.textpassword === this.encrypt(password);
    }

    comparePattern(pattern) {
        return this.colorpassword === this.encrypt(pattern);
    }

    compareGrid(grid) {
        return this.gridpassword === this.encrypt(grid);
    }
    compareAnswer(answer) {
        return this.answer === this.encrypt(answer);
    }
    encrypt(text) {
        return crypto.createHash('sha256').update(text).digest('hex');
    }
}