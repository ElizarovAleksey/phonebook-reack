const jwt = require('jsonwebtoken');
const { secret } = require('./secret');
const User = require('./models/User');

exports.changePassword = async (req, res) => {
    const { login } = req.params; // Параметр URL с логином
    const { newPassword } = req.body; // Новый пароль из тела запроса
    try {
        // Проверяем, существует ли пользователь с данным логином
        const user = await User.findOne({ user:login });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        // Обновляем пароль
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Пароль успешно изменен' });
    } catch (error) {
        console.error('Ошибка при изменении пароля:', error);
        res.status(500).json({ message: 'Ошибка при изменении пароля' });
    }
};

 exports.changeEmail = async (req, res) => {
  const { login } = req.params; // Параметр URL с _id
  const { newEmail } = req.body; // Новый адрес электронной почты из тела запроса

  try {
    // Проверяем, существует ли пользователь с данным _id
    const user = await User.findOne({ user:login });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Обновляем адрес электронной почты
    user.email = newEmail;
    await user.save();
    
    res.status(200).json({ message: 'Адрес электронной почты успешно изменен' });
  } catch (error) {
    console.error('Ошибка при изменении адреса электронной почты:', error);
    res.status(500).json({ message: 'Ошибка при изменении адреса электронной почты' });
  }
}; 