const buttonRecovery = document.getElementById("recovery")

buttonRecovery.addEventListener("click", () => {
    const email = document.getElementById("email").value
    
    fetch("/api/passwordrecovery", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {email: email}
        )
    })
    .then(() => {alert("Correo enviado")})
})