import jwt from "jsonwebtoken"

export class AccessToken {
    constructor() {
        this.secret = process.env.TOKEN_SECRET
    }

    createdAccesToken(payload) {
        return jwt.sign(
            payload,
            this.secret,
            {expiresIn: '1d'}
        )
    }
}