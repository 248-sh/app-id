import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header>
      <div>
        <p>
          {!session && (
            <>
              <span>You are not signed in</span>
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();

                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span style={{ backgroundImage: `url('${session.user.image}')` }} />
              )}
              <span>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault();

                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/client">
              <a>Client</a>
            </Link>
          </li>
          <li>
            <Link href="/server">
              <a>Server</a>
            </Link>
          </li>
          <li>
            <Link href="/protected">
              <a>Protected</a>
            </Link>
          </li>
          <li>
            <Link href="/api-example">
              <a>API</a>
            </Link>
          </li>
          <li>
            <Link href="/middleware-protected">
              <a>Middleware protected</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
