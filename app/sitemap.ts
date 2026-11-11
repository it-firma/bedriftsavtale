import type {MetadataRoute} from 'next';
import {services,siteUrl} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return ['','/kontakt','/tjenester','/om-oss','/slik-fungerer-det','/eksempelrapport','/partnere',...services.map(s=>`/tjenester/${s.slug}`)].map(path=>({url:siteUrl+path,changeFrequency:'monthly',priority:path===''?1:.7}))}
