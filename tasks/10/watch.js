import chokidar from 'chokidar';
import fg from 'fast-glob';

const changedFilesLog = [];
let watcher;

export function getLog() {
  const set = new Set();
  return changedFilesLog.filter(path => {
    if (set.has(path)) {
      return false;
    }
    set.add(path);
    return true;
  })
}

export async function subscribe() {
  const files = await fg('src/**/*.js');
  watcher = await chokidar.watch(files).on('change', (event, path) => {
      changedFilesLog.push(event);
  });
}

export async function unsubscribe() {
  await watcher.close().then(() => console.log('== Watcher closed'));
}
