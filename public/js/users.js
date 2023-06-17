const data = document.getElementById("data")
const userArray = JSON.parse(data.innerText)

const renderUserList = () => {
    userArray.map(user => {
        data.innerHTML += `
        <div>
        <h2>${user.first_name + " " + user.last_name}</h2>
        <h2>${user.rol}</h2>
        <h2>${user.email}</h2>
        <button>Eliminar usuario</button>
        </div>
        `
        
    })
}
data.innerText = ""
renderUserList()