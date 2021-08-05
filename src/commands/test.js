const { MESSAGE_COMPONENT_TYPE, MESSAGE_BUTTON_STYLES } = require('../constant')
const {createButton, createComponent} = require('../util')
module.exports = {
    name: "bruh",
    description: 'A test',
    execute: (client, message, [name]) => {
        message.channel.send({
            content: "hehe",
            components: createComponent(createButton("id_test", name || "hehehe", MESSAGE_BUTTON_STYLES.DANGER))
        });
    }
}