export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 py-6 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-600">
                            © {currentYear} Education System. All rights reserved.
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-600 hover:text-primary text-sm">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-600 hover:text-primary text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-600 hover:text-primary text-sm">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}