const { ProductTag } = require('../../models');

const router = require('express').Router();

// The `/api/product-tags` endpoint
//  *To test if product-tags connections still exist


router.get('/', (req, res) => {
  ProductTag.findAll({
    })
    .then(data =>{
      data.length < 1 ? res.status(404).send('Product/tag relationship not found') : res.send(data);
    })
    .catch (error =>{
      res.status(500).send({message: error.message || 'Error occured during retrieving categories.'});
    })
});

module.exports = router