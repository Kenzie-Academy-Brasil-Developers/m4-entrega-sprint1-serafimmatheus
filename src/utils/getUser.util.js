export const getUserUtil = (user) => {
  const { password, ...newUser } = user;

  return newUser;
};
