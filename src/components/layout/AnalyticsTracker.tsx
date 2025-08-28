"use client";

import { useCartStore } from "@/stores/cart-store";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

interface WindowWithUmami extends Window {
    umami?: {
        identify: (data: Record<string, unknown>) => void;
    };
}

type AnalyticsTrackerProps = {
    user: Partial<User> | null;
}
const AnalyticsTracker = ({user}: AnalyticsTrackerProps) => {

    const { cartId } = useCartStore(
        useShallow((state) => ({
            cartId: state.cartId
        }))
    );

    useEffect(() => {
        if(!cartId || user) {
            return;
        }

        try {
            const windowWithUmami = window as WindowWithUmami;

            if(windowWithUmami.umami) {
                windowWithUmami.umami.identify({
                    cartId,
                })
            }
        } catch {
            // Silently handle errors
        }
    }, [cartId,user]);

    useEffect(() => {
        if(!user) {
            return;
        }

        try {
            const windowWithUmami = window as WindowWithUmami;

            if(windowWithUmami.umami) {
                windowWithUmami.umami.identify({
                    email: user.email,
                })
            }
        } catch {
            // Silently handle errors
        }
    }, [user])

    return <></>
}

export default AnalyticsTracker;