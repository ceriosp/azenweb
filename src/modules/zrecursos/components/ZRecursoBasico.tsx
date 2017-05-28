import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CSSProperties
} from 'react';

import {
    Col,
    Form,
    Panel 
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZRecursoViewModel,
    ZRecursoModel,
    ZCampoModel,
    ZReferenciaViewModel,
} from "../../zcommon";

import ZCampo from './ZCampo';
import ZVentanaRecurso from './ZVentanaRecurso';

interface OwnProperties
{   
    onCerrarVentanaFn: (zRecursoViewModel: ZRecursoViewModel) => void;     
    onCampoZoomClick?: (zreferenciaViewModel:  ZReferenciaViewModel) => void;

    zRecursoViewModel:ZRecursoViewModel;
    mapRecursosZoomActivosIndxById: Map<string, ZRecursoViewModel>;
    esModal: boolean;
    container?: any;
}

export default class ZRecursoBasico extends React.Component<OwnProperties, void>
{
    private zRecursoViewModel:ZRecursoViewModel;
    private zcampoRegionEnProceso:ZCampoModel;

    private zcamposForma:Array<ZCampoModel> = [];

    constructor(props:OwnProperties){        
        super(props);
    }
    
    render(){
        
        this.initializeRender();                
        this.clasificarCamposAPintar();
                
        return (
            <Panel>
                <Form onSubmit={this.formSubmitted.bind(this)} horizontal>
                    {this.zcamposForma.map(this.pintarZCampoEnRecurso.bind(this))}
                </Form>
                {this.renderRecursosZoom()}
            </Panel>      
        );
    }

    initializeRender(){
        this.zRecursoViewModel = this.props.zRecursoViewModel;
        this.zcamposForma = new Array<ZCampoModel>();
    }

    pintarZCampoEnRecurso(zcampoAPintar:ZCampoModel, index:number){        

        if(this.estaCampoEnRegionEnProceso(zcampoAPintar)){
            return;
        }

        let zcamposEnRegionActualList : Array<ZCampoModel> = new Array<ZCampoModel>();        
        let esCheckboxAislado:boolean = false;
        if(zcampoAPintar.etq.startsWith("@R")) //Region
        {
            zcamposEnRegionActualList = this.getCamposEnRegion(zcampoAPintar, index);
        } 
        else if(zcampoAPintar.claseInd == ZCommon.Constants.CAMPO_RADIO){            
            esCheckboxAislado = true;
        }                

        return (
                <Col key={index} md={6}>
                    <ZCampo 
                        key={zcampoAPintar.nomCmp} 
                        zrecursoViewModel={this.zRecursoViewModel}
                        zcampoModel={zcampoAPintar}
                        esCheckboxAislado={esCheckboxAislado}
                        zcamposEnRegionList={zcamposEnRegionActualList}
                        onCampoZoomClick={this.props.onCampoZoomClick} />
                </Col>
        );
    }

    getCamposEnRegion(zcampoRegion:ZCampoModel, zcampoRegionIndex:number):Array<ZCampoModel>{

        let { camps } = this.zRecursoViewModel;
    
        this.zcampoRegionEnProceso = zcampoRegion;

        let zcamposEnGrupoList : Array<ZCampoModel> = new Array<ZCampoModel>();
        let campsSlice = camps.slice(zcampoRegionIndex+1, camps.length-1);
        for(let i=0; i<campsSlice.length; i++){
            if(this.estaCampoEnRegionEnProceso(campsSlice[i])){
                zcamposEnGrupoList.push(campsSlice[i]);
            }
            else{
                break;
            }
        }

        return zcamposEnGrupoList;
    }

    estaCampoEnRegionEnProceso(zcampoModel: ZCampoModel):boolean{        

        if(this.zcampoRegionEnProceso == null){
            return false;
        }

        return (            
            (this.zcampoRegionEnProceso.filEtq < zcampoModel.filEtq && 
            zcampoModel.filEtq < this.zcampoRegionEnProceso.filCmp) &&
            (this.zcampoRegionEnProceso.colEtq < zcampoModel.colEtq &&
            zcampoModel.colEtq < this.zcampoRegionEnProceso.colCmp)
        );
    }

    clasificarCamposAPintar(){
        
        let zcampoAPintar:ZCampoModel;
        for(let i=0; i<this.props.zRecursoViewModel.camps.length; i++){

            zcampoAPintar = this.props.zRecursoViewModel.camps[i];
            if(zcampoAPintar.etq.startsWith("@@B") || zcampoAPintar.etq.startsWith("@B")) //Botón
            {
                continue;
            }
            if(zcampoAPintar.etq.startsWith("@L"))//Botones línea comandos
            {            
                continue;
            }
            if(zcampoAPintar.etq.startsWith("@@H"))//Línea horizontal
            {                
                continue;
            }            

            this.zcamposForma.push(zcampoAPintar);
        }
    }

    renderRecursosZoom(): Array<ZVentanaRecurso> {

        let zventanasRecursoZoomCompList = new Array<any>();

        //debugger
        this.zRecursoViewModel.mapZoomsIdsIndxByCampo.forEach((zreferenciaViewModel: ZReferenciaViewModel, nomCmp: string) => {

            if (!this.props.mapRecursosZoomActivosIndxById.has(zreferenciaViewModel.nomRcrZoom)) {
                //continue
                return true;
            }
            zventanasRecursoZoomCompList.push(
                <ZVentanaRecurso
                    key={nomCmp}
                    mapRecursosZoomActivosIndxById={this.props.mapRecursosZoomActivosIndxById}
                    container={this.props.container}
                    onCerrarVentanaFn={this.props.onCerrarVentanaFn}
                    zRecursoViewModel={this.props.mapRecursosZoomActivosIndxById.get(zreferenciaViewModel.nomRcrZoom)}
                    esModal={this.props.esModal}
                />);
        });

        return zventanasRecursoZoomCompList;
    }

    formSubmitted(e: React.SyntheticEvent<HTMLButtonElement>){
        e.preventDefault();
        let sourceEventButton:HTMLButtonElement = e.target as HTMLButtonElement;
        console.log(sourceEventButton);
        alert("Form submitted: " + sourceEventButton.name + " ");
    }    
}