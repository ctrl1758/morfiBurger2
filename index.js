const express = require("express");
const { v4: uuidv4 } = require('uuid');
const{db}=require('./firebase.js');
const{reporte2}=require('./whatssap.js');
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const port= process.env.PORT || 8080
const axios= require('axios')
require('ejs')
// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "APP_USR-7925082022583826-120120-3b449fd48fa3d8d65cf80b7e8d24d91c-86743850",
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const path= require('path')
app.use(express.static("public"));
app.set('view engine', 'ejs')
/* app.set('views',path.join(__dirname,'views')) */

app.get("/", function (req, res) {
	res.status(200).sendFile("index.html");
}); 

app.get("/pago_eft", async (req, res) => {
	const fecha_pedido= new Date()
	
	let orden_id=req.query.orden_id
	

	const  refOrdenes= await db.collection('Ordenes')
	const refOrden = await refOrdenes.doc(orden_id);
	const doc = await refOrden.get();

	if (!doc.exists) {
		console.log('No such document!');
		} else {
			const orden_update = await refOrden.update({
				metodo_pago:'APP-efectivo',
				fecha_pedido:fecha_pedido.getTime(),
			});
			
		const doc_update= await refOrden.get()
		const orden=doc_update.data()
		res.status(200).send(orden);

		}
})

app.post("/create_preference", async (req, res) => {
	const id=uuidv4();
	array= req.body
	console.log(array)
	let direccion=array[0].entrega
	let sucursal=array[0].sucursal
	let nombre=array[0].nombre
	let telefono=array[0].telefono
	console.log(nombre,telefono)
	
	const orden={
		id:id,
		carrito:array,
		nombre:nombre,
		telefono:telefono,
		metodo_pago:'APP',
		estado_pago:'pendiente',
		estado_pago_detalle:'NO acreditado',
		pago_id:'',
		fecha_pedido: 0,
		fecha_aprobado:0,
		email:'',
		sucursal:sucursal,
		domicilio:direccion,
	}
	await db.collection('Ordenes').doc(`${id}`).set(orden);
	let preference = {
		items: [],
		back_urls: {
			"success": `https://morfi-burger.fly.dev/pantallafin`,
			"failure": "https://morfi-burger.fly.dev/pantallafin",
			"pending": "https://morfi-burger.fly.dev/pantallafin"
		},
		auto_return: "approved",
		external_reference: `${id}`,
		/* notification_url: "https://smartmenu.fly.dev/notifications", */
		statement_descriptor: "Morfi Burger",
	};
	array.forEach(function(item, index) {
		let producto= {
			title: item.nombre,
			unit_price:Number(item.precio),
			quantity:1,
			id:item.id
		}
		preference.items.push(producto)
	});
	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id,
				link: response.body.init_point,
				id_orden:id
			});
		}).catch(function (error) {
			console.log(error);
		});
});
function reporte(orden,fecha,pago_id){
                let metodo_pago=orden.metodo_pago

                let pruebita=`Nuevo%20Pedido%20SmartMenu%20%0A
            Metodo%20De%20Pago:%20${metodo_pago.replace(' ','%20')}%0A
            Turno:%20${fecha}%0A
			Pago_id(mp):%20${pago_id}%0A
            Pedido:%0A${pizzasxbordes(orden)}`
                let enlace=`https://api.whatsapp.com/send?phone=+5491160235647&text=${pruebita}`
				return enlace
				
            }

function pizzasxbordes(orden){
	let k=``
	let p=0
	for (let i=0; i < orden.carrito.length;i++){
		let pizza=orden.carrito[i].nombre.replace(/\s+/g,'%20');
		let borde=orden.carrito[i].bordes
		let pesto=orden.carrito[i].pesto
		p+=orden.carrito[i].precio
		k += `%0A1x${pizza}%20%7CBordes:%20${borde.replace(' ', '%20')}%7C%20%7CPesto:%20${pesto.replace(' ', '%20')}%7C%0A`
	}
	k +=`%2ATOTAL%3A%24${p}%2A`
	return k
	}

app.post('/notifications', async function (req, res) {
	let payment_id=req.query.id
	const response= await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}?access_token=APP_USR-7925082022583826-120120-3b449fd48fa3d8d65cf80b7e8d24d91c-86743850`)
		const docRef = db.collection('Ordenes');
		const fecha_pedido= new Date(response.data.date_created)
		const fecha_aprobado=new Date(response.data.date_approved)
		
		let data={
			pago_id:response.data.id,
			estado_pago:response.data.status,
			estado_pago_detalle:response.data.status_detail,
			fecha_pedido:fecha_pedido.getTime(),
			fecha_aprobado:fecha_aprobado.getTime(),
			email:response.data.payer.email,
			metodo_pago:'TRANS-MP',
			sucursal:'lafe',
		}
		
		const refOrden = await docRef.doc(response.data.external_reference);
		let doc=await refOrden.get()
		console.log('doc',doc)
		if (!doc.exists) {
			console.log('No such document!');
			await docRef.add(data);
			} else {
				await docRef.doc(response.data.external_reference).update(data);
			}
	res.status(200).send('Pago registrado');
	});

app.get('/pantallafin',async function(req, res) {
	let payment_id=req.query.payment_id
	const response= await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}?access_token=APP_USR-7925082022583826-120120-3b449fd48fa3d8d65cf80b7e8d24d91c-86743850 `)
	const  refOrdenes= await db.collection('Ordenes')
	let status=response.data.status
	const fecha_pedido= new Date(response.data.date_created)
	const fecha_aprobado=new Date(response.data.date_approved)
	const refOrden = await refOrdenes.doc(req.query.external_reference);
	const doc = await refOrden.get();
	
	if (!doc.exists) {
	console.log('No such document!');
	} else {
		const orden_update = await refOrden.update({
			metodo_pago:'APP-MP',
			estado_pago:status,
			estado_pago_detalle:response.data.status_detail,
			pago_id:payment_id,
			fecha_pedido:fecha_pedido.getTime(),
			fecha_aprobado:fecha_aprobado.getTime(),
			email:response.data.payer.email
		});
	const carrito= doc.data()
	/* setTimeout(reporte, 3000,carrito); */
	/* res.status(200).render(path.join(__dirname,'public/pantallafin'),{payment_id, status}) */
	res.redirect(await reporte2(carrito/* ,fecha_aprobado.getTime(),payment_id */))
	}
});



app.get('/feedback',async function(req, res) {
	let payment_id=req.query.payment_id
	console.log(payment_id)
	res.status(200).sendFile('pantallafin.html')
});

app.use("/public", express.static(path.join(__dirname,'public')))

app.listen(port, () => {
console.log("The server is now running on Port:"+port);
});