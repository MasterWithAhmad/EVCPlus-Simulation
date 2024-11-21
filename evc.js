/*=====================================================================================
    Author: Ahmed Ibrahim Ahmed
    
     Date: 27/9/2024
    
    Title: EVC Plus Simulation v0.2
    
    Description:
    This application simulates basic operations of the EVC Plus mobile money service.
    Users can register, check their balance, transfer money, recharge their balance,
    and view their transaction history. It uses a PIN-based authentication for security 
    and includes a limit for incorrect PIN attempts. All operations are logged, and 
    transaction history can be viewed at any time.
=====================================================================================*/

// Import the readline module to handle input/output from the console
const readline = require('readline');

// Create an interface for reading input from the terminal
const rl = readline.createInterface({
    input: process.stdin,  // Standard input (keyboard)
    output: process.stdout // Standard output (console)
});

// Define a user object to store the current user's details
let user = {
    name: '',     // User's name
    pin: '',      // User's 4-digit PIN
    balance: 100,   // Initial account balance (starts at $100)
    pinAttempts: 0,  // Tracks incorrect PIN attempts
    maxAttempts: 3   // Maximum allowed incorrect PIN attempts
};

// Store all transactions (history) in an array
const transactions = [];

// Function to ask the user for their 4-digit PIN
// The function ensures the PIN is exactly 4 digits and numeric
const askForPin = (callback) => {
    rl.question("Geli PIN 4-lambar ah: ", (pin) => {
        if (/^\d{4}$/.test(pin)) {  // Regular expression to check that the input is 4 digits
            callback(pin);          // Proceed with the entered PIN
        } else {
            console.log("PIN-ku waa inuu ahaadaa 4 lambar oo keliya. Isku day mar kale."); // Error if PIN is not valid
            askForPin(callback);    // Retry asking for the PIN
        }
    });
};

// Function to register a new user
const registerUser = () => {
    console.log("Diiwaangelinta adeegga EVC Plus"); // Prompt for user registration
    rl.question("Magacaaga: ", (name) => {  // Ask for the user's name
        askForPin((pin) => {    // After the name, ask for the 4-digit PIN
            user.name = name;   // Store the user's name
            user.pin = pin;     // Store the user's PIN
            user.balance = 0;   // Set the initial balance to $0
            console.log(`Diiwaangelintu waa guuleysatay, ${user.name}! Waxaad leedahay hadhaaga $0 Dollars.`); // Confirmation message
            showMenu();         // Show the main menu after registration
        });
    });
};

// Function to verify the user's PIN when performing an operation
const verifyPin = (callback) => {
    rl.question("Fadlan geli PIN-kaaga: ", (pin) => {
        if (pin !== user.pin) {  // Check if the entered PIN matches the stored PIN
            user.pinAttempts++;  // Increment incorrect attempt counter
            if (user.pinAttempts >= user.maxAttempts) {  // If max attempts reached
                console.log("Waxaad dhaaftay tirada isku dayo ee la ogolyahay! Fadlan dib isku day mar kale.\n");
                rl.close();  // Close the app
            } else {
                console.log("PIN-ka waa khalad! Isku day mar kale.");  // Display error
                showMenu();  // Return to the menu
            }
        } else {
            user.pinAttempts = 0;  // Reset attempts on success
            callback();  // Proceed if the PIN is correct
        }
    });
};

// Function to check the user's current balance
const checkBalance = () => {
    verifyPin(() => {
        console.log(`[-EVCPlus-] Haraagaagu waa $${user.balance}.`); // Display the user's current balance
        showMenu();  // Return to the menu
    });
};

// Function to handle transferring money to another number
const transferMoney = () => {
    rl.question("Fadlan geli nambarka qofka aad lacagta uwareejinayso: ", (receiver) => {
        rl.question("Fadlan geli qadarka aad uwareejinayso: $", (amount) => {
            let amountToSend = parseFloat(amount); // Convert input to a floating-point number
            if (isNaN(amountToSend)) {  // Ensure the amount is a valid number
                console.log("Fadlan geli tiro sax ah.");
                showMenu();  // Return to the menu if the amount is invalid
                return;
            }
            if (amountToSend > 500) {  // Prevent transfers over $500
                console.log("Ma awoodid inaad wareejiso in ka badan $500 hal mar.\n");
                showMenu();
            } else if (amountToSend > user.balance) {  // Ensure the user has enough balance
                console.log("Hadhaagaaga kuma filna lacagtaas.\n");
                showMenu();
            } else {
                verifyPin(() => {  // Verify the user's PIN before processing the transfer
                    user.balance -= amountToSend;  // Deduct the amount from the balance
                    logTransaction('Wareejin', amountToSend, receiver); // Log the transfer in the transaction history
                    console.log(`[-EVCPlus-] $${amountToSend} ayaad uwareejisay ${receiver}, Haraagaagu waa $${user.balance}.\n`); // Confirmation message
                    showMenu();  // Return to the menu after the transfer
                });
            }
        });
    });
};

// Function to recharge the user's balance
const rechargeBalance = () => {
    rl.question("Fadlan geli qadarka aad ku shubanayso: $", (amount) => {
        let amountToRecharge = parseFloat(amount); // Convert input to a floating-point number
        if (isNaN(amountToRecharge) || amountToRecharge <= 0) {  // Ensure the amount is valid and positive
            console.log("Fadlan geli tiro sax ah.");  // Error message for invalid amount
        } else {
            user.balance += amountToRecharge;  // Add the recharged amount to the user's balance
            logTransaction('Shuban', amountToRecharge, 'EVC');  // Log the recharge in the transaction history
            console.log(`[-EVCPlus-] Waxaad $${amountToRecharge} ku shubatay koontadaada, Haraagaagu waa $${user.balance}.\n`); // Confirmation message
        }
        showMenu();  // Return to the menu
    });
};

// Function to log a transaction (transfer or recharge)
const logTransaction = (type, amount, receiver) => {
    transactions.push({ type, amount, receiver, date: new Date() });  // Store transaction details in the array
};

// Function to display the user's transaction history
const showTransactionHistory = () => {
    if (transactions.length === 0) {  // Check if there are any transactions
        console.log("No Transactions.\n");  // Display if there are no transactions
    } else {
        console.log("Taariikhda Wareejintaada:");  // Header for transaction history
        transactions.forEach((t) => {  // Loop through each transaction
            console.log(`${t.type}: $${t.amount} -> ${t.receiver}, Tar: ${t.date.toLocaleString()}`);  // Display transaction details
        });
    }
    showMenu();  // Return to the menu
};

// Function to display the main menu of options
const showMenu = () => {
    console.log("\n*");
    console.log("*       Adeegyada EVC Plus      *");
    console.log("*");
    console.log("* 1. Hubi hadhaaga              *");
    console.log("* 2. U wareeji lacag            *");
    console.log("* 3. Buuxi EVC                  *");
    console.log("* 4. Taariikhda wareejinta       *");
    console.log("* 5. Ka bax                     *");
    console.log("*");
    rl.question("Dooro ikhtiyaar: ", handleMenu);  // Ask the user to choose a menu option
};

// Function to handle menu options based on user input
const handleMenu = (choice) => {
    switch (choice) {
        case '1':
            checkBalance();  // Option to check the balance
            break;
        case '2':
            transferMoney();  // Option to transfer money
            break;
        case '3':
            rechargeBalance();  // Option to recharge balance
            break;
        case '4':
            showTransactionHistory();  // Option to show transaction history
            break;
        case '5':
            rl.close();  // Option to exit the program
            break;
        default:
            console.log("Fadlan dooro ikhtiyaar sax ah.");  // Error for invalid choice
            showMenu();  // Return to the menu
    }
};

// Start the program by registering a new user
registerUser();