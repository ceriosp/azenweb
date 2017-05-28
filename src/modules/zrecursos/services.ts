import * as ZCommon from '../zcommon';
import {
    ZRecursoViewModel,
    ZReferenciaModel,
    ZReferenciaViewModel,
    ZCampoModel
} from '../zcommon';

export namespace Services
{
    export class ZRecursoServices
    {
        normalizeZRecursoViewModelState(zrecursoViewModel:ZRecursoViewModel){

            if(!zrecursoViewModel){
                return;
            }
            
            if(zrecursoViewModel.ven.fil > 1){
                zrecursoViewModel.tipoRecurso = ZCommon.Constants.TipoRecurso.Movimento;
            }

            if(zrecursoViewModel.refs){
                const { refs } = zrecursoViewModel;
                zrecursoViewModel.mapZoomsIdsIndxByCampo = new Map<string, ZReferenciaViewModel>();

                let refI:ZReferenciaModel = null;
                for(let i=0; i<refs.length; i++){
                    refI = refs[i];
                    if(!refI.junt || refI.junt.length<1){
                        console.error("Recurso: ("+ zrecursoViewModel.ven.descr +") campo (" + refI.alias + ") no tiene junturas definidas");
                        continue;
                    }
                    for(let j=0; j<refI.junt.length; j++){
                        let zreferenciaViewModel:ZReferenciaViewModel = refI as ZReferenciaViewModel;
                        zreferenciaViewModel.nomCmp = refI.junt[j].nomCmp;
                        zrecursoViewModel.mapZoomsIdsIndxByCampo.set(refI.junt[j].nomCmp, zreferenciaViewModel);
                    }
                }                
            }
        }

        getZRecursoViewModelDeepImmutableCopy(source:ZRecursoViewModel, filterCampsFn?:()=>Array<ZCampoModel>):ZRecursoViewModel{
            
            let newCamps:Array<ZCampoModel> = [];

            if (filterCampsFn && typeof filterCampsFn == "function") {
                newCamps = filterCampsFn();
            }
            else{
                newCamps = {...source.camps};
            }

            return {
                ...source,
                camps:newCamps,
                doms:{...source.doms},
                mapZoomsIdsIndxByCampo:null,
                refs:{...source.refs},
                ven:{...source.ven},
            } as ZRecursoViewModel;
        }
    }
}
