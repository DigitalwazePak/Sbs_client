
import React from 'react';
import Xray1 from '../assets/uploadBoxThumb/xray1.jpg';
import Xray2 from '../assets/uploadBoxThumb/xray2.jpg';
import Xray3 from '../assets/uploadBoxThumb/xray3.jpg';
import Xray4Left from '../assets/uploadBoxThumb/xray4Left.jpg';
import Xray4Right from '../assets/uploadBoxThumb/xray4Right.jpg';
import GetDataJson from '../Fetch/getDataJsonAsync';

export async function LoadNewEval(Store,oldEvaluation)   {

    let patient = {};
    let evaluation_stage =  oldEvaluation.stage.id; 
    patient["name"]=oldEvaluation.patient[0].name;    
    patient["birth_date"]=DateFormatter(oldEvaluation.patient[0].birthday,'/')
    patient["age"]=oldEvaluation.patient[0].age;
    patient["gender"]=oldEvaluation.patient[0].gender;
    patient["height"]=oldEvaluation.patient[0].height;
    patient["home_phone"]=oldEvaluation.patient[0].homephone;
    patient["cell_phone"]=oldEvaluation.patient[0].cellphone;
    patient["weight"]=oldEvaluation.patient[0].weight;
    patient["home_address"]=oldEvaluation.patient[0].homeaddress;
    patient["email"]=oldEvaluation.patient[0].email;
    patient["marital_status"]=oldEvaluation.patient[0].maritalstatus;
    patient["date"]=DateFormatter(oldEvaluation.patient[0].date,'-')

    console.log(patient)
    let temp_report_id=oldEvaluation.incomplete_vistor_id;
    console.log(temp_report_id)
    let temp_patient_id=oldEvaluation.patient[0].id;
    console.log(temp_patient_id)
        
    let Eval=[];
    let activeJointIndex=0;

    //populating forms
    let newForm=[];
    let Xrays=[];
    let noOfEvalRemainToUpload=null;

    if(parseInt(evaluation_stage)>1)
    {
        if(oldEvaluation.joint_hurt_priority.length>0)
        {
            const EvalAndForm = await initializeFormAndEval(oldEvaluation.joint_hurt_priority);
            Eval = EvalAndForm.Eval;
            newForm = EvalAndForm.Form;
            activeJointIndex = 0;
            noOfEvalRemainToUpload = Eval.length;
        }  
    }

    if(parseInt(evaluation_stage)>2)
    {
        if(oldEvaluation.form.length>0)
        {
            oldEvaluation.form.forEach(element => {
                let question=newForm.find(el => el.question_id==element.question_id && el.joint_id.toString()==element.joint_id.toString());
                question.visitor_id=element.visitor_id;
                question.pro_severity_id=element.pro_severity_id;
            });
        }
    }

    if(parseInt(evaluation_stage)>3)
    {
        if(oldEvaluation.Uploaded_xrays.length>0)
        {
            let RightKnee=false;
            let LeftKnee=false;

            Eval.forEach(element => {
                if(element.name==="Right Knee")
                {
                    RightKnee=true
                }
                else if(element.name==="Left Knee")
                {
                    LeftKnee=true
                }
                
            });

            console.log(RightKnee)
            console.log(LeftKnee)

            if(RightKnee===true && LeftKnee === true)
            {
                
                Xrays=[
                    {id:7,name:'PA Standing Bilateral Flexion',isDone:false,image:null,thumbnail:Xray1,enable:true},
                    {id:1,name:'PA Standing Bilateral Non-Flexion',isDone:false,image:null,thumbnail:Xray2,enable:false},
                    {id:6,name:'Bilateral Kneecap',isDone:false,image:null,thumbnail:Xray3,enable:false},
                    {id:3,name:'Right Lateral',isDone:false,image:null,thumbnail:Xray4Right,enable:false},
                    {id:5,name:'Left Lateral',isDone:false,image:null,thumbnail:Xray4Left,enable:false},

                ] 
            }

            else if(RightKnee==true)
            {
                Xrays=[
                    {id:7,name:'PA Standing Bilateral Flexion',isDone:false,image:null,thumbnail:Xray1,enable:true},
                    {id:1,name:'PA Standing Bilateral Non-Flexion',isDone:false,image:null,thumbnail:Xray2,enable:false},
                    {id:2,name:'Right Kneecap',isDone:false,image:null,thumbnail:Xray3,enable:false},
                    {id:3,name:'Right Lateral',isDone:false,image:null,thumbnail:Xray4Right,enable:false},
                ] 
            }

            else if(LeftKnee==true)
            {
                Xrays=[
                    {id:7,name:'PA Standing Bilateral Flexion',isDone:false,image:null,thumbnail:Xray1,enable:true},
                    {id:1,name:'PA Standing Bilateral Non-Flexion',isDone:false,image:null,thumbnail:Xray2,enable:false},
                    {id:4,name:'Left Kneecap',isDone:false,image:null,thumbnail:Xray3,enable:false},
                    {id:5,name:'Left Lateral',isDone:false,image:null,thumbnail:Xray4Left,enable:false},
                ] 
            }
        }
        
    }

    if(parseInt(evaluation_stage)>4)
    {
        
        
    }

    //get processed xrays images and move on
    if(evaluation_stage>3)    
    {
        await SetProcessedXrays(Xrays,temp_report_id,Store)
        let stateArray = [{key:'noOfEvalRemainToUpload',value:noOfEvalRemainToUpload},{key:'evaluation_stage',value:evaluation_stage},{key:'form',value:newForm},{key:'Eval',value:Eval},{key:'activeJointIndex',value:activeJointIndex},{key:'report_id',value:temp_report_id},{key:'patient_id',value:temp_patient_id},{key:'patient',value:patient}]
        Store.multipleUpdateValueWithHistory(stateArray,'/evaluation/demographics');
    }

    //move on
    else Store.multipleUpdateValueWithHistory([{key:'noOfEvalRemainToUpload',value:noOfEvalRemainToUpload},{key:'evaluation_stage',value:evaluation_stage},{key:'Xrays',value:Xrays},{key:'form',value:newForm},{key:'Eval',value:Eval},{key:'activeJointIndex',value:activeJointIndex},{key:'report_id',value:temp_report_id},{key:'patient_id',value:temp_patient_id},{key:'patient',value:patient}],'/evaluation/demographics')
}

async function SetProcessedXrays(Xrays,report_id,Store)
{
    const isExist = await CheckXrays(Xrays);
    if(isExist===false)
    {
        const response = await getXrays(report_id,Store.baseUrl,Store.state.token);
        const abcd = await setXrays(response,Xrays,Store)
    }

    return;
}


function CheckXrays(Xrays)
{
    let xrayExist = true;

    console.log('checking xrays => ',Xrays)
    Xrays.forEach((xray)=>
    { 
        if(xray.image)
        {
            if(xray.image.toString()==="null" || xray.image.toStrimg()==="" || xray.image.toString()===" ")
            {
                xrayExist=false;
            }
        }
        else xrayExist=false;    
    })

    return xrayExist;
}

async function getXrays(report_id,baseUrl,token)
{
    let req = 
    {
        visitor_id:report_id
    }
    const response = await GetDataJson(baseUrl+'/api/v1/xrays',200,req,token);
    return response;
}

async function setXrays( response,Xrays,Store )
{
    console.log('in set xrays => ',response);
    let contextXrays = Xrays;
    if(response.ResponseCode==="Success")
    {
        response.Xrays.forEach((xray)=>
        {
            let row = contextXrays.find((x)=> x.id.toString()===xray.xray_type_id.toString());
            if(row)
            {
                row.image=xray.url;
            }
        })
    }

    console.log(contextXrays)
    await Store.multipleUpdateValue([{key:'Xrays',value:contextXrays}])
    return;
}



function DateFormatter(date,splitter='/')
{
    
    let CustomDate = date.toString().match(/\d+/g).map(Number);
    let CustomDate_year=CustomDate[0];
    let CustomDate_month=CustomDate[1];
    let CustomDate_date=CustomDate[2];
    if(CustomDate_month.toString().length==1)
    {
        CustomDate_month='0'+CustomDate_month;
    }  
    if(CustomDate_date.toString().length==1)
    {
        CustomDate_date='0'+CustomDate_date;
    }
    return CustomDate_date+splitter+CustomDate_month+splitter+CustomDate_year;
}


function initializeFormAndEval(joint_hurts)
{
    console.log(joint_hurts)
    //Any change in this function, then newEvaluation should also be changed.
    let Form = [];
    let Eval =[];
    for(let i=0; i<joint_hurts.length; i++)
    {    
        let element = joint_hurts[i];
        Form.push({name:'Question1',question_id:1,pro_severity_id:null,visitor_id:null,joint_id:element.joint_id})
        Form.push({name:'Question2',question_id:2,pro_severity_id:null,visitor_id:null,joint_id:element.joint_id})
        Form.push({name:'Question3',question_id:3,pro_severity_id:null,visitor_id:null,joint_id:element.joint_id})
        Form.push({name:'Question4',question_id:4,pro_severity_id:null,visitor_id:null,joint_id:element.joint_id})
        Form.push({name:'Question5',question_id:5,pro_severity_id:null,visitor_id:null,joint_id:element.joint_id})
        Form.push({name:'Question6',question_id:6,pro_severity_id:null,visitor_id:null,joint_id:element.joint_id})
        Form.push({name:'Question7',question_id:7,pro_severity_id:null,visitor_id:null,joint_id:element.joint_id})
        
    
        let name=null;
        if(element.joint_id=='3')
        {
            name='Right Knee'
        }
        else if(element.joint_id=='4')
        {
            name='Left Knee'
        }
        else if(element.joint_id=='1')
        {
            name='Right Hip'
        }
        else if(element.joint_id=='2')
        {
            name='Left Hip'
        }

        Eval.push({visitor_id:element.visitor_id,joint_id:element.joint_id,name:name,priority_id:element.priority_id,isEvaluated:false,joint_hurt_id:element.id})
    }

    Eval.sort(function(a, b){ return a.priority_id-b.priority_id});
    return {Eval,Form}    
}
    

