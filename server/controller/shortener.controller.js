import Shortcode from "../model/shortcode.model.js";
import crypto from "crypto";
import { z } from "zod";
import { shortcodeZodSchema } from "../validator/shortcode-validator.js";


export const shortenUrl = async (req, res) => {
    try {  
      const result = shortcodeZodSchema.safeParse(req.body);
      if (!result.success) {
        // console.log(result.error.errors[0].message);
        return res.status(400).json({ message: result.error.errors[0].message });
      }
      const { shortcode: customCode, url } = result.data;
      // console.log(req.user);
      
      const userId = req.user?._id;
  
      if (!url) return res.status(400).json({ message: "URL is required" });
  
      const finalShortcode = customCode || crypto.randomBytes(4).toString("hex");
  
      const existing = await Shortcode.findOne({ shortcode: finalShortcode });
      if (existing) {
        return res.status(409).json({
          message: "Shortcode already exists",
          shortUrl: `${req.protocol}://${req.get("host")}/${existing.shortcode}`,
        });
      }
  
      const newShortcode = new Shortcode({
        shortcode: finalShortcode,
        url,
        user: userId, // Save the user reference
      });
  
      await newShortcode.save();
  
      const shortUrl = `${req.protocol}://${req.get("host")}/api/url/${finalShortcode}`;
      return res.status(201).json({ shortUrl });
  
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  

export const redirectUrl = async (req, res) => {
    try {
        const { shortcode } = req.params; // Match route parameter name

        const doc = await Shortcode.findOne({ shortcode });
        if (!doc) return res.status(404).json({ message: "URL not found" });
        // console.log(doc);
        res.redirect(doc.url);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
export const showuserurls = async (req, res) => {
  try {
    // console.log("showuserurls is called");
    const userId = req.user._id; 
    
    const data = await Shortcode.find({ user: userId }); 
    // console.log("data", data);
    
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No URLs found for this user" });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ message: "Server error" });
  }
}
