import { changePasswordUrl } from './endpoints';
export const handleChangePassword = async (login, newPassword) => {
    console.log("Смена пароля:", login);
    try {
        const response = await fetch(`${changePasswordUrl}/${login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });
        if (!response.ok) {
            throw new Error('Failed to change password');
        }
        return await response.json();
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};