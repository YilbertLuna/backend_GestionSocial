
export const logoutController = (req, res) => {
    const token = req.cookies.token
    if(token) {
        res.cookie('token', '', {
            expires: new Date(0)
        })
        return res.status(200).json("success")
    }
    else {
        return res.status(404).json('no token')
    }
};