import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
