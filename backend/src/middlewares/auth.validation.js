import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {    
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({
            result: false,
            message: "Unauthorized"
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
    } catch (e) {
        console.log(e);        
        return res.status(401).send({
            result: false,
            message: "Unauthorized"
        })
    }
    next();

}
