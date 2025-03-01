import axios from "axios";

export const getErrorMessage = (error: unknown) => {
  let errorMessage = "Произошла ошибка при загрузке данных: ";

  if (axios.isAxiosError(error)) {
    const axiosError = error;

    // 404 или 500
    if (axiosError.response) {
      errorMessage = `Ошибка сервера: ${axiosError.response.status} - ${axiosError.response.data.message}`;
      // Ошибка сервера: 404 - Products not found
    } else if (axiosError.request) {
      errorMessage = "Нет ответа от сервера";
    } else {
      errorMessage = `Ошибка: ${axiosError.message}`;
    }
  } else if (error instanceof Error) {
    errorMessage = `Ошибка: ${error.message}`;
  }

  console.error(errorMessage);

  return errorMessage;
};
