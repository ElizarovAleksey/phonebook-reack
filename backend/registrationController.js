const User = require('./models/User');
const { ObjectId } = require('mongoose');

// Регистрация пользователей
exports.register = async (req, res) => {
    
    try {
        console.log(req.body);
        const { login, password, email, role } = req.body;
        if (!login || !password || !email) {
            return res.status(400).json({ message: 'Неполные данные для регистрации' });
        }
        const user = new User({ login, password, email, role });
        await user.save();

        res.json({
            message: 'Вы успешно зарегистрировались!'
            });
        } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};