import "dotenv/config"

import { AccessToken } from "../libs/jwt.js"

const tokenVerifier = new AccessToken()

export const verifyTokenMiddleware = (req, res, next) => {
    // 1. Validación de cookies
    const cookies = req.cookies;
    const token = cookies.token;
    
    if (!token) {
        return res.status(401).json({
            code: 'MISSING_AUTH_TOKEN',
            message: "Authorization token required"
        });
    }

    // 2. Verificación y decodificación
    const decoded = tokenVerifier.verify(token);
    console.log('decoded ' + decoded)
    
    // 3. Validación de estructura básica
    if (!decoded) {
        return res.status(401).json({
            code: 'MALFORMED_TOKEN',
            message: "Invalid token"
        });
    }

    // 4. Inyección en el request
    req.User = decoded

    next();
}