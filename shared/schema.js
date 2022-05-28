const joi = require("joi");

module.exports = {

    async validate(schema, data) {
        try {
            await schema.validateAsync(data);
            return false;

        } catch ({ details: [error] }) {
            return error.message
        }
    },
    signUpSchema: joi.object({
        firstname: joi.string().min(2).required(),
        lastname: joi.string().required(),
        email: joi.string().email().required(),
        mobile: joi.number().positive().min(10).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cpassword: joi.ref("password")
    }),

    signInSchema: joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }),

    
    postSchema: joi.object({
        title: joi.string().required(),
        body: joi.string().required(),
    }),
};