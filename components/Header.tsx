import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItem from "./NavItem";
import UserDropdown from "./UserDropdown";

const Header = () => {
	return (
		<header className="top-0 sticky header">
			<div className="container header-wrapper">
				<Link href="/">
					<Image
						src="/assets/icons/logo.svg"
						alt="Signalist logo"
						width={140}
						height={32}
						className="w-auto h-8 cursor-pointer"
					/>
				</Link>
				<nav className="hidden sm:block">
					<NavItem />
				</nav>
				{/* User Dropdown */}
				<UserDropdown />
			</div>
		</header>
	);
};

export default Header;
