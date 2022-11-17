import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/app-error';
import { Article, ErrorException } from '../types/interfaces';
const db = require('../models');
const Articles = db.articles;
const ArticlesQuery = db.sequelize;

export const checkId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req?.params;
  if (!id) {
    return next(new AppError('Invalid Id', 400));
  }
  next();
};

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const article: Article = req?.body;

  if (!article) {
    return next(new AppError('No article was found', 404));
  }
  next();
};

export const getAllArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await ArticlesQuery.query('SELECT * FROM articles', {
      type: ArticlesQuery.QueryTypes.SELECT,
    });

    // const articles2: Article[] = await Articles.findAll();
    res.status(200).json({
      status: 'success',
      data: {
        articles,
      },
    });
  } catch (error: any) {
    next(new AppError('Could not find articles', 404));
  }
};

export const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req?.params;
    // const article: Article = await Articles.findOne({ where: { id: id } });
    const article = await ArticlesQuery.query('SELECT * FROM articles WHERE id = (:id)', {
      type: ArticlesQuery.QueryTypes.SELECT,
      replacements: { id: id },
    });
    if (!article) {
      throw new AppError('Could not find article', 404);
    }
    res.status(200).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article: Article = req?.body;
    const createdArticle: Article = await Articles.create(article);
    res.status(201).json({
      status: 'success',
      data: {
        createdArticle,
      },
    });
  } catch (error: any) {
    next(new AppError('Could not create article', 500));
  }
};

export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req?.params;
    const article: Article = req?.body;
    await Articles.update(article, {
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (error: any) {
    next(new AppError('Could not update article', 500));
  }
};

export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req?.params;

  try {
    const deletedArticle = await Articles.destroy({
      where: {
        id: id,
      },
    });

    if (!deletedArticle) {
      throw new AppError('Could not delete item', 400);
    }

    res.sendStatus(200);
  } catch (error: any) {
    next(new AppError(error?.message || 'Could not delete article', error?.statusCode || 500));
  }
};
