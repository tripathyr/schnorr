const Database = require("./database_1");
const DB = Database.DB;
const sn_list = ["FBjW246c4VT9KC4p5CLsEjd7gMGcaFWBov", "FQUepiEXu4zhEtENqLA8RXdidXYiCUPeuc"];

function diskCleanUp(config) {
    return new Promise((resolve, reject) => {
        Database.init(config["sql_user"], config["sql_pwd"], config["sql_db"], config["sql_host"])
            .then(() => {
                console.info("Connected to Database");
                DB.getBase()
                    .then(base => {
                        let time = Date.now() - base.sn_config.deleteDelay;
                        let promises = [];

                        sn_list.forEach(sn => {
                            // delete all when app is not authorised.
                            promises.push(DB.clearUnauthorisedAppData_1(sn, Object.keys(base.appList), time)
                                .catch(error => error)); // Handle rejection inside the promise handler.
                            // for each authorised app: delete unofficial data (untagged, unknown sender/receiver)
                            for (let app in base.appList) {
                                promises.push(DB.clearAuthorisedAppData_1(sn, app, base.appList[app], base.appSubAdmins[app], time)
                                    .catch(error => error)); // Handle rejection inside the promise handler.
                            }
                        });

                        Promise.allSettled(promises).then(results => {
                            let failed = results.filter(r => r.status === "rejected").map(r => r.reason);
                            if (failed.length) {
                                console.error(JSON.stringify(failed));
                                let success = results.length - failed.length;
                                reject(`Disk clean-up process has failed at ${100 * success / results.length}%. (Success:${success}|Failed:${failed.length})`);
                            } else {
                                resolve("Disk clean-up process finished successfully (100%)");
                            }
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            })
            .catch(error => {
                console.error("Error connecting to the database:", error);
                reject(error);
            });
    });
}

module.exports = diskCleanUp;
