import { getSession } from "next-auth/react";

export default async (req, res) => {
  console.log("authorize query", req.query);
  console.log("authorize cookies", req.cookies);
  console.log("authorize headers", req.headers);
  console.log("authorize body", req.body);

  const session = await getSession({ req });

  console.log("authorize session", session);

  if (session === null || session.user.roles.length === 0) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
};
