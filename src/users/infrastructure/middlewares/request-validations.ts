import {validationResult} from "express-validator";

export const validations = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const uniqueErrors = Array.from(new Set(errors.array().map(err => err.msg)))
            .map(msg => {
                return {
                    msg: msg
                };
            });

        return res.status(422).json({errors: uniqueErrors});
    }

    next();
}