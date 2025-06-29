
const getRandomInt = (max: number ) => {
    return Math.floor(Math.random() * max);
  }
  
const getRandomStat = () => {
    const list = [];
    for (let i = 0; i < 4; i++) {
        list.push(getRandomInt(6));
    }
    list.sort().reverse();
    list.pop();
    return list.reduce((x, y)=> x + y);
}

export const generateStats = () => {
    const list = [];
    for (let i = 0; i < 6; i++) {
        list.push(getRandomStat());
    }
    return list;
}