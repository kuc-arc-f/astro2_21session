import Router from './Router';
import Common from './lib/Common';
//
export interface Env {
}
//
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const { pathname } = new URL(request.url);
//console.log(env.DB);
//		const envKey = env.API_KEY;
//console.log("envKey=", envKey);
		const errorObj = {ret: "NG", messase: "Error"};
		//
		if (request.method === "GET") {
		}
		if (request.method === "POST") {
			const json: any = JSON.stringify(await request.json());
			const reqObj: any = JSON.parse(json);
			const validApiKey = await Common.validApiKey(env, reqObj);
   		    console.log(validApiKey);
			if(!validApiKey) {
				errorObj.messase = "Error, Common.validApiKey=false";
				console.log("Error, Common.validApiKey=false");
				return Response.json(errorObj);
			}
//console.log(reqObj);
			const contentType = request.headers.get("content-type");
			if(contentType !== "application/json") {
				console.log("contentType=", contentType);
				return Response.json({ret: "NG", messase: "Error, contentType <> application/json"});
			}	
			//Router
			const res = await Router.route(pathname, reqObj, Response, env);
			return res;	
		}
		//
		return new Response("Hello World!");
	},
};
