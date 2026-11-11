import {NextResponse} from 'next/server';
import {contact} from '@/lib/contact';
import {sendContactMail,smtpConfigured} from '@/lib/mail';
export const runtime='nodejs';
export const maxDuration=60;
const attempts=new Map<string,{count:number;until:number}>();
export async function POST(request:Request){
 const origin=request.headers.get('origin');const host=request.headers.get('host');
 if(origin){try{if(new URL(origin).host!==host)return NextResponse.json({error:'Forespørselen må sendes fra nettsiden.'},{status:403})}catch{return NextResponse.json({error:'Ugyldig forespørsel.'},{status:400})}}
 if(!request.headers.get('content-type')?.includes('application/json'))return NextResponse.json({error:'Ugyldig innholdstype.'},{status:415});
 if(Number(request.headers.get('content-length'))>16000)return NextResponse.json({error:'Forespørselen er for stor.'},{status:413});
 let data:Record<string,unknown>;try{const text=await request.text();if(text.length>16000)return NextResponse.json({error:'Forespørselen er for stor.'},{status:413});data=JSON.parse(text)}catch{return NextResponse.json({error:'Ugyldig forespørsel.'},{status:400})}
 if(!data||Array.isArray(data)||typeof data!=='object')return NextResponse.json({error:'Ugyldig forespørsel.'},{status:400});
 if(data.website)return NextResponse.json({ok:true});
 const str=(key:string)=>typeof data[key]==='string'?String(data[key]).trim():'';
 const company=str('company'),name=str('name'),email=str('email'),phone=str('phone'),message=str('message'),services=str('services'),type=str('type');
 if(company.length<2||company.length>120||/[\r\n]/.test(company)||!name||name.length>120||!/^\S+@\S+\.\S+$/.test(email)||email.length>200||phone.length>30||(phone&&!/^\+?[\d\s().-]{8,30}$/.test(phone))||message.length>2000||services.length>1000||!['customer','partner'].includes(type))return NextResponse.json({error:'Kontroller at navn, bedrift og e-post er riktig utfylt.'},{status:400});
 if(!smtpConfigured())return NextResponse.json({error:`Vi kunne ikke sende forespørselen akkurat nå. Send oss gjerne en e-post på ${contact.email}.`},{status:503});
 const now=Date.now();for(const [k,v] of attempts)if(v.until<now)attempts.delete(k);
 const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';const rate=attempts.get(ip);
 if(rate&&rate.count>=5)return NextResponse.json({error:'Du har sendt flere forespørsler. Vent litt før du prøver igjen.'},{status:429,headers:{'Retry-After':String(Math.ceil((rate.until-now)/1000))}});
 if(attempts.size>1000)attempts.delete(attempts.keys().next().value!);attempts.set(ip,{count:(rate?.count||0)+1,until:rate?.until||now+3600000});
 const escaped=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
 const rows={'Type':type==='partner'?'Partnerforespørsel':'Gratis avtalegjennomgang','Bedrift':company,'Kontaktperson':name,'E-post':email,'Telefon':phone,'Avtaleområder':services,'Melding':message};
 try{
  await sendContactMail({replyTo:email,subject:`${type==='partner'?'Partnerforespørsel':'Avtalegjennomgang'}: ${company}`,text:Object.entries(rows).map(([label,value])=>`${label}: ${value}`).join('\n\n'),html:`<h2>Ny henvendelse fra Bedriftsavtale.no</h2><table>${Object.entries(rows).map(([label,value])=>`<tr><th style="text-align:left;padding:8px">${escaped(label)}</th><td style="padding:8px;white-space:pre-wrap">${escaped(value)}</td></tr>`).join('')}</table>`});
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:`Forespørselen kunne ikke sendes nå. Prøv igjen senere, eller skriv til ${contact.email}.`},{status:502})}
}
