const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config();
const token = process.env['token']
const gid = "747955932834693273"
const getApp = (guildId) => guildId ? client.api.applications(client.user.id).guilds(guildId)  : client.api.applications(client.user.id)
const postContent =  (e, data) => client.api.interactions(e.id, e.token,).callback.post({data: {type: 4, data: data}})
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const commands = getApp(gid).commands.get()
  client.ws.on("INTERACTION_CREATE", async (e) => {
    console.log(e)
    if(e.data.custom_id) {
      switch(e.data.custom_id) {
        case "btn1":
            postContent(e, {contenet: "button 1"})
            break
        case "btn2":
            postContent(e, {content: "button 2"})
            break
        case "select":
            postContent(e, {content: `${e.data.values.join(", ")}`})
            break
        default:
          postContent(e, {content: "welp"}) 
          
      }
    }
  })
});

client.on('messageCreate', message => {
    console.log("PLEASE")
  if (message.content === 'ping') {
    message.channel.send({
      content: "BUTTON 1",
      components: [
        {
          "type": 1,
          components: [
            {
                "type": 3,
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
                      "style": 1,
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
});

client.login(token);