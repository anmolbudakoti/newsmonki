import React from 'react';

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date, source } = props;

  return (
    <div className="card shadow h-100" style={{ borderRadius: "12px", overflow: "hidden" }}>
      {/* Badge for Source */}
      <div className="position-absolute" style={{ top: "10px", right: "10px" }}>
        <span className="badge rounded-pill bg-danger">{source}</span>
      </div>

      {/* News Image */}
      <img
        src={imgUrl || "https://via.placeholder.com/400x200?text=No+Image+Available"}
        className="card-img-top"
        alt={title || "News"}
        style={{ height: "200px", objectFit: "cover" }}
      />

      {/* Card Body */}
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title text-center text-truncate" style={{ maxHeight: "2.6em", overflow: "hidden" }}>
          {title}
        </h5>
        <p className="card-text text-truncate" style={{ maxHeight: "3.6em", overflow: "hidden" }}>
          {description}
        </p>
        <p className="card-text text-muted text-center" style={{ fontSize: "14px" }}>
          <small>
            By {author ? author.slice(0, 20) : "Unknown"} on {new Date(date).toGMTString()}
          </small>
        </p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark w-100 mt-2"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
