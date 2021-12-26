const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const dbUsers = `${__dirname}/../DataBase/users.json`;

class modelUser {
    constructor(link) {
        this.userLink = link;
    }

    allData() {
        const { data } = JSON.parse(fs.readFileSync(this.userLink));
        return data
    }

    findByEmail(email) {
        const data = this.allData();
        if (email) {
            const user = data.find(user => user.email === email);
            if(user) {
                return user
            }
            else {
                console.log('Such user is not find');
            }
        }
    }

    findById(id) {
        const data = this.allData();
        const user = data.find((user) => user.id === id);
        if(user) {
            return user
        }
        else {
            console.log('Such user is not find');
        }
    }

    async NewUser(userData) {
        const {name, lastname, email, password} = userData;
        
        if(name && lastname && email && password) {
            const data = this.allData();
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = {
                id: uuidv4(),
                name,
                lastname,
                email,
                password: hashPassword
            }

            data.push(newUser);

            const updateUser = JSON.stringify({data});

            fs.writeFile(this.userLink, updateUser, (e) => {
                if (e) {
                    console.log(e);
                }
                else{
                    console.log('Push in dataBase successfull!');
                }
            })

            return newUser;
        }
    }
}

module.exports = new modelUser(dbUsers);