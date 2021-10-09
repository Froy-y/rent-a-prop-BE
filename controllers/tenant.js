const express = require('express')
const router = express.Router()
const Tenant = require('../models/tenant')

//routes
//get - index
router.get('/', async (req, res) => {
    try {
        const allTenants = await Tenant.find()
        res.status(200).json(allTenants) 
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//show - get
router.get('/:id', async (req, res) => {
    try {
        const findTenant = await Tenant.findById(req.params.id)
        res.status(200).json(findTenant)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//create - post
router.get('/', async (req, res) => {
    try {
        const newTenant = await Tenant.create(req.body)
        res.status(200).json(newTenant)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try {
        const deleteTenant = await Tenant.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteTenant)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//update - put
router.put('/:id', async (req, res) => {
    try {
        const updateTenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updateTenant)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = router