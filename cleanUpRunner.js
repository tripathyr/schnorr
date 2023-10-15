const diskCleanUp = require('./diskCleanUp'); // Provide the correct path to your diskCleanUp.js file

const config = {
    sql_user: "sns_cloud",
    sql_pwd: "HCGe994EMWVzPbg3WybcjZunPA4JAGZrs",
    sql_db: "supernode",
    sql_host: "localhost"
};

diskCleanUp(config)
    .then(result => {
        console.log(result); // Disk clean-up process finished successfully (100%)
        // Additional logic to handle the successful result if needed
    })
    .catch(error => {
        console.error(error); // Handle errors that occurred during the disk clean-up process
    });
