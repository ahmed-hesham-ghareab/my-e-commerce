const { CreateSubCategory, GetSubCategories, UpdateSubCategory, DeleteSubCategory, GetSubCategory } = require('./subcategory.service')


const router = require('express').Router({mergeParams:true})

router.route('/').post(CreateSubCategory).get(GetSubCategories)
router.route('/:id').get(GetSubCategory).put(UpdateSubCategory)
router.delete('/:id',DeleteSubCategory)

module.exports=router;