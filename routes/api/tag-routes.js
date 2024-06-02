const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include:[{
      model: Product,
      through: ProductTag,
      through:{attributes: []},
      attributes: ['product_name', 'price', 'stock']
      }]
  })
  .then(data =>{
    data.length < 1 ? res.status(404).send('Tags not found') : res.send(data)
  })
  .catch (error =>{
    res.status(500).send({message: error.message || 'Error occured during retrieving tags.'})    
  });
});

// get specific tag
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Tag.findByPk(id,{
    include:[{
      model: Product,
      through: ProductTag,
      through:{attributes: []},
      attributes: ['product_name','price','stock']
      }]
  })
  .then(data =>{
    data.length < 1 ? res.status(404).send('Tag not found') : res.send(data)
  })
  .catch (error =>{
    res.status(500).send({message: error.message || 'Error occured during retrieving tag.'})    
  });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) =>{
      if(req.body.productIds.length){
        const tagProductIdArray = req.body.productIds.map((product_id) =>{
          return{
            tag_id: tag.id,
            product_id
          }
        })
        return ProductTag.bulkCreate(tagProductIdArray)
      }
      res.status(201).json(tag);
    })
    .then((tagProdcutIds) => res.status(201).json(tagProdcutIds))
    .catch((error) =>{
      console.log(error)
      res.status(400).send({message: error.message || 'Error creating tag.'})
    })
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    where: {id : req.params.id},
    returning:true})

    .then((tag) =>{
      // update product if provided in body
      if(req.body.productIds && req.body.productIds.length){
          ProductTag.findAll({
            where: { tag_id : req.params.id}
          })

          .then((tagProducts) =>{
            const tagProductIds = tagProducts.map(({product_id}) => product_id)
            const newTagProducts = req.body.productIds
            .filter((product_id) => !tagProductIds.includes(product_id))
            .map((product_id)=>{
              return {
                tag_id: req.params.id,
                product_id
            }
            })
          const oldTagProducts = tagProducts
          .filter(({product_id}) => !req.body.productIds.includes(product_id))
          .map(({id}) => id)

          return Promise.all([
            ProductTag.destroy({where: {id : oldTagProducts}}),
            ProductTag.bulkCreate(newTagProducts)
          ])
        })
      }
      return res.json(tag);
    })
    .catch((error) =>{
      res.status(400).send({message: error.message || 'Error updating tag.'})
    })
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {id : req.params.id},
  })
  .then((row) =>{
    if(row === 1){
      res.status(200).send({message: `Tag destroyed`})
    }else{
      res.status(404).send({message: `Tag not found`})
    }
  })
  .catch(error=>{
    res.status(500).send({message: `Trouble deleting tag--${error}`})
  })
});

module.exports = router;
