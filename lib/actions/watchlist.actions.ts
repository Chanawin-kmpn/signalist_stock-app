"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../better-auth/auth";

export async function getWatchlistSymbolsByEmail(
	email: string
): Promise<string[]> {
	if (!email) return [];

	try {
		const mongoose = await connectToDatabase();
		const db = mongoose.connection.db;
		if (!db) throw new Error("MongoDB connection not found");

		// Better Auth stores users in the "user" collection
		const user = await db
			.collection("user")
			.findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

		if (!user) return [];

		const userId = (user.id as string) || String(user._id || "");
		if (!userId) return [];

		const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
		return items.map((i) => String(i.symbol));
	} catch (err) {
		console.error("getWatchlistSymbolsByEmail error:", err);
		return [];
	}
}

// Get user's watchlist with stock data
export const getWatchlistWithData = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session?.user) redirect("/sign-in");

		const watchlist = await Watchlist.find({ userId: session.user.id })
			.sort({ addedAt: -1 })
			.lean();

		if (watchlist.length === 0) return [];

		const stocksWithData = await Promise.all(
			watchlist.map(async (item) => {
				const stockData = await getStocksDetails(item.symbol);

				if (!stockData) {
					console.warn(`Failed to fetch data for ${item.symbol}`);
					return item;
				}

				return {
					company: stockData.company,
					symbol: stockData.symbol,
					currentPrice: stockData.currentPrice,
					priceFormatted: stockData.priceFormatted,
					changeFormatted: stockData.changeFormatted,
					changePercent: stockData.changePercent,
					marketCap: stockData.marketCapFormatted,
					peRatio: stockData.peRatio,
				};
			})
		);

		return JSON.parse(JSON.stringify(stocksWithData));
	} catch (error) {
		console.error("Error loading watchlist:", error);
		throw new Error("Failed to fetch watchlist");
	}
};
