import React from "react";

function Carform() {
    return (
        <div>
        <div className="form-group form-car-model-year">
            <select id="carModelYear" className="form-control" required={true}>
                <option value="">차량 연식을 선택해주세요</option>
                <option value="2020">2020년</option>
                <option value="2019">2019년</option>
                <option value="2018">2018년</option>
                <option value="2017">2017년</option>
                <option value="2016">2016년</option>
                <option value="2015">2015년</option>
                <option value="2014">2014년</option>
                <option value="2013">2013년</option>
                <option value="2012">2012년</option>
                <option value="2011">2011년</option>
                <option value="2010">2010년</option>
            </select>
        </div>
        <div className="form-group form-car-mileage">
        <input type="number" className="form-control" id="carMileage" placeholder="주행거리를 입력해주세요.(km)" required={true}/>
        </div>
        <div className="form-group form-car-smoking">
        <label>차량 판매자 흡연 여부</label>
    <div className="form-check form-check-inline form-check-smoking">
        <input className="form-check-input" type="radio" name="smokingOptions" id="inlineSmoker" value="true" required={true}/>
        <label className="form-check-label smoker" htmlFor="inlineSmoker">예, 흡연자 입니다.</label>
</div>
<div className="form-check form-check-inline form-check-nonsmoking">
<input className="form-check-input" type="radio" name="smokingOptions" id="inlineNonSmoker" value="false" />
<label className="form-check-label non-smoker" htmlFor="inlineNonSmoker">아니오, 비 흡연자 입니다.</label>
</div>
</div>
        </div>
    );
}

export default Carform;