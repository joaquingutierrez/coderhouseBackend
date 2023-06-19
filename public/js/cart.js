const buyButton = document.getElementById("buyButton")

buyButton.addEventListener("click", () => {
    fetch("/api/payments/payment-intents",{
        method: "POST"
    })
    .then(res => res.json())
    .then(data => {
        window.location.href = data.payload.url
    })

    /* const cId = buyButton.getAttribute("ref")
    const rute = cId + "/purchase"
    fetch(rute, { method: "POST" })
        .then(res => res.json())
        .then(data => {
            if (data.message === "success") {
                const code = data.ticket.code
                window.location.href = "/api/ticket/" + code
            }
        }) */
})
