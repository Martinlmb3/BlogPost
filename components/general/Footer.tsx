"use client";

import Link from "next/link";

export function Footer(){
    return (    
        <footer className="bg-gray-200 text-gray-800 mt-16 w-full">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">BlogPost</h3>
                        <p className="text-gray-600 mb-6 max-w-md">
                            Share your stories with the world. Create beautiful blog posts with ease and connect with readers who share your passions.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                                <span className="material-icons">facebook</span>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                                <span className="material-icons">alternate_email</span>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                                <span className="material-icons">share</span>
                            </a>
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link></li>
                            <li><Link href="/posts" className="text-gray-600 hover:text-gray-900 transition-colors">Posts</Link></li>
                            <li><Link href="/create" className="text-gray-600 hover:text-gray-900 transition-colors">Create Post</Link></li>
                        </ul>
                    </div>
                    
                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                
                {/* Bottom Section */}
                <div className="border-t border-gray-300 mt-8 pt-8 text-center">
                    <p className="text-gray-500">
                        © {new Date().getFullYear()} BlogPost. All rights reserved. Made with ❤️ for storytellers everywhere.
                    </p>
                </div>
            </div>
        </footer>
    )

}