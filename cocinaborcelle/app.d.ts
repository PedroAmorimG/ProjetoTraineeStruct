/// <reference types="lucia"/>

declare namespace Lucia {
	type Auth = import("./auth/lucia").Auth;
	type DatabaseUserAttributes = {
		nome: string;
		email: string;
	};
	type DatabaseSessionAttributes = {};
}
