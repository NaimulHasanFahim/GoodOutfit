import jsonwebtoken from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
  // console.log(req.headers);
  const authHeader = req.body.token;
  // console.log(authHeader);
  if (authHeader) {
    // const token = authHeader.split(" ")[1];
    const token = authHeader;
    // console.log(token);
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
export const verifyTokenAndAdmin = (req, res, next) => {
  const isAdmin = req.body.isAdmin;
  if (isAdmin) {
    next();
  } else {
    res.status(403).json("You are not alowed to do that!");
  }
};
