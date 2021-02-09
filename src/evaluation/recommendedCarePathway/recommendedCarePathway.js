import { CompareArrows } from '@material-ui/icons';
import React, { Component } from 'react';
import MyContext from '../../helper/themeContext';
import CRM from './CRM';
import JointNoi1 from './JointNoi1';
import JointNoi2 from './JointNoi2';
import JointNoi3 from './JointNoi3';
import JointNoi4 from './JointNoi4';
import JointNoi5 from './JointNoi5';
import JointNoi6 from './JointNoi6';
import JointSummary from './JointSummary';
import JointTreatment from './JointTreatment';
import JPR from './JPR';
import Replacement from './Replacement';
import Welcome from './Welcome';


const TJRPath="TJR"
const PJRPath="PJR"
const NOCPath="NOC"
const NOCOIPath="NOC-OI"


class RecommendedCarePathway extends Component {
    constructor(props) {
        super(props);
        this.state = { NoOfJoints:0,RemainingJointRCP:0,loading:true,page:0 }
    }

    handleFailure = () =>
    {
        alert('Unable to load Patient Recommended Care Pathway')
        this.context.history.push('/home')
    }

    componentDidMount()
    {
        let Evaluations = this.context.state.Evaluations
        let Eval =  this.context.state.Eval;
        if(Eval)
        {
            if(Eval.length>0)
            {
                this.setState({loading:true,NoOfJoints:this.context.state.Eval.length,RemainingJointRCP:this.context.state.Eval.length,page:0})
                this.LoadCurrRCP(this.context.state.Eval.length);
            }

            else this.handleFailure();            
        }
        else this.handleFailure();

    }

    getScore = (joint_id) =>
    {
        let OverallInterval = 0;
        let SumPain=0;
        let SumStiff=0;
        let SumFunction=0;

        const OverAll = this.context.ChartOverAll();

        let Question1Answer = parseInt(this.context.state.form.find(ques => ques.question_id.toString()==="1" && ques.joint_id.toString()===joint_id.toString()).pro_severity_id);
        if(Question1Answer.toString()!=="NaN")
        {
            SumStiff=Question1Answer - 1;
        }
        else SumStiff=0;

        this.context.state.form.filter(ques=> { if( (parseInt(ques.question_id) > 1 && parseInt(ques.question_id) < 6) && ques.joint_id.toString()===joint_id.toString() )  {  if( parseInt(ques.pro_severity_id).toString()!="NaN"){ SumPain=SumPain+parseInt(ques.pro_severity_id) -1 } } });
        this.context.state.form.filter(ques=> { if( (parseInt(ques.question_id) > 5 && parseInt(ques.question_id) < 8) && ques.joint_id.toString()===joint_id.toString() )  {  if( parseInt(ques.pro_severity_id).toString()!="NaN"){ SumFunction=SumFunction+parseInt(ques.pro_severity_id) -1 } } });

        OverallInterval = Math.round( ( OverAll[SumPain+SumStiff+SumFunction]) * 10)/10; 
        return OverallInterval
    }


    LoadCurrRCP = (remaining=null) =>
    {
        let RemainingJointRCP;
        let NoOfJoints = this.context.state.Eval.length;
        let Replacement="";
        let Path="";
        let Score=0;
        let Joint_Name=""

        if(remaining==null)
        {
            RemainingJointRCP=NoOfJoints;
        }   
        else RemainingJointRCP = remaining;

        let activeJointIndex=NoOfJoints-RemainingJointRCP;
        let Curr_Joint_id = this.context.state.Eval[activeJointIndex].joint_id;
        let Curr_Evaluation = this.context.state.Evaluations.find(joint => joint.joint_id.toString()===Curr_Joint_id.toString());
        

        console.log(Curr_Joint_id)
        console.log(Curr_Evaluation)

        if(Curr_Joint_id.toString()==="3")
        {
            Joint_Name="Right Knee"
        }
        else if(Curr_Joint_id.toString()==="4")
        {
            Joint_Name="Left Knee"
        }

        console.log(Joint_Name)
        // matching ids => [{name:'Normal to Slight',id:'1'},{name:'Moderate',id:'2'},{name:'Near End Stage',id:'3'},{name:'End Stage',id:'4'},{name:'Cannot Evaluate',id:'5'}].map((text,id)=>
        //compartment levels

        //cannot eval   0
        // normal       1
        //moderate      2
        //nes           3
        //es            4

        let Compartment1 = this.getAggregate(Curr_Evaluation.Xrays[0].xrays[0].state,Curr_Evaluation.Xrays[0].xrays[1].state)
        let Compartment2 = this.getAggregate(Curr_Evaluation.Xrays[1].xrays[0].state,Curr_Evaluation.Xrays[1].xrays[1].state)
        let Compartment3 = parseInt(Curr_Evaluation.Xrays[2].xrays[0].state);
        Score  = this.getScore(Curr_Joint_id);
        if(Score < 74)
        {
            if(Compartment1>2 || Compartment2>2 || Compartment3>2)
            {   
                
                //surgical Candidate Care Pathway
                if( (Compartment1==1 && Compartment2==1) || (Compartment1==1 && Compartment3==1) || (Compartment2==1 && Compartment3==1) )
                {  
                    //Optional Injections - Partial Joint Replacement
                    if(Compartment1>2)
                    {
                        Replacement="Medial"
                    }
                    else if(Compartment2>2)
                    {
                        Replacement="Lateral"
                    }
                    else if(Compartment3>2)
                    {
                        Replacement="Kneecap"
                    }

                    Path=PJRPath
                }

                else
                {
                    //Optional Injections - Total Joint Replacement
                    Path=TJRPath
                }
            }

            else
            {
                //Non Operative Care Pathway
                if(Compartment1>1 || Compartment2>1 || Compartment3>1)
                {
                    //Non Operative Candidate (Operational Injection)
                    Path=NOCOIPath
                }
                else
                {
                    //Non Operative Candidate
                    Path=NOCPath;
                }
            }
        }

        else 
        {
            //Non Operative Care Pathway
            if(Compartment1>1 || Compartment2>1 || Compartment3>1)
            {
                //Non Operative Candidate (Operational Injection)
                Path=NOCOIPath;
            }
            else
            {
                //Non Operative Candidate
                Path=NOCPath;
            }
        }
        this.setState({Joint_Name,loading:false,Replacement,Path,Score,Compartment1,Compartment2,Compartment3})
    }

    getAggregate = (a,b) =>
    {
        console.log(a);
        let int1 = parseInt(a)
        let int2 = parseInt(b)

        if(int1 - int2>0)
        {
            return int1;
        }

        else return int2;
        
    }

    
    getNocPages = () =>
    {
        switch(this.state.page)
        {
            case 0: return <Welcome handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} handleReviewClick={this.handleReviewClick} />;
            case 1: return <CRM handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 2: return <JointSummary Joint_Name={this.state.Joint_Name} Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 3: return <JointTreatment Joint_Name={this.state.Joint_Name} Recommendation="NOC" Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 4: return <JointNoi1 Joint_Name={this.state.Joint_Name} Noi={[]} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextEval}/>;
            default: return <div> Unreachable step</div>;
        }  
    }

    getNocOiPages = () =>
    {
        switch(this.state.page)
        {
            case 0: return <Welcome handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} handleReviewClick={this.handleReviewClick} />;
            case 1: return <CRM handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 2: return <JointSummary Joint_Name={this.state.Joint_Name} Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 3: return <JointTreatment Joint_Name={this.state.Joint_Name} Recommendation="NOC" Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 4: return <JointNoi2 Joint_Name={this.state.Joint_Name} Noi={[]} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextEval}/>;
            default: return <div> Unreachable step</div>;
        }  
    }

    getTjrPages = () =>
    {
        switch(this.state.page)
        {
            case 0: return <Welcome handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} handleReviewClick={this.handleReviewClick} />;
            case 1: return <CRM handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 2: return <JointSummary Joint_Name={this.state.Joint_Name} Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 3: return <JointTreatment Joint_Name={this.state.Joint_Name} Recommendation="OC" Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;           
            case 4: return <Replacement Joint_Name={this.state.Joint_Name} Recommendation="TKR" Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 5: return <JointNoi3 Joint_Name={this.state.Joint_Name}  Noi={[]} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick}/>;
            case 6: return <JointNoi4 Joint_Name={this.state.Joint_Name} Noi={[]} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextEval}/>;
            default: return <div> Unreachable step</div>;
        }  
    }

    getPjrPages = () =>
    {
        switch(this.state.page)
        {
            case 0: return <Welcome handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} handleReviewClick={this.handleReviewClick} />;
            case 1: return <CRM handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 2: return <JointSummary Joint_Name={this.state.Joint_Name} Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 3: return <JointTreatment Joint_Name={this.state.Joint_Name} Recommendation="OC" Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;           
            case 4: return <Replacement Joint_Name={this.state.Joint_Name} Recommendation="PKR" Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 5: return <JPR Joint_Name={this.state.Joint_Name} Replacement={this.state.Replacement} Score={this.state.Score} Compartment1={this.state.Compartment1} Compartment2={this.state.Compartment2} Compartment3={this.state.Compartment3} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick} />;
            case 6: return <JointNoi3 Joint_Name={this.state.Joint_Name} Noi={[]} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextClick}/>;
            case 7: return <JointNoi4  Joint_Name={this.state.Joint_Name} Noi={[]} handleBackClick = {this.handleBackClick} handleNextClick={this.handleNextEval}/>;
            default: return <div> Unreachable step</div>; 
        }  
    }


    handleBackClick = () =>
    {
        if(this.state.page===0)
        {
            this.context.history.push('./patient-summary')
            return;
        }

        else 
        {
            let newPage = this.state.page-1;
            this.setState({page:newPage})
        }
    }

    handleNextClick = () =>
    {
        let newPage = this.state.page+1;
        this.setState({page:newPage})
    }

    handleReviewClick = () =>
    {
        this.context.history.push('/tutorials/patient-evaluation-education')
        //go to review education page
    }

    handleNextEval = () =>
    {
        let RemainingJointRCP = this.state.RemainingJointRCP - 1;
        if(RemainingJointRCP>0)
        {
            this.setState({loading:true,RemainingJointRCP,page:2})
            this.LoadCurrRCP(RemainingJointRCP);
        }

        else
        {
            this.context.history.push('./complete-pdf')
        }

    }

    render() { 
        return ( 
            this.state.loading===false?
                this.state.Path===NOCPath?this.getNocPages()
            :   this.state.Path===NOCOIPath?this.getNocOiPages()
            :   this.state.Path===TJRPath?this.getTjrPages()
            :   this.state.Path===PJRPath?this.getPjrPages()
            :
            // unknown path block
            <div>

            </div>
            : //loading block
            <div>

            </div>
           
        );
    }
}
 
RecommendedCarePathway.contextType=MyContext;
export default RecommendedCarePathway;