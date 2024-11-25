import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({country="us", pageSize=9, category="general", apiKey, setProgress}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const constructUrl = (pageNumber) =>
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${pageNumber}`;

  const fetchData = async (url, isLoadMore = false) => {
    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      if (parsedData.articles) {
        setArticles((prevArticles) =>
          isLoadMore ? [...prevArticles, ...parsedData.articles] : parsedData.articles
        );
        setTotalArticles(parsedData.totalResults);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const updateNews = async () => {
    setProgress(10);
    setLoading(true);
    const url = constructUrl(page);
    await fetchData(url);
    setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalize(category)} - NewsMonki`;
    updateNews();
    // Adding dependencies ensures the effect runs correctly on prop changes
  }, [category, country, apiKey, pageSize]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const url = constructUrl(nextPage);
    await fetchData(url, true);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-5 text-center" style={{ marginTop: '90px' }}>
        NewsMonki - Top {capitalize(category)} Headlines
      </h2>

      {/* Show spinner while loading */}
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalArticles}
        loader={<Spinner />}
        endMessage={
          <p className="text-center mt-4 text-muted">
            You've seen all the news!
          </p>
        }
      >
        <div className="container">
          {articles.length > 0 ? (
            <div className="row g-4">
              {articles.map((article, index) => (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={article.title ? article.title.slice(0, 45) : 'No Title Available'}
                    description={
                      article.description ? article.description.slice(0, 88) : 'No Description Available'
                    }
                    imgUrl={
                      article.urlToImage ||
                      'https://via.placeholder.com/400x200?text=No+Image+Available'
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
                <p className="text-muted">No news articles available at the moment.</p>
              </div>
            )
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};


News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func,
};

export default News;
