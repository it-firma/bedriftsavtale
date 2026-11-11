import Link from 'next/link';
export default function Brand({light=false}:{light?:boolean}){return <Link href="/" className="brand" aria-label="Bedriftsavtale.no til forsiden"><img className="brand-wordmark" src={light?'/brand/logo-lys.svg':'/brand/logo-mork.svg'} alt="Bedriftsavtale.no" width={335} height={56}/></Link>}
