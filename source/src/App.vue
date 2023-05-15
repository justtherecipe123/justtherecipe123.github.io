<script setup lang="ts">
import { ref, computed } from 'vue'
import Recipes from '@/assets/data/recipes.json'
import type { TypeRecipes, TypeRecipe, TypeFlavour } from '@/Types'

// State
const recipes = ref(Recipes as TypeRecipes)
const allFlavours = ref([] as string[])
const myFlavours = ref([] as string[])
const missingFlavoursAmount = ref(0)
const allRecipesActive = ref(false)

// Methods
const toggleAllRecipes = () => {
  allRecipesActive.value = !allRecipesActive.value
}

const uniqueFlavours = () => {
  recipes.value.forEach((recipe: TypeRecipe) => {
    recipe.flavours.forEach((flavour: TypeFlavour) => {
      if (!allFlavours.value.includes(flavour.name)) {
        allFlavours.value.push(flavour.name)
        allFlavours.value.sort()
      }
    })
  })
}
uniqueFlavours()

const updateLocalStorage = () => {
  localStorage.setItem('myFlavours', JSON.stringify(myFlavours.value))
}

const getLocalStorage = () => {
  const localFlavours = localStorage.getItem('myFlavours')
  if (localFlavours) {
    myFlavours.value = JSON.parse(localFlavours)
  }
}
getLocalStorage()

const deselectAllFlavours = () => {
  myFlavours.value = []
  updateLocalStorage()
}

// Computed
const filteredRecipes = computed(() => {
  if (allRecipesActive.value) {
    return recipes.value
  }

  // filter out any recipes that include flavours that are not in myFlavours, but allow for 1 missing flavour if missingFlavourActive is true
  return recipes.value.filter((recipe: TypeRecipe) => {
    const missingFlavours = recipe.flavours.filter((flavour: TypeFlavour) => {
      return !myFlavours.value.includes(flavour.name)
    })
    return missingFlavours.length <= missingFlavoursAmount.value
  })
})
</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="title">Flavorah Recipe Filter</h1>
      <!-- <h2 class="author">{{ author }}</h2> -->
    </div>
    <div class="btn-wrap">
      <div class="top-section">
        <div class="toggle-recipes">
          <label for="all-recipes">Show all recipes</label>
          <input id="all-recipes" type="checkbox" @change="toggleAllRecipes" />
        </div>
        <div class="missing-flavours">
          <label for="input-number">Allow for</label>
          <input id="input-number" class="input-number" v-model="missingFlavoursAmount" type="number" min="0" max="10" step="1" />
          <span>missing Flavours</span>
        </div>
      </div>
    </div>
    <h2 class="my-flavours-title">My Flavours</h2>
    <ul class="flavours">
      <li class="flavour" v-for="flavour in allFlavours" :key="flavour">
        <label class="flavour-label">
          <input class="flavour-input" type="checkbox" name="flavour" v-model="myFlavours" :value="flavour" @change="updateLocalStorage" />
          {{ flavour }}</label
        >
      </li>
    </ul>
    <button class="btn" @click="deselectAllFlavours">Clear my flavours</button>

    <div class="recipes">
      <div class="recipe" v-for="recipe in filteredRecipes" :key="recipe.recipeName">
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

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.input-number {
  font-size: 1.5rem;
  width: 4rem;
  border-radius: 8px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  text-indent: 1rem;
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ffffff50;
  border-radius: 8px;
  padding: 1rem;
}

.toggle-recipes {
  display: flex;
  width: 100%;
  position: relative;
  font-size: 20px;
  color: #fff;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.my-flavours-title {
  font-size: 20px;
  color: #f43d83;
  text-align: left;
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.toggle-recipes label {
  margin-right: 0.5rem;
}
.toggle-recipes input {
  margin-top: 2px;
}

.missing-flavours {
  display: flex;
  position: relative;
  width: 100%;
  font-size: 20px;
  color: #fff;
  align-items: center;
  height: 1.5rem;
}

.btn-wrap {
  display: flex;
  position: relative;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.btn {
  font-size: 20px;
  width: 200px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: #f43d83;
}

.flavours {
  display: grid;
  /* grid auto columns */
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ffffff50;
  padding: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.25rem;
  margin-bottom: 1rem;
  text-align: left;
}

.flavour {
  display: flex;
  justify-content: space-between;
  padding: 0;
  list-style: none;
  width: 100%;
}
.flavour-input {
  margin-right: 8px;
}

.flavour-label {
  font-size: 18px;
  color: #fff;
  width: 100%;
  word-wrap: break-word;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  margin-bottom: 1rem;
}

.title {
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  color: #f43d83;
  text-align: left;
}

.author {
  font-size: 18px;
  margin: 0;
}

.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.recipe {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
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
  display: none;
}

.flavour-grams {
  margin: 0;
}
</style>
