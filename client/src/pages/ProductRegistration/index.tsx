import React, { ChangeEvent, FormEvent, useState } from 'react';
import { STORES } from '~constants';
import { inject, observer } from 'mobx-react';
import {useHistory, useLocation} from "react-router";
import ProductsStore from '~stores/product/ProductStore';
import BackTopBar from '~components/BackTopBar';
import Footer from '~components/Footer';
import DynamicForm from "~pages/ProductRegistration/dynamicForm";

interface InjectedProps {
  [STORES.PRODUCTS_STORE]: ProductsStore
}

const ProductRegistration = inject(STORES.PRODUCTS_STORE)(observer((props: InjectedProps) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const location = useLocation()
  const [category, setCategory] = useState(location.state.category);
  const [fileName, setFileName] = useState('파일선택');
  const [image, setImage] = useState();
  const [filterData, setfilterData] = useState();
  const history=useHistory();
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setImage(event.target.files[0]);
    }
  };

  const onCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value ? Number(event.target.value) : undefined);
  };

  const dataChange=(data:any)=>{
    setfilterData(data);
  }

  const onRegister = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    await props.productsStore.registrationProduct({
      title,
      description,
      category,
      image,
      price,
      filterData
    });
    history.goBack();
  };

  return (
    <>
      <BackTopBar />
      <div className="container container-sm container-item-create">
        <h5 className="container-headline">중고거래 상품 등록</h5>

        <form className="form-item-create" onSubmit={onRegister}>
          <div className="form-group form-picture">
            <div className="file-box">
              <input className="upload-name" value={fileName} disabled />

              <label htmlFor="ex_filename" className="btn btn-secondary">업로드</label>
              <input type="file" id="ex_filename" className="upload-hidden" onChange={onFileChange}/>
            </div>
          </div>

          <div className="form-group form-title">
            <input type="text" className="form-control" id="productsTitle" placeholder="제품 이름을 입력해주세요." value={title}
                   onChange={v => setTitle(v.target.value)} required={true}/>
          </div>
          <div className="form-group form-category">
            <select id="productsCategory" className="form-control" value={category} about={String(category)} onChange={onCategoryChange}>
              <option value={undefined}>카테고리를 선택해주세요.</option>
              <option value={0}>차량</option>
              <option value={1}>가구/인테리어</option>
              <option value={2}>유아동/유아도서</option>
              <option value={3}>생활/가공식품</option>
            </select>
          </div>
          <div className="form-group form-price">
            <input type="number" className="form-control" id="productsPrice" min="0" step="1000" value={price}
                   onChange={v => setPrice(Number(v.target.value))}
                   placeholder="가격을 입력해주세요. (￦)"/>
          </div>
          <div className="form-group form-description" >
            <textarea className="form-control" id="productsDescription" rows={10} value={description}
                      onChange={v => setDescription(v.target.value)}
                      placeholder="제품 설명을 작성해주세요." required={true}/>
          </div>
          <DynamicForm category={category} onCategoryChanged={onCategoryChange} dataChange={dataChange}/>
          <button className="btn btn-primary btn-submit">상품 등록하기</button>
        </form>
      </div>

      <Footer />
    </>
  );
}));

export default ProductRegistration;
