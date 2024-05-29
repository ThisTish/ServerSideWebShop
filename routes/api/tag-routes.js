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

  // *works but without linking to products
  // try {
  //   Tag.create({
  //     tag_name: req.body.tag_name
  //   })
  //   res.status(200).json({message: 'Tag created successfully.'});
  //   } catch (error) {
  //     res.status(500).send({message: error.message || 'Error occured during creating tag.'});
  //   }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
