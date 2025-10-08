"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import NavItem from "./NavItem";
import { signOut } from "@/lib/actions/auth.actions";

const UserDropdown = ({
	user,
	initialStocks,
}: {
	user: User;
	initialStocks: StockWithWatchlistStatus[];
}) => {
	const router = useRouter();
	const handleSignOut = async () => {
		await signOut();
		router.push("/sign-in");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex items-center gap-3 text-gray-4 hover:text-yellow-500"
				>
					<Avatar className="size-8">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback className="bg-yellow-500 font-bold text-yellow-900 text-sm">
							{user.name[0]}
						</AvatarFallback>
					</Avatar>
					<div className="hidden md:flex flex-col items-start">
						<span className="font-medium text-gray-400 text-base">
							{user.name}
						</span>
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="text-gray-400">
				<DropdownMenuLabel>
					<div className="relative flex items-center gap-3 py-2">
						<Avatar className="size-10">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback className="bg-yellow-500 font-bold text-yellow-900 text-sm">
								{user.name[0]}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<span className="font-medium text-gray-400 text-base">
								{user.name}
							</span>
							<span className="text-gray-500 text-sm">{user.email}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-gray-600" />
				<DropdownMenuItem
					onClick={handleSignOut}
					className="focus:bg-transparent font-medium text-gray-100 text-md focus:text-yellow-500 cursor-pointer trnasition-colors"
				>
					<LogOut className="hidden sm:block mr-2 w-4 h-4" />
					Logout
				</DropdownMenuItem>
				<DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
				<nav className="sm:hidden">
					<NavItem initialStocks={initialStocks} />
				</nav>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdown;
