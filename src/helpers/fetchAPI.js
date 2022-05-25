const fetchTokenAPI = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const { token } = data;
  return token;
};

export default fetchTokenAPI;
