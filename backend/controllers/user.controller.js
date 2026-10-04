import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { OAuth2Client } from "google-auth-library";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let profilePhotoUrl = "";
        const file = req.file;

        // Upload profile photo to Cloudinary if file is present
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: 'auto',
                folder: 'profile_photos',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                    { quality: 'auto' }
                ]
            });
            profilePhotoUrl = cloudResponse.secure_url;
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl,
            }
        });

        // Auto-login: generate JWT and set cookie (same as login)
        const tokenData = { userId: newUser._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            role: newUser.role,
            profile: newUser.profile
        };

        return res.status(201)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: "Account created successfully.",
                user,
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating account.",
            success: false
        });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password entered.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        //stroring response into the cookie
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        let cloudResponse = null;

        // 1) handle file upload first (if present)
        if (file) {
            const fileExtension = file.originalname.split('.').pop().toLowerCase();
            if (fileExtension !== 'pdf') {
                return res.status(400).json({
                    message: "Only PDF files are allowed for resume upload.",
                    success: false
                });
            }

            const fileUri = getDataUri(file);
            if (!fileUri || (!fileUri.content && typeof fileUri !== "string")) {
                return res.status(500).json({ message: "Failed to parse file for upload.", success: false });
            }

            cloudResponse = await cloudinary.uploader.upload(
                (typeof fileUri === "string" ? fileUri : fileUri.content),
                {
                    folder: 'resumes',
                    public_id: `resume_${Date.now()}`, // <-- DO NOT append .pdf here
                    resource_type: 'raw',              // <-- required for docs
                    format: 'pdf',                     // <-- ensure .pdf and correct headers
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true
                }
            );
        }

        const skillsArray = skills ? skills.split(",").map(s => s.trim()).filter(Boolean) : undefined;

        // 2) auth check / get userId
        const userId = req.id || req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        // 3) FETCH USER BEFORE USING IT (this prevents TDZ/ReferenceError)
        let foundUser = await User.findById(userId);
        if (!foundUser) {
            return res.status(400).json({ message: "User not found.", success: false });
        }

        // 4) Now update fields — use braces to avoid accidental early execution
        if (fullname) {
            foundUser.fullname = fullname;
        }
        if (email) {
            foundUser.email = email;
        }
        if (phoneNumber) {
            foundUser.phoneNumber = phoneNumber;
        }

        // ensure profile object exists
        foundUser.profile = foundUser.profile || {};

        if (bio) {
            foundUser.profile.bio = bio;
        }
        if (skillsArray) {
            foundUser.profile.skills = skillsArray;
        }

        if (cloudResponse) {
            // use Cloudinary's secure_url (already includes .pdf when format:'pdf' was used)
            foundUser.profile.resume = cloudResponse.secure_url;
            foundUser.profile.resumeOriginalName = file.originalname;
        }

        await foundUser.save();

        const userResponse = {
            _id: foundUser._id,
            fullname: foundUser.fullname,
            email: foundUser.email,
            phoneNumber: foundUser.phoneNumber,
            role: foundUser.role,
            profile: foundUser.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: userResponse,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating profile.", success: false });
    }
};

// Google OAuth Login / Signup
export const googleLogin = async (req, res) => {
    try {
        const { credential, role } = req.body;

        if (!credential) {
            return res.status(400).json({
                message: "Google credential is required.",
                success: false
            });
        }

        // Verify the Google ID token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const { sub: googleId, email, name, picture } = payload;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            // Existing user — log them in directly with their established account and role
            if (!user.googleId) {
                user.googleId = googleId;
                if (!user.provider || user.provider === 'local') {
                    user.provider = 'google';
                }
                await user.save();
            }
        } else {
            // New user — determine role (default to selected role, or 'student')
            const assignedRole = (role === 'recruiter' || role === 'student') ? role : 'student';

            user = await User.create({
                fullname: name,
                email,
                role: assignedRole,
                googleId,
                provider: 'google',
                profile: {
                    profilePhoto: picture || "",
                }
            });
        }

        // Generate JWT
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' })
            .json({
                message: `Welcome ${user.fullname}`,
                user: userData,
                success: true
            });
    } catch (error) {
        console.error("Google login error:", error);
        return res.status(500).json({
            message: "Google authentication failed.",
            success: false
        });
    }
};

