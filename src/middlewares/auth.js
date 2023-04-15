import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.send({ message: `Unauthorized.` });
    }

    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = token.length < 500;

    let decodedToken;
    if (token && isCustomAuth) {
      decodedToken = jwt.verify(token, process.env.SECRET);

      req.user = decodedToken.payload;
    } else {
      decodedToken = jwt.decode(token);

      req.user = {
        id: decodedToken.sub,
        email: decodedToken.email,
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
      };
    }

    return next();
  } catch (error) {
    return res.send({ status: error.name, message: error.message });
  }
};

export default auth;
