function filterByTerm(inputArr, searchTerm) {
    const regex = new RegExp(searchTerm, "i")
    return inputArr.filter((arrayElement)=>{
        return arrayElement.url.match(regex);
    });
}

module.exports = filterByTerm;