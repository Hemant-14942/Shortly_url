import express from "express";
const router = express.Router();
import * as authController from "../controller/auth.controller.js";
import { verifyAuth ,softverifyAuth} from "../middleware/verifyAuth.js";
              

router.route('/register').post(authController.registerPost);
router.route('/login').post(authController.loginPost);
router.get('/me',softverifyAuth, authController.getMe);
router.post('/logout',verifyAuth, authController.logoutPost);

export default router;
