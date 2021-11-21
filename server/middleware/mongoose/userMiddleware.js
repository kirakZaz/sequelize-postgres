const validator = require('../../helpers/validate');

const userMiddleware = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "username": "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .json({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
};

module.exports = {
    userMiddleware
};