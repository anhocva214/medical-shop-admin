export const capitalizeString = (string: string) : string => {
    let words = string.split(" ")
    let result = ""

    words.forEach(word => {
        result += word[0].toUpperCase() + word.substr(1).toLowerCase() + " "
    })
    return result.trim()
}