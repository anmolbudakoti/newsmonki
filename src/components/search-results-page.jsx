import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsItem from "./NewsItem";

export default function SearchResultsPage({ apiKey }) {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchSearchArticles() {
    try {
      setLoading(true);

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${id}&apiKey=${apiKey}`
      );
      const result = await response.json();
      const articles = result.articles;

      if (articles) {
        setArticles(articles);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSearchArticles();
  }, []);

  if (loading) {
    <h1>Loading Articles...Please wait!</h1>;
  }

  if (error) {
    <h1>An Error Occurred! {error}</h1>;
  }

  return (
    <div className="container">
      <h2 className="mb-5 text-center" style={{ marginTop: "90px" }}>
        Search Results for: <span className="text-primary">{id}</span>
      </h2>
      {articles.length > 0 ? (
        <div className="row g-4">
          {articles.map((article, index) => (
            <div className="col-md-4" key={index}>
              <NewsItem
                title={
                  article.title
                    ? article.title.slice(0, 45)
                    : "No Title Available"
                }
                description={
                  article.description
                    ? article.description.slice(0, 88)
                    : "No Description Available"
                }
                imgUrl={
                  article.urlToImage ||
                  "https://via.placeholder.com/400x200?text=No+Image+Available"
                }
                newsUrl={article.url}
                author={article.author}
                date={article.publishedAt}
                source={article.source.name}
              />
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center mt-4">
            <p className="text-muted">
              No news articles available at the moment.
            </p>
          </div>
        )
      )}
    </div>
  );
}
