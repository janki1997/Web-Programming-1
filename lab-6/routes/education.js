const schools = function (req, res) {
    try {
      res.json(
        [{
          "schoolName": "lilaba vidhya bhavan",
          "degree": "primary degree",
          "favoriteClass": "English class",
          "favoriteMemory": "most memory moment of my school is that why i did not do my homework.\n On that time, I was very scary that what I can do now.\n When our professior came and he asked for homework and when I told hime that i did not do it.\n Surprisingly, He said it is ohk.\n I was very happy"
        }, {
          "schoolName": "P.P. Savani Vidhyabhawav",
          "degree": "I got my higher degree ",
          "favoriteClass": "Science class",
          "favoriteMemory": "most memorable moment is that first lecture of my science class.\n All student are new for me because i changed my school to this school.\n When our profressior asked some questions related to science topic.\n On that time I was the only one who new about the awnser."
        }, {
          "schoolName": "SNPIT & RC",
          "degree": "computer science and engineering",
          "favoriteClass": "Maths",
          "favoriteMemory": "on my maths mid-term.\n I was not well. But, I have to give my exam.But, i did not prepare anything still i got full marks." 
        }]
      );
  
    }
    catch (e) {
      res.status(404).json({ error: e.message });
    }
  }
  
  module.exports = schools;