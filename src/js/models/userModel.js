import crypto from 'crypto';

export default class User {
    constructor() {
    }

    addUsernameAndPassword(username, password, allUsers) {
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

    comparePassword(password) {
        return this.password === this.encrypt(password);
    }

    comparePattern(pattern) {
        return this.pattern === this.encrypt(pattern);
    }

    compareGrid(grid) {
        return this.grid === this.encrypt(grid);
    }

    encrypt(text) {
        return crypto.createHash('sha256').update(text).digest('hex');
    }
}