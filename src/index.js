const Discord = require('discord.js');
const fs = require('fs');
const mv = require('mv');
const dotenv  = require('dotenv');

dotenv.config()
const client = new Discord.Client();
const token =  process.env.TOKEN ;
let GENERALE 
let SCREEN
let LOG



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    GENERALE = client.channels.cache.get(process.env.GENERALE_CHANNEL_ID);
    SCREEN = client.channels.cache.get(process.env.SCREENSHOT_CHANNEL_ID);
    LOG = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
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

    const valzo = 'figa gnari brucia la baita';
    const skuz = 'chi cazzo ha scassato l\'ascensore?';
    const d8eea = 'sono allo spawn e ho perso tutti';

    console.log(newState.member.user.username)
    if(oldChannel != newChannel && newChannel == '699347545708691549')
        if(newState.member.user.username == 'd8eea')
            GENERALE.send(d8eea);
        else if(newState.member.user.username == 'Betelgeuse')
            GENERALE.send(valzo);
        else if(newState.member.user.username == 'SkuZ')
            GENERALE.send(skuz);
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
            SCREEN.send( {files: [path + file.name]});
            LOG.send(`ho inviato ${file.name} `);
        }
    }
    
    const dirmv = await fs.promises.opendir(path);
    for await (const file of dirmv) {
        if(file.name !== '.DS_Store'){

            mv(path+file.name, dest+file.name, function(err) {
                console.log(err)
            });
            LOG.send(`ho spostato ${file.name} `);
        }
    }

    if(size == 0)
        msg.channel.send('ma dove sono sti screenshot? in Croazia?')
        
    }

   

