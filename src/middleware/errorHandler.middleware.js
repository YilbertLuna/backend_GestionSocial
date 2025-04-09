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

export class UndefinedData extends Error {
    constructor() {
        super("this user not found")
        this.name = "UndefinedData"
    }
}

export class PersonIsExist extends Error {
    constructor() {
        super("this person already exists")
        this.name = "PersonIsExist"
    }
}

export class InvalidCode extends Error {
    constructor() {
        super("invalid code. The generated number is outside the allowed range")
        this.name = "InvalidCode"
    }
}

export class VerifyInitialLettersInRange extends Error {
    constructor() {
        super("the initial letters of the range do not match")
        this.name = "verifyInitialLettersInRange"
    }
}

export class NotFound extends Error {
    constructor() {
        super("not results")
        this.name = "NotFound"
    }
}