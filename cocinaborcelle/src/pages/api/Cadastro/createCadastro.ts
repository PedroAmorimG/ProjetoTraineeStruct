import axios from "axios";

type Data = {
	nome: string;
	email: string;
	senha: string;
};

export default async function createUser(data: Data) {
	axios
		.post("/api/Cadastrar", data)
		.then((response) => {
			console.log(response.data, response.status);
			return response;
		})
		.catch((error) => {
			console.log(error);
			return { error };
		});
}
