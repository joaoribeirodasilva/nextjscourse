import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    callbacks: {
        // Invoked on successful sign in
        async signIn({profile}) {

            // 1. ConnectDB
            await connectDB();

            // 2. Check if user exists
            const userExists = await User.findOne({ email: profile.email});
            if (!userExists) {
                // Truncate username if too long
                const username = profile.name.slice(0,20);

                // 3. If not add user
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }

            // 4. Return true to allow the sign in
            return true;

        },
        // Modifies the session object
        async session({session}) {

            // 1. Gets the user from the database
            const user = await User.findOne( {email: session.user.email} )
            // 2. Assign the user if to the session
            session.user.id = user._id.toString();
            // 3. Return session
            return session;

        }
    }
}

