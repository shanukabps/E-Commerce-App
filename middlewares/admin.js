module.exports = async (req, res, next) => {
  // 401 Unauthorized
  // 403 Forbidden
  const token = await req.header("x-auth-token");
  //console.log('btoken', token)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
