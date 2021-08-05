const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
require('dotenv').config();
const token = process.env['token']
const { MESSAGE_COMPONENT_TYPE, INTERACTION_CALLBACK_TYPE, MESSAGE_BUTTON_STYLES } = require('./constant')
const createButton = require('./util/createButton')
client.commands = new Collection();
client.aliases = new Collection();
const commands = require('./commands');
const createEmebed = require('./util/createEmbed');
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

var test = Object.values(commands)
      for (let i = 0; i < 10; i++) {
          test.push({
              name: "cmd"+i,
              description: "A REALLY NICE DESCRIPTION hehe"
          })
      }
      global.test = test
      let arr = []
      for (let i = 0; i < Math.floor(test.length / 5)+3; ++i) {
          arr.push(test.splice(-5))
      }
const pageCount = arr.length
const prefix = "+"
const gid = "747955932834693273"
const getApp = (guildId) => guildId ? client.api.applications(client.user.id).guilds(guildId)  : client.api.applications(client.user.id)
const postContent =  (e, content) => client.api.interactions(e.id, e.token,).callback.post({data: {type: 4, data: {content: content}}})
const postData = (e, options = {type: 6}) => {
  client.api.interactions(e.id, e.token,).callback.post({data: {type: options.type, data: options.data}})
}
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // const commands = getApp(gid).commands.get()
  client.ws.on("INTERACTION_CREATE", async (e) => {
    console.log(e)
    if(e.data.custom_id) {
      // var mor = "**[dig](https://dankmemer.lol/commands)** \n<:Reply:870665583593660476>Dig in the dirt for coins and items!\n*"
      switch(e.data.custom_id) {
        case "next":
          var currPage = parseInt(e.message.embeds[0].footer.text.split(' ')[1]) - 1
          console.log(currPage)
          console.log(arr)
          if (currPage >= pageCount) return postData(e,{type: 6,})
          postData(e, {type: 7, data: {embeds: createEmebed(null, arr[currPage + 1].map(command => `**[${command.name}](https://www.google.com)** \n :round_pushpin: ${command.description}\n`).join('\n'), "Page " + (currPage + 2))}})
          // postData(e, {type: 7, data: {content: "Page " + (currPage + 1)}})
            break
        case "prev":
          var currPage = parseInt(e.message.embeds[0].footer.text.split(' ')[1]) - 1
          console.log(currPage)
          if ((currPage) === 1) return postData(e,{type: 6,})
          postData(e, {type: 7, data: {embeds: createEmebed(null, arr[currPage].map(command => `**[${command.name}](https://www.google.com)** \n :round_pushpin: ${command.description}\n`).join('\n'), "Page " + (currPage - 1))}})
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
                  createButton("btn1", "BUTT 1",),
                  createButton("btn2", "bUTTon OF the 2"),
                  createButton("burh", "WOAH", MESSAGE_BUTTON_STYLES.DANGER)
                
              ]
  
          }
      ]
  })
  }
  if (message.content === "bruuuh") {
    message.channel.send({
      content: "Page 1",
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
    if(command.name == "help") return command.execute(client, message, args, createEmebed(null, arr[0].map(command => `**[${command.name}](https://www.google.com)** \n :round_pushpin: ${command.description}\n`).join('\n'), "Page 1"));
    command.execute(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

client.login(token);