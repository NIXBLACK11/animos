"Σκέψη Ελεύθερη, Γνώση Αιώνια"
(Free Thought, Eternal Knowledge)

```ts
"use client"

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const Features = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    const textH = `This is the speed we normally type at: The quick brown fox jumpd over the lazt dog in a hurry to get to it's den.`;
    const [prevTextH, setPrevTextH] = useState("");
    const [nextTextH, setNextTextH] = useState(textH);
    
    const textA = `But with AI assistance, you can write faster, more accurately, and with greater creativity. Like this: The quick brown fox jumped over the lazy dog in a hurry to get to its den, moving swiftly under the golden evening sky.`;
    const [prevTextA, setPrevTextA] = useState("");
    const [nextTextA, setNextTextA] = useState(textA);

    const [isVisible, setIsVisible] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.9,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        if (!isVisible) return;
        
        // Human text progress (slower)
        const humanProgress = Math.min(value * 1, 1); // Slows down human text
        const totalLengthH = textH.length;
        const scrollIndexH = Math.floor(humanProgress * totalLengthH);

        const updatedPrevTextH = textH.slice(0, scrollIndexH);
        const updatedNextTextH = textH.slice(scrollIndexH);

        setPrevTextH(updatedPrevTextH);
        setNextTextH(updatedNextTextH);

        // AI text progress (4x faster)
        const aiProgress = Math.min(value * 3, 1); // Makes AI text 4x faster than human text
        const totalLengthA = textA.length;
        const scrollIndexA = Math.floor(aiProgress * totalLengthA);

        const updatedPrevTextA = textA.slice(0, scrollIndexA);
        const updatedNextTextA = textA.slice(scrollIndexA);

        setPrevTextA(updatedPrevTextA);
        setNextTextA(updatedNextTextA);
    });

    return (
        <div
            ref={containerRef}
            className="bg-[#000000] w-full h-[400vh] flex items-start justify-center"
        >
            <div 
                ref={textContainerRef}
                className={`sticky top-10 w-3/4 h-[400px] flex flex-col items-start justify-center transition-opacity duration-300 text-4xl font-bold ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="mb-20">
                    <span className="text-white">
                        {prevTextH}
                    </span>
                    <span className="text-neutral-800">
                        {nextTextH}
                    </span>
                </div>
                <div>
                    <span className="text-white">
                        {prevTextA}
                    </span>
                    <span className="text-neutral-800">
                        {nextTextA}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Features;
```


```ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  try {
    // Verify Stripe signature
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      const tier = session.metadata?.tier_name;
      
      if (!userId || !tier) {
        return NextResponse.json({ error: "Missing user_id or tier_name" }, { status: 400 });
      }

      const validTill = new Date();
      validTill.setMonth(validTill.getMonth() + 1); // Set expiration 1 month ahead

      const { error } = await supabase.from("user_tiers").upsert({
        id: userId,
        tier_name: tier,
        valid_till: validTill.toISOString(),
      });

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ error: "Failed to update user tier" }, { status: 500 });
      }

      console.log(`Updated user ${userId} to tier ${tier} until ${validTill.toISOString()}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
```