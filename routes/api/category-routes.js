const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include:[{
      model: Product,
      attributes: ['product_name']
      }]
    })
    .then(data =>{
      data.length < 1 ? res.status(404).send('Categories not found') : res.send(data);
    })
    .catch (error =>{
      res.status(500).send({message: error.message || 'Error occured during retrieving categories.'});
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Category.findByPk(id,{
    include:[{
      model: Product,
      attributes: ['product_name']
      }]
    })
    .then(data =>{
      data.length < 1 ? res.status(404).send('Categories not found') : res.send(data);
    })
    .catch (error =>{
      res.status(500).send({message: error.message || 'Error occured during retrieving categories.'});
    })
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
