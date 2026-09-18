export default function authorization(req, res, next) {
    console.log("URL username:", req.params.username);
    console.log("JWT username:", req.user.username);
    console.log("Role:", req.user.role);
  if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.user.role !== "admin" && req.params.username !== req.user.username) {
      return res.status(403).json({ message: "Access denied" });
  }
  next();
}