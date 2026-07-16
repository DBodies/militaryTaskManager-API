import { Router } from "express";
const router = Router();

router.get('/', (req,res) => {
    res.status(200).json({
        message: "Military Task Manager API is alive"
    })
})

export default router