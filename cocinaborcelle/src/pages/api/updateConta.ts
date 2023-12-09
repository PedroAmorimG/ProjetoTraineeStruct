import { auth } from "@/../auth/lucia";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "POST") {
		res.status(405).json({ error: "Bad Request!" });
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

	const userId = session.user.userId;
	const { username, password } = req.body as {
		username?: string;
		password?: string;
	};

	try {
		if (username) {
			await auth.updateUserAttributes(userId, {
				nome: username,
			});
		}

		if (password) {
			await auth.updateKeyPassword(
				"username",
				session.user.email,
				password
			);
			await auth.invalidateAllUserSessions(userId);
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: e });
		res.end();
		return;
	}
	res.status(200).json("Atualizacao do usuario concluida");
	res.end();
	return;
};

export default handler;
