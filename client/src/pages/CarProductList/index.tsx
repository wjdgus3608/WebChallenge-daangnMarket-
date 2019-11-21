import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import FixedTopBar from "~components/FixedTopBar";
import FilterDialog from "~components/FilterDialog";
import Footer from "~components/Footer";
import {Link, RouteComponentProps} from "react-router-dom";
import {PAGE_PATHS, STORES} from "~constants";
import Product from "~pages/ProductList/Product";
import ProductsStore from "~stores/product/ProductStore";
import {inject, observer} from "mobx-react";

interface InjectedProps  {
  [STORES.PRODUCTS_STORE]: ProductsStore;
}

class CarProductList extends Component<InjectedProps & RouteComponentProps> {
  category=-1
  page_title="Noting"
  componentWillMount(): void {
    this.category=this.props.location.state.category;
    this.page_title=this.props.location.state.title;
    this.props[STORES.PRODUCTS_STORE].getCategoryProducts(this.category.toString());
  }

  state={
    isDialogOpen:false,
    filterBtnState:false,
    carYear:0,
    carMile:0,
    radioChecked:undefined
  }
  handleDialog=()=>{
    this.setState({
      isDialogOpen : !this.state.isDialogOpen
    },()=>{
    if(this.state.isDialogOpen)
      document.body.className="modal-open";
    else
      document.body.className=""});
  };
  handleSubmit=(carYear:any,carMile:any,radioChecked:string)=> {
    this.setState({carYear: carYear});
    this.setState({carMile: carMile});
    this.setState({radioChecked: radioChecked});
    this.setState({filterBtnState: true},()=>{
      this.updateProducts();
    });
  };
  handleInit=(carYear:any,carMile:any,radioChecked:string)=>{
    this.setState({carYear: carYear});
    this.setState({carMile: carMile});
    this.setState({radioChecked: radioChecked});
    this.setState({filterBtnState:false});
  };

  updateProducts=()=>{
    if(this.category===0) {
      this.props[STORES.PRODUCTS_STORE].getByCategoryWithFilter(this.category.toString(), {
        carYear: this.state.carYear,
        carMile: this.state.carMile,
        radioChecked: this.state.radioChecked
      });
    }
  }

  render() {
    const { products } = this.props[STORES.PRODUCTS_STORE];
    return (
      <div>
        <FixedTopBar category={this.category} filterClick={this.handleDialog} filterBtnState={this.state.filterBtnState}/>
        <div className="container container-main-index" style={{overflow:"hidden"}}>
          <h5 className="container-headline">{this.page_title}</h5>
          <ul className="list-products row">
            {products.map(v => (
                <li
                    key={v.id}
                    className="list-products-item col-12 col-md-4 col-lg-3"
                >
                  <Link to={`${PAGE_PATHS.PRODUCT}/${v.id}`}>
                    <Product product={v} />
                  </Link>
                </li>
            ))}
          </ul>
          <FilterDialog open={this.state.isDialogOpen} close={this.handleDialog} category={this.category} handleSubmit={this.handleSubmit} handleInit={this.handleInit}/>
        </div>
        <Footer/>
        {this.state.isDialogOpen?ReactDOM.createPortal(<div className="modal-backdrop fade show"></div>,document.body)
        :''}
      </div>
    );
  }
}
export default inject(STORES.PRODUCTS_STORE)(observer(CarProductList));
