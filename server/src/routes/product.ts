import * as express from 'express';
import Product from '../models/Product';
import * as multer from 'multer';
import { Op } from 'sequelize';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('', async (req, res) => {
  const products = await Product.findAll();

  res.json({ data: products });
});

router.get('/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(Number(id));
    return res.json({ data: product });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.get('/category/:category', async (req, res) => {
  const mycategory = req.params.category;
  try {
    const products = await Product.findAll({where: {category: Number(mycategory)}});

    return res.json({ data: products });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.post('/category/:category/filtered', async (req, res) => {
  const mycategory = req.params.category;
  const filterdata = req.body
  console.log(filterdata);
  try {
    const products = await Product.findAll({where: {category: Number(mycategory)}});
    const tmpdata: any = []
    products.map((p) => {
      if (p.filterdata !== null) {
          const str = p.filterdata.split('/');
          if (filterdata.carYear.val1 <= str[0] && filterdata.carYear.val2 >= str[0]) {
            if (filterdata.carMile.val1 <= str[1] && filterdata.carMile.val2 >= str[1]) {
              if (filterdata.radioChecked === undefined) {
                tmpdata.push(p);
              }
              else if ((filterdata.radioChecked === 'option1' ? 'true' : 'false') === str[2]) {
                tmpdata.push(p);
              }
            }
          }
      }
    })
    return res.json({ data: tmpdata });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.post('', upload.single('image'), async (req, res) => {
  const image = req.file;
  const product = req.body;

  try {
    const insertedProduct = await Product.create({
      ...product,
      image: `/${image.path}`,
    });
    return res.json({ data: insertedProduct, msg: '상품등록에 성공하였습니다.' });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});


export default router;
