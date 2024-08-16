import { body, validationResult } from "express-validator";

export const validationMiddleware = async (req, res, next) => {
    const rules = [
        body('email').optional().notEmpty().withMessage("Email cannot be empty").custom((value) => {
            if (value.includes(' ')) {
                throw new Error("Email cannot contain spaces");
            }
            return true;
        }),
        body('password').isStrongPassword({
            minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, minLength:6
        }).withMessage("Passsword must contain one uppercase letter, one lowercase letter, one special character and one numeric digit. Password contains minimum 6 characters"),
        body("password").isLength({min:6, max:12}).withMessage("Password contains minimum 6 and maximum 12 characters")        
    ]

    await Promise.all(rules.map((rule) => rule.run(req)))

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errrorMesages = validationErrors.errors.map((obj) => obj.msg);
        return res.status(400).send({
            result: false,
            message: errrorMesages
        });
    }

    next();
}