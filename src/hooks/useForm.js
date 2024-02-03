import { useState, useCallback } from 'react';
import * as EmailValidator from 'email-validator';

export default function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const { value, name } = target;

    if (name === 'name' && target.validity.patternMismatch) {
        target.setCustomValidity('Имя должно содержать только латиницу, кириллицу, пробел или дефис.')
    } else {
        target.setCustomValidity('');
    }

    if (name === 'email') {
      if (!EmailValidator.validate(value)) {
        target.setCustomValidity('Некорректый адрес почты.');
      } else {
        target.setCustomValidity('');
      }
    }

    setValues({ ...values, [name]: value }); // универсальный обработчик полей
    setErrors({ ...errors, [name]: target.validationMessage }); // ошибок
    setIsValid(target.closest('form').checkValidity()); // проверка валидности
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => { // это метод для сброса формы, полей, ошибок
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm, setIsValid };
}
