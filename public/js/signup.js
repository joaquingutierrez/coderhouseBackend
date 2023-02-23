const signupButton = document.getElementById("signup")

signupButton.addEventListener("click", () => {
    const first_name = document.getElementById("first_name").value
    const last_name = document.getElementById("last_name").value
    const email = document.getElementById("email").value
    const age = document.getElementById("age").value
    const password = document.getElementById("password").value

    if (!first_name || !last_name || !email || !age || !password) {
        return alert("Todos los campos son obligatorios")
    } else {
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                age,
                password
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }
})