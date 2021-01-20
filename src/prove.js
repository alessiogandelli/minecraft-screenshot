const Discord = require('discord.js');
const fs = require('fs');
const mv = require('mv');
const dotenv  = require('dotenv');

dotenv.config()
const CLIENT = new Discord.Client();
const TOKEN =  process.env.TOKEN ;
const GENERALE = client.channels.get(process.env.GENERALE_CHANNEL_ID)
const SCREENSHOTS = client.channels.get(process.env.GENERALE_CHANNEL_ID)



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
   
  

    GENERALE.send(`ue stronzi qui si crafta`);
    console.log(newState)



    // client.channels.cache.get(`779018430350622811`).send('magi tartufi');
    // console.log(client.channels.cache.get(`779018430350622811`))
  
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
            GENERALE.send(`ho inviato ${file.name} `);

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

   

