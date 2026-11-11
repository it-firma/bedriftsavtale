'use client';
import Link from 'next/link';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {Menu,X} from './Icons';
import Brand from './Brand';
export default function Header(){const [open,setOpen]=useState(false);const home=usePathname()==='/';return <header className={`site-header ${home?'over-hero':''}`}><div className="container header-inner"><Brand light/><nav className="desktop-nav" aria-label="Hovedmeny"><Link href="/#avtaler">Avtaler</Link><Link href="/#prosess">Slik fungerer det</Link><Link href="/om-oss">Om oss</Link></nav><Link className="button nav-cta" href="/kontakt">Gratis gjennomgang</Link><button className="menu-toggle" aria-label={open?'Lukk meny':'Åpne meny'} aria-expanded={open} aria-controls="mobilmeny" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>{open&&<nav className="mobile-nav" id="mobilmeny" aria-label="Mobilmeny">{[['Avtaler','/#avtaler'],['Slik fungerer det','/#prosess'],['Om oss','/om-oss'],['Gratis gjennomgang','/kontakt']].map(([label,url])=><Link href={url} key={url} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>}</header>}
