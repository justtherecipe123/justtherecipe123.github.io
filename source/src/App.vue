<script setup lang="ts">
import { ref, computed } from 'vue'
import Recipes from '@/assets/data/recipes.json'
import type { TypeRecipes, TypeRecipe, TypeFlavour } from '@/Types'

// State
const recipes = ref(Recipes as TypeRecipes)
const allFlavours = ref([] as string[])
const myFlavours = ref([] as string[])

// Created
uniqueFlavours()
getLocalStorage()

function uniqueFlavours() {
  recipes.value.forEach((recipe: TypeRecipe) => {
    recipe.flavours.forEach((flavour: TypeFlavour) => {
      if (!allFlavours.value.includes(flavour.name)) {
        allFlavours.value.push(flavour.name)
      }
    })
  })
}

function updateLocalStorage () {
  localStorage.setItem('myFlavours', JSON.stringify(myFlavours.value))
}

function getLocalStorage () {
  const localFlavours = localStorage.getItem('myFlavours')
  if (localFlavours) {
    myFlavours.value = JSON.parse(localFlavours)
  }
}

// Computed
const filteredRecipes = computed(() => {
// only show recipes that include all matching flavours found in myFlavours
  return recipes.value.filter((recipe: TypeRecipe) => {
    return myFlavours.value.every((flavour: string) => {
      return recipe.flavours.some((recipeFlavour: TypeFlavour) => {
        return recipeFlavour.name === flavour
      })
    })
  })
})
</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="title">Flavour Town</h1>
      <!-- <h2 class="author">{{ author }}</h2> -->
    </div>
    <ul class="flavours">
      <li class="flavour" v-for="flavour in allFlavours" :key="flavour">
        <label class="flavour-label">
          <input class="flavour-input" type="checkbox" name="flavour" v-model="myFlavours" :value="flavour" @change="updateLocalStorage"/>
          {{ flavour }}</label
        >
      </li>
    </ul>
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

h1 {
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  color: #fff;
}
.flavours {
  display: grid;
 /* grid auto columns */
 width: 100%;
 grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.25rem;
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
