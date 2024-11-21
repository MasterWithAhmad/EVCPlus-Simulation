# EVC Plus Simulation

Welcome to the **EVC Plus Simulation**! This project simulates the EVC Plus system, replicating the features of the real-world EVC Plus application. Built with Node.js, this simulation allows users to perform various financial transactions, including money transfers and airtime recharges, all secured by a PIN-based system.

## Features

- **User   Registration**: Easily register using your phone number and a secure PIN.
- **Money Transfers**: Transfer funds to other registered users by selecting their number and entering your PIN.
- **Airtime Recharge**: Recharge airtime for yourself or others by selecting a phone number and entering your PIN.
- **PIN Security**: All transactions (money transfers and airtime recharges) require PIN verification for added security.
- **Transaction Limits**: Prevents users from transferring more than their available balance, ensuring safe transactions.
- **User   Interface**: Console-based interface for straightforward user interactions.

## Requirements

To run this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- Git (for version control)

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MasterWithAhmad/EVCPlus-Simulation.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd evc-plus
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Verify Installation**: Ensure that all dependencies are installed correctly.

   ```bash
   npm list
   ```

## Usage

1. **Run the application**:

   ```bash
   node app.js
   ```

2. **Follow the on-screen prompts** to register, transfer money, or recharge airtime. The application will guide you through each step and prompt you for your PIN during transactions.

3. **Example Commands**:

   - To **register a new user**:
     - Enter your phone number when prompted.
     - Choose a secure PIN.

   - To **transfer money**:
     - Select the recipient's phone number.
     - Enter the amount to transfer.
     - Input your PIN for verification.

   - To **recharge airtime**:
     - Input the phone number you want to recharge.
     - Enter the amount.
     - Confirm with your PIN.

## Troubleshooting

If you encounter issues while running the application, here are some common troubleshooting steps:

1. **Check Node.js Version**: Ensure you are using the correct version of Node.js.

   ```bash
   node -v
   ```

2. **Check for Errors**: If the application fails to run, check for error messages in the console. Common issues may include missing dependencies or incorrect configurations.

3. **Reinstall Dependencies**: If you suspect issues with installed packages, you can delete the `node_modules` folder and reinstall:

   ```bash
   rm -rf node_modules
   npm install
   ```

## Contributing

Contributions are welcome! Here’s how you can help:

- **Fork the repository** and submit your pull requests.
- **Open issues** for any bugs or feature requests.
- **Review existing pull requests** and provide feedback.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements

- **Node.js** for providing the backend environment.
- **GitHub** for hosting the repository.
- The **EVC Plus application** for inspiring this simulation.

---

For further details or assistance, please feel free to open an issue in the repository. Happy simulating!
