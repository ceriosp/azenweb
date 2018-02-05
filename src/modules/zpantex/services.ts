import * as ZCommon from '../zcommon';
import {

    IZComandoForma,

    Constants,

    //Utils
    EntityMap,
    EntityNormalizedObj,

} from '../zcommon';

import {
    DTO
} from './actions';


const u = require('updeep');
const findIndex = require('lodash.findindex');

export namespace Services {
    export class ZRecursoServices {
        public getCMIcon(zComando: IZComandoForma) {
            switch (zComando.cmd) {
                case Constants.ComandoEnum.CM_AYUDA:
                    return "glyphicon glyphicon-info-sign";
                case Constants.ComandoEnum.CM_ADICIONAR:
                    return "glyphicon glyphicon-plus";
                case Constants.ComandoEnum.CM_MODIFICAR:
                    return "glyphicon glyphicon-pencil";
                case Constants.ComandoEnum.CM_CONSULTAR:
                    return "glyphicon glyphicon-book";
                case Constants.ComandoEnum.CM_CERRAR:
                    return "glyphicon glyphicon-remove";
                case Constants.ComandoEnum.CM_PRIMERO:
                    return "glyphicon glyphicon-fast-backward";
                case Constants.ComandoEnum.CM_ANTREG:
                    return "glyphicon glyphicon-step-backward";
                case Constants.ComandoEnum.CM_SGTEREG:
                    return "glyphicon glyphicon-step-forward";
                case Constants.ComandoEnum.CM_ULTIMO:
                    return "glyphicon glyphicon-fast-forward";
                case Constants.ComandoEnum.CM_RETOCAR:
                    return "glyphicon glyphicon-edit";
                case Constants.ComandoEnum.CM_VISUALIZAR:
                    return "glyphicon glyphicon-eye-open";
                case Constants.ComandoEnum.CM_GRABAR:
                    return "glyphicon glyphicon-floppy-save";
                case Constants.ComandoEnum.CM_BUSCAR:
                    return "glyphicon glyphicon-search";
                case Constants.ComandoEnum.CM_DETALLAR:
                    return "glyphicon glyphicon-print";
                case Constants.ComandoEnum.CM_SELECCIONAR:
                    return "glyphicon glyphicon-certificate";
                case Constants.ComandoEnum.CM_BORRAR:
                    return "glyphicon glyphicon-floppy-remove";
            }
        }
    }
}