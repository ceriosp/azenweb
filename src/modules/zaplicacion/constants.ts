
namespace ZAplicacion
{    
    export class Constants
    {
        public static readonly NAME:"zaplicacion";
    }

    type DESPACHAR_RECURSO = "DESPACHAR_RECURSO";

    export class ActionTypes {
        public static readonly DESPACHAR_RECURSO: DESPACHAR_RECURSO = "DESPACHAR_RECURSO";
    }

    //Action parameters
    export type Action =    
        //UI  actions
        { type: DESPACHAR_RECURSO, ctx: string }    

    let x:string = Constants.NAME;
}

export 
{
    ZAplicacion    
}