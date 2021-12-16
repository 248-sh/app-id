import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
// import TwitterProvider from "next-auth/providers/twitter";
// import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import { URL } from "url";

const githubProvider = GithubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
  scope: "read:user,read:org", // appears to be ignored
});

const url = new URL(process.env.NEXTAUTH_URL);
const useSecureCookies = url.protocol === "https:";
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const redirectUrlRegExp = new RegExp(process.env.REDIRECT_URL_REGEXP);

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,

      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        // domain: url.hostname === "localhost" ? url.hostname : "." + url.hostname, // add a . in front so that subdomains are included
        domain: url.hostname === "localhost" ? url.hostname : ".248.sh", // add a . in front so that subdomains are included
      },
    },
  },
  // https://next-auth.js.org/configuration/providers
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
      
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    {
      ...githubProvider,
      authorization: "https://github.com/login/oauth/authorize?scope=read:user+user:email+read:org",
      userinfo: {
        ...githubProvider.userinfo,
        async request(options) {
          const { client, tokens } = options;

          const profile = await githubProvider.userinfo.request(options);

          const teams = await (
            await fetch("https://api.github.com/orgs/248-sh/teams", {
              headers: { Authorization: `token ${tokens.access_token}` },
            })
          ).json();

          console.log("request teams", teams);

          return {
            ...profile,
            teams,
            roles: Array.isArray(teams) ? teams.map((team) => team.name) : [],
          };
        },
      },
      profile(profile) {
        console.log("profile profile", profile);

        return {
          ...profile,
          ...githubProvider.profile(profile),
        };
      },
    },
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async jwt({ account, isNewUser, profile, token, user, ...rest }) {
      console.log("callbacks jwt account", account);
      console.log("callbacks jwt isNewUser", isNewUser);
      console.log("callbacks jwt profile", profile);
      console.log("callbacks jwt token", token);
      console.log("callbacks jwt user", user);
      console.log("callbacks jwt rest", rest);

      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (user?.login) {
        token.login = user.login;
      }
      if (user?.roles) {
        token.roles = user.roles;
      }

      return token;
    },
    async session({ session, token, user, ...rest }) {
      console.log("callbacks session session", session);
      console.log("callbacks session token", token);
      console.log("callbacks session user", user);
      console.log("callbacks session rest", rest);
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.login) {
        session.user.login = token.login;
      }
      if (token?.roles) {
        session.user.roles = token.roles;
      }

      return session;
    },
    async signIn({ account, credentials, email, profile, user, ...rest }) {
      console.log("callbacks signIn account", account);
      console.log("callbacks signIn credentials", credentials);
      console.log("callbacks signIn email", email);
      console.log("callbacks signIn profile", profile);
      console.log("callbacks signIn user", user);
      console.log("callbacks signIn rest", rest);

      if (!profile) {
        return false;
      }

      return profile.roles.length > 0;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect baseUrl", baseUrl);
      console.log("redirect url", url);
      console.log("redirect redirectUrlRegExp", redirectUrlRegExp.test(url));

      if (redirectUrlRegExp.test(url)) {
        return url;
      }

      return baseUrl;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: "auto",
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});
