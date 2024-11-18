"use client";
import {useParams} from "next/navigation";

export default function LoginPage() {
    const params = useParams();
    const tenant = params.subdomain;

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center mb-4 text-black">
                    {tenant ? `Welcome to ${tenant}` : "Welcome"}
                </h1>
            </div>
        </div>)
}