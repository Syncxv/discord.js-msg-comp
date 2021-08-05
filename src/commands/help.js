const createEmbed = require('../util/createEmbed')
const createButton = require('../util/createButton')
const { MESSAGE_COMPONENT_TYPE, MESSAGE_BUTTON_STYLES } = require('../constant')

module.exports = {
    name: "help",
    aliases: ['h'],
    useage: "{c}",
    description: 'OH YEAH gang gang',
    execute: (client, message, [page], embed = null) => {
        // var comp = createComponent(createButton("id_test", name || "hehehe", MESSAGE_BUTTON_STYLES.DANGER))
        // arr[0].map(command => `**[${command.name}](https://www.google.com)** \n :round_pushpin: ${command.description}\n`).join('\n')
        message.channel.send({
            content: "hehe",
            embeds: embed  || createEmbed("HAHAH", "welp", "omoshiroi"),
            components: [
                {
                  type: MESSAGE_COMPONENT_TYPE.ACTION_ROW,
                  components: [
                    createButton("prev", "Previous",),
                    createButton("burh", "WOAH", MESSAGE_BUTTON_STYLES.DANGER),
                    createButton("next", "NEXT"),
                  ]
                }
              ]
        });
    }
}