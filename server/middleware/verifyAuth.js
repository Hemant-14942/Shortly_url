import jwt from 'jsonwebtoken';
import sessionModel from '../model/session.model.js';
import userModel from '../model/user.model.js';
import { ACCESS_TOKEN_EXPIRY ,REFRESH_TOKEN_EXPIRY,MILLISECONDS_PER_SECOND} from '../config/constants.js';

export const verifyAuth = async (req, res, next) => {
  try {
    console.log("verify auth is called 🤙 ");
    const accessToken = req?.cookies?.access_token;
    const refreshToken = req?.cookies?.refresh_token;
    
    // If no tokens at all, return unauthorized immediately
    if (!accessToken && !refreshToken) {
      req.user = null;
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }

    // Try access token first
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');
        if (!user) return res.status(401).json({ message: 'User not found' });
        req.user = user;
        return next(); // Return here to prevent further execution
      } catch (err) {
        // Don't return response here, fall through to try refresh token
        console.log("Access token invalid, trying refresh token");
      }
    }

    // Try refresh token if access token failed
    if (refreshToken) {
      try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const session = await sessionModel.findById(decodedRefresh.id);
        if (!session || !session.valid) {
          return res.status(401).json({ message: 'Session expired or invalid' });
        }

        const user = await userModel.findById(session.user).select('-password');
        if (!user) return res.status(401).json({ message: 'User not found' });

        // Invalidate old session
        session.valid = false;
        await session.save();

        // Create new session and tokens
        // ... (rest of your token refresh code)
        const newSession = new sessionModel({
                user: user._id,
                userAgent: req.headers["user-agent"],
                ip: req.ip,
              });
              await newSession.save();
              
              // Create new tokens
              const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              const refreshToken = jwt.sign({ id: newSession._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
              
              // Set new cookies
              const baseConfig = { 
                httpOnly: true, 
                secure: true,
                sameSite: 'None' 
              };
              
              res.cookie("access_token", accessToken, {
                ...baseConfig,
                maxAge: ACCESS_TOKEN_EXPIRY,
              });
              
              res.cookie("refresh_token", refreshToken, {
                ...baseConfig,
                maxAge: REFRESH_TOKEN_EXPIRY,
              });
        
        req.user = user;
        return next(); // Return here to prevent further execution
      } catch (err) {
        return res.status(401).json({ message: 'Session expired. Please login again.' });
      }
    }
    
    // This should never be reached due to the initial check, but just in case
    return res.status(401).json({ message: 'Unauthorized. Please login.' });

  } catch (error) {
    return res.status(500).json({ message: 'Server error in authentication' });
  }
};

export const softverifyAuth = async (req, res, next) => {
  try {
    // console.log("soft verify auth is called 🤙 ");
    const accessToken = req?.cookies?.access_token;
    // console.log("access token:", accessToken ? "present" : "missing");

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');
        if (user) {
          req.user = user;
          // console.log("User authenticated via access token:", user.username);
        }
      } catch (err) {
        // console.log("Access token invalid, trying refresh token");
      }
    }

    if (!req.user) {
      const refreshToken = req?.cookies?.refresh_token;
      // console.log("refresh token:", refreshToken ? "present" : "missing");

      if (refreshToken) {
        try {
          const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);
          const session = await sessionModel.findById(decodedRefresh.id);
          
          if (session?.valid) {
            const user = await userModel.findById(session.user).select('-password');
            if (user) {
              req.user = user;
              console.log("User authenticated via refresh token:", user.username);
              
              // Create new session and tokens
              // Invalidate old session
              session.valid = false;
              await session.save();
              
              // Create new session
              const newSession = new sessionModel({
                user: user._id,
                userAgent: req.headers["user-agent"],
                ip: req.ip,
              });
              await newSession.save();
              
              // Create new tokens
              const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              const refreshToken = jwt.sign({ id: newSession._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
              
              // Set new cookies
              const baseConfig = { 
                httpOnly: true, 
                secure: true,
                sameSite: 'None' 
              };
              
              res.cookie("access_token", accessToken, {
                ...baseConfig,
                maxAge: ACCESS_TOKEN_EXPIRY,
              });
              
              res.cookie("refresh_token", refreshToken, {
                ...baseConfig,
                maxAge: REFRESH_TOKEN_EXPIRY,
              });
              
              // console.log("Created new session and refreshed tokens");
            }
          }
        } catch (err) {
          console.log("Refresh token invalid:", err.message);
        }
      }
    }

    return next();
  } catch (error) {
    console.error("Error in softverifyAuth:", error);
    return next();
  }
};
