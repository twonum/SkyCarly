import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
	if (!req.auth || !req.auth.userId) {
		return res.status(401).json({ message: "Unauthorized - Please login first" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		// Fetch user details
		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		const userEmail = currentUser.primaryEmailAddress?.emailAddress;

		// Ensure ADMIN_EMAILS is correctly parsed and fallbacks if necessary
		const adminEmails = JSON.parse(process.env.ADMIN_EMAILS || '["default@example.com"]'); // Fallback email for safety

		if (!adminEmails.includes(userEmail)) {
			return res.status(403).json({ message: "Unauthorized - Only admins can access" });
		}

		next();
	} catch (error) {
		console.error("Error in requireAdmin", error);
		next(error); // Pass the error to the next handler
	}
};
