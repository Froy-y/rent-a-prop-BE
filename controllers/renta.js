const express = require('express')
const router = express.Router({ mergeParams: true })
const Renta = require('../models/renta')
const User = require('../models/User')
const {requireToken, handleValidateOwnership } = require('../middleware/auth')

//Get routes
//index
router.get('/', requireToken, async (req, res) => {
    try {
        console.log(req.user)
        const foundUser = await User.findById(req.user._id)
        console.log("found user", foundUser)
        console.log(foundUser._id)
        const usersRentals = await Renta.find({creator: foundUser._id})
        console.log("users rental", usersRentals)
        res.status(200).json(usersRentals)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//show
router.get('/:Rid', async (req, res) => {
    try {
        const findRental = await Renta.findById(req.params.Rid).populate('creator').exec()
        res.status(200).json(findRental)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//create
router.post('/', requireToken, async (req, res) => {
    try {
        req.body.creator = req.user._id
        const newRental = await Renta.create(req.body)
        console.log(newRental)
        res.status(200).json(newRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//delete
router.delete('/:Rid', requireToken, async (req, res) => {
    try {
        const deleteRental = await Renta.findByIdAndDelete(req.params.Rid)
        res.status(200).json(deleteRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//update
router.put('/:Rid', requireToken, async (req, res) =>{
    try {
        handleValidateOwnership(req, await Renta.findById(req.params.Rid))
        const updateRenta = await Renta.findByIdAndUpdate(req.params.Rid, req.body, {new: true})
        console.log(updateRenta)
        res.status(200).json(updateRenta)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
} )

module.exports = router