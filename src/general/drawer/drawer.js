import React, { Component } from 'react';
import MenuImage from  '../../assets/menu.png';
import MenuCloseImage from  '../../assets/cross.png';


import './drawer.css';
import MyContext from '../../helper/themeContext';


class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = { open:false }
    }

    componentDidMount()
    {
        if(!(this.context.state.token==undefined || this.context.state.token =="" || this.context.state.token == " " || this.context.state.type==undefined || this.context.state.type =="" || this.context.state.type == " " || this.context.state.user_id==undefined || this.context.state.user_id =="" || this.context.state.user_id == " " || this.context.state.user_email==undefined || this.context.state.user_email =="" || this.context.state.user_email == " " || this.context.state.user_type==undefined))
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
    render() { 
        const path = this.context.history.location.pathname;

        const route1Enable = (path === "/evaluation/welcome" || path==="/evaluation/Video" || path==="/evaluation/Demographics")?false:true;
        const route1name = path.toString().includes("evaluation")?'Start Another Evaluation':'Start An Evaluation';
        
        const route2Enable = (path === "/tutorials/sbs/welcome") ?false:true;
        const route2name = path.toString().includes("tutorials") ? 'Start Education from start':'Start Education';
        
        const route3Enable = ( (path==="/tutorials/resume-tutorial") || (path.toString().includes("evaluation")) || (!this.context.state.report_id) || (this.context.state.report_id==null) ) ? false:true;
        
        return ( 

            !(this.context.state.token==undefined || this.context.state.token =="" || this.context.state.token == " " || this.context.state.type==undefined || this.context.state.type =="" || this.context.state.type == " " || this.context.state.user_id==undefined || this.context.state.user_id =="" || this.context.state.user_id == " " || this.context.state.user_email==undefined || this.context.state.user_email =="" || this.context.state.user_email == " " || this.context.state.user_type==undefined)?

        <div id="Main_Drawer">
 {        console.log(this.context.state.report_id)
}

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
                    this.context.state.user_type?this.context.state.user_type.id==1?
                        <div  onClick ={()=>{this.context.history.push('/admin/create-user')}} className="Main_Drawer_Menu_Text">
                            Create User
                        </div> 
                    :   null  :null
                }

                {
                    !(this.context.state.token==undefined || this.context.state.token =="" || this.context.state.token == " " || this.context.state.type==undefined || this.context.state.type =="" || this.context.state.type == " " || this.context.state.user_id==undefined || this.context.state.user_id =="" || this.context.state.user_id == " " || this.context.state.user_email==undefined || this.context.state.user_email =="" || this.context.state.user_email == " " || this.context.state.user_type==undefined)?
                    <div>
                        {route1Enable?
                            <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={()=>this.context.logout()}>
                                {route1name}
                            </div>
                        :null
                        }

                        {route2Enable?
                            <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={()=>this.context.logout()}>
                                {route2name}
                            </div>
                        :null
                        }

                        {route3Enable?
                            <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={()=>this.context.logout()}>
                                Resume Evaluation
                            </div>
                        :null
                        }
                         
                        
                        <div id="Drawer_Logout_Div" className="Main_Drawer_Menu_Text" onClick ={()=>this.context.logout()}>
                            Log out
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
       
        

        </div>
            
            
            :<div>
            </div>
         );
    }
}

Drawer.contextType=MyContext;
export default Drawer;