/* require('dotenv').config() */

var admin = require("firebase-admin");
var serviceAccount = require("./morfiburgerjson.json");
/* const {initializeApp,applicationDefault}=require('firebase-admin/app') */

const {getFirestore,addDoc,doc, setDoc,set}=require('firebase-admin/firestore')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nachopizza-45d33-default-rtdb.firebaseio.com"
    });
/* initializeApp({
    credential: applicationDefault(),


}) */

const db=getFirestore()

/* const  savePago=(id,estado_pago,estado_pago_detalle,fecha_pedido,fecha_aprobado,cuil)=>{
    addDoc(collection(db,'Ordenes'),{
        id,
        estado_pago,
        estado_pago_detalle,
        fecha_pedido,
        fecha_aprobado,
        cuil
    })
} */

module.exports ={
    db,
    doc,
    setDoc,
    set,
}