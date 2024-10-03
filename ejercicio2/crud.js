// Importar el módulo Express
const express = require('express');
const mongoose = require('mongoose');

// Crear una aplicación Express
const app = express();

app.use(express.json());

//conexcion
main().catch(err => console.log(err));

mongoose.connect('mongodb://127.0.0.1:27017/test');
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  available: Boolean
});
const Item = mongoose.model('Item', itemSchema);

async function main() {
  
  

  /* const monsterClasica = new Item({ name: 'monster clasica', price: 2000, available: true });
  console.log(monsterClasica.name);
  await monsterClasica.save(); */

  /* const gatos = await Gato.find();
  console.log(gatos); */

  /* const pupos = await Gato.find({ name: /^pu/ });
  console.log(pupos); */
}
// Lista de ítems ficticios
let items = [
    { id: 1, name: 'Item 1', description: 'Descripción del Item 1' },
    { id: 2, name: 'Item 2', description: 'Descripción del Item 2' }
  ];

// Definir una ruta simple para la página principal
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Este es mi servidor HTTP con Express en Node.js');
});

// Obtener lista de ítems
app.get('/api/items', async (req, res) => {
  var items = await Item.find();
    res.json(items);
  });  

  app.get('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;
    var item = await Item.find({'_id':itemId});
      res.json(item);
    });  

app.post('/api/items', (req, res) => {

  const item = new Item({ name: req.body.name , price: req.body.price, available: req.body.available });
  console.log(item.name);
  item.save();
  res.status(201).json(item);
    
  });  

app.put('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;
    const doc = await Item.findOneAndUpdate({'_id':itemId},{ name: req.body.name , price: req.body.price, available: req.body.available });

      res.json(doc);
  
  });  
  app.delete('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;
    const response = await Item.deleteOne({'_id':itemId});
      res.json(response);
  });  

// Configurar el puerto en el que va a escuchar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
