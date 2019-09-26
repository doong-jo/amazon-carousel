const { createConnection } = require("./connection");

module.exports = {
    async createTransaction(query, transaction) {
        try {
            const conn = await createConnection();
            if (!conn) {
                return false;
            }

            try {
                const response = await transaction(conn, query);
                conn.commit();
                conn.release();

                return response;
            } catch (e) {
                await connection.rollback();
                connection.release();
                console.log("transaction.js : Query Error");

                return false;
            }
        } catch (e) {}
    }
};
