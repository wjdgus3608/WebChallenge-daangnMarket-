import React from "react";
import CarDetail from "~pages/ProductDetail/CategoryDetail/carDetail";

function DynamicDetail(props:any) {
    switch (props.category) {
        case 0:
            return (
               <CarDetail/>
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

export default DynamicDetail;