class Constants {
  
    static BASE_URL = 'http://192.168.0.16:45455/api/';
    static EMAIL_REG_EXP = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    static USERNAME_REG_EXP = /^[A-Za-z][A-Za-z0-9]{2,14}$/; //El nombre de usuario debe empezar por una letra, tener entre 3 o 15 caracteres, no llevar espacios y solo puede contener letras (A-Z) y números (0-9).
    static PASSWORD_REG_EXP = /^\S{5,20}$/; //La contraseña debe tener entre 5 y 20 carácteres y no se permiten espacios en blanco.
    static LOGIN_KEY = '@login_key';

};

export default Constants;