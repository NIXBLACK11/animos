"use client";

import { useAtom } from "jotai";
import { FaGoogle } from "react-icons/fa";
import { userDataState } from "@/states/state";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

export const GoogleLoginButton = () => {
    const [userData, setUserData] = useAtom(userDataState);

    useEffect(() => {
        const handleUser = async () => {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error("Error fetching session:", sessionError);
                return;
            }

            const session = sessionData.session;
            if (!session?.user) {
                // console.log("User is not logged in.");
                setUserData(null);
                return;
            }

            const { data: existingUser, error: fetchError } = await supabase
                .from("users")
                .select("*")
                .eq("id", session.user.id)
                .maybeSingle();

            if (fetchError) {
                console.error("Error checking user profile:", fetchError);
            }

            let finalProfile = existingUser;
            if (!existingUser) {
                // console.log("User not found, upserting profile");
                const user = session.user;
                const profileData = {
                    email: user.email,
                    name: user.user_metadata.full_name || user.email,
                    avatar_url: user.user_metadata.avatar_url || null,
                };

                const token = session.access_token;

                const response = await fetch("/api/upsertUserProfile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(profileData),
                });

                const result = await response.json();
                if (!response.ok) {
                    console.error("Error updating profile:", result.message);
                } else {
                    // console.log("Profile updated successfully:", result.data);
                }
                finalProfile = result.data;
            } else {
                // console.log("User already exists, no need to upsert");
            }

            setUserData(finalProfile);
        };

        handleUser();
    }, [setUserData]);

    const LoginGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/notes` },
        });

        if (error) {
            console.error("Error during Google login:", error);
        } else {
            console.log("OAuth login initiated:", data);
        }
    };

    const LogoutGoogle = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error);
        } else {
            // console.log("Logged out successfully");
            setUserData(null);
        }
    };

    return (
        <>
            {userData ? (
                <button
                    className="flex items-center justify-start w-full p-3 hover:bg-neutral-800 rounded-lg transition-colors group"
                    title="Disconnect Google"
                    onClick={LogoutGoogle}
                >
                    <FaGoogle className="mr-3 text-neutral-400 group-hover:text-white" size={20} />
                    <span className="text-neutral-400 group-hover:text-white text-sm">Logout</span>
                </button>
            ) : (
                <button
                    className="flex items-center justify-start w-full p-3 hover:bg-neutral-800 rounded-lg transition-colors group"
                    title="Connect Google"
                    onClick={LoginGoogle}
                >
                    <FaGoogle className="mr-3 text-neutral-400 group-hover:text-white" size={20} />
                    <span className="text-neutral-400 group-hover:text-white text-sm">Login Google</span>
                </button>
            )}
        </>
    );
};
