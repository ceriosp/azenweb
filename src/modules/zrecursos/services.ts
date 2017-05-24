import {
    ZRecursoViewModel,
    ZReferenciaModel,
    ZReferenciaViewModel
} from './model';
namespace Services
{
    export class ZRecursoServices
    {
        normalizeZRecursoViewModelState(zrecursoViewModel:ZRecursoViewModel){

            if(!zrecursoViewModel){
                return;
            }

            if(!zrecursoViewModel.refs){
                return;
            }

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
}

export
{
    Services
}