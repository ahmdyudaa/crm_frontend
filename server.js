const express = require('express');
const path = require('path');

const app = express();

// Set static folder
app.use(express.static(path.join(__dirname)));

// Serve index.html on root
app.get('/prospek', (req, res) => {
    res.sendFile(path.join(__dirname, 'prospek.html'));
});
app.get('/agen', (req, res) => {
    res.sendFile(path.join(__dirname, 'agen.html'));
});
app.get('/customer', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer.html'));
});
app.get('/produk', (req, res) => {
    res.sendFile(path.join(__dirname, 'produk.html'));
});
app.get('/penjualan', (req, res) => {
    res.sendFile(path.join(__dirname, 'penjualan.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
