


let users = [];
let id = 0;


function getUser(id) {
 let foundUser = users.find((user)=>{
    return user.id === id;
 });
 return foundUser;
}

function addUser(user) {
    const userValid = validateUser(user);
    if (userValid.valid === false) {
        throw new Error(userValid.message);
    }
    user.id = id++
    users.push(user);
    return users;
}

function editUser(id, obj) {
    let foundUser = users.find((user)=>{
        return user.id === id;
     });

     foundUser = {...foundUser, ...obj}
     return foundUser;
}

function deleteUser(id) {
    let newUsers = users.filter((user)=>{
        return user.id !== id;

     });
     users = newUsers
     return users;

}

function validateUser(user) {
    if (!user.name) {
        return {
            valid: false,
            message: "user must have a name"
        }
    }

    if (!user.email) {
        return {
            valid: false,
            message: "user must have an email"
        }
    }

    if (!user.password) {
        return {
            valid: false,
            message: "user must have a password"
        }
    }
    return user;
}