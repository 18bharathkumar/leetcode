// Fetching questions from the API and exporting the data
let problems;
import URL from "../url";
const fetchProblems = async () => {
  try {
    const response = await fetch(`${URL}/questions`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    problems = await response.json();
    console.log(problems);
    
    return problems;
  } catch (error) {
    console.error('Error fetching problems:', error);
    return []; // Return an empty array on error
  }
};

// Export the fetched problems
 const getProblems = async () => {
  if(problems){
    console.log(problems);
    return problems;
  }
   problems = await fetchProblems();
  return problems;
};
export default getProblems;
