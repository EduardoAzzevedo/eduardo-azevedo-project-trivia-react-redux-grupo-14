if (!JSON.parse(localStorage.getItem('ranking'))) {
  localStorage.setItem('ranking', JSON.stringify([]));
}

export const getRanking = () => JSON.parse(localStorage.getItem('ranking'));

export const rankingStorage = (user) => {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  if (ranking === null) {
    localStorage.setItem('ranking', JSON.stringify([user]));
  } else {
    const newRanking = ([...ranking, user]);
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }
};
