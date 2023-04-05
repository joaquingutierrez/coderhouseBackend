Backend de un e-commerce

Se trabaja con variables de entorno, para que el proyecto funcione se deben incorporar las siguientes variables de entorno en un archivo .env

USER_MONGO=
PASSWORD_MONGO=
DB_MONGO=

GITHUB_CLIENT_ID=
GITHUB_APP_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACKURL=

ADMIN_EMAIL=
ADMIN_PASSWORD=

PERSISTENCE=

La variable PERSISTENCE tiene dos posibles valores "MONGO" y "FS"

La primer pantalla de la página es la de inicio de sesión, si no posee una, puede iniciar sesión a través de una cuenta de GitHub o crear una cuenta, para lo cual se le solicitaran varios datos.

Si se accede con una cuenta "ADMIN" podrá tener acceso a algunas funciones que los usuarios normales no están autorizados, estas funciones son:
Agregar productos (desde "/api/products" hay una serie de inputs para hacerlo),
Modificar productos (se debe acceder al apartado "Más detalles" del producto que se quiera modificar, una vez aquí encontrará varios input para modificar la propiedad o las propiedades que desee),
ver todos los carritos creados (para esto se debe acceder al perfil e ir a donde dice ver mi carrito)
Por otra parte, el usuario ADMIN no puede acceder al chat ni agregar productos al carrito.

Si se accede con una cuenta de usuario normal, se tiene acceso a lo siguiente:
Ver el catálogo de productos y agregar al carrito,
comprar los productos que estén en el carrito,
ver mi perfil,
acceder al chat grupal