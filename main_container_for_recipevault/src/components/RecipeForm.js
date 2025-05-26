import React, { useState } from 'react';
import './RecipeForm.css';

/**
 * Component for adding and editing recipes
 */
function RecipeForm({ recipe, onSave, onCancel }) {
  const [formData, setFormData] = useState(recipe || {
    id: '',
    title: '',
    description: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [''],
    steps: [''],
    favorite: false
  });

  // Handle input changes for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes to array items (ingredients or steps)
  const handleArrayItemChange = (index, value, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = value;
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Add a new empty item to an array (ingredients or steps)
  const handleAddItem = (arrayName) => {
    setFormData({ 
      ...formData, 
      [arrayName]: [...formData[arrayName], '']
    });
  };

  // Remove an item from an array (ingredients or steps)
  const handleRemoveItem = (index, arrayName) => {
    if (formData[arrayName].length <= 1) return; // Keep at least one item
    
    const updatedArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      alert('Please enter a recipe title.');
      return;
    }
    
    // Filter out empty ingredients and steps
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(item => item.trim() !== ''),
      steps: formData.steps.filter(item => item.trim() !== '')
    };
    
    // Ensure there is at least one ingredient and step
    if (cleanedData.ingredients.length === 0) {
      cleanedData.ingredients = [''];
    }
    
    if (cleanedData.steps.length === 0) {
      cleanedData.steps = [''];
    }
    
    onSave(cleanedData);
  };

  return (
    <div className="recipe-form">
      <h2>{recipe?.id ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter recipe title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe your recipe"
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="E.g. Dessert, Main Course"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="servings">Servings</label>
            <input
              type="text"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              placeholder="Number of servings"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="prepTime">Prep Time</label>
            <input
              type="text"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              placeholder="E.g. 15 mins"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cookTime">Cook Time</label>
            <input
              type="text"
              id="cookTime"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              placeholder="E.g. 30 mins"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div className="array-item" key={`ingredient-${index}`}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleArrayItemChange(index, e.target.value, 'ingredients')}
                placeholder="E.g. 2 cups flour"
              />
              <button 
                type="button" 
                className="btn-remove"
                onClick={() => handleRemoveItem(index, 'ingredients')}
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            type="button" 
            className="btn-add"
            onClick={() => handleAddItem('ingredients')}
          >
            + Add Ingredient
          </button>
        </div>
        
        <div className="form-group">
          <label>Steps</label>
          {formData.steps.map((step, index) => (
            <div className="array-item" key={`step-${index}`}>
              <textarea
                value={step}
                onChange={(e) => handleArrayItemChange(index, e.target.value, 'steps')}
                placeholder={`Step ${index + 1}`}
                rows="2"
              ></textarea>
              <button 
                type="button" 
                className="btn-remove"
                onClick={() => handleRemoveItem(index, 'steps')}
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            type="button" 
            className="btn-add"
            onClick={() => handleAddItem('steps')}
          >
            + Add Step
          </button>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
