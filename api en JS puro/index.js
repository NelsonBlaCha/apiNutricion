'use sctrict'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Render HTML para ver datos de la API. Es necesario instalar librerias para renderizar HTML desde node: npm i -S express-handlerbars */
const hbs = require('express-handlebars');
app.engine('.hbs', hbs.engine({
	defaultLayout: 'default',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.get('/login', (req, res) => {
	res.render('login');
})
app.get('/', (req, res) => {
	res.render('home');
})

/* GET */
app.get('/api/v1/alimentos', (req, res) => {
	const funcion = require('./funciones/peticionesGET');
	const datos = funcion.obtenerTodosDatos();
	res.status(200).send(datos);
})

app.get('/api/v1/alimentos/lista', (req, res) => {
	const funcion = require('./funciones/peticionesGET');
	const alimentos = funcion.listaAlimentos();
	res.status(200).send(alimentos);
})

app.get('/api/v1/alimentos/id=:productId', (req, res) => {
	const funcion = require('./funciones/peticionesGET');
	const datos = funcion.obtenerDatosPorID(req.params.productId);
	if (datos) {
		res.status(200).send(datos);
	} else {
		res.status(404).send({ message: "No encontrado" });
	}
})

app.get('/api/v1/alimentos/nombre=:nombre', (req, res) => {
	const funcion = require('./funciones/peticionesGET');
	const datos = funcion.obtenerDatosPorNombre(req.params.nombre.toLocaleLowerCase());
	if (datos) {
		res.status(200).send(datos);
	} else {
		res.status(404).send({ message: "No encontrado" });
	}
})

app.get('/api/v1/alimentos/mayor/:caracteristica', (req, res) => {
	const funcion = require('./funciones/peticionesGET');
	const datos = funcion.obtenerMayor(req.params.caracteristica);
	if (datos) {
		res.status(200).send(datos);
	} else {
		res.status(404).send({ message: "No encontrado" });
	}
})

app.get('/api/v1/alimentos/menor/:caracteristica', (req, res) => {
	const funcion = require('./funciones/peticionesGET');
	const datos = funcion.obtenerMenor(req.params.caracteristica);
	if (datos) {
		res.status(200).send(datos);
	} else {
		res.status(404).send({ message: "No encontrado" });
	}
})

/* POST */
// app.post('/api/v1/alimentos', (req, res) => {
// 	/* header POSTMAN: Content-Type application/json */
// 	const funcion = require('./funciones/peticionesPOST');
// 	const guardado = funcion.guardarAlimentoNuevo(req.body);
// 	if (guardado) {
// 		res.status(200).send(req.body);
// 	} else {
// 		res.status(404).send({ message: "No se ha podido guardar" });
// 	}
// })

/* PUT */
// app.put('/api/v1/alimentos', (req, res) => {
// 	const funcion = require('./funciones/peticionesPUT');
// 	const modificado = funcion.modificarAlimento(req.body);
// 	if (modificado) {
// 		res.status(200).send({ message: "Alimento modificado correctamente" });
// 	} else {
// 		res.status(404).send({ message: "No se ha podido modificar" });
// 	}
// })

/* DELETE */
// app.delete('/api/v1/alimentos/id=:productId', (req, res) => {
// 	const funcion = require('./funciones/peticionesDELETE');
// 	const eliminado = funcion.eliminarAlimentoPorID(req.params.productId);
// 	if (eliminado) {
// 		res.status(200).send({ message: "Alimento borrado correctamente" });
// 	} else {
// 		res.status(404).send({ message: "No se ha podido borrar" });
// 	}
// })

/* LISTENER */
app.listen(port, () => {
	console.log(`API REST corriendo en http://localhost:${port}`);
})