const loginButton = document.getElementById("login")

loginButton.addEventListener("click", () => {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if (!email || !password) {
        return alert("Todos los campos son obligatorios")
    } else {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "success") {
                    window.location.href = "/api/products"
                } else {
                    alert("Usuario no encontrado o contraseña incorrecta")
                }
            })
            .catch((err) => console.log(err))
    }
})