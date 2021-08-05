const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config();
const token = process.env['token']
const { MESSAGE_COMPONENT_TYPE, INTERACTION_CALLBACK_TYPE, MESSAGE_BUTTON_STYLES } = require('./constant')
client.commands = new Collection();
client.aliases = new Collection();
const commands = require('./commands');
(() => {
  Object.values(commands).forEach(command => {
    client.commands.set(command.name, command);
    if (command.aliases) {
        for (const alias of command.aliases) {
          client.aliases.set(alias, command.name);
        }
    }
})
})()


const prefix = "+"
const gid = "747955932834693273"
const getApp = (guildId) => guildId ? client.api.applications(client.user.id).guilds(guildId)  : client.api.applications(client.user.id)
const postContent =  (e, content) => client.api.interactions(e.id, e.token,).callback.post({data: {type: 4, data: {content: content}}})
const postData = (e, options = {type: 4}) => {
  client.api.interactions(e.id, e.token,).callback.post({data: {type: options.type, data: options.data}})
}
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // const commands = getApp(gid).commands.get()
  client.ws.on("INTERACTION_CREATE", async (e) => {
    console.log(e)
    if(e.data.custom_id) {
      switch(e.data.custom_id) {
        case "btn1":
            postContent(e, "button 1")
            break
        case "btn2":
          postData(e, {type: 7, data: {content: "WELP"}})
            break
        case "select":
            postContent(e, `welp: ${e.data.values.join(", ")}`)
            break
        default:
          postContent(e, "welp") 
          
      }
    }
  })
});

client.on('messageCreate', message => {
  if (message.content === 'ping') {
    message.channel.send({
      content: "BUTTON 1",
      components: [
        {
          "type": MESSAGE_COMPONENT_TYPE.ACTION_ROW,
          components: [
            {
                "type": MESSAGE_COMPONENT_TYPE.SELECT_MENU,
                "custom_id": "select",
                "options":[
                    {
                        "label": "YOOO",
                        "value": "YOOO",
                        "description": "WOAH",
                        "emoji": {
                            "name": "yeye",
                            "id": "791916926242783232"
                        }
                    },
                    {
                      "label": "nice",
                      "value": "nice",
                      "description": "NOW THIS IS INTERESTING",
                      "emoji": {
                          "name": "feetlinushehe",
                          "id": "778991342126235658"
                      }
                  },
                  {
                    "label": "yes indeed",
                    "value": "hehhee",
                    "description": "YEAH IKR",
                    "emoji": {
                        "name": "monkaStab",
                        "id": "771216308019789834"
                    }
                },
                {
                  "label": ":o indeed",
                  "value": "deed in",
                  "description": "NOW THIS IS INTERESTING",
                  "emoji": {
                      "name": "PepeKMS",
                      "id": "771216309567356939"
                  }
                },
                ],
                "placeholder": "Choose a class",
                "min_values": 1,
                "max_values": 2
            }
          ]   
        },
          {
              "type": 1,
              "components": [
                  {
                      "type": 2,
                      "label": "Button 1",
                      "style": MESSAGE_BUTTON_STYLES.DANGER,
                      "custom_id": "btn1"
                  },
                  {
                    "type": 2,
                    "label": "Button 2",
                    "style": 1,
                    "custom_id": "btn2"
                  },
                  {
                    "type": 2,
                    "label": "hhehe",
                    "style": 1,
                    "custom_id": "other btn"
                  }
                
              ]
  
          }
      ]
  })
  }
  if(!message.content.startsWith(prefix)) return
  const messageSplit = message.content.split(/\s+/g);
  const cmd = messageSplit[0].slice(prefix.length);
  const args = messageSplit.slice(1);
  try {
    let command;
    if (client.commands.has(cmd)) {
      command = client.commands.get(cmd);
    } else if (client.aliases.has(cmd)) {
      command = client.commands.get(client.aliases.get(cmd));
    }
    if (!command) return;
    command.execute(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

client.login(token);