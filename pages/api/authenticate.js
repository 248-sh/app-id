import { getSession } from "next-auth/react";

export default async (req, res) => {
  console.log("authenticate query", req.query);
  console.log("authenticate cookies", req.cookies);
  console.log("authenticate headers", req.headers);
  console.log("authenticate body", req.body);

  const session = await getSession({ req });

  console.log("authenticate session", session);

  if (session === null) {
    return res.redirect("/api/auth/signin/github");
  }

  if (session.user.roles.length === 0) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
};
