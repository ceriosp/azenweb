import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Row,    
    Col,
    Form,
    Modal,
    Glyphicon,
    Navbar,
    Nav,
    MenuItem,
    NavItem,
    NavDropdown
} from 'react-bootstrap';

import {
    ZRecursoModel,
    ZCampoModel
} from "../model";

import {
    RecursosConstants
} from "../constants";

import ZRecurso from './ZRecurso';

const recursosList:Array<string> = 
[`{ "ven":{ "descr":"Documentos" ,"nomTbl":"#/azenctb/ctbdoc" ,"nomRcrZoom":"^/ctbdoc.zf2" ,"nfils":16 ,"ncols":70 ,"fil":1 ,"col":1 ,"modo":29 ,"cmdsBtn":7682 ,"cmdsLE":8368 ,"numLinsEnc":0 ,"numLinsDatos":0 ,"ctx":41295 ,"nfilsrx":0 ,"ncolsrx":0  }, "camps":[ {"etq":"Código  :","filEtq":0,"colEtq":0,"nomCmp":"codigo","filCmp":999999,"colCmp":999999,"lonv":4,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Nombre  :","filEtq":1,"colEtq":0,"nomCmp":"nombre","filCmp":999999,"colCmp":999999,"lonv":40,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Comprobante : ","filEtq":2,"colEtq":0,"nomCmp":"comprobante","filCmp":999999,"colCmp":999999,"lonv":2,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo de numeración","filEtq":4,"colEtq":0,"nomCmp":"NULL","filCmp":7,"colCmp":20,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Autom tica","filEtq":5,"colEtq":1,"nomCmp":"numeracion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Manual","filEtq":6,"colEtq":1,"nomCmp":"numeracion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RCorte de numeración","filEtq":4,"colEtq":21,"nomCmp":"NULL","filCmp":7,"colCmp":42,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Anual","filEtq":5,"colEtq":22,"nomCmp":"corte","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Mensual","filEtq":6,"colEtq":22,"nomCmp":"corte","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RConsecutivo anual","filEtq":4,"colEtq":43,"nomCmp":"NULL","filCmp":7,"colCmp":61,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"No :","filEtq":6,"colEtq":46,"nomCmp":"cons_anual","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RConsecutivos mensuales","filEtq":8,"colEtq":0,"nomCmp":"NULL","filCmp":14,"colCmp":61,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Inicial :","filEtq":9,"colEtq":1,"nomCmp":"cons_00","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Enero   :","filEtq":10,"colEtq":1,"nomCmp":"cons_01","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Febrero :","filEtq":11,"colEtq":1,"nomCmp":"cons_02","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Marzo   :","filEtq":12,"colEtq":1,"nomCmp":"cons_03","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Abril   :","filEtq":13,"colEtq":1,"nomCmp":"cons_04","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Mayo    :","filEtq":9,"colEtq":21,"nomCmp":"cons_05","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Junio   :","filEtq":10,"colEtq":21,"nomCmp":"cons_06","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Julio   :","filEtq":11,"colEtq":21,"nomCmp":"cons_07","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Agosto  :","filEtq":12,"colEtq":21,"nomCmp":"cons_08","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Sep/bre :","filEtq":13,"colEtq":21,"nomCmp":"cons_09","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Octubre :","filEtq":9,"colEtq":41,"nomCmp":"cons_10","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Nov/bre :","filEtq":10,"colEtq":41,"nomCmp":"cons_11","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Dic/bre :","filEtq":11,"colEtq":41,"nomCmp":"cons_12","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Cierre  :","filEtq":12,"colEtq":41,"nomCmp":"cons_13","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Archivo formato :","filEtq":15,"colEtq":0,"nomCmp":"formato","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":65,"lon":0,"noEnTabla":0,"modo":16,"numDec":0}, {"etq":"Impresora :","filEtq":15,"colEtq":35,"nomCmp":"impresora","filCmp":999999,"colCmp":999999,"lonv":14,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@H","filEtq":17,"colEtq":0,"nomCmp":"NULL","filCmp":999999,"colCmp":0,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^T}-Formato","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":20,"colCmp":252,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0} ], "doms":[ {"nom":"nombre","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"comprobante","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"numeracion","minimo":"NULL","maximo":"NULL","defecto":"1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"corte","minimo":"NULL","maximo":"NULL","defecto":"1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_anual","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_00","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_01","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_02","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_03","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_04","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_05","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_06","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_07","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_08","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_09","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_10","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_11","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_12","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_13","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0} ], "refs":[ {"nomTblFor":"#/azenctb/ctbcte", "alias":"comprobante","junt":[{"nomCmp":"comprobante" }],"nomRcrZoom":"^/ctbcte.zf2","descs":[{"etq":"","filEtq":2,"colEtq":20,"nomCamFor":"nombre","filCmp":999999,"colCmp":999999,"lonv":40,"modo":0} ],"debil":0
}, {"nomTblFor":"à/zdim/zdim", "alias":"impresora","junt":[{"nomCmp":"impresora" }],"nomRcrZoom":"à/zdim/zdim.zf2","descs":[],"debil":0
} ]
}
`,
`{ "ven":{ "descr":"Tercero" ,"nomTbl":"#/azenctb/ctbter" ,"nomRcrZoom":"^/ctbter.zf2" ,"nfils":17 ,"ncols":73 ,"fil":1 ,"col":1 ,"modo":29 ,"cmdsBtn":0 ,"cmdsLE":8368 ,"numLinsEnc":0 ,"numLinsDatos":0 ,"ctx":41283 ,"nfilsrx":0 ,"ncolsrx":0  }, "camps":[ {"etq":"Código         :","filEtq":0,"colEtq":0,"nomCmp":"codigo","filCmp":999999,"colCmp":999999,"lonv":13,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Identificación :","filEtq":0,"colEtq":41,"nomCmp":"id","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo ident.","filEtq":1,"colEtq":0,"nomCmp":"NULL","filCmp":3,"colCmp":35,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Nit","filEtq":2,"colEtq":1,"nomCmp":"tipoId","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Cédula","filEtq":2,"colEtq":12,"nomCmp":"tipoId","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Otro","filEtq":2,"colEtq":26,"nomCmp":"tipoId","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] No activo","filEtq":2,"colEtq":41,"nomCmp":"tipoRegimen","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":4,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Nombre completo:","filEtq":4,"colEtq":0,"nomCmp":"nombre","filCmp":999999,"colCmp":999999,"lonv":60,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Primer apellido:","filEtq":5,"colEtq":0,"nomCmp":"apellido1","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Segundo apellido:","filEtq":5,"colEtq":40,"nomCmp":"apellido2","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Primer nombre  :","filEtq":6,"colEtq":0,"nomCmp":"nombre1","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Segundo nombre  :","filEtq":6,"colEtq":40,"nomCmp":"nombre2","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Dirección      :","filEtq":7,"colEtq":0,"nomCmp":"direccion","filCmp":999999,"colCmp":999999,"lonv":60,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Ciudad         :","filEtq":8,"colEtq":0,"nomCmp":"ciudad","filCmp":999999,"colCmp":999999,"lonv":20,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Teléfonos      :","filEtq":9,"colEtq":0,"nomCmp":"telefono1","filCmp":999999,"colCmp":999999,"lonv":10,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"","filEtq":9,"colEtq":28,"nomCmp":"telefono2","filCmp":999999,"colCmp":999999,"lonv":10,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Fax  :","filEtq":9,"colEtq":51,"nomCmp":"fax","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo de regimen","filEtq":10,"colEtq":0,"nomCmp":"NULL","filCmp":14,"colCmp":18,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Simplificado","filEtq":11,"colEtq":1,"nomCmp":"tipoRegimen","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":3,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Común","filEtq":12,"colEtq":1,"nomCmp":"tipoRegimen","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Otros","filEtq":13,"colEtq":1,"nomCmp":"tipoRegimen","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo de impuesto","filEtq":10,"colEtq":20,"nomCmp":"NULL","filCmp":14,"colCmp":72,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Gran contribuyente","filEtq":11,"colEtq":21,"nomCmp":"tipoImp","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Autorretenedor","filEtq":12,"colEtq":21,"nomCmp":"tipoImp","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Retenedor de IVA","filEtq":11,"colEtq":43,"nomCmp":"tipoImp","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Es agente de retención","filEtq":12,"colEtq":43,"nomCmp":"tipoImp","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":3,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Consignar en   :","filEtq":15,"colEtq":0,"nomCmp":"nomBanco","filCmp":999999,"colCmp":999999,"lonv":60,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"e-mail         :","filEtq":16,"colEtq":0,"nomCmp":"email","filCmp":999999,"colCmp":999999,"lonv":60,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{F2}-Grabar","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":266,"colCmp":14,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^B}-Buscar","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":2,"colCmp":53,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^D}-Detallar","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":4,"colCmp":62,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^L}-Selecc.","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":12,"colCmp":57,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^E}-Eliminar","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":5,"colCmp":20,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0} ], "doms":[ {"nom":"nombre","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"id","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"tipoId","minimo":"NULL","maximo":"NULL","defecto":"1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"tipoRegimen","minimo":"NULL","maximo":"NULL","defecto":"2","plantilla":"NULL","siRequerido":0,"siMemoriza":0} ], "refs":[ ]
}
`,
`{ "ven":{ "descr":"Cuentas" ,"nomTbl":"#/azenctb/ctbcta" ,"nomRcrZoom":"^/ctbcta.zf2" ,"nfils":16 ,"ncols":78 ,"fil":1 ,"col":1 ,"modo":29 ,"cmdsBtn":7682 ,"cmdsLE":0 ,"numLinsEnc":0 ,"numLinsDatos":0 ,"ctx":41278 ,"nfilsrx":0 ,"ncolsrx":0  }, "camps":[ {"etq":"Código  :","filEtq":0,"colEtq":0,"nomCmp":"codigo","filCmp":999999,"colCmp":999999,"lonv":20,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Nombre  :","filEtq":1,"colEtq":0,"nomCmp":"nombre","filCmp":999999,"colCmp":999999,"lonv":40,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RNaturaleza","filEtq":3,"colEtq":0,"nomCmp":"NULL","filCmp":7,"colCmp":14,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Débito","filEtq":4,"colEtq":1,"nomCmp":"atrTipo","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Crédito","filEtq":5,"colEtq":1,"nomCmp":"atrTipo","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo","filEtq":8,"colEtq":0,"nomCmp":"NULL","filCmp":12,"colCmp":14,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Auxiliar","filEtq":9,"colEtq":1,"nomCmp":"atrAuxiliar","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Mayor","filEtq":10,"colEtq":1,"nomCmp":"atrAuxiliar","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":11,"colEtq":1,"nomCmp":"atrAuxiliar","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RRetención","filEtq":3,"colEtq":15,"nomCmp":"NULL","filCmp":7,"colCmp":36,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Es retención","filEtq":4,"colEtq":16,"nomCmp":"atrRetencion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Genera retención","filEtq":5,"colEtq":16,"nomCmp":"atrRetencion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":6,"colEtq":16,"nomCmp":"atrRetencion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RIVA","filEtq":8,"colEtq":15,"nomCmp":"NULL","filCmp":12,"colCmp":36,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Es IVA","filEtq":9,"colEtq":16,"nomCmp":"atrIva","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Genera IVA","filEtq":10,"colEtq":16,"nomCmp":"atrIva","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":11,"colEtq":16,"nomCmp":"atrIva","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RAjustes x Inflación","filEtq":3,"colEtq":37,"nomCmp":"NULL","filCmp":7,"colCmp":58,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ajustable","filEtq":4,"colEtq":38,"nomCmp":"atrAjuste","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Es ajuste","filEtq":5,"colEtq":38,"nomCmp":"atrAjuste","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":6,"colEtq":38,"nomCmp":"atrAjuste","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RManeja","filEtq":8,"colEtq":37,"nomCmp":"NULL","filCmp":15,"colCmp":75,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Tercero","filEtq":9,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":0,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Anexo","filEtq":10,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":1,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Centro de costo","filEtq":11,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":2,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Documentos dos","filEtq":12,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":4,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Banco","filEtq":13,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":5,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Caja","filEtq":14,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":7,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Activos fijos","filEtq":9,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":6,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Clase Tsr","filEtq":10,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":8,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Proveedores","filEtq":11,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":11,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Cartera","filEtq":12,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":12,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Reteica","filEtq":13,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":13,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo Activo","filEtq":3,"colEtq":59,"nomCmp":"NULL","filCmp":7,"colCmp":75,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Corriente","filEtq":4,"colEtq":60,"nomCmp":"atrCgn","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) No Corrient","filEtq":5,"colEtq":60,"nomCmp":"atrCgn","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":6,"colEtq":60,"nomCmp":"atrCgn","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Anexo :","filEtq":13,"colEtq":0,"nomCmp":"anexo","filCmp":999999,"colCmp":999999,"lonv":6,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Es entidad resip","filEtq":14,"colEtq":0,"nomCmp":"atrEntRes","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Codigo ent. resip:","filEtq":15,"colEtq":0,"nomCmp":"codEntRes","filCmp":999999,"colCmp":999999,"lonv":14,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@H","filEtq":17,"colEtq":0,"nomCmp":"NULL","filCmp":76,"colCmp":0,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{F3}-Adicionar","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":267,"colCmp":44,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{F4}-Modificar","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":268,"colCmp":45,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{F5}-Consultar","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":269,"colCmp":61,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{^S}-Saldos","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":19,"colCmp":659457,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{Esc}-Cerrar","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":27,"colCmp":11,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0} ], "doms":[ {"nom":"codigo","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":1}, {"nom":"nombre","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"atrTipo","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrAuxiliar","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrAjuste","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrIva","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrRetencion","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrCgn","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0} ], "refs":[ {"nomTblFor":"#/azenctb/ctbanx", "alias":"anexo","junt":[{"nomCmp":"anexo" }],"nomRcrZoom":"^/ctbanx.zf2","descs":[{"etq":"","filEtq":13,"colEtq":16,"nomCamFor":"nombre","filCmp":999999,"colCmp":999999,"lonv":18,"modo":0} ],"debil":0
} ]
}
`]; 

interface OwnState
{
    recursoAMostrar:number,
}

export default class ZAreaTrabajo extends React.Component<any, OwnState>
{
    constructor(props:any){
        super(props);

        this.state = {
            recursoAMostrar:-1,
        };
    }

    mostrarRecurso(recursoIndex:number, e:any){
        this.setState({
            recursoAMostrar:recursoIndex,
        });
    }

    cerrarVentanaRecurso(){
        this.setState({recursoAMostrar:-1});
    }

    render(){
        return (
            <div className="container">
                <Row>
                    <Col md={12}>

                        <Navbar collapseOnSelect>
                            <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">Azen contabilidad web</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <NavItem eventKey={1} href="#">Ayuda</NavItem>
                                    <NavDropdown eventKey={2} title="Entidades" id="basic-nav-dropdown">
                                        <MenuItem eventKey={2.1} onClick={this.mostrarRecurso.bind(this, 0)}>Documento</MenuItem>
                                        <MenuItem eventKey={2.2} onClick={this.mostrarRecurso.bind(this, 1)}>Tercero</MenuItem>
                                        <MenuItem eventKey={2.3} onClick={this.mostrarRecurso.bind(this, 2)}>Cuenta</MenuItem>
                                        <MenuItem divider />
                                        <MenuItem eventKey={3.3}>Ayuda</MenuItem>
                                    </NavDropdown>
                                </Nav>
                                <Nav pullRight>
                                    <NavItem eventKey={1} href="#">
                                        <Glyphicon glyph="user" /> Usuario: Carlos Ríos
                                    </NavItem>
                                    <NavItem eventKey={2} href="#"> </NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>                    
                    </Col>    
                </Row>
                <Row>        
                    <Col md={12}>
                    {
                        this.state.recursoAMostrar >= 0 ?
                            <ZRecurso                         
                                zRecursoModel={JSON.parse(recursosList[this.state.recursoAMostrar]) as ZRecursoModel} 
                                show={this.state.recursoAMostrar >= 0}
                                onHide={this.cerrarVentanaRecurso.bind(this)}/>                                
                        : null
                    }
                    </Col>
                </Row>
            </div>
        );
    }
}