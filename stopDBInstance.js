const AWS = require("aws-sdk");

exports.handler = async (event) => {

    AWS.config.update({ region: 'us-east-1' });

    const rds = new AWS.RDS();
    
    const dbInstanceIdentifier = process.env.DB_INSTANCE_IDENTIFIER;

    if (!dbInstanceIdentifier) {
        return { statusCode: 400, body: "DB_INSTANCE_IDENTIFIER environment variable is not set" };
    }

        await rds.stopDBInstance({ DBInstanceIdentifier: dbInstanceIdentifier }).promise();

    return { statusCode: 200, body: "Operation completed successfully" };
};
