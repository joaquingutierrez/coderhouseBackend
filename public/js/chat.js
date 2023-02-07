const socket = io()
let chatInput = document.getElementById("chatInput")
let user

Swal.fire({
    title: "Inicia sesion!",
    text: "Ingresa tu nombre de usuario",
    input: "text",
    confirmButtonText: "Aceptar",
    allowOutsideClick: false,
    inputValidator: (value) => {
        if (!value) {
            return "Debe ingresar un nombre de usuario";
        }
    },
}).then((result) => {
    if (result.value) {
        user = result.value;
        socket.emit("new-user", { user: user, id: socket.id });
    }
});

chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (chatInput.value.trim().length > 0) {
            socket.emit("message", {
                user: user,
                message: chatInput.value
            })
        }
        chatInput.value = ""
    }
})

socket.on("messagesLogs", (data) => {
    let log = document.getElementById("chatLogs")
    let message = ""

    data.forEach((elem) => {
        message += `
            <div> 
                <h5>${elem.user}</h5>
                <p>${elem.message}</p>
            </div>
        `
    })
    log.innerHTML = message
})

socket.on("new-user-connected", (data) => {
    Swal.fire({
        text: `${data.user} se ha conectado al chat`,
        toast: true,
        position: "top-end",
    });
})