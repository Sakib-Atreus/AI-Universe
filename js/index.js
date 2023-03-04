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

// Load Universe
loadUniverse();