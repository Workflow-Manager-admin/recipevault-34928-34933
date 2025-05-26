import React, { useState } from 'react';
import RecipeItem from './RecipeItem';
import { getCategories } from '../utils/recipeUtils';
import './RecipeList.css';

/**
 * Component for displaying the list of recipes with filtering and search
 */
function RecipeList({
  recipes,
  onCreateRecipe,
  onEditRecipe,
  onDeleteRecipe,
  onToggleFavorite,
  onCategoryChange,
  onSearch,
  activeCategory,
  searchTerm
}) {
  const [sortOption, setSortOption] = useState('newest');
  
  // Get all unique categories from recipes
  const categories = getCategories(recipes);
  
  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  // Sort recipes based on the selected option
  const sortedRecipes = [...recipes].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'a-z':
        return a.title.localeCompare(b.title);
      case 'z-a':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="recipe-list">
      <div className="recipe-list-header">
        <h2>My Recipes</h2>
        <button className="btn-primary" onClick={onCreateRecipe}>
          Add Recipe
        </button>
      </div>
      
      <div className="recipe-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <div className="recipe-filters">
          <div className="category-filter">
            <select 
              value={activeCategory} 
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="favorites">Favorites</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sort-filter">
            <select 
              value={sortOption} 
              onChange={handleSortChange}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="recipes-grid">
        {sortedRecipes.length > 0 ? (
          sortedRecipes.map(recipe => (
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
              onEditRecipe={onEditRecipe}
              onDeleteRecipe={onDeleteRecipe}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <div className="no-recipes">
            <p>{searchTerm || activeCategory !== 'all' ? 
              'No matching recipes found.' : 
              'No recipes yet. Click "Add Recipe" to create your first recipe!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeList;
