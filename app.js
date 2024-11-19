const chalk = require('chalk');
const fs = require('fs');
const yargs = require('yargs');

const noteController = require('./notes');

yargs.version('1.0.0');

yargs.command({
  command: 'add',
  description: 'Add a new notes',
  builder:{
    title: {
        description:'Note Title',
       demandOption: true,
       type: 'string'
    },
    body:{
        description: "Your note's content",
        demandOption: true,
        type: 'string'

    }
  },
  handler(argv) {
   
    noteController.addNotes(argv.title , argv.body);
  },
});
yargs.command({
  command: 'remove',
  description: 'Remove a note',
  builder:{
    title:{
        description: 'Remove note',
        demandOption:true,
        type:'string'
    }
  },
  handler(argv) {
    noteController.removeNotes(argv.title);

    
  },
});
yargs.command({
  command: 'read',
  description: 'Read a notes',
  builder:{
    title:{
      description:"Note's title",
      demandOption:true,
      type:'string'
    }
  },
  handler(argv) {
    noteController.readNotes(argv.title);
  },
});
yargs.command({
  command: 'list',
  description: 'List Your notes',
  handler() {
    noteController.listNotes();
  },
});

yargs.parse();

