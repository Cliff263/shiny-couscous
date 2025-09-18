"use client"
import React, { useActionState } from "react";
import Form from "next/form";
import {Loader2} from "lucide-react";
import Link from "next/link";  

export type SignUpState = { message: string | undefined }
type SignUpProps = {
    action: (prevState: SignUpState, formData: FormData) => Promise<SignUpState>
}

const initialState = { message: '',}
 const SignUp = ({action}: SignUpProps) => {
    const [state, formAction, isPending] = useActionState(action,initialState)
    return (
        <Form action={formAction} className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-3">
                    Join the DEAL Revolution!
                </h1>
                <p className="text-center text-sm text-emerald-600 font-semibold mb-2 flex items-center justify-center gap-2">
                    <span className="animate-pulse">🔥</span>
                    LIMITED TIME OFFER
                    <span className="animate-pulse">🔥</span>
                </p>
                <p className="text-center text-sm text-gray-600 font-medium">
                    Sign up now & get 90% off your first order!
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
                    <p className="text-xs text-gray-500 mb-2"> ⚡Only 189 Welcome Packages Remaining!</p>
                    <p className="text-xs text-gray-500 mb-5"> 🕒 Offer expires in 17:47</p>
                </div>
                {/* Submit Button */}
                <button type="submit" disabled={isPending} title=""
                    className={`w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105
                    ${isPending ? 'cursor-not-allowed opacity-75' : ''}`}
                    >{isPending ? (
                        <React.Fragment>
                            <Loader2 className='h-5 w-5 animate-spin' />
                            CREATING ACCOUNT...
                        </React.Fragment>
                    ) : (
                        'CREATE ACCOUNT'
                    )}

                </button>
                {state?.message && state.message.length > 0 && (
                    <p className="text-center text-sm text-red-700">
                        {state.message}
                    </p>
                )}
                
                {/* Navigation to Sign In */}
                <div className="text-center pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">
                        Already have an account?
                    </p>
                    <Link 
                        href="/auth/sign-in"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors hover:underline"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </Form>
    )
 }

export default SignUp