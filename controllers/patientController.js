const Patient = require('../models/patient');
const Psychiatrist = require('../models/psychiatrist');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.registerPatient = async (req, res) => {
    try {
        const { name, address, email, phone, password, psychiatristId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = new Patient({
            name,
            address,
            email,
            phone,
            password: hashedPassword,
            photo: req.file.path,
            psychiatrist: psychiatristId
        });

        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
