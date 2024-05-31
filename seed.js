const mongoose = require('mongoose');
const config = require('./config');
const Hospital = require('./models/hospital');
const Psychiatrist = require('./models/psychiatrist');
const Patient = require('./models/patient');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        // Clear existing data
        await Hospital.deleteMany({});
        await Psychiatrist.deleteMany({});
        await Patient.deleteMany({});
        console.log('Existing data cleared');

        // Seed hospitals
        const hospitals = await Hospital.insertMany([
            { name: 'Apollo Hospitals' },
            { name: 'Jawaharlal Nehru Medical College and Hospital' },
            { name: 'Indira Gandhi Institute of Medical Sciences (IGIMS)' },
            { name: 'AIIMS - All India Institute Of Medical Science' }
        ]);
        console.log('Hospitals seeded');

        // Seed psychiatrists
        const psychiatrists = [];
        for (let i = 0; i < hospitals.length; i++) {
            for (let j = 0; j < 5; j++) { // Each hospital gets 5 psychiatrists
                const psychiatrist = new Psychiatrist({
                    name: `Dr. Psychiatrist ${j + 1} of ${hospitals[i].name}`,
                    hospital: hospitals[i]._id
                });
                await psychiatrist.save();
                psychiatrists.push(psychiatrist);
            }
        }
        console.log('Psychiatrists seeded');

        // Seed patients (optional)
        const patients = [];
        for (let i = 0; i < psychiatrists.length; i++) {
            for (let j = 0; j < 10; j++) { // Each psychiatrist gets 10 patients
                const passwordHash = await bcrypt.hash('Password1', 10);
                const patient = new Patient({
                    name: `Patient ${j + 1} of ${psychiatrists[i].name}`,
                    address: `1234 Main St, City ${j + 1}`,
                    email: `patient${j + 1}@example.com`,
                    phone: `+1234567890${j + 1}`,
                    password: passwordHash,
                    photo: `uploads/photo${j + 1}.jpg`,
                    psychiatrist: psychiatrists[i]._id
                });
                await patient.save();
                patients.push(patient);
            }
        }
        console.log('Patients seeded');

        // Close connection
        mongoose.connection.close();
        console.log('Database seeding completed');
    } catch (err) {
        console.error(err);
    }
};

seedDatabase();
