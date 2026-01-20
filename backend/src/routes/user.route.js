import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
 const authState = req.auth;
 return res.json(authState);
});

export default router;
