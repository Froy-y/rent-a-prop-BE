const express = require('express')
const router = express.Router()
const Renta = require('../models/renta')
const {requireToken, handleValidateOwnership } = require('../middleware/auth')

//Get routes
//index
router.get('/', requireToken, async (req, res) => {
    try {
        const allRentals = await Renta.find().populate('creator', 'username').exec()
        res.status(200).json(allRentals)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//show
router.get('/:id', async (req, res) => {
    try {
        const findRental = await Renta.findById(req.params.id).populate('creator').exec()
        res.status(200).json(findRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//create
router.post('/', requireToken, async (req, res) => {
    try {
        const newRental = await Renta.create(req.body)
        res.status(200).json(newRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//delete
router.delete('/:id', handleValidateOwnership, requireToken, async (req, res) => {
    try {
        handleValidateOwnership(req, await Renta.findById(req.params.id))
        const deleteRental = await Renta.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//update
router.put('/:id', requireToken, async (req, res) =>{
    try {
        handleValidateOwnership(req, await Renta.findById(req.params.id))
        const updateRenta = await Renta.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updateRenta)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
} )

module.exports = router