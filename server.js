const express = require('express');
const path = require('path');
const axios = require('axios');
const newRelic = require('newrelic');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/stocks/:ticker', express.static(path.join(__dirname, 'public')));

const axios3001 = axios.create({
  baseURL: 'http://localhost:3001',
});

const axios3002 = axios.create({
  baseURL: 'http://localhost:3002',
});

const AboutRoute = axios.create({
  baseURL: 'http://localhost:3003',
});

const ChartRoute = axios.create({
  baseURL: 'http://localhost:4000',
});



app.use('/api/ratings/:ticker', (req, res) => {
  axios3001.get(`/api/ratings/${req.params.ticker}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/api/history/:ticker', (req, res) => {
  axios3001.get(`/api/history/${req.params.ticker}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/api/stocks/:ticker', (req, res) => {
  axios3002.get(`/api/stocks/${req.params.ticker}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/api/accounts/:account_number', (req, res) => {
  axios3002.get(`/api/accounts/${req.params.account_number}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/api/quotes/:symbol', (req, res) => {
  AboutRoute.get(`/api/quotes/${req.params.symbol}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

app.use('/stocks/tags/:tag', (req, res) => {
  AboutRoute.get(`/stocks/tags/${req.params.tag}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
});
app.use('/stocks/:a/fonts/:fontname', (req, res) => {
  ChartRoute.get(`/stocks/${req.params.a}/fonts/${req.params.fontname}`)
    .then(response => res.send(response.data))
    .catch(err => res.status(404).end());

});
app.use('/api/chart/:stockId', (req, res) => {
  ChartRoute.get(`/api/chart/${req.params.stockId}`)
    .then(response => res.send(response.data))
    .catch(err => {console.log(err); res.send()});
});

app.listen(port, () => {
  console.log(`proxy server running at: http://localhost:${port}`);
});