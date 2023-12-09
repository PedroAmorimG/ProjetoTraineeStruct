import { auth } from "@/../auth/lucia";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "POST") {
		res.status(405).json({ error: "Bad Request" });
		res.end();
		return;
	}

	const authRequest = auth.handleRequest({ req, res });
	const session = await authRequest.validate();
	if (!session) {
		res.status(401).json({ error: "Unauthorized" });
		res.end();
		return;
	}

	await auth.invalidateSession(session.sessionId);

	authRequest.setSession(null);
	res.status(200).json("Logout concluido com sucesso.");
};

export default handler;
