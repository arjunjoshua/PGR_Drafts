import { writeFile, readFile } from 'fs/promises'; 

async function sortPokemonData() {
    try {
      // Read the JSON file
      const fileContent = await readFile('./unreleasedMons.json', 'utf-8');
      
      const data = JSON.parse(fileContent);
  
      // Sort the data
      const sortedData = data.sort((a, b) => a.localeCompare(b));
  
      // Write the sorted data back to the file
      await writeFile('./unreleasedMons.json', JSON.stringify(sortedData, null, 2));
  
      console.log('Data sorted and written successfully.');
    } catch (error) {
      console.error('Error processing the file:', error);
    }
  }
  
  sortPokemonData();
  