const fs = require('fs');
const events = require ('events');

class Watcher extends events.EventEmitter{
    constructor (watchDir, processDir) {
        super();
        this.watchDir = watchDir;
        this.processDir = processDir;
    }
    watch() {
        fs.readdir(this.watchDir,(err,file) => {
            if (err) throw err;
            console.log(file);
            for(var index in file) {
                this.emit('process',file[index])
            }
        })
    }
    start() {
        fs.watchFile(this.watchDir,()=> {
            this.watch();
        })
    }
}
const watchDir = 'watch'
const processedDir = 'done'
const watcher = new Watcher(watchDir,processedDir)

watcher.on('process',(file) => {
    const watchFile=`${watchDir}/${file}`;
    const processedFile=`${processedDir}/${file.toLowerCase()}`;
    console.log(processedFile,watchFile)
    fs.rename(watchFile, processedFile,err=>{
        console.log(watchFile, processedFile,'1233')
        if(err) throw err;
    });
})

watcher.start();