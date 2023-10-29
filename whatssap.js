function reporte2(orden){
    let detalle_total=pizzasxbordes2(orden)
    let telefono='54'+orden.telefono
    let variables={
        metodo_pago:orden.metodo_pago,
        hora:orden.fecha_pedido,
        orden_id:orden.id,
        detalle:detalle_total.k,
        total:detalle_total.t,
        entrega:'',
        comprobanteMP:orden.pago_id,
        telefono:telefono,
        template:""
    }
    if(orden.domicilio){
        //aca deberia enviarse el template de "te lo enviamos"
        let direccion=`${orden.domicilio.direccion},Entrecalles:${orden.domicilio.entrecalles}`
        if(orden.metodo_pago=="APP-efectivo"){
            let template="morfiburgerdeliveryefe"
            variables.entrega=direccion
            variables.template=template
            chatBotEfe(variables)
        }else{
            let template="morfiburger2"
            variables.entrega=direccion
            variables.template=template
            chatBotMP(variables)
        }
    }else{
        //aca deberia enviarse el template de "retira por sucursal"
        let sucursal=orden.sucursal
        if(orden.metodo_pago=="APP-efectivo"){
            let template="morfiburgersucuefe"
            variables.entrega=sucursal
            variables.template=template
            chatBotEfe(variables)
        }else{
            let template="morfisucump"
            variables.entrega=sucursal
            variables.template=template
            chatBotMP(variables)
        }
    }
    /* let enlace=`http://api.whatsapp.com/send?phone=+5491160235647&text=${pruebita}`
    window.location.href =enlace */
    
    const btncompra = document.getElementById('fin');
    btncompra.disabled = false;
    setTimeout(() => btncompra.disabled = false, 1000,);
}

function pizzasxbordes2(orden){
    let k=``
    let t=0
    for (let x=0; x < orden.carrito.length;x++){
        let pizza=orden.carrito[x].nombre
        let agg=[orden.carrito[x].agregados]
        k += `1x ${pizza}`
        for (let z=0; z < pizzas.length;z++){
            for (let i=0; i < agg.length;i++){
                if(agg[i].acompañamiento==pizzas[z].nombre){
                    console.log('+',pizzas[z].nombre)
                    k+=`+ ${pizzas[z].nombre}`
                    t+=pizzas[z].precio
                }
                if (agg[i].bebidas==pizzas[z].nombre) {
                    k+=`+ ${pizzas[z].nombre}`
                    t+=pizzas[z].precio
                }
                if (agg[i].comida==pizzas[z].nombre){
                    console.log('+',pizzas[z].nombre)
                    k+=`+ ${pizzas[z].nombre}`
                    t+=pizzas[z].precio
                }
                if (agg[i].postres_helados==pizzas[z].nombre){
                    console.log('+',pizzas[z].nombre)
                    k+=`+ ${pizzas[z].nombre}`
                    t+=pizzas[z].precio
                }
            }
        }
        k+=`${orden.carrito[x].aclaracion}`
        t+=orden.carrito[x].precio
    }
    /* k +=`
    *TOTAL:${t}*` */
    console.log({k,t})
    return({k,t})
}



function chatBotEfe(va){
    var botId = '102189576189338';
    var phoneNbr = va.telefono;
    var bearerToken = 'EAARwmnWIHUwBAHPcykGPkvRc4CZCy7rWZCnASB9jcRG8DQWD4ZCxRkCgJ5ffkeY1Fm8vC9Nb8AROgycZAThyfWAs9qZAM4IVK6WnLFgxPMG3R1O4TNz7Nr6mGuFZAyZCVFS7zIeo92Nc6t8HwnH6zqZCtWaq6ZBLDem9cpaeSuOvEVryZByWB5g3I6RtAhx8O8ClynYVN7ZBaJnFduvytyZAKGez';
    var url =`https://graph.facebook.com/v16.0/${botId}/messages `
    var data = 
    {
    messaging_product: 'whatsapp',
    to: phoneNbr,
    type: 'template',
    template: {
        name:va.template,
        language:{
            code: 'es_AR' ,
        },
        components:[{
            type: "header",
            parameters: [
            {
                type: "image",
                image: {
                    link: "https://i.postimg.cc/qvYphyP4/logo.jpg"
                }
            }]
        },
        {
            type: "body",
            parameters: [
            {
                type: "text",
                text: `${va.nombre}`
            },
            {
                type: "text",
                text: `${va.orden_id}`
            },
            {
                type: "text",
                text: `${va.entrega}`
            },
            {
                type: "text",
                text: `${va.metodo_pago}`
            },
            {
                type: "text",
                text: 'https://morfi-burger.fly.dev'
            },
            ]
        }]
    },
    };

    var postReq = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        json: true
    };
    fetch(url, postReq)
    .then(data => {
        return data.json()
    })
    .then(res => {
        console.log(res)
    })
    .catch(error => console.log(error));
}

function chatBotMP(va){
    var botId = '102189576189338';
    var phoneNbr = va.telefono;
    var bearerToken = 'EAARwmnWIHUwBAHPcykGPkvRc4CZCy7rWZCnASB9jcRG8DQWD4ZCxRkCgJ5ffkeY1Fm8vC9Nb8AROgycZAThyfWAs9qZAM4IVK6WnLFgxPMG3R1O4TNz7Nr6mGuFZAyZCVFS7zIeo92Nc6t8HwnH6zqZCtWaq6ZBLDem9cpaeSuOvEVryZByWB5g3I6RtAhx8O8ClynYVN7ZBaJnFduvytyZAKGez';
    var url =`https://graph.facebook.com/v16.0/${botId}/messages `
    var data = 
    {
    messaging_product: 'whatsapp',
    to: phoneNbr,
    type: 'template',
    template: {
        name:va.template,
        language:{
            code: 'es_AR' ,
        },
    components:[
        {
        type: "header",
        parameters: [
            {
                type: "image",
                image: {
                    link: "https://i.postimg.cc/qvYphyP4/logo.jpg"
                }
            }
            ]
        },
        {
        type: "body",
        parameters: [
            {
                type: "text",
                text: `${va.nombre}`
            },
            {
                type: "text",
                text: `${va.orden_id}`
            },
            {
                type: "text",
                text: `${va.entrega}`
            },
            {
                type: "text",
                text: `${va.metodo_pago}`
            },
            {
                type: "text",
                text: `${va.comprobanteMP}`
            },
            {
                type: "text",
                text: 'https://morfi-burger.fly.dev'
            },
        ]
    }]
    },
    };
    var postReq = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        json: true
    };
    fetch(url, postReq)
    .then(data => {
        return data.json()
    })
    .then(res => {
        console.log(res)
    })
    .catch(error => console.log(error));
}




module.exports = reporte2;