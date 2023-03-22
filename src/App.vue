<script setup lang="ts">
import { ref } from 'vue'
import Recipes from '@/assets/data/recipes.json'
import type { TypeRecipes } from '@/Types'
// State
const recipes = ref(Recipes as TypeRecipes)

function filterRecipesByFlavours(recipes, flavours) {
  return recipes.filter(recipe => {
    const recipeFlavours = recipe.flavours.map(flavour => flavour.name);
    return flavours.every(flavour => recipeFlavours.includes(flavour));
  });
}

console.log(filterRecipesByFlavours(recipes.value, ['Granny Smith', 'Lemon']));

// const filterByFlavour = (recipes, flavourName) => {
//   return recipes.filter(recipe => {
//     return recipe.flavours.some(flavour => flavour.name.toLowerCase().includes(flavourName.toLowerCase()))
//   })
// }

// // Example usage:
// const filteredRecipes = filterByFlavour(recipes.value, "vanilla")
// console.log(filteredRecipes)
</script>

<template>
  <div class="container">
    <!-- <div class="header">
      <h1 class="title">{{ title }}</h1>
      <h2 class="author">{{ author }}</h2>
    </div> -->
    <div class="recipes">
      <div class="recipe" v-for="recipe in recipes" :key="recipe.recipeName">
        <p class="recipe-author">{{ recipe.author }}</p>
        <h3 class="recipe-name">{{ recipe.recipeName }}</h3>
        <p class="recipe-description">{{ recipe.description }}</p>
        <div class="recipe-notes">
          <h4 class="recipe-flavour-notes-title">Flavour Notes</h4>
          <p class="recipe-flavour-notes">{{ recipe.flavourNotes }}</p>
        </div>
        <div class="recipe-flavours-wrap">
          <h4 class="recipe-flavours-title">Flavours</h4>
          <ul class="recipe-flavours">
            <li v-for="flavour in recipe.flavours" :key="flavour.name" class="recipe-item">
              <p class="flavour-name">{{ flavour.name }}</p>
              <p class="flavour-percentage">{{ flavour.percent }}%</p>
              <p class="flavour-grams">{{ flavour.grams }}g</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <ul class="recipe-flavours">
          <li v-for="flavour in recipe.flavours" :key="flavour.name" class="flavour">
            <p class="flavour-name">{{ flavour.name }}</p>
            <p class="flavour-percentage">{{ flavour.percent }}%</p>
            <p class="flavour-grams">{{ flavour.grams }}g</p>
          </li>
        </ul>
      </div>
    </div>
  </div> -->

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px;
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  margin: 0;
}

.author {
  font-size: 18px;
  margin: 0;
}

.recipes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
}

.recipe {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 767px) {
    width: 100%;
  }
}

.recipe-name {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.recipe-description {
  font-size: 16px;
  margin: 0 0 16px 0;
}

.recipe-flavours {
  margin: 0;
  padding: 0;
  list-style: none;
}

.flavour {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  padding: 0;
  list-style: none;
}

.flavour-name {
  font-weight: bold;
  margin: 0;
}

.flavour-percentage {
  margin: 0;
}

.flavour-grams {
  margin: 0;
}
</style>
