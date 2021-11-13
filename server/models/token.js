module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("token", {
        username: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        }
    });

    return Token;
};