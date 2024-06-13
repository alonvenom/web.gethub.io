// sindi koifan 211657481 alon cohen 319039707

const express = require('express');
const mongojs = require('mongojs');
const cors = require('cors');

// Connect to your MongoDB database
const db = mongojs('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024');
const tasks_coll = db.collection('mitzinet_AlonSindi');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the 'static' directory
app.use(express.static('static'));

// Route to handle POST request for registering a user
app.post('/submit.php', (req, res) => {
    const newTask = {
        'fname': req.body.fname,
        'lname': req.body.lname,
        'phone': req.body.phone,
        'email': req.body.email,
        'password': req.body.password,
        'confirm_password': req.body.confirm_password,
    }

    // Check if email already exists
    tasks_coll.findOne({ 'email': newTask.email }, (err, user) => {
        if (err) {
            console.error('Error checking email existence:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (user) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Insert the user into the database
        tasks_coll.insertOne(newTask, (err, doc) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            return res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Endpoint to check if email exists
app.get('/check-email', (req, res) => {
    const email = req.query.email;
    tasks_coll.findOne({ 'email': email }, (err, user) => {
        if (err) {
            console.error('Error checking email existence:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json({ exists: !!user });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
