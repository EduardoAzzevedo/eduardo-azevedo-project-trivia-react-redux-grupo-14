export const getRanking = () => {
  if (!localStorage.getItem('ranking')) {
    localStorage.setItem('ranking', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('ranking'));
};

export const rankingStorage = (user) => {
  const ranking = getRanking();
  const newRanking = [user, ...ranking];
  localStorage.setItem('ranking', JSON.stringify(newRanking));
};

// Função adiciona apenas usuários novos e atualiza os usuários existentes apenas se o score for maior.
/* export const rankingStorage = (user) => {
  const ranking = getRanking();
  const isUserRaking = ranking.find((userRanking) => (
    userRanking.name === user.name));

  let newRanking = null;
  if (isUserRaking) {
    newRanking = ranking
      .map((userRanking) => ({
        ...userRanking,
        score: userRanking.name === user.name && userRanking.score <= user.score
          ? user.score : userRanking.score,
      }));
  } else {
    newRanking = [user, ...ranking];
  }
  localStorage.setItem('ranking', JSON.stringify(newRanking));
}; */
