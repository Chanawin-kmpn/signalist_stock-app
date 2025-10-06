"use client";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = () => {
	const pathName = usePathname();
	const isActive = (path: string) => {
		if (path === "/") return pathName === "/";
	};
	return (
		<ul className="flex sm:flex-row flex-col gap-3 sm:gap-10 p-2 font-medium">
			{NAV_ITEMS.map(({ href, label }) => (
				<li key={href}>
					<Link
						href={href}
						className={`hover:text-yellow-500 transition-colors ${
							isActive(href) ? "text-gray-100" : ""
						}`}
					>
						{label}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavItem;
