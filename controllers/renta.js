const express = require('express')
const router = express.Router()
const Renta = require('../models/renta')
const Tenant = require('../models/tenant')

//Get routes
//index
router.get('/', async (req, res) => {
    try {
        const allRentals = await Renta.find()
        res.status(200).json(allRentals)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//show
router.get('/:rId', async (req, res) => {
    try {
        const findRental = await Renta.findById(req.params.rId)
        const query = {renta: findRental._id}
        const allTenants = await Tenant.find(query)
        res.status(200).json({renta: findRental, tenants: allTenants})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//create
router.post('/', async (req, res) => {
    try {
        const newRental = await Renta.create(req.body)
        res.status(200).json(newRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//delete
router.delete('/:rId', async (req, res) => {
    try {
        const deleteRental = await Renta.findByIdAndDelete(req.params.rId)
        res.status(200).json(deleteRental)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//update
router.put('/:rId', async (req, res) =>{
    try {
        const updateRenta = await Renta.findByIdAndUpdate(req.params.rId, req.body, {new: true})
        res.status(200).json(updateRenta)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
} )

module.exports = router