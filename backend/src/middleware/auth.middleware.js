import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
	if (!req.auth || !req.auth.userId) {
		return res.status(401).json({ message: "Unauthorized - Please login first" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		const userEmail = currentUser.primaryEmailAddress?.emailAddress;

		// Parse the ADMIN_EMAILS environment variable (ensure it is treated as a list)
		const adminEmails = JSON.parse(process.env.ADMIN_EMAILS || '[]');

		// Check if the user's email is in the list of admin emails
		const isAdmin = adminEmails.includes(userEmail);

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - Only admins can access" });
		}

		next();
	} catch (error) {
		next(error);
	}
};
