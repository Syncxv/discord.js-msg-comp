module.exports = {
    name: 'echo',
    aliases: ['say', 'repeat'],
    usage: "{c} [ text ]",
    description: 'It sends the arguments you provide it hehe',
    execute(client, message, args) {
      message.channel.send(args.join(" "));
    },
  };