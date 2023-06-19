const buyButton = document.getElementById("buyButton")

buyButton.addEventListener("click", () => {
    fetch("/api/payments/payment-intents",{
        method: "POST"
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "success") {
            window.location.href = data.payload.url
        } else {
            alert("No hay stock de al menos uno de los productos")
        }
    })
})
