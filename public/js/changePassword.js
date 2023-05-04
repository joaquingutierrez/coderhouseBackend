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
})