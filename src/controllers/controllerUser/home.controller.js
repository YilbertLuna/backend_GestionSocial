export const home = (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const user = req.User
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}