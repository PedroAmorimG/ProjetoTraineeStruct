import { auth } from "@/../auth/lucia";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "PATCH") {
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
	const { nome, password } = req.body as {
		nome?: string;
		password?: string;
	};

	try {
		if (nome) {
			await auth.updateUserAttributes(userId, {
				nome,
			});
		}

		if (password) {
			await auth.updateKeyPassword(
				"email",
				session.user.email.toLocaleLowerCase(),
				password
			);
			await auth.invalidateAllUserSessions(userId);
		}
	} catch (e) {
		res.status(500).json({ error: e });
		res.end();
		return;
	}
	res.status(200).json("Atualizacao do usuario concluida");
	res.end();
	return;
};

export default handler;
