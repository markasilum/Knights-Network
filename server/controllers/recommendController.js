const getRecommendation = async (req, res) => {
try {
    const{id}= req.query

    console.log(id)
} catch (error) {
    console.log("error")
}
}

module.exports = {
    getRecommendation
}