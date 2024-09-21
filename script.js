
document.getElementById('formAgregarProducto').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagenes = document.getElementById('imagenes').files;

    // Verificar si el nombre ya existe (esto normalmente sería una llamada a la base de datos)
    const nombreExistente = await verificarNombreExistente(nombre);
    
    if (nombreExistente) {
        document.getElementById('errorNombre').style.display = 'block';
        return;
    }

    // Crear objeto FormData para enviar al servidor
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    for (let i = 0; i < imagenes.length; i++) {
        formData.append('imagenes[]', imagenes[i]);
    }

    // Enviar el formulario al servidor
    const response = await fetch('guardarProd.php', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Producto agregado con éxito');
        // Redirigir o actualizar la lista de productos
    } else {
        alert('Error al agregar el producto');
    }
});

// Simulación de la verificación del nombre (esto debería conectarse a la base de datos)
async function verificarNombreExistente(nombre) {
    // Aquí deberías realizar una llamada al servidor para verificar si el nombre ya existe.
    // Este es un ejemplo estático para fines de demostración.
    const productosExistentes = ['Producto 1', 'Producto 2'];
    return productosExistentes.includes(nombre);
}
