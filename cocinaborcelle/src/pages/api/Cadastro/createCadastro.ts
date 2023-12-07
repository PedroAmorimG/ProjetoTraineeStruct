import axios from "axios";

export default function createUser({ data }) {
	return axios.post("/api/Cadastrar", { data });
}
