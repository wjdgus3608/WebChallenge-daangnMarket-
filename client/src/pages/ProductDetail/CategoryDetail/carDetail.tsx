import React from "react";
function CarDetail() {
    return(
        <div>
            <li className="list-item car-model-year">
                차량 연식 <span>3년</span>
            </li>
            <li className="list-item car-mileage">
                주행 거리 <span>1,299km</span>
            </li>
            <li className="list-item car-smoking">
                판매자 흡연 여부 <span>흡연자</span>
            </li>
        </div>
    );
}

export default CarDetail;