import { supabaseServerClient } from "@/utils/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized: No token provided." },
            { status: 401 }
        );
    }

    const { data: { user }, error: authError } = await supabaseServerClient.auth.getUser(token);
    console.log(user);
    if (authError || !user) {
        return NextResponse.json(
            { message: "Unauthorized: Invalid token." },
            { status: 401 }
        );
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { message: "Invalid JSON body." },
            { status: 400 }
        );
    }

    const { email, name, avatar_url } = body;
    if (!email || !name) {
        return NextResponse.json(
            { message: "Missing required fields: email and name." },
            { status: 400 }
        );
    }

    const userProfile = {
        id: user.id,
        email,
        name,
        avatar_url: avatar_url || null,
    };

    const { data, error } = await supabaseServerClient
        .from("users")
        .upsert(userProfile);

    if (error) {
        console.error("Error upserting user profile:", error);
        return NextResponse.json(
            { message: "Error updating profile.", error },
            { status: 500 }
        );
    }

    return NextResponse.json({
        message: "User profile updated successfully.",
        data,
    });
}
