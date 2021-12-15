// This is an example of how to access a session from an API route
import { getSession } from "next-auth/react";

// TODO: 200 if session exists and session.user.roles contains the required role, 400 otherwise
export default async (req, res) => {
  console.log("session query", req.query);
  console.log("session cookies", req.cookies);
  console.log("session headers", req.headers);
  console.log("session body", req.body);
  const session = await getSession({ req });
  console.log("session session", session);
  res.send(JSON.stringify(session, null, 2));
};
