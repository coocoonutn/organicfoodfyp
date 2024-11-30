// Function to store a value
function storeValue() {
    const value = document.getElementById('valueInput').value;
    fetch('/api/store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: parseInt(value) })
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Value stored successfully!');
    }).catch((error) => {
        console.error('Error:', error);
    });
}

// Function to retrieve a value
function retrieveValue() {
    fetch('/api/retrieve')
    .then(response => response.json())
    .then(data => {
        document.getElementById('retrievedValue').innerText = 'Value: ' + data.value;
    }).catch((error) => {
        console.error('Error:', error);
    });
}


document.getElementById('foodForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateQR();
});

function generateQR(type, code, name, varr, ori) {
    // Construct the query string with all the data
    const qrData = `http://192.168.0.151:5500/display.html?type=${encodeURIComponent(type)}&code=${encodeURIComponent(code)}&name=${encodeURIComponent(name)}&varr=${encodeURIComponent(varr)}&ori=${encodeURIComponent(ori)}`;
    const qrImage = document.getElementById("qrImage");
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrData);
}

document.getElementById('foodForm').addEventListener('submit', function(event) {
    event.preventDefault();
    sendDataToBlockchain(); // Save data to the blockchain
});

function sendDataToBlockchain() {
    const type = document.getElementById("type").value;
    const code = document.getElementById("code").value;
    const name = document.getElementById("name").value;
    const varr = document.getElementById("varr").value;
    const ori = document.getElementById("ori").value;

    // Send data to the blockchain API
    fetch('http://localhost:8787/setContract', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, code, name, varr, ori })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data stored on blockchain:', data.address);

        // Generate QR code with all the input details
        generateQR(type, code, name, varr, ori);
    })
    .catch(error => {
        console.error('Error storing data:', error);
        alert('Failed to store data on blockchain');
    });
}