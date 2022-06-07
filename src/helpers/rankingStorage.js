export const getRanking = () => {
  if (!localStorage.getItem('ranking')) {
    localStorage.setItem('ranking', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('ranking'));
};

export const rankingStorage = (user) => {
  const ranking = getRanking();
  const userExists = ranking.find((userRanking) => (
    userRanking.name === user.name && userRanking.score <= user.score));

  if (userExists) {
    const filterRanking = ranking
      .map((userRanking) => {
        if (userRanking.name === user.name) {
          return {
            ...userRanking,
            score: user.score,
          };
        }
        return userRanking;
      });

    const newRanking = [...filterRanking];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  } else {
    const newRanking = [user, ...ranking];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }
};
