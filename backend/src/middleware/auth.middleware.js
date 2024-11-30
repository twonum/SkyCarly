import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
	if (!req.auth || !req.auth.userId) {
		return res.status(401).json({ message: "Unauthorized - Please login first" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		// Fetch the current user from Clerk
		const currentUser = await clerkClient.users.getUser(req.auth.userId);
		const userEmail = currentUser.primaryEmailAddress?.emailAddress;

		if (!userEmail) {
			return res.status(400).json({ message: "User email not found" });
		}

		// Parse the ADMIN_EMAILS environment variable and ensure it's a valid list
		let adminEmails = [];
		try {
			adminEmails = JSON.parse(process.env.ADMIN_EMAILS || '[]');
		} catch (error) {
			console.error("Error parsing ADMIN_EMAILS", error);
			return res.status(500).json({ message: "Internal Server Error - Invalid admin email list" });
		}

		// Check if the user's email is in the list of admin emails
		const isAdmin = adminEmails.includes(userEmail);

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - Only admins can access" });
		}

		// Proceed to the next middleware or route handler if the user is an admin
		next();
	} catch (error) {
		console.error("Error in requireAdmin middleware", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
