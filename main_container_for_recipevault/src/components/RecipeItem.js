import React, { useState } from 'react';
import './RecipeList.css';

/**
 * Component for displaying individual recipe cards
 */
function RecipeItem({ recipe, onEditRecipe, onDeleteRecipe, onToggleFavorite }) {
  const [showDetails, setShowDetails] = useState(false);
  
  // Toggle recipe details visibility
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="recipe-item">
      <div className="recipe-card">
        <div className="recipe-header">
          <h3>{recipe.title}</h3>
          <div className="recipe-actions">
            <button 
              className={`favorite-btn ${recipe.favorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(recipe.id)}
              title={recipe.favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              ★
            </button>
            <div className="action-dropdown">
              <button className="action-btn">⋮</button>
              <div className="dropdown-content">
                <button onClick={() => onEditRecipe(recipe)}>Edit</button>
                <button onClick={() => onDeleteRecipe(recipe.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
        
        {recipe.description && (
          <p className="recipe-description">{recipe.description}</p>
        )}
        
        <div className="recipe-meta">
          {recipe.prepTime && (
            <span>Prep: {recipe.prepTime}</span>
          )}
          {recipe.cookTime && (
            <span>Cook: {recipe.cookTime}</span>
          )}
          {recipe.servings && (
            <span>Serves: {recipe.servings}</span>
          )}
        </div>
        
        {recipe.category && (
          <div className="recipe-category">
            <span>{recipe.category}</span>
          </div>
        )}
        
        <button 
          className="details-toggle"
          onClick={toggleDetails}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        
        {showDetails && (
          <div className="recipe-details">
            <div className="ingredients-section">
              <h4>Ingredients</h4>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={`${recipe.id}-ing-${index}`}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div className="steps-section">
              <h4>Steps</h4>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li key={`${recipe.id}-step-${index}`}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeItem;
