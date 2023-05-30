const updateUser = document.getElementById("updateUserButton")
const typeOfDocument = document.getElementById("typeOfDocument")
const uploadFiles = document.getElementById("uploadFiles")
const userId = document.getElementById("userId").innerText

updateUser.addEventListener("click", () => {
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

