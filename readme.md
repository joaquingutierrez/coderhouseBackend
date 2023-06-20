# Backend de un e-commerce

## Variables de entorno

Se trabaja con variables de entorno, para que el proyecto funcione se deben incorporar las siguientes variables de entorno en un archivo .env

PORT=***

USER_MONGO=***

PASSWORD_MONGO=***

DB_MONGO=***

GITHUB_CLIENT_ID=***

GITHUB_APP_ID=***

GITHUB_CLIENT_SECRET=***

GITHUB_CALLBACKURL=***

URL=***

ADMIN_EMAIL=***

ADMIN_PASSWORD=***

PERSISTENCE=***

ENVIRONMENT=***

NODEMAILER_EMAIL=***

NODEMAILER_EMAIL_PASSWORD=***

STRIPE_PRIVATE_KEY=***

La variable PERSISTENCE tiene dos posibles valores "MONGO" y "FS".
La variable ENVIRONMENT tiene dos posibles valores "development" y "production".

## Descripcion de las vistas de usuario

La primer pantalla de la página es la de inicio de sesión, si no posee una, puede iniciar sesión a través de una cuenta de GitHub o crear una cuenta, para lo cual se le solicitaran varios datos.

Si se accede con una cuenta "ADMIN" podrá tener acceso a algunas funciones que los usuarios normales no están autorizados, estas funciones son:
Agregar productos (desde "/api/products" hay una serie de inputs para hacerlo),
Modificar productos (se debe acceder al apartado "Más detalles" del producto que se quiera modificar, una vez aquí encontrará varios input para modificar la propiedad o las propiedades que desee),
ver todos los carritos creados (para esto se debe acceder al perfil e ir a donde dice ver mi carrito),
eliminar usuarios (a teves de la ruta /api/users)
Por otra parte, el usuario ADMIN no puede acceder al chat ni agregar productos al carrito.

Si se accede con una cuenta de usuario normal, se tiene acceso a lo siguiente:
Ver el catálogo de productos y agregar al carrito,
comprar los productos que estén en el carrito,
ver mi perfil,
acceder al chat grupal

Si un usuario normal sube tres ducumentos (identificacion, comprobante de domicilio y comprobante de estado de la cuenta) puede subir su rango a PREMIUM, en este rango los usuarios pueden publicar productos (un usuario PREMIUM no puede agregar al carrito un producto creado por él mismo). El usuario PREMIUM si lo desea puede volver a ser un usuario normal.

Los productos se agregan de a uno al carrito, y se pueden eliminar si se accede a la vista del mismo. Si no hay stock de un producto, no se puede continuar con la compra.

La página cuenta con un chat en tiempo real donde pueden comunicarse con otros usuarios o usuarios premium.