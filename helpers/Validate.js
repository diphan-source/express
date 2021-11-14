const joi = require('joi');

const validatelogin = ( data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    return schema.validate(data);
}

const validateregister = ( data) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    return schema.validate(data);
}

module.exports = {
    validatelogin,
    validateregister
}