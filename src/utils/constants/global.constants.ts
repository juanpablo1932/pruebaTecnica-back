export enum errors {
  ERROR = 'Error',
  EMAIL_EXIST = 'El correo ya existe',
  USER_NOT_REGISTERED = 'Usuario no registrado',
  PASSWORD_NOT_MATCH = 'Contraseña incorrecta',
  USER_DOES_NOT_EXIST = 'El usuario no existe',
  ROL_DOES_NOT_EXIST = 'El rol no existe',
}

export enum success {
  OK = 'Operación exitosa',
  REGISTER = 'Usuario registrado exitosamente',
  LOGIN = 'Usuario logueado exitosamente',
  USER_UPDATED = 'Usuario actualizado exitosamente',
  ROL_CREATED = 'Rol creado exitosamente',
  ROL_UPDATED = 'Rol actualizado exitosamente',
}
