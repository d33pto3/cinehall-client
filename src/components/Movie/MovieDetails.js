import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Movie Details for id {id}</h1>
      {/* rest of the component */}
    </div>
  );
};

export default MovieDetails;
