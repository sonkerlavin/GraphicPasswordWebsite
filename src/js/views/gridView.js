export const create = () => {
    return `<div class="graphic__row">${addCells(1)}</div>
    <div class="graphic__row">${addCells(5)}</div>
    <div class="graphic__row">${addCells(9)}</div>
    <div class="graphic__row">${addCells(13)}</div>`;
}

export const addCells = (start) => {
    let markup = ``;
    for(let i=start; i<start+4; i++) {
        markup+= `<div
            class="graphic__row--drop"
            id="cell-${i}"></div>`;
    }
    return markup;
}

export const addImages = () => {
    const images = ['python', 'java', 'android', 'javascript'];
    const cells = [];
    while(cells.length < 4) {
        let randomIndex = Math.floor(Math.random() * 16) + 1;
        if(!cells.includes(randomIndex)) {
            cells.push(randomIndex);
        }
    }

    cells.forEach((cur, i) => {
        document.getElementById(`cell-${cur}`).insertAdjacentHTML('beforeend', 
        `<img
        class="graphic__row--drag"
        id="${images[i]}"
        src="img/${images[i]}.png"
        draggable="true"/>`);
    });
}