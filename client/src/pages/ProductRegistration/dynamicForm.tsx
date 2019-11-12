import React from "react";
import Carform from "~pages/ProductRegistration/CategoryForm/carform";

function DynamicForm(props:any) {
    switch (props.category) {
        case 0:
            return (
                <Carform />
            );
            break;
        case 1:
            return(<div><span>abcddd</span></div>)
            break;
        case 2:
            return(<div></div>)
            break;
        case 3:
            return(<div></div>)
            break;
    }
    return(<div></div>)
}

export default DynamicForm;