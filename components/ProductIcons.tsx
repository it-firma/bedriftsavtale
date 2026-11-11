import type {SVGProps} from 'react';
export type ProductIconProps=SVGProps<SVGSVGElement>&{size?:number;strokeWidth?:number};
const paths:Record<string,React.ReactNode>={
 'mobilabonnement':<><rect x="14" y="4" width="20" height="40" rx="3.5"/><path d="M22 8h4"/><circle cx="24" cy="39" r="1" fill="currentColor" stroke="none"/></>,
 'strom':<><path d="M28 3 11 26h13l-4 19 18-25H25l3-17Z"/></>,
 'forsikring':<><path d="M24 5c-5 4-11 5-17 5v12c0 10 7 18 17 22 10-4 17-12 17-22V10c-6 0-12-1-17-5Z"/></>,
 'regnskap':<><ellipse cx="31" cy="11" rx="12" ry="5"/><path d="M19 11v7c0 2.8 5.4 5 12 5s12-2.2 12-5v-7M27 30h4c6.6 0 12-2.2 12-5v-7M31 37c6.6 0 12-2.2 12-5v-7"/><ellipse cx="16" cy="26" rx="12" ry="5"/><path d="M4 26v7c0 2.8 5.4 5 12 5s12-2.2 12-5v-7M4 33v7c0 2.8 5.4 5 12 5s12-2.2 12-5v-7"/></>,
 'bredband':<><path d="M4 17c11.5-10 28.5-10 40 0M10 24c8-7 20-7 28 0M17 31c4-3.5 10-3.5 14 0"/><circle cx="24" cy="39" r="1.6" fill="currentColor" stroke="none"/></>,
 'bedriftstelefoni':<><path d="M12 5H9a5 5 0 0 0-5 5c0 18.8 15.2 34 34 34a5 5 0 0 0 5-5v-3a3 3 0 0 0-2-2.8l-7-2.4a3 3 0 0 0-3.2.8l-3 3A29 29 0 0 1 13.4 20l3-3a3 3 0 0 0 .8-3.2l-2.4-6.9A3 3 0 0 0 12 5Z"/></>,
 'programvare':<><rect x="6" y="8" width="36" height="27" rx="2"/><path d="M3 39h42l-2 4H5l-2-4ZM20 39h8"/></>,
 'kjorebok':<><path d="m9 21 5-13h20l5 13M8 21h32a3 3 0 0 1 3 3v14H5V24a3 3 0 0 1 3-3Z"/><path d="M8 38v5h6v-5m20 0v5h6v-5M11 28h5m16 0h5M19 35h10"/></>
};
export function ProductIcon({slug,size=24,strokeWidth=1.8,...props}:ProductIconProps&{slug:string}){return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[slug]}</svg>}
export const productIcons=Object.fromEntries(Object.keys(paths).map(slug=>[slug,(props:ProductIconProps)=><ProductIcon slug={slug} {...props}/>])) as Record<string,(props:ProductIconProps)=>React.JSX.Element>;
