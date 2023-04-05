const buyButton = document.getElementById("buyButton")

buyButton.addEventListener("click", () => {
    const cId = buyButton.getAttribute("ref")
    const rute = cId + "/purchase"
    fetch(rute, {method:"POST"})
    .then(res => res.json())
    .then(data => {
        if (data.message === "success") {
            const code = data.ticket.code
            window.location.href = "/api/ticket/" + code
        }
    })
})