document.getElementById("loginBtn").addEventListener("click", ()=>{
    const userName = document.getElementById("inputUsername");
    const userNameValue = userName.value.trim();
    const userPassword = document.getElementById("inputPassword");
    const userPasswordValue = userPassword.value.trim();

    if(userNameValue === "admin" && userPasswordValue === "admin123"){
        alert("LogIn Success");
        window.location.replace('./Home.html')
         ;
    }else{
        alert("Invalid Username Or Password")
    }
})