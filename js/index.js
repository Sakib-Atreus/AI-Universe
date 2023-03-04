const loadUniverse = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayUniverse(data.data.tools.slice(0, 6));
    // console.log(data.data.tools);
}

// Universe Display Function
const displayUniverse = (universes) => {
    const universesContainer = document.getElementById('universes-container');
    universesContainer.innerHTML = '';
    universes.forEach(universe => {
        console.log(universe)
        const universeDiv = document.createElement('div');
        universeDiv.classList.add('col');
        universeDiv.innerHTML = `
            <div class="card p-4">
                <img src="${universe.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-features">Features</h5>
                <ol>
                    <li>${universe.features[0] ? universe.features[0] : 'No Data Found'}</li>
                    <li>${universe.features[1] ? universe.features[1] : 'No Data Found'}</li>
                    <li>${universe.features[2] ? universe.features[2] : 'No Data Found'}</li>
                    <li>${universe.features[3] ? universe.features[3] : 'No Data Found'}</li>
                </ol>

                <hr>
                    <div class="d-flex justify-content-between">
                        <div>
                        <h5 class="card-title">${universe.name}</h5>
                        <p><i class="fa-solid fa-calendar-days"></i> ${universe.published_in}</p>
                        </div>
                        <div>
                        <button onclick="loadUniverseDetails('${universe.id}')" type="button" class="btn btn-primary rounded-5" data-bs-toggle="modal" data-bs-target="#universeDetailsModal">
                        <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        universesContainer.appendChild(universeDiv);
    });
    toggleSpinner(false);
}

// Toggle Function
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// Show All Button Function
const showAll = async () => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayUniverse(data.data.tools);
    const buttonShow = document.getElementById('btn-show-all');
    buttonShow.classList.add('d-none');
}

// Universe Details Function 
const loadUniverseDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayUniverseDetails(data.data);
    // console.log(data.data);
}

// Universe Details Display Function
const displayUniverseDetails = universe =>{
    console.log(universe.description);
    const universeDetails =  document.getElementById('single-modal-body');
    universeDetails.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
            <div class="card p-3 bg-light border-2">
                <h4 class="">${universe.description}</h4>
                <div class="card-body d-flex justify-content-around text-center">
                    <div class="bg-danger p-2 rounded-2">
                        <p>${universe.pricing[0].price ? universe.pricing[0].price : 'Free'}<br><span>${universe.pricing[0].plan ? universe.pricing[0].plan : 'Cost'}</span></p>
                    </div>
                    <div class="bg-warning p-2 rounded-2">
                        <p>${universe.pricing[1].price ? universe.pricing[1].price : 'Free'}<br><span>${universe.pricing[1].plan ? universe.pricing[1].plan : 'Cost'}</span></p>
                    </div>
                    <div class="bg-info p-2 rounded-2">
                        <p>${universe.pricing[2].price ? universe.pricing[2].price : 'Free'}<br><span>${universe.pricing[2].plan ? universe.pricing[2].plan : 'Cost'}</span></p>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="pe-5 col-6">
                        <h4>Features</h4>
                        <ul>
                            <li>${universe.features[1].feature_name ? universe.features[1].feature_name : 'No Data Found'}</li>
                            <li>${universe.features[2].feature_name ? universe.features[2].feature_name : 'No Data Found'}</li>
                            <li>${universe.features[3].feature_name ? universe.features[3].feature_name : 'No Data Found'}</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Integrations</h4>
                        <ul>
                            <li>${universe.integrations[0] ? universe.integrations[0] : 'No Data Found'}</li>
                            <li>${universe.integrations[1] ? universe.integrations[1] : 'No Data Found'}</li>
                            <li>${universe.integrations[2] ? universe.integrations[2] : 'No Data Found'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <img src="${universe.image_link[0]}" class="card-img-top" alt="...">
                <button class="btn btn-warning me-2 mt-2 position-absolute top-0 end-0 w-25">${universe.accuracy.score ? universe.accuracy.score * 100 + '% accuracy' : ' '}</button>
                <div class="card-body">
                    <h5 class="card-title">${universe.input_output_examples[0].input ? universe.input_output_examples[0].input : 'No Data Found'} </h5>
                    <p class="card-text">${universe.input_output_examples[0].output ? universe.input_output_examples[0].output : 'No Data Found'}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Load Universe
loadUniverse();

