# Tintin - Website Scraping and Email Notification

Tintin is a TypeScript project designed to scrape specific websites for certain content and send email notifications with the findings. This service runs automatically every day at 6 PM using the Node.js `node-cron` package. It utilizes various libraries such as `nodemailer`, `firebase`, and `axios` to accomplish its tasks.

## Prerequisites

To run this project locally, make sure you have the following prerequisites installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/en/download/)
- TypeScript: Install TypeScript globally by running `npm install -g typescript`

## Installation

Follow these steps to set up the Tintin project on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/Rubalaine/tintin.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tintin
   ```

3. Install the dependencies:

   ```bash
   yarn install
   ```

4. Configure the project:

   - Create a new `.env` file on root folder based on the `.example.env`

5. Run the project:

   ```bash
   yarn dev
   ```

## Usage

To start the Tintin service, run the following command:

```bash
yarn start
```

The service will run every day at 6 PM and scrape the specified websites for the desired content. Once the content is found, an email notification will be sent to the provided recipient email address.

## Contributing

Contributions to Tintin are always welcome. If you find any bugs, have suggestions, or want to

 add new features, please open an issue or submit a pull request on the [GitHub repository](https://github.com/your-username/tintin).

## License

This project is licensed under the [MIT License](LICENSE).

---