const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
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

// get specific category
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

// create new category
router.post('/', (req, res) => {
    Category.create(req.body)
    .then((data) => {
      const categoryId = data.id
      console.log(`Category ${req.body.category_name} created!`)
      
      // if product ids are provided, update the products with this category
      if(req.body.products && req.body.products.length > 0){
        const productIds = req.body.products
        let updatePromises = productIds.map((productId) => {
          return Product.update({category_id: categoryId},{
            where: {id: productId}
          })
        })

        return Promise.all(updatePromises)
        .then(()=>{
          res.status(201).send({message: 'Category created with product(s) successfully.'});
        })
      }else{
        res.status(201).send({message: 'Category created successfully.'});
      }
    })
    .catch ((error) => {
      res.status(500).send({message: error.message || 'Error occured during creating category.'});
    })
  })

  // update a category by it's id
router.put('/:id', (req, res) => {
    Category.update(req.body,{
      where: {id : req.params.id},
    })
    // error if category requested not updated
    .then(([rows]) => {
      if (rows === 0) {
        throw new Error('Category not found!');
      }
      // if products provided for update, category id in those products will be updated
      if(req.body.products && req.body.products.length > 0){
        const productIds = req.body.products
        let updatePromises = productIds.map((productId) => {
          return Product.update({category_id: req.params.id},{
            where: {
              id: productId
            },
          })
        })
        return Promise.all(updatePromises)
        .then(()=>{
          res.status(200).send({message: 'Category updated with product(s) successfully.'});
        })
      }else{
        res.status(200).send({message: 'Category updated successfully.'});
      }
    })
    .catch ((error) => {
      res.status(500).send({message: error.message || 'Error occured during updating category.'});
    })
    })

    // delete a category by its `id` value
router.delete('/:id', (req, res) => {
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
