import { getSession } from "next-auth/react";

export default async (req, res) => {
  console.log("authenticate query", req.query);
  console.log("authenticate cookies", req.cookies);
  console.log("authenticate headers", req.headers);
  console.log("authenticate body", req.body);

  const session = await getSession({ req });

  console.log("authenticate session", session);

  if (session === null) {
    if ("uri" in req.query) {
      return res.redirect(`/?next=${req.query.uri}`);
    }

    return res.redirect("/");
  }

  if (session.user.roles.length === 0) {
    return res.status(401).end();
  }

  return res.status(200).end();
};
