import React, { useEffect, useState, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../helper/articles";
import { Article } from "../helper/interfaces";

const Articles: FunctionComponent = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getArticles()
      .then((result: any) => {
        setArticles(result);
      })
      .finally(() => {
        setLoaded(true);
      });
  });
  return (
    <div className="Articles">
      {loaded ? (
        <ul>
          {articles.map((article: Article, id: number) => (
            <li key={id}>
              <Link to={`article/${article.id}`}>
                <h2>{article.title}</h2>
                <p>{article.content}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Articles;
