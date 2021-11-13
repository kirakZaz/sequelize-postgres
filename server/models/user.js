module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your email address'
            },
            unique: {
                args: true,
                msg: 'Email already exists'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email address'
                },
            },
        },
        role: {
          type: Sequelize.STRING
        }
    });

    return User;
};