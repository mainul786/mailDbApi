const loadMeals = (search) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    // console.log(meals);
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    // console.log(mealContainer);
    meals.forEach(meal => {
        console.log(meal);
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                      <button type="button" class="btn btn-outline-success" onclick="mealDetails('${meal.idMeal}')">Get Details</button>
                    </div>
                  </div>
        `;
        mealContainer.appendChild(createDiv);
    });
}

const searchFood = () => {
    const inputField = document.getElementById('food');
    const foodField = inputField.value;
    // console.log('search value getting', foodField);
    inputField.value = '';
    loadMeals(foodField);

}

const mealDetails = (mealId) => {

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => displayMealData(data.meals[0]))
}


const displayMealData = (meal) => {
    const getMealDetails = document.getElementById('meal-details');
    getMealDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.style.width = '18rem';
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <p class="card-text">${meal.strMeal}</p>
    </div>
    `;
    getMealDetails.appendChild(div);

}
loadMeals('a');