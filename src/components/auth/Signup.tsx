"use client"
import React, { useActionState } from "react";
import Form from "next/form";
import {Loader2} from "lucide-react";  

export type SignUpState = { message: string | undefined }
type SignUpProps = {
    action: (prevState: SignUpState, formData: FormData) => Promise<SignUpState>
}

const initialState = { message: '',}
 const SignUp = ({action}: SignUpProps) => {
    const [, formAction, isPending] = useActionState(action,initialState)
    return (
        <Form action={formAction} className="max-w-md mx-auto my-16 p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-2">
                Join the DEAL Revolution!
            </h1>
            <p className="text-center text-sm text-rose-600 font-semibold mb-2">
                🔥LIMITED TIME OFFER🔥
            </p>
            <p className="text-center text-sm text-gray-600 font-semibold mb-2">
                SignUp now & GET 90% OFF your first Order!
            </p>
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
                    className={`w-full bg-rose-600 text-white py-3 rounded-md hover:bg-rose-750 transition-colors font-medium flex items-center justify-center gap-2
                    ${isPending ? 'cursor-not-allowed' : ''}`}
                    >{isPending ? (
                        <React.Fragment>
                            <Loader2 className='h-4 w-4 animate-spin' />
                            CREATING ACCOUNT...
                        </React.Fragment>
                    ) : (
                        'CREATE ACCOUNT'
                    )}

                </button>
            </div>
        </Form>
    )
 }

export default SignUp