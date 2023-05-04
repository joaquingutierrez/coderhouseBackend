const confirmPasswordButton = document.getElementById("confirmPassword")

confirmPasswordButton.addEventListener("click", () => {
    const newPassword = document.getElementById("changePassword").value
    const link = window.location.href
    fetch(link, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            { password: newPassword }
        )
    })
    .then(data => data.text())
    .then(data => {
        if (data === "success") {
            alert("Contraseña cambiada con éxito")
            window.location.href = "/login"
        } else if (data === "time out") {
            alert("Se agotó el tiempo")
            window.location.href = "/login"
        } else if (data === "la contraseña es igual a la anterior") {
            alert("La contraseña es igual a la anterior, por favor, elija otra")
        }
    })
})