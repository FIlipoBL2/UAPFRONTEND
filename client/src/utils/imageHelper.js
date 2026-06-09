const posters = import.meta.glob('../assets/posterGame/*.png', { eager: true, import: 'default' });

export const getPoster = (filename) => {
    // filename is something like "1.png"
    const num = filename.split('.')[0];
    return posters[`../assets/posterGame/${num}.png`] || posters['../assets/posterGame/1.png'];
};
