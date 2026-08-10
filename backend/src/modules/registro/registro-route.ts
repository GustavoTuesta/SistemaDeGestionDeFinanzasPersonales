import { Router } from "express";
import { RegisterController } from "./registro-controller";

const router = Router();

router.post(
    "/register",
    RegisterController
)

export default router;