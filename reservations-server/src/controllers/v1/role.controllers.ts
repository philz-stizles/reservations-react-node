import { FilterQuery } from 'mongoose';
import { Request, Response } from 'express';
import slugify from 'slugify';
import SubCategory from '@src/models/sub-category.model';
import Product, { IProductDocument } from '@src/models/product.model';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, parent } = req.body;
    res.json(
      await new SubCategory({ name, parent, slug: slugify(name) }).save()
    );
  } catch (err: any) {
    console.log('Sub category CREATE ERR ----->', err);
    res.status(400).send('Create Sub category failed');
  }
};

export const list = async (req: Request, res: Response): Promise<Response> =>
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());

export const read = async (req: Request, res: Response): Promise<void> => {
  const subCategory = await SubCategory.findOne({
    slug: req.params.slug,
  }).exec();
  const products = await Product.find({
    subs: subCategory,
  } as FilterQuery<IProductDocument>)
    .populate('category')
    .exec();

  res.json({ subCategory, products });
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { name, parent } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err: any) {
    res.status(400).send('Sub category update failed');
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err: any) {
    res.status(400).send('Sub category delete failed');
  }
};
