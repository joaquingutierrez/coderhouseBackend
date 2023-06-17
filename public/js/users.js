const data = document.getElementById("data")
const userArray = JSON.parse(data.innerText)
const deleteInactiveUsersButton = document.getElementById("deleteInactiveUsersButton")

const renderUserList = () => {
    let acum = `
    <table id="table">
    <tr>
    <th>
    Nombre y Apellido
        </th>
        <th>
        Rol
        </th>
        <th>
        Email
        </th>
        <th>
        Eliminar
        </th>
        </tr>
        `

    userArray.map(user => {
        acum += `
            <tr>
            <td>${user.first_name + " " + (user.last_name !== "***" ? user.last_name : "")}</td>
            <td>${user.rol}</td>
            <td>${user.email}</td>
            <td><button class="deleteUser" ref=${user.email}>Eliminar usuario</button></td>
            </tr>
            `
    })

    acum += `
    </table>
    `

    data.innerHTML = acum
    deleteUser()
}

const deleteUser = () => {
    const deleteUserButton = document.getElementsByClassName("deleteUser")
    for (let i = 0; i < deleteUserButton.length; i++) {
        deleteUserButton[i].addEventListener("click", (e) => {
            const email = e.target.getAttribute("ref")
            fetch("/api/users/" + email, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "success") {
                        window.location.href = ""
                    }
                })
        })
    }
}

renderUserList()

deleteInactiveUsersButton.addEventListener("click", () => {
    fetch("/api/users", {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "success") {
                window.location.href = ""
            }
        })
})