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

client.on('message', msg => {
  if (msg.content === 'pezzo di merda') {
    invia(msg)
  }
});

client.login(token);

async function invia(msg) {
    const path = process.env.PATHTOSCREENSHOTS;
    const dest = process.env.DEST;

    //send all screenshots
    const dir = await fs.promises.opendir(path);
    for await (const file of dir) {
        console.log('pipo')
        if(file.name !== '.DS_Store'){
          
            msg.channel.send( {files: [path + file.name]});
            
        }
      }

    // move all screenshot to another folder
    const dirmv = await fs.promises.opendir(path);
    for await (const file of dirmv) {
        if(file.name !== '.DS_Store'){

            mv(path+file.name, dest+file.name, function(err) {
                console.log(err)
            });
        }
      }

    
    
}

