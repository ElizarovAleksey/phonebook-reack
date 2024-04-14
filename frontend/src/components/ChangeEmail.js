import { changeEmailUrl } from './endpoints';
export const handleChangeEmail = async (login, newEmail) => {
    console.log("Смена почты:", login);
    try {
      const response = await fetch(`${changeEmailUrl}/${login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newEmail }),
      });
      if (!response.ok) {
        throw new Error('Failed to change email');
      }
      return await response.json();
    } catch (error) {
      console.error('Error changing email:', error);
      throw error;
    }
  };