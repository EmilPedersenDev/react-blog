import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../helper/articles";
import { Article } from "../helper/interfaces";

const ArticleComponent = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchedArticle: Article | null = getArticle(id);
    setArticle(fetchedArticle);
  }, []);
  console.log(id);

  return (
    <div>
      <h2>{article?.title}</h2>
      <p>{article?.content}</p>{" "}
    </div>
  );
};

export default ArticleComponent;
