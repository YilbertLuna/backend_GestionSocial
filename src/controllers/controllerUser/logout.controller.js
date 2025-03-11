
export const logoutController = (req, res) => {
    // delete token on cookie
    res.cookie('token', '', {
        expires: new Date(0)
    })

    res.sendStatus(200)
};