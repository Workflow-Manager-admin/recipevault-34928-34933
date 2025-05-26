/**
 * Utility functions for managing recipe data in the RecipeVault application
 */

// Generate a unique ID for new recipes
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Save recipes to local storage
const saveRecipes = (recipes) => {
  localStorage.setItem('recipeVaultData', JSON.stringify(recipes));
};

// Load recipes from local storage
const loadRecipes = () => {
  const savedRecipes = localStorage.getItem('recipeVaultData');
  return savedRecipes ? JSON.parse(savedRecipes) : [];
};

// Get recipe categories from all recipes
const getCategories = (recipes) => {
  const categoriesSet = new Set();
  
  recipes.forEach(recipe => {
    if (recipe.category && recipe.category.trim() !== '') {
      categoriesSet.add(recipe.category.trim());
    }
  });
  
  return Array.from(categoriesSet).sort();
};

// Create a new empty recipe template
const createEmptyRecipe = () => {
  return {
    id: generateId(),
    title: '',
    description: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [''],
    steps: [''],
    favorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export {
  generateId,
  saveRecipes,
  loadRecipes,
  getCategories,
  createEmptyRecipe
};
