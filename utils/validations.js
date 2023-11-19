function spaceSpam(strings){
    return strings.some(str => str.includes(' '))
}

module.exports = {
    spaceSpam
}