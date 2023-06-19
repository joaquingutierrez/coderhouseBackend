const dataJSON = document.getElementById("data").innerText
const renderInfo = document.getElementById("info")

const data = JSON.parse(dataJSON)

const render = () => {
    let acum = ""
    acum += `
        <h2>id: ${data._id}</h2>
        <h2>Code: ${data.code}</h2>
        <h2>Fecha: ${data.purchase_datetime}</h2>
        <h2>Total: ${data.amount}</h2>
        <h2>Comprador: ${data.purchaser}</h2>
    `
    return acum
}

const myDataRender = render()

renderInfo.innerHTML = myDataRender