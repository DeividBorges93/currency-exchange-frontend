import { User, UserSchema, UserLoginWithUsernameSchema, UserLoginWithEmailSchema } from '../schemas/schemas';

export const validateFieldsUser = (user: User) => {
  const validatedUser = UserSchema.safeParse(user);

  if (validatedUser.success === false) return {code: 401, message: validatedUser.error.issues[0].message} as IError;
};

export const validateFieldsLoginWithUsername = (user: IUserWithUsername) => {
  const validatedUser = UserLoginWithUsernameSchema.safeParse(user);

  if (validatedUser.success === false) return {code: 401, message: validatedUser.error.issues[0].message} as IError;
};

export const validateFieldsLoginWithEmail = (user: IUserWithEmail) => {
  const validatedUser = UserLoginWithEmailSchema.safeParse(user);

  if (validatedUser.success === false) return {code: 401, message: validatedUser.error.issues[0].message} as IError;
};