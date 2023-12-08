import { auth } from "@/../auth/lucia";
import { LuciaError } from "lucia";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "POST") {
		res.status(405).json("Bad Request");
		res.end();
		return;
	}

	const { email, password } = req.body as {
		email: string;
		password: string;
	};

	try {
		const key = await auth.useKey(
			"username",
			email.toLowerCase(),
			password
		);
		const session = await auth.createSession({
			userId: key.userId,
			attributes: {},
		});
		const authRequest = auth.handleRequest({
			req,
			res,
		});

		authRequest.setSession(session);
		res.status(200).json("Login efetuado com sucesso");
	} catch (e) {
		if (
			e instanceof LuciaError &&
			(e.message === "AUTH_INVALID_KEY_ID" ||
				e.message === "AUTH_INVALID_PASSWORD")
		) {
			res.status(400).json({
				error: "Usuario inexistente ou senha incorreta",
			});
		} else {
			res.status(500).json({ error: "Erro no servidor" });
		}
	}
	res.end();
};

export default handler;
