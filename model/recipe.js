const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      instructions: {
        type: String,
        required: true
      },
      ingredients: [
        {
          name: String,
          quantity: String
        }
      ],
      images: [
        {
          url: String,
          description: String
        }
      ]
})

module.exports = mongoose.model("Recipe", RecipeSchema)