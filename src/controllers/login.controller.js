import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../prisma/client.js";

const SERVER_ERROR = {
  message: "An error occurred on the server, please double-check your request!",
};

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          email ? { email } : undefined,
          username ? { username } : undefined,
        ].filter(Boolean),
      },
    });

    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(SERVER_ERROR);
  }
};
