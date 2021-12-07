export const create = () => {
    return `<div class="graphic__row">${addCells(1)}</div>
    <div class="graphic__row">${addCells(6)}</div>
    <div class="graphic__row">${addCells(11)}</div>
    <div class="graphic__row">${addCells(16)}</div>
    <div class="graphic__row">${addCells(21)}</div>`;
}

export const addCells = (start) => {
    let markup = ``;
    for(let i=start; i<start+5; i++) {
        markup+= `<div
            class="graphic__row--drop"
            id="cell-${i}"></div>`;
    }
    return markup;
}

export const addImages = () => {
    const images = ['python', 'java', 'android', 'javascript',"ruby","C","cpp","tensorflow","R","dart"];
    const cells = [];
    while(cells.length < 10) {
        let randomIndex = Math.floor(Math.random() * 16) + 1;
        if(!cells.includes(randomIndex)) {
            cells.push(randomIndex);
        }
    }
    console.log(cells)
    cells.forEach((cur, i) => {
        document.getElementById(`cell-${cur}`).insertAdjacentHTML('beforeend', 
        `<img
        class="graphic__row--drag"
        id="${images[i]}"
        src="img/${images[i]}.png"
        draggable="true"/>`);
    });
}