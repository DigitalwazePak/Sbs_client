import React, { Component } from 'react';


import Tick from '../../assets/tick-black.png';
import Grid from '@material-ui/core/Grid';
import MyContext from '../../helper/themeContext';

import './getImage.css';

const height='60px';

class GetImage extends Component {
    constructor(props) {
        super(props);
        this.state = { Evaluations:[]  }
    }

    UNSAFE_componentWillMount()
    {
        this.setState({Evaluations:this.context.state.Evaluations})
    }


    render() { 
        return ( 
            <div className="GetImage" style={{width:"900px",height:"1300px",backgroundColor:"white",position:'absolute',top:'-1600px',left:'1000px'}}>
                <div  id="ImageReportMainDiv">
                    <div className="xray-report-card-header" style={{marginBottom:'20px',lineHeight:'50px'}}>
                       <span className="bold"> Patient Information </span> 
                    </div>
                    
                    <div className="report-image-patient-info-div  GetImage_Report_Box_Text3">
                        <div className="report-image-patient-info-box">
                            <div className="report-image-patient-info-left">
                                <span className="bold">Name: </span> {this.context.state.patient.name}
                            </div>
                            <div className="report-image-patient-info-right">
                                <span className="bold">Birthdate: </span> {this.context.state.patient.birth_date}
                            </div>

                        </div>
                        <br/>
                        <div className="report-image-patient-info-box">
                            <div className="report-image-patient-info-left">
                                <span className="bold">ID: </span> {this.context.state.patient_id}
                            </div>
                            <div className="report-image-patient-info-right">
                            <span className="bold">Height: </span> {this.context.state.patient.height}
                            </div>

                        </div>
                        <br/>
                        <div className="report-image-patient-info-box GetImage_Report_Box_Text3">
                            <div className="report-image-patient-info-left">
                            <span className="bold">Age: </span>  {this.context.state.patient.age}
                            </div>
                            <div className="report-image-patient-info-right">
                            <span className="bold">Weight: </span>  {this.context.state.patient.weight}
                            </div>

                        </div>
                        <br/>
                        <div className="report-image-patient-info-box  GetImage_Report_Box_Text3">
                            <div className="report-image-patient-info-left">
                            <span className="bold">Gender: </span>  {this.context.state.patient.gender}
                            </div>
                            <div className="report-image-patient-info-right">
                            <span className="bold">Email: </span>    {this.context.state.patient.email}
                            </div>

                        </div>
                        <br/>
                        <div className="report-image-patient-info-box">
                            <div className="report-image-patient-info-left">
                            <span className="bold">Cell Phone: </span>  {this.context.state.patient.cell_phone}
                            </div>
                            <div className="report-image-patient-info-right">

                            </div>

                        </div>
                        <br/>
                        <div className="report-image-patient-info-box">
                            <div className="report-image-patient-info-left">
                            <span className="bold">Home Phone: </span>  {this.context.state.patient.home_phone}
                            </div>
                            <div className="report-image-patient-info-right">

                            </div>

                        </div>
                        <br/>
                        <div className="report-image-patient-info-box">
                            <div className="report-image-patient-info-left">
                                <span className="bold">Home Adress: </span> {this.context.state.patient.home_address}
                            </div>
                            <div className="report-image-patient-info-right">

                            </div>

                        </div>
                       

                    </div>
                    <div className="xray-report-card-header">
                        Xray Report Card: {this.state.Evaluations.find(eva=>eva.joint_id==this.props.EvaluationId).name}
                    </div>
                <Grid container>
                   

                    <Grid container item xs={6} spacing={0} style={{height:'160px'}}>
                        <React.Fragment>
                    
                            <Grid item xs={12}>
                                <span className="GetImage_Report_Box_Text3">
                                    {this.context.state.patient_name}<br/>
                                    ID: {this.context.state.patient_id} <br/>
                                    X-ray Evaluations: {this.context.state.patient.date} <br/>
                                    Date X-ray Taken: {this.context.state.patient.date} <br/>
                                </span>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                    <Grid container item xs={6} spacing={0} style={{height:'160px'}}>
                        <React.Fragment>
                    
                            <Grid item xs={3} >
                                <div style={{width:'2px' ,height:'160px' , background:'black', transform: 'rotate(45deg) translateY(-18px) translateX(49px)',}}>
                                </div>
                                <div className="GetImage_Report_Box_Text4">
                                    Normal/Slight
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style={{width:'2px' ,height:'160px' , background:'black', transform: 'rotate(45deg) translateY(-18px) translateX(49px)',}}>
                                </div>
                                <div className="GetImage_Report_Box_Text4">
                                    Moderate
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style={{width:'2px' , height:'160px' , background:'black', transform: 'rotate(45deg) translateY(-18px) translateX(49px)',}}>
                                </div>
                                <div className="GetImage_Report_Box_Text4">
                                    Near End Stage
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style={{width:'2px' ,height:'160px'  , background:'black', transform: 'rotate(45deg) translateY(-18px) translateX(49px)',}}>
                                </div>
                                <div className="GetImage_Report_Box_Text4">
                                    End Stage
                                </div>
                            </Grid>

                        </React.Fragment>
                    </Grid>
                    { this.state.Evaluations.find(eva=>eva.joint_id==this.props.EvaluationId).Xrays.map((type,id)=>
                        
                        <Grid container item xs={12} key={id}>
                            <Grid container item xs={3} spacing={0} style={{border:'1px solid #000000',height:`calc((${type.xrays.length} * ${height}) - (2px * ${type.xrays.length}))`}}>
                                <React.Fragment>
                            
                                    <Grid item xs={12} style={{height:'100%'}}>
                                        <div className="GetImage_Report_Box_Text5">
                                            {type.name} <br/> {type.name!=="Kneecap" && "Compartment"}
                                        </div>
                                    </Grid>

                                </React.Fragment>
                            </Grid> 
                            <Grid container item xs={9} spacing={0} >
                            {
                            type.xrays.map((xray,id)=>

                                <React.Fragment key={id}>    
                                    <Grid item xs={4} style={{position:'relative',border:'1px solid #000000',height:`calc(${height} - 2px)` }}>
                                        <div className="GetImage_Report_Box_Button_Div"> 
                                            <div className="GetImage_Report_Box_Text5">
                                                {xray.name}
                                            </div>
                                            {/* <Button className="GetImage_Report_Box_Button"  variant="contained" onClick={()=>this.handleSelect(type.name,xray.name,xray.state,xray.image)}> {xray.name} </Button> */}
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} style={{border:'1px solid #000000',height:`calc(${height} - 2px)` , background:xray.state==1?'#6C8D31':''}}>
                                        <div className="GetImage_Report_Box_Selected_Box"> {xray.state==1 && <img src={Tick} alt="Ticked" /> } </div> 
                                    </Grid>
                                    <Grid item xs={2} style={{border:'1px solid #000000',height:`calc(${height} - 2px)`,background:xray.state==2?'yellow':''}}>
                                        <div className="GetImage_Report_Box_Selected_Box"  > {xray.state==2 && <img src={Tick} alt="Ticked" /> }  </div> 
                                    </Grid>
                                    <Grid item xs={2} style={{border:'1px solid #000000',height:`calc(${height} - 2px)`,background:xray.state==3?'#FA9E2D':''}}>
                                        <div className="GetImage_Report_Box_Selected_Box"> {xray.state==3 && <img src={Tick} alt="Ticked" /> } </div> 
                                    </Grid>
                                    <Grid item xs={2} style={{border:'1px solid #000000',height:`calc(${height} - 2px)`,background:xray.state==4?'#C50000':''}}>
                                        <div className="GetImage_Report_Box_Selected_Box"> {xray.state==4 && <img src={Tick} alt="Ticked" /> } </div> 
                                    </Grid>
                                </React.Fragment>
                                
                            ) 
                            }
                            </Grid>
                        </Grid>
                    
                    )}
                </Grid>


                
            </div>
            
        </div> );
    }
}
GetImage.contextType=MyContext;
export default GetImage;