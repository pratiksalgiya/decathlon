import React from 'react';
import axios from 'axios';

class ListComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    changeEditMode = (obj) => {
        this.setState(obj);
    }
    updateComponentValue = (obj) => {
        this.setState(obj.editModeFalse);
        obj.ele[obj.value] = this.refs[obj.ref].value
    }
    renderEditView = (obj)=>{
        return (<div>
                    <div className="default-view">
                        <label>{obj.label}: </label><textarea type="text" defaultValue={obj.ele[obj.value]} ref={obj.ref}/>
                    </div>
                    <button onClick={()=>this.changeEditMode(obj.editModeFalse)}>Cancel</button>
                    <button onClick={()=>this.updateComponentValue(obj)}>Save</button>
                </div>
            );
    }
    renderDefaultView = (obj)=>{
        return (<div>
                    <div className="default-view">
                        <label>{obj.label}: </label>
                        <div onDoubleClick={()=>{this.changeEditMode(obj.editMode)}}>{obj.ele[obj.value]}</div>
                    </div>
                    <button onClick={()=>{this.changeEditMode(obj.editMode)}}>Edit</button>
                </div>);
    }
    handleDelete=(data)=>{
        axios.get("https://jsonplaceholder.typicode.com/posts").then((response)=>{
            for(var i=0; i<this.props.apidata.length; i++)
            {
                var element = this.props.apidata[i];
                if(data.id===element.id){
                    this.props.apidata.splice(i,1);
                    break;
                }
            };
            this.props.updateState({apidata:this.props.apidata});
        });
    }

    render(){
        var list = this.props.apidata.map((ele, index)=>{
            var titleProps = {
                editMode:{[`titleIsInEditMode${index}`]: true}, 
                ref: "titleInputRef"+index,
                editModeFalse:{[`titleIsInEditMode${index}`]: false},  
                ele:ele,
                value:"title",
                label: "Title"
            }
            var bodyProps = {
                editMode:{[`bodyIsInEditMode${index}`]: true}, 
                editModeFalse:{[`bodyIsInEditMode${index}`]: false},  
                ref: "bodyInputRef"+index,
                ele:ele,
                value:"body",
                label: "Body"
            }
            
            return  ( 
                <div key={index} className="div-list"> 
                    {this.state[`titleIsInEditMode${index}`] ? 
                        this.renderEditView(titleProps) : this.renderDefaultView(titleProps)}
                    {this.state[`bodyIsInEditMode${index}`] ? 
                        this.renderEditView(bodyProps) : this.renderDefaultView(bodyProps)}
                    <span>
                        <button onClick={()=>{this.handleDelete(ele)}}>DELETE</button>
                    </span>
                </div>
            );
        });
        return (
            <div>  
                <header className='header'> Decathlon Project</header>  
                <div className='mainclass'>{list}</div> 
            </div> 
        )
    }
}
export default ListComponent;