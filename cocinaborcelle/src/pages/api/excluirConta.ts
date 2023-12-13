import { auth } from "@/../auth/lucia";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "DELETE") {
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

	try {
		const userId = session.user.userId;
		await auth.deleteUser(userId);
	} catch (e) {
		res.status(500).json({ error: e });
		res.end();
		return;
	}

	res.status(200).json("Conta excluida com sucesso");
	res.end();
	return;
};

export default handler;
