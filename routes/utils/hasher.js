const bcrypt = require('bcryptjs');

module.exports = {
    create: str => {
        return new Promise((resolve, reject) => {
            if (str === '') reject('Empty string');

            bcrypt.genSalt(10, (error, salt) => {
                if (error) reject(error);

                bcrypt.hash(str, salt, (err, hash) => {
                    if (err) reject(error);

                    resolve(hash);
                });
            });
        });
    },
    compare: (str, hash) => bcrypt.compare(str, hash)

};
