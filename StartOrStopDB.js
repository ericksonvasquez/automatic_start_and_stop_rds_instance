const AWS = require("aws-sdk");
exports.handler = async (event) => {
    // Set the AWS region to 'us-east-1'
    AWS.config.update({ region: 'us-east-1' });
    // Create an RDS service object
    const rds = new AWS.RDS();
    // Specify the RDS instance identifier
    const dbInstanceIdentifier = process.env.DB_INSTANCE_IDENTIFIER;
    // Check if the DBInstanceIdentifier is set
    if (!dbInstanceIdentifier) {
        return { statusCode: 400, body: "DB_INSTANCE_IDENTIFIER environment variable is not set" };
    }
    // Determine if the RDS instance is currently stopped or running
    const instanceDetails = await rds.describeDBInstances({ DBInstanceIdentifier: dbInstanceIdentifier }).promise();
    const instanceStatus = instanceDetails.DBInstances[0].DBInstanceStatus;
    // Toggle the instance status
    if (instanceStatus === "available") {
        await rds.stopDBInstance({ DBInstanceIdentifier: dbInstanceIdentifier }).promise();
    } else if (instanceStatus === "stopped") {
        await rds.startDBInstance({ DBInstanceIdentifier: dbInstanceIdentifier }).promise();
    }
    return { statusCode: 200, body: "Operation completed successfully" };
};
