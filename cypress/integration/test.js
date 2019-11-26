describe('my test', () => {
    it('로그인',()=>{
        cy.visit('/');
        cy.get('input').eq(0).type("test@test.com");
        cy.get('input').eq(1).type("test123{enter}");
    })
  it('각 카테고리 이름을 클릭하면 해당 카테고리의 상품만 표시되어야 합니다.', () => {
      cy.get('.btn-category').eq(4).click();
      cy.get('.category').each(($el) => {
          expect($el.text()).to.equal('생활/가공식품');
      });
        cy.go('back');
        cy.get('.btn-category').eq(3).click();
      cy.get('.category').each(($el) => {
          expect($el.text()).to.equal('유아동/유아도서');
      });
        cy.go('back');
        cy.get('.btn-category').eq(2).click();
      cy.get('.category').each(($el) => {
          expect($el.text()).to.equal('가구/인테리어');
      });
        cy.go('back');
        cy.get('.btn-category').eq(1).click();
      cy.get('.category').each(($el) => {
          expect($el.text()).to.equal('');
      });
        cy.go('back');
        cy.get('.btn-category').eq(0).click();
      cy.get('.category').each(($el) => {
          expect($el.text()).to.equal('차량');
      });
  });
  it('상단에 필터 버튼이 표시되어야 합니다.',()=>{
      cy.get('.btn-filter').should('exist')
  });
  it('이 버튼을 누르면 몇 가지 옵션(연식/주행거리/흡연 여부)으로 차량을 필터링 할 수 있어야 합니다.',()=>{
      cy.get('.btn-filter').click();
      cy.get('.MuiSlider-rail').eq(0).click('center',{force:true});
      cy.get('.btn-primary').click();
      cy.get('h5.title').each(($h5)=>{
          expect(Number($h5.text().split("/")[0].split("년")[0])).to.be.lessThan(2015);
      });


      reset_filter();
      cy.get('.btn-filter').click();
      cy.get('.MuiSlider-rail').eq(1).click('center',{force:true});
      cy.get('.btn-primary').click();
      cy.get('h5.title').each(($h5)=>{
          expect(Number($h5.text().split("/")[1].split("km")[0])).to.be.lessThan(5000);
      });

      reset_filter();
      cy.get('.btn-filter').click();
      cy.get('#formRadiosSmoking_2').click('center',{force:true});
      cy.get('.btn-primary').click();
      cy.get('h5.title').each(($h5)=>{
          expect($h5.text().split("/")[2]).to.equal('비흡연자');
      });
  });
  it('필터가 적용된 상태라면 해당 버튼은 active라는 클래스를 가져야 하며, 필터가 초기화되면 active클래스가 사라져야 합니다.',()=>{
      cy.get('.btn-filter').should('have.class','active');
      reset_filter();
      cy.get('.btn-filter').should('not.have.class','active');
  });
  it('목록의 상품을 누르면 제품 상세 페이지로 이동해야 합니다.',()=>{
      cy.get('li.list-products-item').eq(0).click();
      cy.url().should('include','http://0.0.0.0:5000/products/');
  });
  it('연필 모양의 상품 등록 버튼을 누르면 현재 보고 있는 카테고리에 해당하는 상품을 추가하는 화면으로 이동해야 합니다.',()=>{
      cy.go('back');
      cy.get('li.nav-item').eq(1).click();
      cy.get('#productsCategory').should('have.attr', 'about', '0');
  });
  it('상품등록(item_create.html) 페이지에서는 선택된 카테고리가 차량이라면 차량에 대한 추가 폼(연식/주행거리/흡연 여부)이 표시되어야 합니다. (차량이 아니면 해당 폼은 숨김 처리 되어야 합니다.) 모든 추가 폼은 필수 입력이어야 합니다.',()=>{
      category_test();
      cy.go('back');
      cy.go('back');
      cy.get('.btn-category').eq(2).click();
      cy.get('li.nav-item').eq(1).click();
      category_test();
  });
  it('제품 상세(detail.html) 페이지는 이미 구현되어 있습니다. 여기에 선택된 카테고리 및 차량과 관련된 추가 정보가 표시되는 기능을 추가해야 합니다.',()=>{
      cy.go('back');
      cy.go('back');
      cy.get('.btn-category').eq(0).click();
      cy.get('li.list-products-item').eq(0).click();
      cy.get('#car_detail').should('exist');
  });
  function category_test(){
      cy.get('#productsCategory').then(($el)=>{
          if($el.attr('about')==='0') {
              cy.get('#car_form').should('exist');
              cy.get('#carModelYear').should('have.attr', 'required');
              cy.get('#carMileage').should('have.attr', 'required');
              cy.get('#inlineSmoker').should('have.attr', 'required');
          }
          else{
              cy.get('#car_form').should('not.exist');
          }
      });
  }
  function reset_filter() {
      cy.get('.btn-filter').click();
      cy.get('.mr-auto').click();
      cy.get('.btn-primary').click();
  }
});
