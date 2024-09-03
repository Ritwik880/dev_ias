export const isLoggedIn = () =>{
    let data = localStorage.getItem('user');

    if(data != null){
        return true;
    }
    else{
        return false;
    }
}

export const doLogin = (data, next) =>{
    localStorage.setItem('user', JSON.stringify(data))
    next()
}

export const doLogout = (next) =>{
    localStorage.removeItem('user')
    next()
}

export const getCurrentUserDetail = () =>{
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem('user'));
    }
    else{
        return undefined;
    }
}