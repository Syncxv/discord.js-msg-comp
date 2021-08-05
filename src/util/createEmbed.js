module.exports = (title = null, description, fotter,) => {
    return [{
        "type": "rich",
        title,
        description,
        footer: {
            text: fotter,
        },
        // "color": "red",
    }]

}