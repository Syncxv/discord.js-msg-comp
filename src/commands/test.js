module.exports = {
    name: "bruh",
    description: 'A test',
    execute: (client, message, args) => {
        message.channel.send({
            content: "hehe",
            components: [
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Button 2",
                            "style": 1,
                            "custom_id": "btn2"
                        }
                    ]
        
                }
            ]
        });
    }
}