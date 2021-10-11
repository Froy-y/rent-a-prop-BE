const express = require('express')
const router = express.Router({ mergeParams: true })
const Renta = require('../models/renta')
const User = require('../models/User')
const {requireToken, handleValidateOwnership } = require('../middleware/auth')

//Get routes
//index
router.get('/', requireToken, async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.UserId).populate('creator').exec()
        console.log(foundUser)
        res.status(200).json(foundUser.creator)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//show
router.get('/:RentaId', requireToken, async (req, res) => {
    try {
        const findRental = await Renta.findById(req.params.RentaId)
        res.status(200).json(findRental)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//create
router.post('/', requireToken, async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.UserId).populate("creator")
        const newRental = await Renta.create(req.body)
        await User.findByIdAndUpdate(req.params.UserId, newRental._id)
        res.status(200).json(newRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//delete
router.delete('/:RentaId', requireToken, async (req, res) => {
    try {
        const deleteRental = await Renta.findByIdAndDelete(req.params.RentaId)
        const foundUser = await User.findById(req.params.UserId)
        const updateRentals = foundUser.creator.filter((rental) => rental != req.params.RentaId)
        const updateRentaId = updateRentals.map((renta)=> renta._id)
        await User.findByIdAndUpdate(req.params.UserId, {creator: updateRentaId})
        res.status(200).json(deleteRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//update
router.put('/:RentaId', requireToken, async (req, res) =>{
    try {
        const updateRenta = await Renta.findByIdAndUpdate(req.params.RentaId, req.body, {new: true})
        res.status(200).json(updateRenta)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
} )

module.exports = router