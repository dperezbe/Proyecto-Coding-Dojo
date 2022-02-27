import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeReviewCard from "./RecipeReviewCard";

const WrapperCard = () => {
  const [apps, SetApps] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/app`)
      .then((response) => {
        SetApps(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="wrapper-card">
      {apps.map((t) => (
        <div className="wrapper-card-sep" key={t._id}>
          <RecipeReviewCard 
            AppName = {t.AppName}
            updatedAt = {t.updatedAt}
            AppDescription = {t.AppDescription}
            AppId = {t._id}
          />
        </div>
      ))}
    </div>
  );
};

export default WrapperCard;
