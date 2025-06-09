import mongoose from "mongoose";
const shortcodeSchema = new mongoose.Schema({
    url: { type: String, required: true },
    shortcode: { type: String, unique: true,index:true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // <- associate user
    createdAt: { type: Date, default: Date.now },
    expiresAt: {
        type: Date,
        default: null,
    }, 
  });

const Shortcode =  mongoose.models.Shortcode||mongoose.model("Shortcode", shortcodeSchema);
export default Shortcode;