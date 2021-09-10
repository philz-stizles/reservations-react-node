import fs from 'fs';
import { Request, Response } from 'express';
import csv from 'fast-csv';
import { Parser } from 'json2csv';
import slugify from 'slugify';
// Models
import Product, { IProductDocument } from '@src/models/product.model';
import User from '@src/models/user.model.old';
// Services
import * as cloudinaryService from '@src/services/cloudinary/cloudinary.services';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const createWithCsv = async (
  req: Request,
  res: Response
  // eslint-disable-next-line consistent-return
): Promise<void | Response | any> => {
  try {
    if (req.file === undefined) {
      return res.status(400).send('Please upload a CSV file!');
    }

    const products: IProductDocument[] = [];
    // eslint-disable-next-line no-underscore-dangle
    const path = `${global.__basedir}/resources/static/assets/uploads/${req.file.filename}`;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => {
        throw error.message;
      })
      .on('data', row => {
        products.push(row);
      })
      .on('end', () => {
        Product.bulkWrite(products)
          .then(() => {
            res.status(200).send({
              message: `Uploaded the file successfully: ${req.file?.originalname}`,
            });
          })
          .catch(error => {
            res.status(500).send({
              message: 'Fail to import data into database!',
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Could not upload the file ${
        req.file ? `: ${req.file.originalname}` : ''
      }`,
    });
  }
};

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body.image);
  const result = await cloudinaryService.uploadFile(req.body.image);

  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

export const removeFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  await cloudinaryService.removeFile(
    req.body.public_id,
    (err, result): Response => {
      console.log('error', err);
      console.log('result', result);
      if (err) return res.json({ success: false, err });
      return res.send('ok');
    }
  );
};

type ProductQuery = {
  limit: string;
};

export const listAll = async (req: Request, res: Response): Promise<void> => {
  const { limit } = req.query as ProductQuery;
  const products = await Product.find({})
    .limit(parseInt(limit, 10))
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .lean();
  res.json(products);
};

export const listWithCsv = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const limit =
    //   req.query && typeof req.query.limit === 'string'
    //     ? parseInt(req.query.limit, 10)
    //     : 10;
    // const offset =
    //   req.query && typeof req.query.offset === 'string'
    //     ? parseInt(req.query.offset, 10)
    //     : 1;

    const products = await Product.find({}); // .skip(offset).limit(limit);
    const productObjects: any[] = [];

    products.forEach(obj => {
      const { _id, title, description, price } = obj;
      productObjects.push({ _id, title, description, price });
    });

    const csvFields = ['Id', 'Title', 'Description', 'Price'];
    const csvParser = new Parser({ fields: csvFields });
    console.log(productObjects);
    const csvData = csvParser.parse(productObjects);

    // const path = `./public/csv/file${Date.now()}.csv`;
    // fs.writeFile(path, csvData, (err: any) => {
    //   if (err) {
    //     throw err;
    //   } else {
    //     res.download(path); // This is what you need
    //   }
    // });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=Products.csv');

    res.status(200).end(csvData);
  } catch (error: any | unknown) {
    console.log('Error', error.message);
    res.status(500).send({
      data: null,
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    return res.json(deleted);
  } catch (err: any) {
    console.log(err);
    return res.status(400).send('Product delete failed');
  }
};

export const read = async (req: Request, res: Response): Promise<void> => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('subs')
    .exec();
  res.json(product);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
      }
    ).exec();
    res.json(updated);
  } catch (err: any) {
    console.log('PRODUCT UPDATE ERROR ----> ', err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// WITHOUT PAGINATION
// export const list = async (req: Request, res: Response) => {
//   try {
//     // createdAt/updatedAt, desc/asc, 3
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (err: any) {
//     console.log(err);
//   }
// };

// WITH PAGINATION
export const list = async (req: Request, res: Response): Promise<void> => {
  // console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; // 3

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err: any) {
    console.log(err);
  }
};

export const getProductsTotal = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const total = await Product.find({}).estimatedDocumentCount().exec();
  return res.json(total);
};

export const setProductRating = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const existingProduct = await Product.findById(req.params.productId).exec();
  if (!existingProduct) {
    return res.status(404);
  }

  const existingUser = await User.findOne({ email: req.user.email }).exec();
  if (!existingUser) {
    return res.status(401);
  }

  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  const existingRatingObject = existingProduct.ratings.find(
    rating => rating.postedBy.toString() === existingUser._id.toString()
  );

  // if user haven't left rating yet, push it
  if (!existingRatingObject) {
    const ratingAdded = await Product.findByIdAndUpdate(
      existingProduct._id,
      {
        $push: { ratings: { star, postedBy: existingUser._id } },
      },
      { new: true }
    ).exec();
    console.log('ratingAdded', ratingAdded);
    return res.json(ratingAdded);
  }
  // if user have already left rating, update it
  const ratingUpdated = await Product.updateOne(
    {
      ratings: { $elemMatch: existingRatingObject },
    },
    { $set: { 'ratings.$.star': star } },
    { new: true }
  ).exec();
  console.log('ratingUpdated', ratingUpdated);
  return res.json(ratingUpdated);
};

export const listRelatedProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const targetProduct = await Product.findById(req.params.productId).exec();
  if (!targetProduct) {
    return res.status(404);
  }

  const { limit } = req.query as ProductQuery;

  const relatedProducts = await Product.find({
    _id: { $ne: targetProduct._id },
    category: targetProduct.category,
  })
    .limit(+limit || 3)
    .populate('category')
    .populate('subs')
    .populate('postedBy')
    .exec();

  return res.json(relatedProducts);
};

// SERACH / FILTER

const handleQuery = async (req: Request, res: Response, query: string) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handlePrice = async (_req: Request, res: Response, price: number[]) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(products);
  } catch (err: any) {
    console.log(err);
  }
};

const handleCategory = async (
  req: Request,
  res: Response,
  category: string
) => {
  try {
    const products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(products);
  } catch (err: any) {
    console.log(err);
  }
};

const handleStar = (_req: Request, res: Response, stars: number) => {
  Product.aggregate([
    {
      $project: {
        document: '$$ROOT',
        // title: "$title",
        floorAverage: {
          $floor: { $avg: '$ratings.star' }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((aggErr, aggregates) => {
      if (aggErr) console.log('AGGREGATOR', aggErr);
      Product.find({ _id: aggregates })
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, products) => {
          if (err) console.log('PRODUCT AGGREGATE ERROR', err);
          res.json(products);
        });
    });
};

const handleSub = async (req: Request, res: Response, sub: string) => {
  const products = await Product.find({ subs: sub })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handleShipping = async (
  req: Request,
  res: Response,
  shipping: boolean
) => {
  const products = await Product.find({ shipping })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handleColor = async (req: Request, res: Response, color: string) => {
  const products = await Product.find({ color })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handleBrand = async (req: Request, res: Response, brand: string) => {
  const products = await Product.find({ brand })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

export const searchFilters = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { query, price, category, stars, sub, shipping, color, brand } =
    req.body;

  if (query) {
    console.log('query --->', query);
    await handleQuery(req, res, query);
  }

  // price [20, 200]
  if (price !== undefined) {
    console.log('price ---> ', price);
    await handlePrice(req, res, price);
  }

  if (category) {
    console.log('category ---> ', category);
    await handleCategory(req, res, category);
  }

  if (stars) {
    console.log('stars ---> ', stars);
    await handleStar(req, res, stars);
  }

  if (sub) {
    console.log('sub ---> ', sub);
    await handleSub(req, res, sub);
  }

  if (shipping) {
    console.log('shipping ---> ', shipping);
    await handleShipping(req, res, shipping);
  }

  if (color) {
    console.log('color ---> ', color);
    await handleColor(req, res, color);
  }

  if (brand) {
    console.log('brand ---> ', brand);
    await handleBrand(req, res, brand);
  }
};
