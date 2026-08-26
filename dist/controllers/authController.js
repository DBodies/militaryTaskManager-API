import { login, register } from "../service/auth.js";
export const registerController = async (req, res) => {
    const user = req.body;
    const response = await register(user);
    res.status(201).json({
        message: 'Registration is completed',
        data: response
    });
};
export const loginController = async (req, res) => {
    const { accessToken, user } = await login(req.body);
    res.status(200).json({
        message: 'Logged in',
        data: {
            user,
            accessToken
        }
    });
};
