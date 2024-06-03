const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios'); 

const app = express();

// Middleware untuk parsing body
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware untuk sesi
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Middleware untuk otentikasi
function isAuthenticated(req, res, next) {
    if (req.session && req.session.loggedIn) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

// Set static folder
app.use(express.static(path.join(__dirname)));

// Rute untuk menampilkan halaman login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Rute untuk menangani login
app.post('/login', async (req, res) => {
    
    const { username, password } = req.body;
    console.log(username, password);
    try {
        const apiResponse = await axios.get(`https://crmbackend-dot-seraphic-jet-414906.as.r.appspot.com/akun/username/${username}`);
        const user = apiResponse.data;
        console.log(user);

        if (user[0].password === password) {
            req.session.loggedIn = true;
            req.session.user = {
                id: user.id,
                username: user.username,
            };
            res.redirect('/prospek');
        } else {
            res.status(401).send('Login failed: Invalid username or password.');
        }
    } catch (error) {
        res.status(500).send('Login failed: User not found.');
    }
});


// Rute-rute yang dijaga
app.get('/prospek', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'prospek.html'));
});
app.get('/agen', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'agen.html'));
});
app.get('/customer', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'customer.html'));
});
app.get('/produk', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'produk.html'));
});
app.get('/penjualan', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'penjualan.html'));
});

// Rute untuk logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
