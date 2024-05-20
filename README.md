# Proyecto 5: Demostración de proyecto

Has llegado a tu último proyecto en el bootcamp.

Es por ello que, para asimilar y fortalecer todos los conocimientos aprendidos, estarás realizando una aplicación `MERN Stack`.

Esta demo te permitirá tener una mayor idea de todas las características que podrás incluir en tu presentación final.

Puedes utilizar todo el código para inspirarte o, modificarlo si es tu gusto.


## Demo

Puedes ver el demo [dando click en este enlace.](https://boot-demos-05-2023.netlify.app/)

## Tecnologías incorporadas

- create-react-app (React.js)
- Tailwind CSS (Manejo de estilos)
- Express.js (Node)
- MongoDB

## Instalación

Para realizar la instalación de este proyecto, es necesario realizar `clone` o `fork` de este repositorio.

Posteriormente, abrir dos terminales. El primero será para tratar `create-react-app` y el otro para `express.js`.

`Terminal 1`
```shell
$ cd client
$ npm install
$ npm run start
```

`Terminal 2`
```shell
$ cd server
$ npm install
$ npm run dev
```


Una vez hecho esto en cada uno, deberás crear las variables de entorno en cada carpeta.

`./client/.env`

```
REACT_APP_BACKEND_URL="http://localhost:3005"
REACT_APP_MERCADO_PAGO_PUBLIC_KEY='TU-NÚMERO-DE-MERCADOPAGO-PARA-ACTIVAR-PAGOS'
```


`./server/.env`

```
PORT=3005
MONGODB_URI='mongodb://localhost:27017/proyecto-final-guitarras'
SECRET=PALABRASECRETADEBESCAMBIARLA
PROD_ACCESS_TOKEN='TU-NÚMERO-DE-MERCADOPAGO-PARA-ACTIVAR-PAGOS'
```


> En caso de que no quieras incluir el módulo de comercio electrónico, puedes omitir las llaves de Mercado Pago. De lo contrario, crea una cuenta en [MercadoPago Developers](https://www.mercadopago.com.mx/developers/es/guides) para obtener tu "API Key". Es gratis y rápido.


Es importante recordar que necesitarás incluir una base de datos con MongoDB, tal como lo viste en tu programa.
