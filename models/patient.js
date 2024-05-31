const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true, minlength: 10 },
    email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
    phone: { type: String, required: true, minlength: 10 },
    password: { type: String, required: true },
    photo: { type: String, required: true },
    psychiatrist: { type: mongoose.Schema.Types.ObjectId, ref: 'Psychiatrist', required: true }
});

module.exports = mongoose.model('Patient', patientSchema);
