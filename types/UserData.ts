export type UserData = {
    id: string;
    email: string;
    name: string;
    avatar_url?: string | null;
    tier: 'basic' | 'premium' | 'pro';
};
