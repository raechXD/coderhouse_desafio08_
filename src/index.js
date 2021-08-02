//desafio 08
//Alumna:   Rosa Angelica Estrella Chamorro

//Importar librerias
import express from 'express';

//Crear un array de productos
//let productos = [];
let productos = [
  {
    id: 1,
    title: 'llanta',
    price: 1000,
    thumbnail:
      'https://www.estilos.com.pe/otras-categorias/llantas/3004-goodyear-llanta-direction-touring-175-70sr13-82t.html',
  },
  {
    id: 2,
    title: 'Motor',
    price: 3000,
    thumbnail: 'https://www.diariomotor.com/que-es/mecanica/cilindrada/',
  },
];

//Conectarse al servidor
const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

//Usar Get para:
//A)Listar todos los productos a la vez
app.get('/api/productos/listar', (req, res) => {
  const listaTotalProductos = productos;
  if (productos.length === 0) {
    return res.status(400).json({
      error: 'no hay productos cargados',
    });
  }
  res.json({
    data: productos,
  });
});

//B) Mostrar un producto de forma individual
app.get('/api/productos/listar/:id', (req, res) => {
  console.log(req.params);
  const idBuscado = req.params.id;

  const producto = productos.find((aProduct) => aProduct.id == idBuscado);

  if (!producto) {
    res.status = 404;
    return res.json({
      error: 'Producto no encontrado',
      //msg: 'error: Producto no encontrado',
    });
  }

  res.json({
    data: producto,
  });
});

//C) Almacenar un producto
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/api/productos/guardar', (req, res) => {
  const body = req.body;
  console.log(body);
  //precio
  if (
    !body.title ||
    !body.price ||
    typeof body.title != 'string' ||
    typeof body.price != 'number' ||
    typeof body.thumbnail != 'string'
  ) {
    //res.status = 400;
    return res.status(400).json({
      msg: 'Necesito en el body el title (string),  el price (number) y el thumbnail (url)',
    });
  }

  const nuevoProducto = {
    id: productos.length + 1,
    title: body.title,
    price: body.price,
    thumbnail: body.thumbnail,
  };

  productos.push(nuevoProducto);

  res.status = 201;
  res.json({
    data: nuevoProducto,
  });
});

// {
//     "title": "frenos",
//     "price": 500,
//     "thumbnail": "url3"
// }
