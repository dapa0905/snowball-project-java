import React from "react";

const TrendingCategoriesTab = () => {
  // 트렌딩 카테고리 데이터
  const categories = [
    { name: "Technology", trend: "up", percentage: "+2.5%" },
    { name: "Healthcare", trend: "down", percentage: "-1.2%" },
    { name: "Finance", trend: "up", percentage: "+0.8%" },
  ];

  return (
    <div>
      <h4>Trending Categories</h4>
      <div className="row">
        {categories.map((category, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p
                  className={`card-text ${
                    category.trend === "up" ? "text-success" : "text-danger"
                  }`}
                >
                  {category.percentage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCategoriesTab;
