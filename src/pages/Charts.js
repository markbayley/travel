import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import Infographic from '../content/Infographic';
import RecipeCard from '../components/RecipeCard'

const Charts = () => {
    return (
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 90 , left: 90 }}>
          <RecipeCard />
        </div>
      </div>
    );
};

export default Charts;
