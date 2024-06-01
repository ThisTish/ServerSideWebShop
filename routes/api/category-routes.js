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
    Category.create(req.body)
    .then((data) => {
      let categoryId = data.id
      // if product ids are provided, update the products with this category
      if(req.body.products && req.body.products.length > 0){
        let productIds = req.body.products
        let updatePromises = productIds.map((productId) => {
          return Product.update({category_id: categoryId},{
            where: {
              id: productId
            },
          })
        })
        return Promise.all(productIds)
        .then(()=>{
          res.status(201).send({message: 'Category created successfully.'});
        })
      }
      res.status(201).send({message: 'Category created successfully.'});
    })
    .catch ((error) => {
      res.status(500).send({message: error.message || 'Error occured during creating category.'});
    })
  })

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
  Category.destroy({
    where: {id : req.params.id},
  })
  .then((row) =>{
    if(row === 1){
      res.status(201).send({message: `Category destroyed`})
    }else{
      res.status(404).send({message: `Category not found`})
    }
  })
  .catch(error=>{
    res.status(500).send({message: `Trouble deleting category--${error}`})
  })
  
});

module.exports = router;
