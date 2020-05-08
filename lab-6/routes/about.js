const about = function (req, res) {
    try {

        res.json({
            "name": "Janki Patel",
            "cwid": "10457365",
            "biography": "My name is janki patel.\n I did my bechlour in computer science and engineering.Recently, I pursue my master degree in computer science at stevens intitute of technology.",
            "favoriteShows": ["13 reason why", "black list", "the IT crowd","money heist","Khatro ke khiladi"],
            "hobbies": ["dancing", "travelling","drawing","crafting","drawing"]
        });
    }
    catch (e) {
        res.status(404).json({ error: e.message });
    }
}

module.exports = about