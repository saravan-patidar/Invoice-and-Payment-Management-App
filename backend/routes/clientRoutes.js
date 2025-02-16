const express = require("express");
const router = express.Router();

const Client = require("../models/Client");

router.post('/create', async (req, res) => {
    const { name, email, phone, address } = req.body;
    const newClient = new Client({ name, email, phone, address });

    try {
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: "Error creating client", error });
    }
})

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(400).json({ message: "Error fetching clients", error });
    }
});

router.delete('/remove/:id', async (req, res) => {
    try {
        const clientId = req.params.id
        const deletedClient = await Client.findByIdAndDelete(clientId);

        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: "Client removed successfully" });
    }catch (error) {
        res.status(500).json({ message: "Error removing client", error });
    }
})

module.exports = router;