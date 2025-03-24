import {
    UndefinedUserLoginError,
    TypeUserLoginError,
    UndefinedUserPasswordError,
    TypeUserPasswordError,
    UndefinedData,
    PersonIsExist,
    InvalidCode,
    VerifyInitialLettersInRange
} from "./errorHandler.middleware.js";

export function validateUserLogin (userLogin) {
    if(!userLogin) {
        throw new UndefinedUserLoginError();
    }
    if(typeof userLogin !== "string") {
        throw new TypeUserLoginError()
    }
}

export function validateUserPassword (userPassword){
    if(!userPassword) {
        throw new UndefinedUserPasswordError()
    }
    if(typeof userPassword !== "string") {
        throw new TypeUserPasswordError()
    }
}

export function validateData (data) {
    if(data.length === 0) {
        throw new UndefinedData()
    }
}

export function validatePersonIsExist (person) {
    if(person.length > 0) {
        throw new PersonIsExist()
    }
}

export function validateCode (newNumber, numInitial, lastNumber) {
    if (newNumber < numInitial || newNumber > lastNumber) {
        throw new InvalidCode();
    }
}

export function validateLettersRange (currentLetters, initialsDependencyLetters, lastDependencesLetters) {
    if (currentLetters !== initialsDependencyLetters || currentLetters !== lastDependencesLetters) {
        console.log(currentLetters, initialsDependencyLetters, currentLetters, lastDependencesLetters)
        throw new VerifyInitialLettersInRange();
    }
}