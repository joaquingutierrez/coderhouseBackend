const updateUser = document.getElementById("updateUserButton")


updateUser.addEventListener("click", () => {
    const userId = document.getElementById("userId").innerText
    const URL = "/api/users/premium/" + userId
    fetch(URL)
    .then((response)=> response.json())
    .then(data => {
        if (data.message === "success") {
            window.location.href = ""
        }
    })
})