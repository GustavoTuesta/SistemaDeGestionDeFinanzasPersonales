import { Router } from "express";
import { LoginController } from "../controllers/login/login-controller";

const router = Router();

router.post(
    "/login",
    LoginController
)