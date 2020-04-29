import * as React from "react";

import {
  Grid,
  Row,
  Col,
  Thumbnail,
  Button,
  NavItem,
  Glyphicon,
} from "react-bootstrap";

import * as ZCommon from "../../zcommon";
import {
  //Contracts
  IZLoginModule,
  IZApl,
} from "../../zcommon";

import { ZProcesandoContainer } from "../../zaplicacion/containers/ZProcesandoContainer";
import { ZLoginContainer } from "../../zlogin/containers/ZLoginContainer";
import { ZAplicacionContainer } from "../../zaplicacion/containers/ZAplicacionContainer";

export interface OwnProps {}

export interface ConnectedState {
  zLoginModule: IZLoginModule;
}

export interface ConnectedDispatch {}

export class ZListadoAplicaciones extends React.Component<
  OwnProps & ConnectedState & ConnectedDispatch,
  undefined
> {
  constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
    super(props);
  }

  render() {
    const { apls } = this.props.zLoginModule.zAplList;

    //this.props.zLoginModule.zAplList.apls[0].
    if (apls.find((apl) => apl.descrOpc)) console.log("debug 1", apls);

    const azenPto = sessionStorage.getItem(
      ZCommon.Constants.SessionStorageKeyEnum.AZEN_PUERTO
    );

    if (azenPto) {
      return (
        <div>
          <ZAplicacionContainer />
          <ZProcesandoContainer />
        </div>
      );
    }

    return (
      <div className="apls-list">
        {!apls || (apls.length == 0 && <ZLoginContainer />)}

        <Grid></Grid>

        {/* {apls.length > 0 && (
                    this.renderAplList(this.props.zLoginModule)
                )} */}

        {apls.length > 0 && this.rendersApls(apls)}
        <br />
        {apls.length > 0 && this.rendersOpts(apls)}

        <ZProcesandoContainer />
      </div>
    );
  }

  private rendersApls = (apls: IZApl[]) => {
    const aplsOpts = apls.filter((apl) => !apl.opc);
    if (aplsOpts.length > 0) {
      return (
        <Grid>
          <Col md={12}>
            <span style={{ color: "#222" }}>Aplicaciones</span>
          </Col>

          {aplsOpts.map((apl) => (
            <Col md={3} xs={6}>
              <NavItem  href={`?idApl=${apl.apl}&nomApl=${apl.descr}&lanzarMenu=1&tkna=${this.props.zLoginModule.tkna}`} target="_blank">
                <Glyphicon glyph="list-alt" /> {apl.descr}
              </NavItem>
            </Col>
          ))}
        </Grid>
      );
    }

    return <span></span>;
  };

  private rendersOpts = (apls: IZApl[]) => {
    const opts = apls.filter((apl) => apl.opc);
    if (opts.length > 0) {
      return (
        <Grid>
          <Col md={12}>
            <span style={{ color: "#222" }}>Opciones</span>
          </Col>

          {opts.map((opc) => (
            <Col md={3} xs={6}>
              <h6>{opc.descr}</h6>
              <a href={`?idApl=${opc.apl}&opcion=${opc.opc}&tkna=${this.props.zLoginModule.tkna}`} target="_blank">
                <Thumbnail src="dist/img/azenLogo.jpg"></Thumbnail>
              </a>
            </Col>
          ))}
        </Grid>
      );
    }

    return <span></span>;
  };

  private renderAplList(zLoginModule: IZLoginModule) {
    let zAplCols: Array<JSX.Element> = [];

    zLoginModule.zAplList.apls.forEach((zApl: IZApl, index: number) => {
      zAplCols.push(
        <Col
          key={"zAplCol" + index}
          xs={12}
          xsOffset={0}
          sm={4}
          smOffset={0}
          md={4}
          mdOffset={0}
          lg={2}
          lgOffset={index % 4 == 0 ? 2 : 0}
        >
          <Thumbnail src="dist/img/azenLogo.jpg">
            <h4>{zApl.descr}</h4>
            <p>
              <Button
                bsStyle="primary"
                value={zApl.apl}
                href={`?idApl=${zApl.apl}&nomApl=${zApl.descr}&lanzarMenu=1`}
                target="_blank"
              >
                Ejecutar
              </Button>
            </p>
          </Thumbnail>
        </Col>
      );
    });

    const zAplsContainer: JSX.Element = (
      <Grid
        fluid
        style={{
          paddingTop: "2%",
        }}
      >
        <Row>{zAplCols}</Row>
      </Grid>
    );

    return zAplsContainer;
  }
}
