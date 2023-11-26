function Validation(values){
    let error = {} 
    const email_pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    const username_pattern = /[A-Za-z0-9_]{1,15}/
    const designation_pattern = /[A-Za-z]{3}/
    const name_pattern = /[A-Za-z]{3}/

    if(values.name === ""){
        error.name = "Name should not be empty"
    }
    else if(!name_pattern.test(values.name)) {
        error.name = "Name didn't match"
    }
    else {
        error.name = ""
    }

    if(values.designation === ""){
        error.designation = "Designation should not be empty"
    }
    else if(!designation_pattern.test(values.designation)) {
        error.designation = "Designation didn't match"
    }
    else {
        error.designation = ""
    }

    if(values.username === ""){
        error.username = "Username should not be empty"
    }
    else if(!username_pattern.test(values.username)) {
        error.username = "Username didn't match"
    }
    else {
        error.username = ""
    }

    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    }else {
        error.email = ""
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