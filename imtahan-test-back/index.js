import express from 'express'
const app = express()
const port = process.env.PORT
import 'dotenv/config'
import cors from 'cors'
app.use(cors())
import mongoose from 'mongoose'
const { Schema } = mongoose;
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.send(products);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
  })

  app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const products = await ProductModel.findById(id);
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
  
  
  app.post('/', async (req, res) => {
    const { name, price, category,image } = req.body;
  try {
    const products = new ProductModel({ name, price, category,image });
    await products.save();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  })
  
  app.put('/:id', async(req, res) => {
    const { id } = req.params;
    const { name, price, category,image } = req.body;
    try {
      const products = await ProductModel.findByIdAndUpdate(id, { name, price, category,image });
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
  
  app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const products = await ProductModel.findByIdAndDelete(id);
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })


const productSchema = new Schema({
  name: String,
  price: String,
  category: String,
  image:String
});

const ProductModel = mongoose.model('ModelName', productSchema)


  mongoose.connect(process.env.DB_SECRET_KEY)
  .then(() => console.log('Connected!'))
  .catch(() => console.log('Not Connected!'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})