//import Common from '../lib/Common';
//
const router = {
  /**
  * test2
  * @param
  *
  * @return
  */
  test2: async function (req: any, res: any, env: any): Promise<Response>
  {
    console.log("#test.test2");
    try{
      const { results } = await env.DB.prepare(
        "SELECT * FROM Customers WHERE id > ?"
      )
        .bind(0)
        .all();
      return Response.json({
        ret: "OK", data: results,
      });
    } catch (e) {
      console.error(e);
      return Response.json({
        ret: "NG", data: [],
      });
    } 
  },
  /**
  *
  * @param
  *
  * @return
  */
  test3: async function (req: any, res: any, env: any): Promise<Response>
  {
    console.log("#test.test3");
    try{
      const { results } = await env.DB.prepare(
        "SELECT * FROM Customers WHERE id > ?"
      )
        .bind(0)
        .all();
      return Response.json({
        ret: "OK", data: results,
      });
    } catch (e) {
      console.error(e);
      return Response.json({
        ret: "NG", data: [],
      });
    } 
  },
  /**
  * create
  * @param
  *
  * @return
  */
  create: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log("#test.create");
console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
//    return res.json({ret: "OK", data: req})
    try{
      if (req) {
        const sql = `
        INSERT INTO Customers ( CompanyName, ContactName)
        VALUES('${req.title}', '${req.body}');
        `;
        //console.log(sql);
        await env.DB.prepare(sql).run();
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
  update: async function (req: any, res: any, env: any): Promise<Response>
  {
  //    console.log("#test.update");
  //    console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        UPDATE Customers 
        SET CompanyName = '${req.title}', ContactName='${req.body}'
        WHERE id = ${req.id}
        `;
        console.log(sql);
        await env.DB.prepare(sql).run();
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
  delete: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log("#test.delete");
//    console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        DELETE FROM Customers WHERE id = ${req.id}
        `;
        //console.log(sql);
        await env.DB.prepare(sql).run();
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
        result = await env.DB.prepare(
        `
        SELECT CompanyName ,ContactName FROM Customers
        WHERE id = ${req.id}
        `
        ).all();
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
  /**
  *
  * @param
  *
  * @return
  */ 
  get_list: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log(req);
    let item = {};
//    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
//    return Response.json(retObj);
    try{
      let result: any = {};  
      if (req) {
        result = await env.DB.prepare(
        `
        SELECT CompanyName ,ContactName FROM Customers
        ORDER BY id DESC
        `
        ).all();
console.log(result.results);
        if(result.results.length < 1) {
          console.error("Error, results.length < 1");
        }
      }           
      return Response.json({ret: "OK", data: result.results});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },   
}
export default router;
