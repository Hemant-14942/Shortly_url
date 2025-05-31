import express from "express";
const router = express.Router();

import { shortenUrl, redirectUrl,showuserurls } from "../controller/shortener.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

// Shorten URL
router.route('/shorten').post(verifyAuth, shortenUrl);


// Make sure this route is defined exactly as shown
router.get('/getuserurls', verifyAuth, showuserurls);

// Redirect using shortcode (optional)
router.route('/:shortcode').get(redirectUrl);

// Export router correctly using the same variable name
export default router;
