import { auth } from "@/../auth/lucia";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "GET") {
		res.status(405).json("Bad Request");
		res.end();
		return;
	}

	const authRequest = auth.handleRequest({ req, res });
	const session = await authRequest.validate();
	if (session) {
		res.status(200).json({ user: session.user });
		res.end();
		return;
	} else {
		res.status(200).json({ user: null });
		res.end();
		return;
	}
};

export default handler;
