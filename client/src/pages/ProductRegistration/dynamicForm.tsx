import React from "react";
import CarForm from "~pages/ProductRegistration/CategoryForm/carForm";


function DynamicForm(props:any) {
    const dataChange=(data:any)=>{
        props.dataChange(data)
    }
    switch (props.category) {
        case 0:
            return (
                <CarForm dataChange={dataChange}/>
            );
        case 1:
            return(<div></div>);
            break;
        case 2:
            return(<div></div>);
            break;
        case 3:
            return(<div></div>);
            break;
        default:
            return (<div></div>);
    }
}

export default DynamicForm;
