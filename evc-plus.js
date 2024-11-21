/*
 *====================================================================================
 * Author: Ahmed Ibrahim Ahmed
 * Date: 25/9/2024
 * Title: EVCPlus Console Application
 *====================================================================================
 * This is a simple JavaScript console application that simulates some basic
 * functionalities of the EVCPlus mobile money service used in Somalia.
 * 
 * Users can check their balance, transfer money, top up airtime, view transaction
 * history, and manage settings like changing their PIN. All actions mimic real-world
 * EVCPlus interactions, complete with transaction notices and logs.
 *
 * Core Features:
 * 1. Register with Phone Number and Set PIN
 * 2. Check Balance (Itus Hadhaaga)
 * 3. Airtime Management (Kaadhka Hadalka)
 * 4. Transfer Money (U Wareeji)
 * 5. Transaction Summary (Warbixin Kooban)
 * 6. Settings (Maareynta)
 * 7. Exit (Ka bax)
 */

 const prompt = require('prompt-sync')();

 let balance = 100;  // starting balance
 let transactions = [];
 let pin;  // user's 4-digit PIN
 let phoneNumber;  // user's phone number
 
 /**
  * Validates that the input is a 4-digit numeric PIN.
  * 
  * @param {string} input - The PIN entered by the user.
  * @returns {boolean} - True if valid, false otherwise.
  */
 function validatePin(input) {
     return /^\d{4}$/.test(input);
 }
 
 /**
  * Registers the user by prompting for both phone number and a 4-digit PIN.
  */
 function registerUser() {
     phoneNumber = prompt("Fadlan gali nambarkaaga telefoonka: ");
     let isValid = false;
     while (!isValid) {
         let newPin = prompt("Fadlan gali PIN 4-lambarrada: ");
         if (validatePin(newPin)) {
             pin = newPin;
             isValid = true;
             console.log("Waad ku guuleysatay inaad iska diiwaan geliso!");
         } else {
             console.log("Fadlan geli lambar sax ah, waa in uu ka koobanyahay 4 lambar kaliya.");
         }
     }
 }
 
 /**
  * Prompts the user to enter their PIN for transactions.
  * 
  * @returns {boolean} - True if the PIN is correct, false otherwise.
  */
 function verifyPin() {
     let enteredPin = prompt("Fadlan gali PIN-kaaga: ");
     return enteredPin === pin;
 }
 
 /**
  * Displays the user's current balance.
  * 
  * @param {number} balance - The current balance of the user.
  */
 function itusHadhaaga(balance) {
     console.log(`[-EVCPlus-] Haraagaagu waa $${balance}`);
 }
 
 /**
  * Handles airtime management, allowing the user to either top up their own airtime
  * or send airtime to another number. 
  * 
  * @param {number} balance - The current balance of the user.
  * @returns {number} - The updated balance after airtime transactions.
  */
 function kaadhkaHadalka(balance) {
     console.log("******** Kaadhka Hadalka ********");
     console.log("* 1. Ku Shubo Airtime            *");
     console.log("* 2. Ugu Shub Airtime            *");
     console.log("* 3. Ka bax                      *");
     console.log("");
 
     let choice = prompt("Dooro ikhtiyaarka: ");
     if (choice == 1) {
         let amount = parseFloat(prompt("Geli lacagta aad rabto inaad airtime ku shubto: "));
         if (amount > balance) {
             console.log("Lacagta kugu filan ma hayso.");
         } else {
             if (verifyPin()) {
                 balance -= amount;
                 console.log(`[-EVCPlus-] Waxaad ku shubatay Airtime $${amount}, haraagaagu waa $${balance}`);
             } else {
                 console.log("Lambarka sireed waa khalad.");
             }
         }
     } else if (choice == 2) {
         let number = prompt("Geli nambarka aad rabto inaad airtime ugu shubto: ");
         let amount = parseFloat(prompt("Geli lacagta aad rabto inaad ugu shubto: "));
         if (amount > balance) {
             console.log("Lacagta kugu filan ma hayso.");
         } else {
             if (verifyPin()) {
                 balance -= amount;
                 console.log(`[-EVCPlus-] Waxaad $${amount} ugu shubtay Airtime ${number}, haraagaagu waa $${balance}`);
             } else {
                 console.log("Lambarka sireed waa khalad.");
             }
         }
     } else {
         console.log("Ka bax!");
     }
     return balance;
 }
 
 /**
  * Transfers money to another mobile number and records the transaction.
  * 
  * @param {number} balance - The current balance of the user.
  * @returns {number} - The updated balance after the transfer.
  */
 function uWareeji(balance) {
     let number = prompt("Geli nambarka aad lacagta u direyso: ");
     let amount = parseFloat(prompt("Geli lacagta aad u direyso: "));
     if (amount > balance) {
         console.log("Lacagta kugu filan ma hayso.");
     } else {
         if (verifyPin()) {
             balance -= amount;
             let date = new Date().toLocaleString();
             let transaction = `[-EVCPlus-] $${amount} ayaad uwareejisay ${number}, Tar: ${date}, Haraagaagu waa $${balance}.`;
             console.log(transaction);
             transactions.push(transaction);
         } else {
             console.log("Lambarka sireed waa khalad.");
         }
     }
     return balance;
 }
 
 /**
  * Provides a summary of recent transactions.
  * 
  * @param {Array} transactions - An array of previous transactions.
  */
 function warbixinKooban(transactions) {
     console.log("******** Warbixin Kooban ********");
     console.log("* 1. Dhaqdhaqaaqa u dambeeya     *");
     console.log("* 2. U wareejintii u dambeysay   *");
     console.log("* 3. Saddexda u dambeysay        *");
     console.log("* 4. Ka bax                      *");
     console.log("");
 
     let choice = prompt("Dooro ikhtiyaarka: ");
     if (choice == 1) {
         console.log(transactions[transactions.length - 1]);
     } else if (choice == 2) {
         console.log(transactions[transactions.length - 1]);
     } else if (choice == 3) {
         console.log(transactions.slice(-3).join("\n"));
     } else {
         console.log("Ka bax!");
     }
 }
 
 /**
  * Manages settings, including the option to change the user's PIN or exit.
  */
 function maareynta() {
     console.log("******** Maareynta ********");
     console.log("* 1. Bedel Lambar Sireed   *");
     console.log("* 2. Exit                  *");
     console.log("");
 
     let choice = prompt("Dooro ikhtiyaarka: ");
     if (choice == 1) {
         let isValid = false;
         while (!isValid) {
             let newPin = prompt("Geli lambarka sireedka cusub: ");
             if (validatePin(newPin)) {
                 pin = newPin;
                 console.log("Lambarka sireedka waa la bedelay.");
                 isValid = true;
             } else {
                 console.log("Fadlan geli lambar sax ah.");
             }
         }
     } else {
         console.log("Exit");
     }
 }
 
 /**
  * Displays the main menu and allows the user to select an option.
  */
 function mainMenu() {
     console.log("*");
     console.log("*      Welcome to EVCPlus               *");
     console.log("*");
     console.log("* 1. Itus Hadhaaga                      *");
     console.log("* 2. Kaadhka Hadalka                    *");
     console.log("* 3. U Wareeji                          *");
     console.log("* 4. Warbixin Kooban                    *");
     console.log("* 5. Maareynta                          *");
     console.log("* 6. Ka bax                             *");
     console.log("*");
 
     let choice = prompt("Dooro ikhtiyaarka: ");
     
     switch (choice) {
         case "1":
             itusHadhaaga(balance);
             break;
         case "2":
             balance = kaadhkaHadalka(balance);
             break;
         case "3":
             balance = uWareeji(balance);
             break;
         case "4":
             warbixinKooban(transactions);
             break;
         case "5":
             maareynta();
             break;
         case "6":
             console.log("Ka bax! Mahadsanid isticmaalka EVCPlus.");
             return;
     }
     mainMenu();
 }
 
 // Start by registering the user
 registerUser();
 mainMenu();