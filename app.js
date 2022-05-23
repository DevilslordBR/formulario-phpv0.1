// con las constantes estamos recogiendo los input

const formulario = document.getElementById('formulario')
const usuario = document.getElementById('texto-1')
const correo = document.getElementById('texto-2')
const mensaje = document.getElementById('texto-3')
const boton = document.getElementById('boton')

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()

    const data = new FormData(formulario)

    // validar usuario
    if (!data.get('usuario').trim()) {
        console.log('sin texto usuario')
        campoerror(usuario)
        return
    } else {
        campovalido(usuario)
    }

    // validar correo
    if (!data.get('correo').trim()) {
        console.log('sin texto correo')
        campoerror(correo)
        return
    } else {
        campovalido(correo)
    }

    // Validar mensaje
    if (!data.get('mensaje').trim()) {
        console.log('sin texto mensaje')
        campoerror(mensaje)
        return
    } else {
        campovalido(mensaje)
    }

    console.log('campos completados')

    fetch('formulario.php', {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(datos => {
            console.log(datos)
            if (datos.error && datos.campo === 'usuario') {
                campoerror(usuario)
                return
            }
            campovalido(usuario)

            if (datos.error && datos.campo === 'correo') {
                campoerror(correo)
                return
            }
            campovalido(correo)

            if (datos.error && datos.campo === 'mensaje') {
                campoerror(mensaje)
                return
            }
            campovalido(mensaje)

            if (!datos.error) {
                limpiarformulario()
                campovalido(boton)
            }
        })
        .catch(e => console.log(e))

})


const campoerror = (campo) => {
    campo.classList.add('is-invalid')
    campo.classList.remove('is-valid')
}

const campovalido = (campo) => {
    campo.classList.remove('is-invalid')
    campo.classList.add('is-valid')
}

const limpiarformulario = () => {
    console.log('Mensaje enviado con éxito')
    formulario.reset()
    usuario.classList.remove('is-valid')
    correo.classList.remove('is-valid')
    mensaje.classList.remove('is-valid')
}



//console.log('campos completados')

        // fetch('formulario.php', {
        //     method: 'POST',
        //     body: data,
        // })
        //     .then((res) => res.json())
        //     .then((datos) => {
        //         console.log(datos);

        //     })

        // const campoerror = (campo) => {
        //     campo.classList.add('is-invalid')
        //     campo.classList.remove('is-valid')
        // };

        // const campovalido = (campo) => {
        //     campo.classList.remove('is-invalid')
        //     campo.classList.add('is-valid')
        // }