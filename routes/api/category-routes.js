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
      data.length < 1 ? res.status(404).send('Category not found') : res.send(data);
    })
    .catch (error =>{
      res.status(500).send({message: error.message || 'Error occured during retrieving category.'});
    })
});

router.post('/', (req, res) => {
  // create a new category
  try {
    Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json({message: 'Category created successfully.'});
  } catch (error) {
    res.status(500).send({message: error.message || 'Error occured during creating category.'});

  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body,{
      where: {id : req.params.id}
    })
    res.status(200).json({message: 'Category updated successfully.'});
  } catch (error) {
    res.status(500).send({message: error.message || 'Error occured during creating category.'});
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
