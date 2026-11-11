import Link from 'next/link';
import {ArrowRight,CircleCheck} from './Icons';
import {MessageCircle} from 'lucide-react';
import Brand from './Brand';
import {services} from '@/lib/site';
import {contact} from '@/lib/contact';
const labels=['Mobil','Strøm','Forsikring','Regnskap','Internett','Bedriftstelefoni','Programvare','Kjørebok'];
export default function Footer(){
 return <footer className="site-footer premium-footer"><div className="container">
 <div className="premium-footer-grid">
 <div className="premium-footer-brand"><Brand light/><p className="premium-footer-tagline">Bedre avtaler. Tryggere valg.</p><p className="premium-footer-description">Din personlige rådgiver for bedriftens faste avtaler.</p><Link className="button" href="/kontakt">Få en gratis gjennomgang <ArrowRight size={20} aria-hidden="true"/></Link></div>
 <nav aria-label="Avtaler i bunnmenyen"><h2>Avtaler</h2><ul>{services.map((s,i)=><li key={s.slug}><Link href={`/tjenester/${s.slug}`}>{labels[i]}</Link></li>)}</ul></nav>
 <nav aria-label="Om oss i bunnmenyen"><h2>Om oss</h2><ul><li><Link href="/slik-fungerer-det">Slik fungerer det</Link></li><li><Link href="/om-oss">Om Bedriftsavtale.no</Link></li><li><Link href="/partnere">For partnere</Link></li></ul></nav>
 <div className="premium-footer-contact"><h2>Kontakt</h2><p><a href={`mailto:${contact.email}`}>{contact.email}</a></p><Link className="premium-footer-adviser" href="/kontakt"><MessageCircle size={25} aria-hidden="true"/><span>Snakk med en rådgiver <ArrowRight size={18} aria-hidden="true"/></span></Link></div>
 </div>
 <p className="premium-footer-assurance"><CircleCheck size={29} aria-hidden="true"/><span>Du bestemmer selv. Ingen avtaler endres uten din godkjenning.</span></p>
 <div className="premium-footer-bottom"><div><p>© {new Date().getFullYear()} Bedriftsavtale.no</p><p className="premium-footer-legal">Bedriftsavtale.no er en tjeneste fra {contact.company}<br/>Org.nr. {contact.formattedOrganizationNumber}</p></div><nav aria-label="Juridisk informasjon"><Link href="/personvern">Personvern</Link><Link href="/personvern#informasjonskapsler">Informasjonskapsler</Link><Link href="/vilkar">Vilkår</Link></nav></div>
 </div></footer>
}
