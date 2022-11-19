/* a script that shall sort files in dedicated
directories(downloads, pictures and etc),
depending on the extension of the given file.
*/

// path module shall be loaded
const path = require('node:path');
/* this module is required to complete any
path related tasks.*/

// fs module shall be loaded
const fs = require('node:fs');
/* this module is required to complete any
file related tasks, such as checking
if a certain file/dir exists or not. */

// shelljs useful for shell related tasks
const shell = require('shelljs');
/* shelljs shall provide unix tools, which
is useful in this case.*/

// a list of file extentions, taken from https://github.com/dyne/file-extension-list
// a thousand thanks!
const fileExts = require('./fileExts.json');
/* we will need this to start sorting files! */

function createDirs(locat) {
    const dirs = ['pics', 'docs', 'vids', 'audio', 'archives', 'code'];

    if (!fs.existsSync(locat)) return false;

    for (const dir of dirs) {
        if (!fs.existsSync(locat + dir)) {
            shell.mkdir(locat + dir);
        }
    }
}

function sortdirs(dir0) {
    const absdir = path.join(process.cwd(), dir0 + '/');
    createDirs(absdir);
    // 'pics', 'docs', 'vids', 'audio', 'archives', 'codes'
    const dofiles = x => {
        return x.split('.').pop();
    };

    for (const temp of fs.readdirSync(absdir)) {
        if (fs.lstatSync(absdir + temp).isFile()) {
            const _code = dofiles(temp);
            // TODO: conditionals
            if (fileExts.code.includes(_code)) {shell.mv(absdir + temp, absdir + 'codes');}
            if (fileExts.archive.includes(_code)) {shell.mv(absdir + temp, absdir + 'archives');}
            if (fileExts.audio.includes(_code)) {shell.mv(absdir + temp, absdir + 'audio');}
            if (fileExts.video.includes(_code)) {shell.mv(absdir + temp, absdir + 'vids');}
            if (fileExts.image.includes(_code)) {shell.mv(absdir + temp, absdir + 'pics');}
        }
    }
}

const modulesHere = {
    sortdirs,
};

module.exports.dirsort = modulesHere.sortdirs;