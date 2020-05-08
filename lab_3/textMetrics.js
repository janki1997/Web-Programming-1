async function createMetrics(text) {
        var metrics = {}
        var Letter = text.toString().toLowerCase().match(/[a-z]/g).length;
        var Non_letter = text.toString().toLowerCase().match(/[^a-z]/g).length;
        var total_word = text.toString().toLowerCase().trim().replace(/[^a-zA-Z]/g, ' ').split(' ').filter(x => (x != ""));
        var totalvowel = text.toString().toLowerCase().match(/[aeiou]/g).length;
        var totalconsonants = text.toString().toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/g).length;
        var uniqueword = [...new Set(total_word)].length;
        var wordcount = text.toString().toLowerCase().trim().replace(/[^a-zA-Z]/g, ' ').split(' ').filter(x => (x != "")).length;
        var longwords = text.toString().toLowerCase().trim().replace(/[^a-zA-Z]/gi, ' ').split(' ').filter(dt => (dt.length >= 6)).length;
        var i = 0;
        total_word.filter(dt => i += dt.length);
        var total_average = i / total_word.length;
        var unique_word_data =  [...new Set(total_word)];
        var word_occurrences ={}
      
        unique_word_data.map(x=>{
            word_occurrences[x] = (total_word.filter(dt => dt == x)).length
        })

        metrics = {
            totalLetters: Letter, 
            totalNonLetters: Non_letter,
            totalWords: wordcount,
            totalVowels: totalvowel,
            totalConsonants: totalconsonants,
            uniqueWords: uniqueword, 
            longWords: longwords,
            averageWordLength: total_average,
            wordOccurrences: word_occurrences,
            
        }
        return metrics;
    }


module.exports = {
    createMetrics :  createMetrics
  
};