const Discord = require('discord.js');
const fs = require('fs');
const mv = require('mv');
const dotenv  = require('dotenv');

dotenv.config()
const client = new Discord.Client();
const token =  process.env.TOKEN ;


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    if(msg.content == 'magi'){
        msg.channel.send('di montecchio (il vecchio del cazzo)')
        invia(msg)
    }
})

client.on('voiceStateUpdate', (oldState, newState) => {
    // Here I'm storing the IDs of their voice channels, if available
    oldChannel = oldState.channelID;
    newChannel = newState.channelID;
    
    if(oldChannel != newChannel && newChannel == '699347545708691549')
        client.channels.cache.get(`699347545708691548`).send(`ue stronzi qui si crafta`);
  });

client.login(token);

async function invia( msg) {
    const path = process.env.PATHTOSCREENSHOTS;
    const dest = process.env.DEST;

    //send all screenshots
    const dir = await fs.promises.opendir(path);
    let size = 0 ;

    //send files in the server
    for await  (const file of dir) {
        
        if(file.name !== '.DS_Store'){
            size += 1;
            msg.channel.send( {files: [path + file.name]});
            client.channels.cache.get(`788587691352522795`).send(`ho inviato ${file.name} `);
        }
    }
    
    const dirmv = await fs.promises.opendir(path);
    for await (const file of dirmv) {
        if(file.name !== '.DS_Store'){

            mv(path+file.name, dest+file.name, function(err) {
                console.log(err)
            });
            client.channels.cache.get(`788587691352522795`).send(`ho spostato ${file.name} `);
        }
    }

    if(size == 0)
        msg.channel.send('ma dove sono sti screenshot? in Croazia?')
        
    

    }

   

