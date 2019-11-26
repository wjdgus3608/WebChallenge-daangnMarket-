import * as path from 'path';
import * as express from 'express';
import * as DB from './models/index';
import * as http from 'http';
import * as cors from 'cors';
import { Sequelize } from 'sequelize/types';
import authRouter from './routes/auth';
import productRouter from './routes/product';
import logger from './logger';
import User from './models/User';
import Product from './models/Product';


const stopServer = async (server: http.Server, sequelize: Sequelize, signal?: string) => {
  logger.info(`Stopping server with signal: ${signal}`);
  await server.close();
  await sequelize.close();
  process.exit();
};

async function runServer() {
  const sequelize = DB.init();
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/api/auth', authRouter);
  app.use('/api/products', productRouter);
  app.get('/uploads/:fileName', (req, res) => {
    const fileName = req.params.fileName
    console.log(fileName)
    res.sendFile(path.join(__dirname, `../uploads/${fileName}`));
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  const server = app.listen(5000, () => {
    logger.info('Example app listening on port 5000!');
  });

  try {
    await sequelize.authenticate();
    await sequelize.sync({
      force: true
    });
    const user = await User.create({
      email: 'test@test.com',
      password: 'test123'
    });
    Product.create({
      userId: user.id,
      category: 0,
      title: '2019년/1km/비흡연자',
      price: 1000,
      image: '/uploads/sample-product.jpeg',
      filterdata: '2019/1/true',
    });
    Product.create({
      userId: user.id,
      category: 1,
      title: '가구 상품',
      price: 1000,
      image: '/uploads/sample-product.jpeg',
    });
    Product.create({
      userId: user.id,
      category: 2,
      title: '유아동 상품',
      price: 1000,
      image: '/uploads/sample-product.jpeg',
    });
    Product.create({
      userId: user.id,
      category: 3,
      title: '생활 상품',
      price: 1000,
      image: '/uploads/sample-product.jpeg',
    });
    Product.create({
      userId: user.id,
      category: 4,
      title: '인기 매물 상품',
      price: 1000,
      image: '/uploads/sample-product.jpeg',
    });
    Product.create({
      userId: user.id,
      category: 0,
      title: '2018년/1km/비흡연자',
      price: 1000,
      image: '/uploads/sample-product.jpeg',
      filterdata: '2018/1/false',
    });
    Product.create({
      userId: user.id,
      category: 0,
      title: '2019년/1km/흡연자',
      price: 1000,
      image: '/uploads/sample-product.jpeg',
      filterdata: '2019/1/true',
    });
    Product.create({
      userId: user.id,
      category: 0,
      title: '2019년/100km/비흡연자',
      price: 1000,
      image: '/uploads/sample-product.jpeg',
      filterdata: '2019/100/false',
    });
    Product.create({
      userId: user.id,
      category: 0,
      title: '2014년/6000km/비흡연자',
      price: 1000,
      image: '/uploads/sample-product.jpeg',
      filterdata: '2014/6000/false',
    });
  } catch (e) {
    stopServer(server, sequelize);
    throw e;
  }
}

runServer()
  .then(() => {
    logger.info('run succesfully');
  })
  .catch((ex: Error) => {
    logger.error('Unable run:', ex);
  });

