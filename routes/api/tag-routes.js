const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  console.log(`Requested: ${JSON.stringify(req.body)}`)
  Tag.findAll({
    include:[
      {
      model: Product,
      through: ProductTag,
      through:{attributes: []},
      attributes: ['product_name', 'price', 'stock']
      }
    ]
  })
  .then(data =>{
    console.log(`Data: ${JSON.stringify(data)}`)
    data.length < 1 ? res.status(404).send('Tags not found') : res.send(data)
  })
  .catch (error =>{
    res.status(500).send({message: error.message || 'Error occured during retrieving tags.'})    
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(`Requested: ${JSON.stringify(req.body)}`)
  Tag.findByPk(id,{
    include:[
      {
      model: Product,
      through: ProductTag,
      through:{attributes: []},
      attributes: ['product_name','price','stock']
      }
    ]
  })
  .then(data =>{
    console.log(`Data: ${JSON.stringify(data)}`)
    data.length < 1 ? res.status(404).send('Tags not found') : res.send(data)
  })
  .catch (error =>{
    res.status(500).send({message: error.message || 'Error occured during retrieving tags.'})    
  });
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
