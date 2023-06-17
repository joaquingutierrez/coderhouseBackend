const typeOfDocument = document.getElementById("typeOfDocument")
const uploadFiles = document.getElementById("uploadFiles")
const userId = document.getElementById("userId").innerText
const userRol = document.getElementById("userRol").innerText
const utilButton = document.getElementById("utilButton")

const renderUtilsButton = () => {
    switch (userRol) {
        case "USER":
            utilButton.innerHTML = `
            <a id="updateUserButton"><button>Actualizar usuario a PREMIUM</button></a>

            `
            break
        case "PREMIUM":
            utilButton.innerHTML = `
            <a id="updateUserButton"><button>Actualizar usuario a USER</button></a>
            `
            break
        case "ADMIN":
            utilButton.innerHTML = `
            <a id="adminButton" href="/api/users"><button>Ver lista de usuarios</button></a>
            `
            break
        default:
            break
    }
    if (userRol !== "ADMIN") {
        const updateUserButton = document.getElementById("updateUserButton")
        updateUserButton.addEventListener("click", () => {
            const URL = "/api/users/premium/" + userId
            fetch(URL)
                .then((response) => response.json())
                .then(data => {
                    if (data.message === "success") {
                        window.location.href = ""
                    } else {
                        alert("Error, no se puede pasar a premium porque falta documentacion")
                    }
                })
        })
    }
}
renderUtilsButton()

if (userRol !== "USER") {
    const uploadFiles = document.getElementById("uploadFiles")
    uploadFiles.style.display = "none";
}

const renderForm = (folder) => {
    const path = `/api/users/${userId}/documents`
    uploadFiles.innerHTML = `
        <form action="${path}" enctype="multipart/form-data" method="post">
            <div class="form-group">
                <input type="file" class="form-control-file" name="uploaded_file">
                <input style="display: none" type="text" class="form-control" name="path" value=${folder}>
                <input type="submit" value="Subir!" class="btn btn-default">
            </div>
        </form>
        `
}

typeOfDocument.addEventListener("change", () => {
    renderForm(typeOfDocument.value)
})


if (userRol === "ADMIN") {
    const uploadFiles = document.getElementById("uploadFiles")
    uploadFiles.innerHTML = `
        <a href="/api/users"><button>Administrar usuarios</button></a>
    `
}
