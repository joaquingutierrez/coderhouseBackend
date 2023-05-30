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
            }
        })
})

const renderForm = (path) => {
    uploadFiles.innerHTML = `
    <form action="/api/users/${userId}/documents" enctype="multipart/form-data" method="post">
        <div class="form-group">
            <input type="file" class="form-control-file" name="uploaded_file">
            <input type="text" class="form-control" name="path" value=${path}>
            <input type="submit" value="Subir!" class="btn btn-default">
        </div>
    </form>
    `
}

typeOfDocument.addEventListener("change", () => {
    renderForm(typeOfDocument.value)
})

