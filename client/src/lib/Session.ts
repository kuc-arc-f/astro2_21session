import LibCookie from './LibCookie';
import LibConfig from './LibConfig';
import HttpCommon from './HttpCommon';
//
const Session = {
  /* put, get, delete */
  /**
  * 
  * @param
  *
  * @return
  */ 
  delete: async function(key: string): Promise<any>
  {
    try {
      let ret = false;
      const sid = this.getSessionId();
//console.log("sid=", sid);      
      const item = {
        sessionId: sid,
        key: key,
      }
      const json = await HttpCommon.server_post(item, '/session/delete');
console.log(json); 
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getSessionId');
    }
  }, 
  /**
  * 
  * @param
  *
  * @return
  */ 
  get: async function(key: string): Promise<any>
  {
    try {
      let ret = {};
//console.log("sid=", sid);  
      const sid = this.getSessionId();    
      const item = {
        sessionId: sid,
        key: key,
      }
      const json = await HttpCommon.server_post(item, '/session/get');
//console.log(json); 
      if (json.ret !== LibConfig.OK_CODE) {
        throw new Error("Error, ret <> OK");
      }
      if(typeof json.data === "undefined") {
        throw new Error("Error, value nothing");
      }
      ret = JSON.parse(json.data.value);
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , get');
    }
  },   
  /**
  * 
  * @param
  *
  * @return
  */ 
  put: async function(key: string, value: any): Promise<any>
  {
    try {
      let ret = false;
      const sid = this.getSessionId();
      const item = {
        sessionId: sid,
        key: key,
        value: value,
      }
//console.log(item);  
      const json = await HttpCommon.server_post(item, '/session/create');
// /console.log(json);    
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
      } 
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , put');
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */ 
  getSessionId: function(): string
  {
    try {
      let ret = "";
      const key = LibConfig.COOKIE_KEY_SESSION;
      const sid = LibCookie.get_cookie(key);
//console.log("sid=", sid);
      //@ts-ignore
      ret = sid;
      if(sid === null) {
        const rand = Number(Math.random() * 1000000);
        //@ts-ignore
        let newSid = Date.now() + "-" + String(parseInt(rand));
        ret = newSid;
        LibCookie.set_cookie(key, newSid);
      }
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getSessionId');
    }
  },
 
}
export default Session;
