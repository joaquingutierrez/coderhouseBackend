const data = document.getElementById("data")
const userArray = JSON.parse(data.innerText)

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
        <td><button>Eliminar usuario</button></td>
    </tr>
    `
    })

    acum += `
    </table>
    `

    data.innerHTML = acum
}


renderUserList()