import { loginUserService } from "../services/loginUser.services";

export const loginUserController = (req, res) => {
  const { email, password } = req.body;

  const loginUser = loginUserService(email, password);

  if (loginUser) {
    return res.status(200).json({ token: loginUser });
  } else {
    return res.status(401).json({ message: "Wrong email/password" });
  }
};
