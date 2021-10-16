const express = require('express')
const router = express.Router({ mergeParams: true })
const Renta = require('../models/renta')
const User = require('../models/User')
const Tenant = require('../models/tenant')
const {requireToken, handleValidateOwnership } = require('../middleware/auth')

//Get routes
//index
router.get('/', requireToken, async (req, res) => {
    try {
        const foundUser = await User.findById(req.user._id)
        const usersRentals = await Renta.find({creator: foundUser._id})
        res.status(200).json(usersRentals)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//show
router.get('/:rId', async (req, res) => {
    try {
        const findRental = await Renta.findById(req.params.rId).populate('creator').exec()
        const query = {renta: findRental._id}
        const allTenants = await Tenant.find(query)
        res.status(200).json({renta: findRental, tenants: allTenants})
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//create
router.post('/', requireToken, async (req, res) => {
    try {
        req.body.creator = req.user._id
        const newRental = await Renta.create(req.body)
        res.status(200).json(newRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//delete
router.delete('/:rId', requireToken, async (req, res) => {
    try {
        const deleteRental = await Renta.findByIdAndDelete(req.params.rId)
        res.status(200).json(deleteRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//update
router.put('/:rId', requireToken, async (req, res) =>{
    try {
        handleValidateOwnership(req, await Renta.findById(req.params.rId))
        const updateRenta = await Renta.findByIdAndUpdate(req.params.rId, req.body, {new: true})
        res.status(200).json(updateRenta)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
} )

module.exports = router