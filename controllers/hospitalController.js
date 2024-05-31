const Hospital = require('../models/hospital');
const Psychiatrist = require('../models/psychiatrist');
const Patient = require('../models/patient');

exports.getHospitalData = async (req, res) => {
    try {
        const hospitalId = req.body.hospitalId;

        const hospital = await Hospital.findById(hospitalId);
        const psychiatrists = await Psychiatrist.find({ hospital: hospitalId });
        const totalPsychiatrists = psychiatrists.length;

        let totalPatients = 0;
        const psychiatristDetails = await Promise.all(psychiatrists.map(async psychiatrist => {
            const patients = await Patient.find({ psychiatrist: psychiatrist._id });
            totalPatients += patients.length;
            return {
                id: psychiatrist._id,
                name: psychiatrist.name,
                patientsCount: patients.length
            };
        }));

        res.status(200).json({
            hospitalName: hospital.name,
            totalPsychiatristCount: totalPsychiatrists,
            totalPatientsCount: totalPatients,
            psychiatristDetails
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
