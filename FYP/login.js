function createAccount(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="uname"]').value;
    const password = document.querySelector('input[name="psw"]').value;

    if (username && password) {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        // Store username and hashedPassword on the blockchain
        storeOnBlockchain(username, hashedPassword);
        alert('Account created successfully!');
        window.location.href = 'login.html';
    } else {
        alert('Please enter both username and password.');
    }
}
function login(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="uname"]').value;
    const password = document.querySelector('input[name="psw"]').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    const storedHashedPassword = retrieveFromBlockchain(username);

    if (storedHashedPassword && storedHashedPassword === hashedPassword) {
        alert('Login successful!');
        window.location.href = 'form.html';
    } else {
        alert('Invalid username or password.');
    }
}

function storeOnBlockchain(username, hashedPassword) {
    localStorage.setItem(username, hashedPassword); // For demonstration purposes
}

function retrieveFromBlockchain(username) {
    return localStorage.getItem(username); // For demonstration purposes
}