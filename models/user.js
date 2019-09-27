const bcrypt = require("bcrypt");
const _ = require("../services/constants");

module.exports = {
    async findByID(conn, query) {
        const { id } = query;
        const [rows] = await conn.query(`SELECT * FROM user WHERE id = ?`, [
            id
        ]);
        return rows;
    },

    async findAll(conn, query) {
        const [rows] = await conn.query("SELECT * FROM user");
        return rows;
    },

    async insertOne(conn, query) {
        query.favorite = query.favorite.join(",");
        query.pwd = await bcrypt.hash(query.pwd, _.SALT_ROUNDS);

        const args = [];
        for (const value of Object.values(query)) {
            args.push(value);
        }
        // is_admin
        args.push(0);

        await conn.query(
            "INSERT INTO user (`id`, `password`, `name`, `birth`, `gender`, `email`, `phone`, `favorite`, `is_admin`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            args
        );
        return true;
    }

    // /**
    //  * 하나의 사용자 정보를 조회한다.
    //  *
    //  * @param {object} query 요청 쿼리
    //  * @param {object} projection 추출(select) 옵션
    //  * @param {object} options 요청 옵션
    //  * @returns {Promise} DB promise
    //  */
    // findOne(query, projection, options) {
    //     // return userCollection.findOne(query, projection, options).exec();
    // },

    // /**
    //  * 새로운 사용자를 생성한다.
    //  *
    //  * @param {*} reqSnapshot 사용자 정보
    //  * @param {object} options 요청 옵션
    //  * @returns {Promise} DB promise
    //  */
    // insert(reqSnapshot, options) {
    //     // const snapshopt = new userCollection(reqSnapshot);
    //     // return snapshopt.save(options);
    // },

    // /**
    //  * 사용자 수를 조회한다.
    //  *
    //  * @param {object} query 요청 쿼리
    //  * @returns {Promise} DB promise
    //  */
    // count(query) {
    //     // return userCollection.countDocuments(query).exec();
    // }
};
