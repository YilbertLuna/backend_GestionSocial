export const validatorBody = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        return next()
    } catch (error) {
        return res.status(403).json({ error: error.errors.map(({message}) => message)});
    }
}