const loadUniverse = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayUniverse(data.data.tools.slice(0, 6));
    // console.log(data.data.tools);
}



// Load Universe
loadUniverse();