import { Article } from "./interfaces";

export const articles: Array<Article> = [
  {
    id: 1,
    title: "Article 1",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Voluptatem iste officia ratione quaerat adipisci necessitatibus. 
      Ex veritatis temporibus iusto expedita! Perspiciatis quod aut
    praesentium dolores? Modi illo quis vitae dolor.`,
  },
  {
    id: 2,
    title: "Article 2",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Voluptatem iste officia ratione quaerat adipisci necessitatibus. 
      Ex veritatis temporibus iusto expedita! Perspiciatis quod aut
    praesentium dolores? Modi illo quis vitae dolor.`,
  },
];

export const getArticles = () => {
  return Promise.resolve(articles);
};

export const getArticle = (id: string | undefined): Article | null => {
  if (!id) return null;

  const article: Article | undefined = articles.find((article) => article.id === parseInt(id));
  if (article) {
    return article;
  } else {
    return null;
  }
};
