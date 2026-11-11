import type {Metadata} from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {siteUrl} from '@/lib/site';
import './globals.css';
import './footer.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Bedre bedriftsavtaler med personlig rådgiver | Bedriftsavtale.no',template:'%s | Bedriftsavtale.no'},description:'En personlig rådgiver innhenter tilbud og sammenligner bedriftens avtaler på pris, kvalitet og vilkår. Du velger selv. Start en gratis avtalegjennomgang.',openGraph:{type:'website',locale:'nb_NO',siteName:'Bedriftsavtale.no',images:[{url:'/images/radgivning-hero-v2.webp',width:1642,height:958,alt:'En bedriftskunde og rådgiver gjennomgår avtaler'}]},twitter:{card:'summary_large_image'},icons:{icon:'/favicon.svg'},robots:{index:true,follow:true}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="nb"><body><a className="skip-link" href="#hovedinnhold">Hopp til innhold</a><Header/><main id="hovedinnhold">{children}</main><Footer/></body></html>}
