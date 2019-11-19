import * as React from 'react';
import * as ReactDOM from "react-dom";
import RangeSlider from "~components/RangeSlider/RangeSlider";
import {useEffect, useState} from "react";

function FilterDialog(props:any) {
    const [isOpen,setIsOpen]=useState(props.open);
    const [radioChecked,setRadioChecked]=useState()
    const [carYear,setCarYear]=useState({val1:2010,val2:2020});
    const [carMile,setCarMile]=useState({val1:0,val2:10000})
    useEffect(() => {
        setIsOpen(props.open);
    }, [props.open])
    const handleClose=()=>{
        setIsOpen(!isOpen);
        props.close();
    };
    const handleInit=()=>{
        setCarYear({val1:2010,val2:2020});
        setCarMile({val1: 0,val2: 10000});
        setRadioChecked('');
        props.handleInit();
    }
    const handleYearValue=(child_val:number[])=>{
        setCarYear({val1: child_val[0],val2: child_val[1]})
    }
    const handleMileValue=(child_val:number[])=>{
        setCarMile({val1: child_val[0],val2: child_val[1]})
    }
    const handleRadio=(changeEvent:any)=>{
        setRadioChecked(changeEvent.target.value);
    };
    const handleSubmit=()=>{
        props.handleSubmit(carYear,carMile,radioChecked);
        handleClose();
    };

    return ReactDOM.createPortal(
                 <div className={'modal fade '+(isOpen?"show":"")} id="section-filter" tabIndex={-1} role="dialog" data-controller="design"
                      data-action="modal_example" style={{display:isOpen?"block":"none"}} aria-hidden="true">
                 <div className="modal-dialog modal-filter" role="document">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h4 className="modal-title">차량 조건 설정</h4>
                                 <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                                     <i className="material-icons">clear</i>
                                 </button>
                             </div>
                             <div className="modal-body">
                                 <div className="form-group filter-car-model-year">
                                     <label className="" htmlFor="sliderCarModelYear">차량 연식 범위</label>
                                     <RangeSlider min={2010} max={2020} step={1} values={carYear} handleValue={handleYearValue}/>
                                         <small id="sliderCarModelYearHelp" className="text-muted">2010년부터
                                             2020년까지</small>
                                 </div>

                                 <div className="form-group filter-car-mileage">
                                     <label htmlFor="sliderCarMileage">차량 주행 거리</label>
                                     <RangeSlider min={0} max={10000} step={100} values={carMile} handleValue={handleMileValue}/>
                                     <small id="sliderCarMileageHelp" className="text-muted">0km부터 10000km까지</small>
                                 </div>

                                 <div className="form-group filter-car-smoking">
                                     <label>차량 판매자 흡연 여부</label>

                                     <div className="form-check form-check-inline">
                                         <input className="form-check-input" type="radio" name="formRadiosSmoking"
                                                id="formRadiosSmoking_1" value="option1"  checked={radioChecked==="option1"} onChange={handleRadio}/>
                                         <label className="form-check-label" htmlFor="formRadiosSmoking_1">
                                             흡연
                                         </label>
                                     </div>
                                     <div className="form-check form-check-inline">
                                         <input className="form-check-input" type="radio" name="formRadiosSmoking"
                                                id="formRadiosSmoking_2" value="option2" checked={radioChecked==="option2"} onChange={handleRadio}/>
                                         <label className="form-check-label" htmlFor="formRadiosSmoking_2">
                                             비흡연
                                         </label>
                                     </div>
                                 </div>
                             </div>
                             <div className="modal-footer">
                                 <button type="button" className="btn btn-secondary mr-auto" onClick={handleInit}>초기화</button>
                                 <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>취소
                                 </button>
                                 <button type="button" className="btn btn-primary" onClick={handleSubmit}>적용</button>
                             </div>
                         </div>
                     </div>
                 </div>
             ,document.body)
}

export default FilterDialog;
