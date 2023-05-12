import LibCrud from '../../lib/LibCrud';
import LibConfig from '../../lib/LibConfig';
import HttpCommon from '../../lib/HttpCommon';
import Session from '../../lib/Session';
//
const Crud = {
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      //btn
      const seesionKey = "test2";
      const button: any = document.querySelector('#btn_put');
      button.addEventListener('click', async () => {
        console.log("#put");
        const obj = {id: 1};
        let resulte = await Session.put(seesionKey, JSON.stringify(obj));
console.log(resulte);
      }); 
      //btn_get
      const btnGet: any = document.querySelector('#btn_get');
      btnGet.addEventListener('click', async () => {
        let resulte = await Session.get(seesionKey);
console.log(resulte);
      }); 
      //btn_delete
      const btnDelete: any = document.querySelector('#btn_delete');
      btnDelete.addEventListener('click', async () => {
        let resulte = await Session.delete(seesionKey);
console.log(resulte);
      }); 

    } catch (e) {
      console.error(e);
    }    
  } 
}
//
Crud.startProc();

export default Crud;
