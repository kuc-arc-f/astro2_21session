//
export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const url = import.meta.env.PUBLIC_API_URL;
  console.log(body);
console.log("path=", body.path);
  const sendBody: any = JSON.stringify(body);
  const res = await fetch(url +  body.path, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},      
    body: sendBody
  });
  const json = await res.json();
//console.log("#json"); 
//console.log(json);     
  return {
    body: JSON.stringify(json)
  }
}