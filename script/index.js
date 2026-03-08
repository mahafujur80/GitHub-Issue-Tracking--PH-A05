document.getElementById("loginBtn").addEventListener("click", ()=>{
    const userName = document.getElementById("inputUsername");
    const userNameValue = userName.value.trim();
    const userPassword = document.getElementById("inputPassword");
    const userPasswordValue = userPassword.value.trim();

    if(userNameValue === "admin" && userPasswordValue === "admin123"){
        window.location.assign('./home.html')
         ;
    }else{
        alert("Invalid Username Or Password")
    }
})