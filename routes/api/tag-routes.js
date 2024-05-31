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
      res.status(200).json(tag);
    })
    .then((tagProdcutIds) => res.status(200).json(tagProdcutIds))
    .catch((error) =>{
      console.log(error)
      res.status(400).send({message: error.message || 'Error creating tag.'})
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where: {id : req.params.id},
    returning:true})
    .then((tag) =>{
      if(req.body.productIds && req.body.productIds.length){
          ProductTag.findAll({
            where: { tag_id : req.params.id}
          })
          .then((tagProducts) =>{
            console.log(`tagProducts: ${tagProducts}`)
            const tagProductIds = tagProducts.map(({product_id}) => product_id)
            console.log(`tagProductIds ${tagProductIds}`)
            console.log(`newTagProducts ${req.body.productIds}`)
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
      res.status(200).json(tag);
    })
    .catch((error) =>{
      console.log(error)
      res.status(400).send({message: error.message || 'Error updating tag.'})
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
