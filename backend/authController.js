// authController.js
const jwt = require('jsonwebtoken');
const { secret } = require('./secret');
const User = require('./models/User');

// Генерация токенов для авторизации пользователя
const generateAccessToken = (login, role) => {
    const payload = {
        login: login.toString(), // Преобразование в строку, если необходимо
        role: role.toString() // Преобразование в строку, если необходимо
    }
    return jwt.sign(payload, secret, { expiresIn: '24h' });
};
   // Авторизация пользователей
exports.login = async (req, res) => {
    try {
        if (!req.body || !req.body.login || !req.body.password) {
            return res.status(400).json({ message: 'Неполные данные для входа' });
        }
        const { login, password } = req.body;
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден!' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Неверный логин или пароль!' });
        }
        const token = generateAccessToken(user.login, user.role);
        const userData = { login: user.login, username: user.username, email: user.email, registrationDate: user.registrationDate, role: user.role };
        res.json({
            message: 'Вы успешно авторизовались!',
            token: token,
            user: userData
        });
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};