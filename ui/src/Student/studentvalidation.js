function Validation(values){
    let error = {} 
    const username_pattern = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if(values.username === ""){
        error.username = "Username should not be empty"
    }
    else if(!username_pattern.test(values.username)) {
        error.username = "Usrname didn't match"
    }else {
        error.username = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters!"
    }else {
        error.password = ""
    }
    return error;
}

export default Validation;