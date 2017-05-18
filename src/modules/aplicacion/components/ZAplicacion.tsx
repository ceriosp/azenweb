import * as React from 'react';

import {
    ZRecursoModel,
    ZRecursoModelWeb
} from "../../recursos";

import
{
    //Models
    ZMenuModel,

    //Components
    ZMenu
} from "../../zmenu";

import ZAreaTrabajo from './ZAreaTrabajo';

const menuJSON: string =
    
`
{
    "menu": [
        {
            "nom": " � ",
            "desc": "Opciones generales",
            "ctx": "1101",
            "desh": 0,
            "menu": [
                {
                    "nom": "Control impresi�n",
                    "desc": "Pone ventana de control para tareas de impresi�n",
                    "ctx": "110100",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Act/DesAct Gen Tabla...",
                    "desc": "Activa Desactiva generacion de reporte a tabla",
                    "ctx": "0",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Entorno...",
                    "desc": "Establece indicadores generales para el usuario",
                    "ctx": "110101",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Cambiar clave...",
                    "desc": "Cambia la clave de acceso del usuario",
                    "ctx": "1B02",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Editar texto...",
                    "desc": "Edita un archivo texto",
                    "ctx": "110113",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Calculadora",
                    "desc": "AZEN Calculadora",
                    "ctx": "0",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Ejecuci�n",
                    "desc": "Reporta un estado de ejecuci�n de la aplicaci�n",
                    "ctx": "1503",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Salir...",
                    "desc": "Termina la sesi�n de trabajo",
                    "ctx": "1300",
                    "desh": 0,
                    "menu": [ ]
                }
            ]
        },
        {
            "nom": "Asientos",
            "desc": "Asientos de diario",
            "ctx": "A100",
            "desh": 0,
            "menu": [
                {
                    "nom": "Editar",
                    "desc": "Edita los asientos de diario del mes activo",
                    "ctx": "A101",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Listar por Documento...",
                    "desc": "Revision de asientos por documento",
                    "ctx": "A103",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Listar por Fecha...",
                    "desc": "Revision de asientos por fecha",
                    "ctx": "A105",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Listar por Comprobante...",
                    "desc": "Revision de asientos por comprobante",
                    "ctx": "A107",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Consultar asiento...",
                    "desc": "Consulta un asiento",
                    "ctx": "A18F12",
                    "desh": 0,
                    "menu": [ ]
                }
            ]
        },
        {
            "nom": "Informes",
            "desc": "Menu de informes contables",
            "ctx": "A109",
            "desh": 0,
            "menu": [
                {
                    "nom": "Auxiliares",
                    "desc": "Menu de libros auxiliares",
                    "ctx": "A10B",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Cuenta...",
                            "desc": "Genera auxiliares por cuenta",
                            "ctx": "A10C",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Tercero...",
                            "desc": "Genera auxiliares por tercero",
                            "ctx": "A10E",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Anexo...",
                            "desc": "Genera auxiliares por anexo",
                            "ctx": "A113",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Centro de costo...",
                            "desc": "Genera auxiliares por centros de costo",
                            "ctx": "A115",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Banco...",
                            "desc": "Genera el auxiliar por banco",
                            "ctx": "A117",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Activos Fijos...",
                            "desc": "Genera el auxiliar por activos fijos",
                            "ctx": "A1C5",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Documento dos...",
                            "desc": "Auxiliar documento dos",
                            "ctx": "A1E4A",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Libros Mayores",
                    "desc": "Menu de libros mayores",
                    "ctx": "A119",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Prueba...",
                            "desc": "Genera el Balance de Prueba",
                            "ctx": "A11B",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Consolidado...",
                            "desc": "Genera el Balance Consolidado",
                            "ctx": "A11D",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Mayor...",
                            "desc": "Genera el Mayor y Balances",
                            "ctx": "A11F",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "PyG...",
                            "desc": "Genera el estado de Ganancias o Perdidas",
                            "ctx": "A121",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "General...",
                            "desc": "Genera el Balance General",
                            "ctx": "A123",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "CajaDiario...",
                            "desc": "Genera el Caja Diario",
                            "ctx": "A125",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Diario Columnario...",
                            "desc": "Genera el Caja Diario columnario",
                            "ctx": "A1CC1",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Comprobante de diario...",
                            "desc": "Comprobante de diario",
                            "ctx": "A1CC4",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Comprobante...",
                            "desc": "Genera el Balance por Comprobante",
                            "ctx": "A127",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Inventario...",
                            "desc": "Genera el Inventario y Balance",
                            "ctx": "A1D2",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Retencion",
                    "desc": "Menu de informes de retencion",
                    "ctx": "A129",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Cuenta...",
                            "desc": "Informe de retencion por cuenta",
                            "ctx": "A12A",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Tercero...",
                            "desc": "Informe de retencion por tercero",
                            "ctx": "A12C",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Certificados...",
                            "desc": "Genera los Certificados de retencion",
                            "ctx": "A12E",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Iva...",
                    "desc": "Informes de IVA",
                    "ctx": "A130",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Documento Dos",
                    "desc": "Informes de documento dos",
                    "ctx": "0",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Saldos...",
                            "desc": "Saldos de documento dos",
                            "ctx": "A111",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Auxiliar...",
                            "desc": "Auxiliar de documento dos",
                            "ctx": "A111",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Doc2 - Centro de costos...",
                            "desc": "Informe de documento dos por centro de costos",
                            "ctx": "A111",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Externos",
                    "desc": "Informes a entidades externas",
                    "ctx": "A1E10",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Grandes contribuyentes...",
                            "desc": "Informe de grandes contribuyentes",
                            "ctx": "A1EA",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Medios magneticos...",
                            "desc": "Generacion de informacio a medios magneticos",
                            "ctx": "A1ED",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "CGN 001...",
                            "desc": "Generacion de cgn 001",
                            "ctx": "A1E2A",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "CGN 002...",
                            "desc": "Generacion de cgn 002",
                            "ctx": "A1E3A",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Inf. 206...",
                            "desc": "Generacion de informe formato 206 ssupersalud",
                            "ctx": "A1E3A",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Otros",
                    "desc": "Otros informes",
                    "ctx": "A1E40",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Resumido centro de costos tercero...",
                            "desc": "Resumido centro de costos tercero",
                            "ctx": "A1E4A",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Etiquetar Libros...",
                    "desc": "Etiquetas de Libros para Camara y comercio",
                    "ctx": "A1E8",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Visor Movimiento",
                    "desc": "Visor de movimiento",
                    "ctx": "0",
                    "desh": 0,
                    "menu": [ ]
                }
            ]
        },
        {
            "nom": "Procesos",
            "desc": "Menu de procesos especiales",
            "ctx": "A132",
            "desh": 0,
            "menu": [
                {
                    "nom": "Actualizacion...",
                    "desc": "Actualiza los saldos de las cuentas",
                    "ctx": "A133",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Ajustes...",
                    "desc": "Ejecuta el proceso de ajustes por inflacion",
                    "ctx": "A135",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Depreciacion...",
                    "desc": "Ejecuta el proceso de depreciacion de activos fijos",
                    "ctx": "A1CB",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Cierre de terceros...",
                    "desc": "Cierre de terceros",
                    "ctx": "A139",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Consolidacion...",
                    "desc": "Ejecuta el proceso de consolidacion de contabilidades",
                    "ctx": "A137",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Cierre de a�o...",
                    "desc": "Cierre de a�o",
                    "ctx": "A139",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Cambio de a�o ...",
                    "desc": "Prepara los archivos del nuevo a�o",
                    "ctx": "A1391",
                    "desh": 0,
                    "menu": [ ]
                },
                {
                    "nom": "Pasar saldos...",
                    "desc": "Pasa saldos de cuentas al siguiente a�o",
                    "ctx": "A1D0",
                    "desh": 0,
                    "menu": [ ]
                }
            ]
        },
        {
            "nom": "Definiciones",
            "desc": "Menu para la entrada de definiciones basicas",
            "ctx": "A18B",
            "desh": 0,
            "menu": [
                {
                    "nom": "Cuentas",
                    "desc": "Menu de cuentas",
                    "ctx": "A13B",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la tabla de cuentas",
                            "ctx": "A13D",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista el plan de cuentas",
                            "ctx": "A13F",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Terceros",
                    "desc": "Menu de terceros",
                    "ctx": "A141",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la tabla de terceros",
                            "ctx": "A142",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar por Codigo...",
                            "desc": "Lista los terceros ordenados por codigo",
                            "ctx": "A144",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar por Nombre...",
                            "desc": "Lista los terceros ordenados por nombre",
                            "ctx": "A146",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Documento dos",
                    "desc": "Menu de documentos dos",
                    "ctx": "A1F1A1",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la tabla de documentos dos",
                            "ctx": "A1F1A2",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la definicion de los documentos dos",
                            "ctx": "A1F1A5",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Asignar seguridad",
                            "desc": "Asignar seguridad  por documentos dos",
                            "ctx": "A1F1A8",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Documento",
                    "desc": "Menu de documentos",
                    "ctx": "A14D",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la tabla de documentos",
                            "ctx": "A14E",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar por Codigo...",
                            "desc": "Lista los documentos ordenados por codigo",
                            "ctx": "A150",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar Notas...",
                            "desc": "Lista las notas de documentos",
                            "ctx": "A152",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Informe de Numeracion...",
                            "desc": "Lista la numeracion de documentos",
                            "ctx": "A154",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Comprobante",
                    "desc": "Menu de comprobantes",
                    "ctx": "A148",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la tabla de comprobantes",
                            "ctx": "A149",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la definicion de los comprobantes",
                            "ctx": "A14B",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Anexos",
                    "desc": "Menu de anexos",
                    "ctx": "A156",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la tabla de anexos",
                            "ctx": "A157",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la definicion de los anexos",
                            "ctx": "A159",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Centros de costos",
                    "desc": "Menu de centros de costos",
                    "ctx": "A15B",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la tabla de centros de costos",
                            "ctx": "A15D",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la definicion de centros de costo",
                            "ctx": "A15E",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Activos Fijos",
                    "desc": "Menu para Activos Fijos",
                    "ctx": "A1BD",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la tabla de Activos Fijos",
                            "ctx": "A1BE",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Editar Cuentas",
                            "desc": "Edita las cuentas de Activos Fijos",
                            "ctx": "A1C01F",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la tabla de Activos Fijos",
                            "ctx": "A1C1",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar Cuentas...",
                            "desc": "Lista las cuentas de Activos Fijos",
                            "ctx": "A1C8",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Depreciacion...",
                            "desc": "Lista el estado de la depreciacion de los Activos Fijos",
                            "ctx": "A1E1",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Retencion",
                    "desc": "Menu de definicion de retencion",
                    "ctx": "A160",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la definicion de retencion",
                            "ctx": "A161",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la definicion de retencion",
                            "ctx": "A163",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Iva",
                    "desc": "Menu de definicion de IVA",
                    "ctx": "A165",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la definicion del IVA",
                            "ctx": "A166",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la definicion del IVA",
                            "ctx": "A168",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Ajustes",
                    "desc": "Menu de definicion de ajustes por inflacion",
                    "ctx": "A16A",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Editar",
                            "desc": "Edita la definicion de Ajustes por inflacion",
                            "ctx": "A16B",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la definicion de Ajustes por inflacion",
                            "ctx": "A16D",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "P y G",
                    "desc": "Menu para perdidas y ganancias",
                    "ctx": "A181",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Definir",
                            "desc": "Define formatos de ganancias o perdidas",
                            "ctx": "A1811",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la definicion del estado de ganacias o perdidas",
                            "ctx": "A183",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Utilidad...",
                            "desc": "Definicion de las utilidades o perdidas en cada mes",
                            "ctx": "A1BCF",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Balance",
                    "desc": "Menu para balances generales",
                    "ctx": "A185",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Definir",
                            "desc": "Define formatos de balance general",
                            "ctx": "A1851",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Lista la definicion de balance general",
                            "ctx": "A187",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": "Generales",
                    "desc": "Menu opciones generales",
                    "ctx": "A18C",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Parametros...",
                            "desc": "Edita los Parametros de activacion del usuario",
                            "ctx": "1201",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Configurar...",
                            "desc": "Edita la configuracion de la aplicacion",
                            "ctx": "A189",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Mantenimiento",
                            "desc": "Menu de mantenimiento",
                            "ctx": "A16F",
                            "desh": 0,
                            "menu": [
                                {
                                    "nom": "Integridad...",
                                    "desc": "Verifica la integridad de los datos",
                                    "ctx": "A178",
                                    "desh": 0,
                                    "menu": [ ]
                                },
                                {
                                    "nom": "Recodificar",
                                    "desc": "Recodificacion",
                                    "ctx": "A170",
                                    "desh": 0,
                                    "menu": [
                                        {
                                            "nom": "Cuentas...",
                                            "desc": "Recodificacion de cuentas en el movimiento",
                                            "ctx": "A171",
                                            "desh": 0,
                                            "menu": [ ]
                                        },
                                        {
                                            "nom": "Terceros...",
                                            "desc": "Recodificacion de terceros en el movimiento",
                                            "ctx": "A1922",
                                            "desh": 0,
                                            "menu": [ ]
                                        },
                                        {
                                            "nom": "Anexos...",
                                            "desc": "Recodificacion de anexos en el movimiento",
                                            "ctx": "A174",
                                            "desh": 0,
                                            "menu": [ ]
                                        },
                                        {
                                            "nom": "Centros de costos...",
                                            "desc": "Recodificacion de centros de costos en el movimiento",
                                            "ctx": "A176",
                                            "desh": 0,
                                            "menu": [ ]
                                        },
                                        {
                                            "nom": "Activos Fijos...",
                                            "desc": "Recodificacion de activos fijos en el movimiento",
                                            "ctx": "A191",
                                            "desh": 0,
                                            "menu": [ ]
                                        },
                                        {
                                            "nom": "Renumerar",
                                            "desc": "Permite renuerar un documento",
                                            "ctx": "0",
                                            "desh": 0,
                                            "menu": [ ]
                                        }
                                    ]
                                },
                                {
                                    "nom": "Reindexar...",
                                    "desc": "Reindexacion de tablas del sistema",
                                    "ctx": "A17A",
                                    "desh": 0,
                                    "menu": [ ]
                                },
                                {
                                    "nom": "Crear...",
                                    "desc": "Creacion de tablas del sistema",
                                    "ctx": "A17B",
                                    "desh": 0,
                                    "menu": [ ]
                                }
                            ]
                        },
                        {
                            "nom": "Bib. Listados",
                            "desc": "Visualizacion y edici�n de biblioteca de listados",
                            "ctx": "0",
                            "desh": 0,
                            "menu": [
                                {
                                    "nom": "Visualizar",
                                    "desc": "Visualiza un listado de la biblioteca",
                                    "ctx": "23011",
                                    "desh": 0,
                                    "menu": [ ]
                                },
                                {
                                    "nom": "Editar",
                                    "desc": "Edita biblioteca de listados",
                                    "ctx": "23012",
                                    "desh": 0,
                                    "menu": [ ]
                                }
                            ]
                        },
                        {
                            "nom": "Utilitarios",
                            "desc": "Menu de utilitarios",
                            "ctx": "A17D",
                            "desh": 0,
                            "menu": [
                                {
                                    "nom": "Visualizar...",
                                    "desc": "Visualizacion de tablas en forma columnaria.",
                                    "ctx": "A17F11",
                                    "desh": 0,
                                    "menu": [ ]
                                },
                                {
                                    "nom": "Exportar...",
                                    "desc": "Exportacion de los datos a formato ascii",
                                    "ctx": "A17E",
                                    "desh": 0,
                                    "menu": [ ]
                                },
                                {
                                    "nom": "Importar...",
                                    "desc": "Importacion de datos en formato ascii",
                                    "ctx": "A17F",
                                    "desh": 0,
                                    "menu": [ ]
                                },
                                {
                                    "nom": "Ejecutar...",
                                    "desc": "Ejecutar comando",
                                    "ctx": "A17F11",
                                    "desh": 0,
                                    "menu": [ ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nom": "Ventana",
                    "desc": "Manejo de las ventanas de trabajo",
                    "ctx": "1310",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Mover",
                            "desc": "Mueve la ventana activa",
                            "ctx": "1302",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Dimensionar",
                            "desc": "Cambia de tama�o a la ventana activa",
                            "ctx": "1303",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Maximizar",
                            "desc": "Maximiza o desmaximiza la ventana activa",
                            "ctx": "1304",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Organizar",
                            "desc": "Organiza la disposici�n de las ventanas",
                            "ctx": "1305",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Siguiente",
                            "desc": "Arriva a la siguiente ventana",
                            "ctx": "1306",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Cerrar",
                            "desc": "Cierra la ventana activa",
                            "ctx": "1307",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Cerrar todo",
                            "desc": "Cierra todas las ventanas",
                            "ctx": "1308",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Listar...",
                            "desc": "Muestra la lista de todas las ventanas actuales",
                            "ctx": "1309",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Comandos del sistema...",
                            "desc": "Descripcion de lo comados del sistema",
                            "ctx": "0",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                },
                {
                    "nom": " ? ",
                    "desc": "Opciones generales de ayuda",
                    "ctx": "1004",
                    "desh": 0,
                    "menu": [
                        {
                            "nom": "Contenido",
                            "desc": "Muestra la tabla de contenido",
                            "ctx": "1000",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Indice",
                            "desc": "Muestra el �ndice de t�rminos",
                            "ctx": "1001",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Ayuda sobre ayuda",
                            "desc": "Muestra ayuda sobre el manejo de ayudas",
                            "ctx": "1003",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Entorno AZEN",
                            "desc": "Explica los aspectos b�sicos de una aplicaci�n AZEN",
                            "ctx": "1005",
                            "desh": 0,
                            "menu": [ ]
                        },
                        {
                            "nom": "Acerca de...",
                            "desc": "Muestra versi�n e informaci�n general sobre la aplicaci�n",
                            "ctx": "1002",
                            "desh": 0,
                            "menu": [ ]
                        }
                    ]
                }
            ]
        }
    ]
}
`;

const recursosList: Array<string> =
    [
        `{ "ven":{ "descr":"Documentos" ,"nomTbl":"#/azenctb/ctbdoc" ,"nomRcrZoom":"^/ctbdoc.zf2" ,"nfils":16 ,"ncols":70 ,"fil":1 ,"col":1 ,"modo":29 ,"cmdsBtn":7682 ,"cmdsLE":8368 ,"numLinsEnc":0 ,"numLinsDatos":0 ,"ctx":41295 ,"nfilsrx":0 ,"ncolsrx":0  }, "camps":[ {"etq":"Código  :","filEtq":0,"colEtq":0,"nomCmp":"codigo","filCmp":999999,"colCmp":999999,"lonv":4,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Nombre  :","filEtq":1,"colEtq":0,"nomCmp":"nombre","filCmp":999999,"colCmp":999999,"lonv":40,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Comprobante : ","filEtq":2,"colEtq":0,"nomCmp":"comprobante","filCmp":999999,"colCmp":999999,"lonv":2,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo de numeración","filEtq":4,"colEtq":0,"nomCmp":"NULL","filCmp":7,"colCmp":20,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Autom tica","filEtq":5,"colEtq":1,"nomCmp":"numeracion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Manual","filEtq":6,"colEtq":1,"nomCmp":"numeracion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RCorte de numeración","filEtq":4,"colEtq":21,"nomCmp":"NULL","filCmp":7,"colCmp":42,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Anual","filEtq":5,"colEtq":22,"nomCmp":"corte","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Mensual","filEtq":6,"colEtq":22,"nomCmp":"corte","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RConsecutivo anual","filEtq":4,"colEtq":43,"nomCmp":"NULL","filCmp":7,"colCmp":61,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"No :","filEtq":6,"colEtq":46,"nomCmp":"cons_anual","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RConsecutivos mensuales","filEtq":8,"colEtq":0,"nomCmp":"NULL","filCmp":14,"colCmp":61,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Inicial :","filEtq":9,"colEtq":1,"nomCmp":"cons_00","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Enero   :","filEtq":10,"colEtq":1,"nomCmp":"cons_01","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Febrero :","filEtq":11,"colEtq":1,"nomCmp":"cons_02","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Marzo   :","filEtq":12,"colEtq":1,"nomCmp":"cons_03","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Abril   :","filEtq":13,"colEtq":1,"nomCmp":"cons_04","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Mayo    :","filEtq":9,"colEtq":21,"nomCmp":"cons_05","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Junio   :","filEtq":10,"colEtq":21,"nomCmp":"cons_06","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Julio   :","filEtq":11,"colEtq":21,"nomCmp":"cons_07","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Agosto  :","filEtq":12,"colEtq":21,"nomCmp":"cons_08","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Sep/bre :","filEtq":13,"colEtq":21,"nomCmp":"cons_09","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Octubre :","filEtq":9,"colEtq":41,"nomCmp":"cons_10","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Nov/bre :","filEtq":10,"colEtq":41,"nomCmp":"cons_11","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Dic/bre :","filEtq":11,"colEtq":41,"nomCmp":"cons_12","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Cierre  :","filEtq":12,"colEtq":41,"nomCmp":"cons_13","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Archivo formato :","filEtq":15,"colEtq":0,"nomCmp":"formato","filCmp":999999,"colCmp":999999,"lonv":8,"posBit":0,"claseInd":0,"tipo":65,"lon":0,"noEnTabla":0,"modo":16,"numDec":0}, {"etq":"Impresora :","filEtq":15,"colEtq":35,"nomCmp":"impresora","filCmp":999999,"colCmp":999999,"lonv":14,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@H","filEtq":17,"colEtq":0,"nomCmp":"NULL","filCmp":999999,"colCmp":0,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^T}-Formato","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":20,"colCmp":252,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0} ], "doms":[ {"nom":"nombre","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"comprobante","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"numeracion","minimo":"NULL","maximo":"NULL","defecto":"1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"corte","minimo":"NULL","maximo":"NULL","defecto":"1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_anual","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_00","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_01","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_02","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_03","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_04","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_05","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_06","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_07","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_08","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_09","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_10","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_11","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_12","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"cons_13","minimo":"1","maximo":"NULL","defecto":" 1","plantilla":"NULL","siRequerido":0,"siMemoriza":0} ], "refs":[ {"nomTblFor":"#/azenctb/ctbcte", "alias":"comprobante","junt":[{"nomCmp":"comprobante" }],"nomRcrZoom":"^/ctbcte.zf2","descs":[{"etq":"","filEtq":2,"colEtq":20,"nomCamFor":"nombre","filCmp":999999,"colCmp":999999,"lonv":40,"modo":0} ],"debil":0
    }, {"nomTblFor":"à/zdim/zdim", "alias":"impresora","junt":[{"nomCmp":"impresora" }],"nomRcrZoom":"à/zdim/zdim.zf2","descs":[],"debil":0
    } ]
}`,

        `{ "ven":{ "descr":"Tercero" ,"nomTbl":"#/azenctb/ctbter" ,"nomRcrZoom":"^/ctbter.zf2" ,"nfils":17 ,"ncols":73 ,"fil":1 ,"col":1 ,"modo":29 ,"cmdsBtn":0 ,"cmdsLE":8368 ,"numLinsEnc":0 ,"numLinsDatos":0 ,"ctx":41283 ,"nfilsrx":0 ,"ncolsrx":0  }, "camps":[ {"etq":"Código         :","filEtq":0,"colEtq":0,"nomCmp":"codigo","filCmp":999999,"colCmp":999999,"lonv":13,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Identificación :","filEtq":0,"colEtq":41,"nomCmp":"id","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo ident.","filEtq":1,"colEtq":0,"nomCmp":"NULL","filCmp":3,"colCmp":35,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Nit","filEtq":2,"colEtq":1,"nomCmp":"tipoId","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Cédula","filEtq":2,"colEtq":12,"nomCmp":"tipoId","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Otro","filEtq":2,"colEtq":26,"nomCmp":"tipoId","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] No activo","filEtq":2,"colEtq":41,"nomCmp":"tipoRegimen","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":4,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Nombre completo:","filEtq":4,"colEtq":0,"nomCmp":"nombre","filCmp":999999,"colCmp":999999,"lonv":60,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Primer apellido:","filEtq":5,"colEtq":0,"nomCmp":"apellido1","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Segundo apellido:","filEtq":5,"colEtq":40,"nomCmp":"apellido2","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Primer nombre  :","filEtq":6,"colEtq":0,"nomCmp":"nombre1","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Segundo nombre  :","filEtq":6,"colEtq":40,"nomCmp":"nombre2","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Dirección      :","filEtq":7,"colEtq":0,"nomCmp":"direccion","filCmp":999999,"colCmp":999999,"lonv":60,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Ciudad         :","filEtq":8,"colEtq":0,"nomCmp":"ciudad","filCmp":999999,"colCmp":999999,"lonv":20,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Teléfonos      :","filEtq":9,"colEtq":0,"nomCmp":"telefono1","filCmp":999999,"colCmp":999999,"lonv":10,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"","filEtq":9,"colEtq":28,"nomCmp":"telefono2","filCmp":999999,"colCmp":999999,"lonv":10,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Fax  :","filEtq":9,"colEtq":51,"nomCmp":"fax","filCmp":999999,"colCmp":999999,"lonv":15,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo de regimen","filEtq":10,"colEtq":0,"nomCmp":"NULL","filCmp":14,"colCmp":18,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Simplificado","filEtq":11,"colEtq":1,"nomCmp":"tipoRegimen","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":3,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Común","filEtq":12,"colEtq":1,"nomCmp":"tipoRegimen","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Otros","filEtq":13,"colEtq":1,"nomCmp":"tipoRegimen","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo de impuesto","filEtq":10,"colEtq":20,"nomCmp":"NULL","filCmp":14,"colCmp":72,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Gran contribuyente","filEtq":11,"colEtq":21,"nomCmp":"tipoImp","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Autorretenedor","filEtq":12,"colEtq":21,"nomCmp":"tipoImp","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Retenedor de IVA","filEtq":11,"colEtq":43,"nomCmp":"tipoImp","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Es agente de retención","filEtq":12,"colEtq":43,"nomCmp":"tipoImp","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":3,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Consignar en   :","filEtq":15,"colEtq":0,"nomCmp":"nomBanco","filCmp":999999,"colCmp":999999,"lonv":60,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"e-mail         :","filEtq":16,"colEtq":0,"nomCmp":"email","filCmp":999999,"colCmp":999999,"lonv":60,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{F2}-Grabar","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":266,"colCmp":14,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^B}-Buscar","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":2,"colCmp":53,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^D}-Detallar","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":4,"colCmp":62,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^L}-Selecc.","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":12,"colCmp":57,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@B{^E}-Eliminar","filEtq":999999,"colEtq":999999,"nomCmp":"NULL","filCmp":5,"colCmp":20,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0} ], "doms":[ {"nom":"nombre","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"id","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"tipoId","minimo":"NULL","maximo":"NULL","defecto":"1","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"tipoRegimen","minimo":"NULL","maximo":"NULL","defecto":"2","plantilla":"NULL","siRequerido":0,"siMemoriza":0} ], "refs":[ ]
}`,

        `{ "ven":{ "descr":"Cuentas" ,"nomTbl":"#/azenctb/ctbcta" ,"nomRcrZoom":"^/ctbcta.zf2" ,"nfils":16 ,"ncols":78 ,"fil":1 ,"col":1 ,"modo":29 ,"cmdsBtn":7682 ,"cmdsLE":0 ,"numLinsEnc":0 ,"numLinsDatos":0 ,"ctx":41278 ,"nfilsrx":0 ,"ncolsrx":0  }, "camps":[ {"etq":"Código  :","filEtq":0,"colEtq":0,"nomCmp":"codigo","filCmp":999999,"colCmp":999999,"lonv":20,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Nombre  :","filEtq":1,"colEtq":0,"nomCmp":"nombre","filCmp":999999,"colCmp":999999,"lonv":40,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RNaturaleza","filEtq":3,"colEtq":0,"nomCmp":"NULL","filCmp":7,"colCmp":14,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Débito","filEtq":4,"colEtq":1,"nomCmp":"atrTipo","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Crédito","filEtq":5,"colEtq":1,"nomCmp":"atrTipo","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo","filEtq":8,"colEtq":0,"nomCmp":"NULL","filCmp":12,"colCmp":14,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Auxiliar","filEtq":9,"colEtq":1,"nomCmp":"atrAuxiliar","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Mayor","filEtq":10,"colEtq":1,"nomCmp":"atrAuxiliar","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":11,"colEtq":1,"nomCmp":"atrAuxiliar","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RRetención","filEtq":3,"colEtq":15,"nomCmp":"NULL","filCmp":7,"colCmp":36,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Es retención","filEtq":4,"colEtq":16,"nomCmp":"atrRetencion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Genera retención","filEtq":5,"colEtq":16,"nomCmp":"atrRetencion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":6,"colEtq":16,"nomCmp":"atrRetencion","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RIVA","filEtq":8,"colEtq":15,"nomCmp":"NULL","filCmp":12,"colCmp":36,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Es IVA","filEtq":9,"colEtq":16,"nomCmp":"atrIva","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Genera IVA","filEtq":10,"colEtq":16,"nomCmp":"atrIva","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":11,"colEtq":16,"nomCmp":"atrIva","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RAjustes x Inflación","filEtq":3,"colEtq":37,"nomCmp":"NULL","filCmp":7,"colCmp":58,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ajustable","filEtq":4,"colEtq":38,"nomCmp":"atrAjuste","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Es ajuste","filEtq":5,"colEtq":38,"nomCmp":"atrAjuste","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":6,"colEtq":38,"nomCmp":"atrAjuste","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RManeja","filEtq":8,"colEtq":37,"nomCmp":"NULL","filCmp":15,"colCmp":75,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Tercero","filEtq":9,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":0,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Anexo","filEtq":10,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":1,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Centro de costo","filEtq":11,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":2,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Documentos dos","filEtq":12,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":4,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Banco","filEtq":13,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":5,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Caja","filEtq":14,"colEtq":38,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":7,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Activos fijos","filEtq":9,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":6,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Clase Tsr","filEtq":10,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":8,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Proveedores","filEtq":11,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":11,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Cartera","filEtq":12,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":1,"posBit":12,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Reteica","filEtq":13,"colEtq":58,"nomCmp":"atrOtros","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":13,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@RTipo Activo","filEtq":3,"colEtq":59,"nomCmp":"NULL","filCmp":7,"colCmp":75,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Corriente","filEtq":4,"colEtq":60,"nomCmp":"atrCgn","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) No Corrient","filEtq":5,"colEtq":60,"nomCmp":"atrCgn","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":2,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"( ) Ninguno","filEtq":6,"colEtq":60,"nomCmp":"atrCgn","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":0,"claseInd":2,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Anexo :","filEtq":13,"colEtq":0,"nomCmp":"anexo","filCmp":999999,"colCmp":999999,"lonv":6,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"[ ] Es entidad resip","filEtq":14,"colEtq":0,"nomCmp":"atrEntRes","filCmp":999999,"colCmp":999999,"lonv":0,"posBit":1,"claseInd":1,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"Codigo ent. resip:","filEtq":15,"colEtq":0,"nomCmp":"codEntRes","filCmp":999999,"colCmp":999999,"lonv":14,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@@H","filEtq":17,"colEtq":0,"nomCmp":"NULL","filCmp":76,"colCmp":0,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{F3}-Adicionar","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":267,"colCmp":44,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{F4}-Modificar","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":268,"colCmp":45,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{F5}-Consultar","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":269,"colCmp":61,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{^S}-Saldos","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":19,"colCmp":659457,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0}, {"etq":"@L{Esc}-Cerrar","filEtq":0,"colEtq":0,"nomCmp":"NULL","filCmp":27,"colCmp":11,"lonv":0,"posBit":0,"claseInd":0,"tipo":0,"lon":0,"noEnTabla":0,"modo":0,"numDec":0} ], "doms":[ {"nom":"codigo","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":1}, {"nom":"nombre","minimo":"NULL","maximo":"NULL","defecto":"NULL","plantilla":"NULL","siRequerido":1,"siMemoriza":0}, {"nom":"atrTipo","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrAuxiliar","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrAjuste","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrIva","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrRetencion","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0}, {"nom":"atrCgn","minimo":"NULL","maximo":"NULL","defecto":"0","plantilla":"NULL","siRequerido":0,"siMemoriza":0} ], "refs":[ {"nomTblFor":"#/azenctb/ctbanx", "alias":"anexo","junt":[{"nomCmp":"anexo" }],"nomRcrZoom":"^/ctbanx.zf2","descs":[{"etq":"","filEtq":13,"colEtq":16,"nomCamFor":"nombre","filCmp":999999,"colCmp":999999,"lonv":18,"modo":0} ],"debil":0
} ]
}
`
    ];


interface OwnProps {

}

interface OwnState {
    mapRecursosActivos: Map<string, ZRecursoModelWeb>;
}

export default class ZAplicacion extends React.Component<OwnProps, OwnState>
{
    constructor(props: OwnProps) {

        super(props);

        this.state = {
            mapRecursosActivos: new Map<string, ZRecursoModelWeb>()
        };
    }
    render() {

        return (
            <div className="container">

                <ZMenu 
                    zmenuModel={JSON.parse(menuJSON) as ZMenuModel}
                    index={0}
                    despacharOpcionMenuFn={this.mostrarRecurso.bind(this)} />

                <ZAreaTrabajo 
                    mapRecursosActivos={this.state.mapRecursosActivos}
                    cerrarVentanaRecursoFn={this.cerrarVentanaRecurso.bind(this)} />

            </div>
        );
    }

    mostrarRecurso(recursoAAbrirId: string, e: any) {

        let { mapRecursosActivos } = this.state;

        let mapRecursosActivosUpdated: Map<string, ZRecursoModelWeb> = new Map<string, ZRecursoModelWeb>();
        let zrecursoModelWebAlFrente: ZRecursoModelWeb = null;

        if (mapRecursosActivos.has(recursoAAbrirId)) {
            zrecursoModelWebAlFrente = mapRecursosActivos.get(recursoAAbrirId);
            mapRecursosActivos.delete(recursoAAbrirId);
        } else {
            switch (recursoAAbrirId) {
                case "#/azenctb/ctbdoc":
                    zrecursoModelWebAlFrente = JSON.parse(recursosList[0]) as ZRecursoModelWeb;
                    break;
                case "#/azenctb/ctbter":
                    zrecursoModelWebAlFrente = JSON.parse(recursosList[1]) as ZRecursoModelWeb;
                    break;
                case "#/azenctb/ctbcta":
                    zrecursoModelWebAlFrente = JSON.parse(recursosList[2]) as ZRecursoModelWeb;
                    break;
            }
        }

        zrecursoModelWebAlFrente.activo = true;
        mapRecursosActivosUpdated.set(recursoAAbrirId, zrecursoModelWebAlFrente);
        mapRecursosActivos.forEach((zrecursoAAgregar: ZRecursoModelWeb, recursoIdAAgregar: string) => {
            zrecursoAAgregar.activo = false;
            mapRecursosActivosUpdated.set(recursoIdAAgregar, zrecursoAAgregar);
        });

        this.setState({
            mapRecursosActivos: mapRecursosActivosUpdated
        });
    }

    cerrarVentanaRecurso(recursoACerrarId: string, e: any) {

        let { mapRecursosActivos } = this.state;
        let mapRecursosActivosUpdated: Map<string, ZRecursoModelWeb> = new Map<string, ZRecursoModelWeb>();

        if (!mapRecursosActivos.has(recursoACerrarId)) {
            return;
        }

        let zrecursoModelWebAAbrir: ZRecursoModelWeb = null;
        let recursoAAbrirId: string = null;
        let zrecursoModelWebACerrar: ZRecursoModelWeb = mapRecursosActivos.get(recursoACerrarId);
        zrecursoModelWebACerrar.activo = false;

        let keysIterable: IterableIterator<string> = mapRecursosActivos.keys();
        for (let i = 0; i < mapRecursosActivos.size; i++) {
            let zrecursoModelWebForKey: string = keysIterable.next().value;
            if (zrecursoModelWebForKey == recursoACerrarId) {
                if (i < mapRecursosActivos.size - 1) {
                    recursoAAbrirId = keysIterable.next().value;
                }
            }
        }

        mapRecursosActivos.forEach((zrecursoAAgregar: ZRecursoModelWeb, recursoIdAAgregar: string) => {
            if (recursoIdAAgregar == recursoAAbrirId) {
                zrecursoAAgregar.activo = true;
            }
            else {
                zrecursoAAgregar.activo = false;
            }
            mapRecursosActivosUpdated.set(recursoIdAAgregar, zrecursoAAgregar);
        });

        this.setState({
            mapRecursosActivos: mapRecursosActivosUpdated
        });
    }
}
