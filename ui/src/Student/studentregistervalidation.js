function Validation(values){
    let error = {} 
    const email_pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    const username_pattern = /[A-Za-z0-9_]{1,15}/
    const name_pattern = /[A-Za-z]{3}/
    const year_level_pattern = /^[0-9\b]+$/
    const course_pattern = /[A-Za-z]{3}/
    const department_pattern = /[A-Za-z]{3}/

    if(values.department === ""){
        error.department = "Department Level should not be empty"
    }
    else if(!department_pattern.test(values.department)) {
        error.department = "Department Level didn't match"
    }
    else {
        error.department = ""
    }

    if(values.course === ""){
        error.course = "Course Level should not be empty"
    }
    else if(!course_pattern.test(values.course)) {
        error.course = "Course Level didn't match"
    }
    else {
        error.course = ""
    }
    
    if(values.year_level === ""){
        error.year_level = "Year Level should not be empty"
    }
    else if(!year_level_pattern.test(values.year_level)) {
        error.year_level = "Year Level didn't match"
    }
    else {
        error.year_level = ""
    }
    
    if(values.name === ""){
        error.name = "Name should not be empty"
    }
    else if(!name_pattern.test(values.name)) {
        error.name = "Name didn't match"
    }
    else {
        error.name = ""
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