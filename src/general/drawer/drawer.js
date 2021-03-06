import React, { Component } from 'react';
import MenuImage from  '../../assets/menu.png';
import MenuCloseImage from  '../../assets/cross.png';


import './drawer.css';
import MyContext from '../../helper/themeContext';
import GetData from '../../Fetch/getDataUniversal';
import { Button } from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const style = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});
  

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = { open:false,resumeWarningModal:false }
    }

    componentDidMount()
    {
        if(!(this.context.state.token==undefined || this.context.state.token.toString() ==="" || this.context.state.token.toString() === " " || this.context.state.type==undefined || this.context.state.type.toString() ==="" || this.context.state.type.toString() === " " || this.context.state.user_id==undefined || this.context.state.user_id.toString() ==="" || this.context.state.user_id.toString() === " " || this.context.state.user_email==undefined || this.context.state.user_email.toString() ==="" || this.context.state.user_email.toString() === " " || this.context.state.user_type==undefined))
        {document.getElementById('Main_Drawer_Menu_Div').classList.add('Main_Drawer_Menu_Div_Close')
        document.addEventListener('click',this.handleClickAway);}
    }

    componentWillUnmount()
    {
        document.removeEventListener('click',this.handleClickAway);
    }

    toggleMenu = () =>
    {
        if(this.state.open===false)
        {
            this.setState({open:true});
            document.getElementById('Main_Drawer_Menu_Div').classList.remove('Main_Drawer_Menu_Div_Close')
            document.getElementById('Main_Drawer_Menu_Div').classList.add('Main_Drawer_Menu_Div_Open')
        }
        
        else
        {
            this.setState({open:false});
            document.getElementById('Main_Drawer_Menu_Div').classList.remove('Main_Drawer_Menu_Div_Open')
            document.getElementById('Main_Drawer_Menu_Div').classList.add('Main_Drawer_Menu_Div_Close')
        }
    }

    handleClickAway = event =>
    {
        if(this.state.open===true)
        {
            let Div=document.getElementById('Main_Drawer_Menu_Div');
            let Image=document.getElementById('Main_Drawer_Menu_Image')
            let Text=document.getElementById('Drawer_Logout_Div')
            // console.log(Text)
            // console.log(event.target)
            
            if(event.target !== Div && event.target !== Image && event.target !== Text && Text!=null )
            {
                this.toggleMenu();
            }
        }
    }

    startEvaluation = () =>
    {
      if(parseInt(this.context.state.oldEvaluations.length)>0)  
      {
        this.setState({resumeWarningModal:true})
      }
  
      else 
      {
        this.context.newEval();
        this.context.history.push('/evaluation/welcome');
      }
    }

    startEducation = () =>
    {
        this.context.history.push('/tutorials/sbs/welcome')
    }

    resumeEvaluation = () =>
    {
        this.context.multipleUpdateValueWithHistory([{key:'old',value:true}],'/evaluation/demographics')
    }

    editProfile = () => 
    {
        this.context.history.push('/edit-profile')
    }


    closeResumeWarningModal = () =>
    {
        this.setState({resumeWarningModal:false})
    }

    deleteReportAndStartNew = () =>
    {
        this.setState({loading:true,resumeWarningModal:false})
        GetData(this.context.baseUrl+'/api/v1/delete/report',200,this.context.state.token,this.setMeTwo)
    }

    setMeTwo = () =>
    {
        this.context.multipleUpdateValueWithHistory([{key:'oldEvaluations',value:[]}],'/evaluation/welcome')
        this.context.newEval();
        this.setState({loading:false})
    }


    render() { 

        const {classes}=this.props;
        const path = this.context.history.location.pathname;

        const route1Enable = (path === "/evaluation/welcome" || path==="/evaluation/Video" || path==="/evaluation/Demographics")?false:true;
        const route1name = path.toString().includes("evaluation")?'New Evaluation':'New Evaluation';
        
        const route2Enable = false;
        // const route2Enable = (path === "/tutorials/sbs/welcome") ?false:true;
        const route2name = path.toString().includes("tutorials") ? 'Start Education from start':'Start Education';
        
        const route3Enable = (  (path.toString().includes("evaluation")) || (!this.context.state.evaluation_stage) ) ? false:true;
        const route4Enable = ( (path==="/home")  ) ? false:true;

        return ( 

            !(this.context.state.token==undefined || this.context.state.token.toString() ==="" || this.context.state.token.toString() === " " || this.context.state.type==undefined || this.context.state.type.toString() ==="" || this.context.state.type.toString() === " " || this.context.state.user_id==undefined || this.context.state.user_id.toString() ==="" || this.context.state.user_id.toString() === " " || this.context.state.user_email==undefined || this.context.state.user_email.toString() ==="" || this.context.state.user_email.toString() === " " || this.context.state.user_type==undefined)?

        <div id="Main_Drawer">

        <Backdrop className={classes.backdrop} open={this.state.loading}>
            <CircularProgress color="inherit" />
        </Backdrop>

        <div id="Main_Drawer_Menu_Image_Div"   onClick={this.toggleMenu} >
            <img src={MenuImage}  alt="Menu"  id="Main_Drawer_Menu_Image" />
        </div>

        <div id="Main_Drawer_Copyright_Text">
            © 2019 Hip & Knee - Step by Step. All rights reserved
        </div>

        
            <div id="Main_Drawer_Menu_Div">
                
                <img src={MenuCloseImage} onClick={this.toggleMenu} alt="Close"  id="Main_Drawer_Menu_Close_Image"/>
                <div id="Main_Drawer_Menu_Text_Wrapper">
                {console.log( this.context.state.user_type)}

                {
                    !(this.context.state.token==undefined || this.context.state.token.toString() ==="" || this.context.state.token.toString() === " " || this.context.state.type==undefined || this.context.state.type.toString() ==="" || this.context.state.type.toString() === " " || this.context.state.user_id==undefined || this.context.state.user_id.toString() ==="" || this.context.state.user_id.toString() === " " || this.context.state.user_email==undefined || this.context.state.user_email.toString() ==="" || this.context.state.user_email.toString() === " " || this.context.state.user_type==undefined)?
                    <div>
                        {/* click away listner on id  Drawer_Logout_Div */}
                        {/* to be done on refactoring code */}
                        {route4Enable?
                            <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={()=>{this.context.history.push('/home')}}>
                                Home
                            </div>
                        :null
                        }

                        {
                            this.context.state.user_type?this.context.state.user_type.id.toString()==="1"?
                                <div  onClick ={()=>{this.context.history.push('/admin/create-user')}} className="Main_Drawer_Menu_Text">
                                    Create User
                                </div> 
                            :   null  :null
                        }

                        {route2Enable?
                            <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={this.startEducation}>
                                {route2name}
                            </div>
                        :null
                        }

                        {route1Enable?
                            <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={this.startEvaluation}>
                                {route1name}
                            </div>
                        :null
                        }

                        {/* {route3Enable?
                            <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={this.resumeEvaluation}>
                                Resume Evaluation
                            </div>
                        :null
                        } */}

                        <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={this.editProfile}>
                            Edit Profile
                        </div>
                         
                        
                        <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={()=>this.context.logout()}>
                            Log Off
                        </div>
                    </div>
                    :null

                }


                    
                    {/* <div className="Main_Drawer_Menu_Text">
                        Left Knee Sample Patient
                    </div>
                    <div className="Main_Drawer_Menu_Text">
                        Right Hip Sample Patient
                    </div>
                    <div className="Main_Drawer_Menu_Text">
                        Left Hip Sample Patient
                    </div> */}
                </div>    
            </div>

            <Rodal visible={this.state.resumeWarningModal} onClose={this.closeResumeWarningModal}>
                <div>
                    <div className="Evaluation_Home_ResumeEvaluationWarningModal_Text_Div">
                        This will delete your on-going evaluation. Would you like to continue?
                    </div>

                    <div className="Evaluation_ResumeEvaluation_Button_Div">
                        <Button className="Evaluation_ResumeEvaluation_Button" variant="contained" onClick={this.deleteReportAndStartNew}> Yes </Button>
                    </div>
                </div>
            </Rodal>
       
        

        </div>
            
            
            :<div>
            </div>
         );
    }
}

Drawer.contextType=MyContext;
export default withStyles(style)(Drawer);