import React, { useState, useEffect } from 'react';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import { loadRecipes, saveRecipes, createEmptyRecipe } from '../utils/recipeUtils';
import './RecipeContainer.css';

/**
 * Main container component for RecipeVault
 * Handles state management and coordination between recipe components
 */
function RecipeContainer() {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Load saved recipes on component mount
  useEffect(() => {
    const savedRecipes = loadRecipes();
    setRecipes(savedRecipes);
  }, []);

  // Save recipes whenever the recipes state changes
  useEffect(() => {
    if (recipes.length > 0) {
      saveRecipes(recipes);
    }
  }, [recipes]);

  // Handle creating a new recipe
  const handleCreateRecipe = () => {
    setCurrentRecipe(createEmptyRecipe());
    setIsEditing(true);
  };

  // Handle editing an existing recipe
  const handleEditRecipe = (recipe) => {
    setCurrentRecipe(recipe);
    setIsEditing(true);
  };

  // Handle saving a recipe (new or edited)
  const handleSaveRecipe = (recipe) => {
    const now = new Date().toISOString();
    const updatedRecipe = { ...recipe, updatedAt: now };
    
    if (isEditing) {
      // Update existing recipe
      setRecipes(recipes.map(r => r.id === recipe.id ? updatedRecipe : r));
    } else {
      // Add new recipe
      setRecipes([...recipes, { ...updatedRecipe, createdAt: now }]);
    }
    
    setIsEditing(false);
    setCurrentRecipe(null);
  };

  // Handle canceling recipe creation/editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentRecipe(null);
  };

  // Handle deleting a recipe
  const handleDeleteRecipe = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    }
  };

  // Handle toggling favorite status
  const handleToggleFavorite = (id) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
    ));
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Handle search term change
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter recipes based on active category and search term
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = activeCategory === 'all' || 
                           activeCategory === 'favorites' && recipe.favorite ||
                           recipe.category === activeCategory;
                           
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
                         
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="recipe-container">
      {isEditing ? (
        <div className="recipe-form-container">
          <RecipeForm 
            recipe={currentRecipe} 
            onSave={handleSaveRecipe}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <div className="recipe-list-container">
          <RecipeList 
            recipes={filteredRecipes}
            onCreateRecipe={handleCreateRecipe}
            onEditRecipe={handleEditRecipe}
            onDeleteRecipe={handleDeleteRecipe}
            onToggleFavorite={handleToggleFavorite}
            onCategoryChange={handleCategoryChange}
            onSearch={handleSearch}
            activeCategory={activeCategory}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
}

export default RecipeContainer;
