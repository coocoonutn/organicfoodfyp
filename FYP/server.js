const express = require('express');
const Moralis = require('moralis/node');

const app = express();
app.use(express.json());

const serverUrl = "Your Moralis Server URL";
const appId = "Your Moralis App ID";
const masterKey = "Your Moralis Master Key"; // Be cautious with your master key

Moralis.start({ serverUrl, appId, masterKey });

app.post('/submit', async (req, res) => {
  const { name, email } = req.body;

  // Here you could push data to blockchain or interact with smart contracts
  console.log(`Received: ${name}, ${email}`);

  // Example: Save data to Moralis Database (uncomment to use)
  // const Data = Moralis.Object.extend("Data");
  // const data = new Data();
  // data.save(req.body).then((object) => {
  //   console.log('Data saved on Moralis: ', object);
  // });

  res.send('Data received');
});

app.listen(3000, () => console.log('Server running on port 3000'));

const Web3 = require('web3');
const web3 = new Web3("http://127.0.0.1:7545"); // Your Ganache RPC URL