
export const userController = async (req, res) => {
    const user = req.user
    res.status(200).json({
        message: 'Current user',
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
}
export const adminController = async (req, res) => {
    res.status(200).json({
        message: 'Admin access granted'
    })
}