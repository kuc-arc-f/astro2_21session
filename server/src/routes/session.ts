//
const router = {
  /**
  * create
  * @param
  *
  * @return
  */
  create: async function (req: any, res: any, env: any): Promise<Response>
  {
//console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        let resDelete = await this.deleteSession(req, res, env);
        if(resDelete === false) {
          console.error("Error, delete NG ");
          throw new Error('Error , delete NG');
        }        
        const sql = `
        INSERT INTO Session ( sessionId, key, value)
        VALUES('${req.sessionId}', '${req.key}', '${req.value}');
        `;
        const resulte = await env.DB.prepare(sql).run();
//console.log(resulte);
        if(resulte.success !== true) {
          console.error("Error, /create");
          throw new Error('Error , create');
        }
        //id
        const sql_id = "SELECT last_insert_rowid() AS id;";
        const resultId = await env.DB.prepare(sql_id).all();
//console.log(resultId);
        if(resultId.results.length < 1) {
          console.error("Error, resultId.length < 1");
          throw new Error('Error , create, SELECT last_insert_rowid');
        }
        const item_id = resultId.results[0].id;
//console.log("item_id=", item_id);
        req.id = item_id;
      }            
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  deleteSession: async function (req: any, res: any, env: any): Promise<any>
  {
console.log(req);
    let ret = false;
    try{
      if (req) {
        const sql = `
        DELETE FROM Session WHERE 
        sessionId = '${req.sessionId}' AND key = '${req.key}'
        `;
//console.log(sql);
        const resulte = await env.DB.prepare(sql).run();
//console.log(resulte);
        if(resulte.success !== true) {
          console.error("Error, deleteSession");
          throw new Error('Error , deleteSession');
        }      
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
      return ret;
    } 
  },   
  /**
  *
  * @param
  *
  * @return
  */ 
  delete: async function (req: any, res: any, env: any): Promise<Response>
  {
//console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        let resDelete = await this.deleteSession(req, res, env);
        if(resDelete === false) {
          console.error("Error, delete NG ");
          throw new Error('Error , delete NG');
        }        
      }
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },
  /**
  *
  * @param
  *
  * @return
  */
  get: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log(req);
    let item = {};
    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        SELECT * FROM Session
        WHERE 
        sessionId = '${req.sessionId}' AND key = '${req.key}'
        `;        
        result = await env.DB.prepare(sql).all();
//console.log(result.results);
        if(result.results.length < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }
        item = result.results[0];
      }      
      return Response.json({ret: "OK", data: item});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },   
}
export default router;
