import { Link } from 'react-router-dom';
import { useAuth} from "@/hooks/useAuth.ts";
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { BookOpen, LogOut, User as UserIcon } from 'lucide-react';

export function Header() {
    const { user, logout, isAuthenticated } = useAuth();

    const getInitials = (name?: string) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link to="/" className="text-xl font-bold text-primary">
                        EduSystem
                    </Link>

                    <nav className="ml-10 hidden md:flex space-x-4">
                        <Link to="/courses" className="text-gray-600 hover:text-primary">
                            Courses
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link to="/my-courses" className="text-gray-600 hover:text-primary">
                                    My Courses
                                </Link>
                            </>
                        )}
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="" alt={user?.userName || 'User'} />
                                        <AvatarFallback>{getInitials(user?.firstName || user?.userName)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="cursor-pointer flex w-full items-center">
                                        <UserIcon className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/my-courses" className="cursor-pointer flex w-full items-center">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        <span>My Courses</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/register">Register</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}