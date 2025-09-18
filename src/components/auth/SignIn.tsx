"use client"
import React, { useActionState } from "react";
import Form from "next/form";
import {Loader2} from "lucide-react";
import Link from "next/link";  

export type SignInState = { message: string | undefined }
type SignInProps = {
    action: (prevState: SignInState, formData: FormData) => Promise<SignInState>
}

const initialState = { message: '',}
 const SignIn = ({action}: SignInProps) => {
    const [state, formAction, isPending] = useActionState(action,initialState)
    return (
        <Form action={formAction} className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-3">
                    Welcome Back!
                </h1>
                <p className="text-center text-sm text-emerald-600 font-semibold mb-2 flex items-center justify-center gap-2">
                    <span className="animate-pulse">🔥</span>
                    MEMBER EXCLUSIVE
                    <span className="animate-pulse">🔥</span>
                </p>
                <p className="text-center text-sm text-gray-600 font-medium">
                    Sign in to access your exclusive membership deals!
                </p>
            </div>
            <div className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                    <label htmlFor='email' className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input type="email" id="email" name="email" autoComplete="email" required
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    placeholder="Enter your Email"/>
                </div>
                {/* Password */}
                <div className="space-y-2">
                    <label htmlFor='password' className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input type="password" id="password" name="password" autoComplete="new-password" required
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    placeholder="Create Password"/>
                </div>
                {/* Copywriting */}
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2"> ⚡Members save an extra 5% on all Orders!</p>
                    <p className="text-xs text-gray-500 mb-5"> 🎖️Plus get free shipping on orders over $650</p>
                </div>
                {/* Submit Button */}
                <button type="submit" disabled={isPending} title=""
                    className={`w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105
                    ${isPending ? 'cursor-not-allowed opacity-75' : ''}`}
                    >{isPending ? (
                        <React.Fragment>
                            <Loader2 className='h-5 w-5 animate-spin' />
                            SIGNING IN...
                        </React.Fragment>
                    ) : (
                        'SIGN IN'
                    )}

                </button>
                {state?.message && state.message.length > 0 && (
                    <p className="text-center text-sm text-red-700">
                        {state.message}
                    </p>
                )}
                
                {/* Navigation to Sign Up */}
                <div className="text-center pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">
                        Don't have an account?
                    </p>
                    <Link 
                        href="/auth/sign-up"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors hover:underline"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </Form>
    )
 }

export default SignIn