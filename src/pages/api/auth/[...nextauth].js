import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Twitter({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      jwt: async (token, user, account) => {
        const userData = user && {
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
        };
        user && (token.user = userData);
        return token;
      },
      session: async (session, user, sessionToken) => {
        session.user = user.user;
        return session;
      },
      signIn: async (user, account) => {
        let email = await fetchGithub(account.provider);
        async function fetchGithub(providerUser) {
          if (providerUser === "github") {
            const emailGit = await fetch("https://api.github.com/user/emails", {
              headers: {
                Authorization: `token ${account.accessToken}`,
              },
            });
            const emails = await emailGit.json();
            const primaryEmail = emails.find((e) => e.primary).email;
            return primaryEmail;
          } else if (account.provider === "twitter") {
            return user.email;
          }
        }
        user.email = email;
      },
    },
  });
