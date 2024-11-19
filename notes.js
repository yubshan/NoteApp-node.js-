const fs = require('fs');
const chalk = require('chalk');
module.exports.getNotes= function( note ) {
    return console.log('Your Notes : ' + note);
    
}
module.exports.addNotes= function ( title, body ) {
    const notes = this.loadNotes();
   if(this.duplicateNotes(title)){
    console.log(notes[0]);
    return  console.log(chalk.red('Title already taken. Try Something new.'));  
  }
  
  notes.push({
        title:title,
        content: body
    });
    this.saveNotes(notes); 
    console.log(chalk.green("New note added."));   
}

module.exports.saveNotes =function (notes){
    fs.writeFileSync('notes.json' , JSON.stringify(notes));
    
}
module.exports.loadNotes= function ( ) {
    
   try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
   } catch (err) {
    return [];
   }
    
}
module.exports.duplicateNotes= function ( title ) {
    
   const notes = this.loadNotes();
   const duplicateNote = notes.find((note, i) =>{
    return note.title === title;
   });

   if(duplicateNote){
    return true;
   }
   return false;
    
}
module.exports.removeNotes= function ( title ) {
    
   const notes = this.loadNotes();
   if(!(this.duplicateNotes(title))){
    return console.log(chalk.red("Sorry no note found. Please check your title input and try again."));
    
   }
   const newNotes = notes.filter((note) =>{
    return title !== note.title;
   });
   this.saveNotes(newNotes); 
   return console.log(chalk.green('Note removed.'));
    
}
module.exports.listNotes= function ( ) {
   let i = 1; 
   const notes = this.loadNotes();
   
   console.log(chalk.green("  Your Notes!"));
   notes.forEach(note => {
    console.log(i + ": "+ note.title);
    i++;
   });   
}
module.exports.readNotes= function ( title ) {
 const notes = this.loadNotes();
  const searchedNote = notes.find((note) =>{
   return note.title === title;
  })

   if(!searchedNote){
     return  console.log(chalk.red.bold('No notes found.'));
      
   }

   console.log(chalk.blue.underline(searchedNote.title));
   console.log("-> "+ searchedNote.content);
   
   
}


