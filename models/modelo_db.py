from app import db,ma,app

class Cafe(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    nombre = db.Column(db.String(25)) 
    precio = db.Column(db.Float)
    imagen = db.Column(db.String(300))

    def __init__(self,nombre,precio,imagen):
        self.nombre = nombre
        self.precio = precio
        self.imagen = imagen

class CafeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields = ('id','nombre','precio','imagen')

class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    nombre = db.Column(db.String(25))
    direccion = db.Column(db.String(50))
    id_bebida = db.Column(db.Integer, db.ForeignKey('cafe.id'))
    cafe = db.relationship('Cafe', backref=db.backref('pedidos', lazy=True))
    precio_unidad = db.Column(db.Float)
    cantidad = db.Column(db.Integer)
    total = db.Column(db.Float)

    def __init__(self,nombre,direccion,bebida,precio_unidad,cantidad,total):
        self.nombre = nombre
        self.direccion = direccion
        self.id_bebida = bebida
        self.precio_unidad = precio_unidad
        self.cantidad = cantidad
        self.total = total

class PedidoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        fields=('id','nombre','direccion','id_bebida','precio_unidad','cantidad','total')


esquema_cafe = CafeSchema()
esquema_cafes = CafeSchema(many=True)

esquema_pedido = PedidoSchema()
esquema_pedidos = PedidoSchema(many=True)

with app.app_context():
    db.create_all()
    
    

