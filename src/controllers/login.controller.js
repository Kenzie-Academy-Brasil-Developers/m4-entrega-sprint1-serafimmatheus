import { loginUserService } from "../services/loginUser.services";

export const loginUserController = (req, res) => {
  const { email, password } = req.body;

  const loginUser = loginUserService(email, password);

  return res.status(200).json(loginUser);
};
