import jwt from "jsonwebtoken"

export class AccessToken {
    constructor() {
        this.secret = process.env.TOKEN_SECRET
    }

    created(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: '1d', algorithm: 'HS256' });
    }

    verify(token) {
        try {
            return jwt.verify(token, this.secret, (err, user) => {
                if(!err) return user
                else return null
            });
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error("Token expirado");
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Error("Token inválido");
            }
            throw new Error("Error de verificación");
        }
    }
}