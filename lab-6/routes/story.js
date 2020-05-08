const story = function (req, res) {
    try {
        res.json({
            "storyTitle": "Try and try till you succeed",
            "story": "SO, when I was on my higher school on that time I was preparing for my JEEE exam.\n WHen i gave my exam with my full preparation.\n I was sure that i will get good score on that but, i failed.\n I was on depression on that moment because, no one was talking to me. Everyone was like she did not even pass the small exam and all that thing.\n On that moment I decide to give this exam again.\n Again I gave my 100% towards to this exam.But, the reasult was same.\n I failed again.\nMoreover, my father told me u have to try one more time.I did not agree with him.He push me to give this exam.\n Furthermore, I gave this exam with my preparation.\n I thought i will fail again and everybody will stay away from me.\n Surprisingly, I got good score.\n to be honest, I learn that we have to try it till we get success "
        });
    }
    catch (e) {
        res.status(404).json({ error: e.message });
    }
}


module.exports = story;
