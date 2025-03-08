export class UndefinedUserLoginError extends Error {
    constructor() {
        super(" username is required")
        this.name = "UndefinedUserLoginError"
    }
}

export class TypeUserLoginError extends Error {
    constructor() {
        super(" username must be a string")
        this.name = "TypeUserLoginError"
    }
}

export class TypeUserPasswordError extends Error {
    constructor() {
        super("user password must be a string")
        this.name = "TypeUserPasswordError"
    }
}

export class UndefinedUserPasswordError extends Error {
    constructor() {
        super("user password is required")
        this.name = "UndefinedUserPasswordError"
    }
}

export class IncorretUserPasswordError extends Error {
    constructor() {
        super("incorrect password")
        this.name = "compareUserPasswordError"
    }
}

export class UndefinedLoginPassword extends Error {
    constructor() {
        super("userLogin and password is required")
        this.name = "UndefinedLoginPassword"
    }
}

export class UndefinedData extends Error {
    constructor() {
        super("this user not found")
        this.name = "UndefinedData"
    }
}