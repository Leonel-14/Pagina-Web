from flask import request, jsonify
from models.modelo_db import *


@app.route('/', methods=['GET'])
def mostrar_cafes():
    cafes = Cafe.query.all()
    cafes_json = esquema_cafes.dump(cafes)
    return jsonify(cafes_json)


@app.route('/pedidos',methods=['POST'])
def insertar():
    id_bebida = request.json['id']
    nombre = request.json['nombre']
    direccion = request.json['direccion']
    precio = request.json['precio']
    cantidad = int(request.json['cantidad'])
    total = float(precio) * cantidad
    
    nuevo_pedido = Pedido(nombre,direccion,id_bebida,precio,cantidad,total)
    db.session.add(nuevo_pedido)
    db.session.commit()
    
    return esquema_pedido.jsonify(nuevo_pedido)


@app.route('/pedidos',methods=['GET'])
def mostrar_pedidos():
    pedidos_con_cafe = db.session.query(
    Pedido.id,
    Pedido.nombre,
    Pedido.direccion,
    Cafe.nombre.label('id_bebida'),
    Pedido.precio_unidad,
    Pedido.cantidad,
    Pedido.total
).join(Cafe, Pedido.id_bebida == Cafe.id).all()

    pedido_json = esquema_pedidos.dump(pedidos_con_cafe)
    return jsonify(pedido_json)

@app.route('/pedidos/<id>',methods=['DELETE'])
def eliminar_pedido(id):
    pedido_eliminado = Pedido.query.get(id)
    db.session.delete(pedido_eliminado)
    db.session.commit()
    return esquema_pedido.jsonify(pedido_eliminado)

@app.route('/pedidos/<id>',methods=['GET'])
def mostrar_pedido_id(id):
    pedido_id = db.session.query(
    Pedido.id,
    Pedido.nombre,
    Pedido.direccion,
    Cafe.imagen.label('id_bebida'),
    Pedido.precio_unidad,
    Pedido.cantidad,
    Pedido.total
).join(Cafe, Pedido.id_bebida == Cafe.id).filter(Pedido.id == id).first()
    
    return  esquema_pedido.dump(pedido_id)
    
@app.route('/pedidos/<id>',methods=['PUT'])
def modificar_pedido(id):
    pedido=Pedido.query.get(id)
    pedido.nombre = request.json['nombre']
    pedido.direccion = request.json['direccion']
    db.session.commit()
    return esquema_pedido.jsonify(pedido)
