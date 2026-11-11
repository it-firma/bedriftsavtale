import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const args=process.argv.slice(2),normalized=[];
for(let i=0;i<args.length;i++){
 if(args[i]==='--strictPort')continue;
 normalized.push(args[i]==='--host'?'--hostname':args[i]);
}
const child=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'dev',...normalized],{stdio:'inherit',env:process.env});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
