declare module 'lucide-react/dist/esm/icons/*' {
  import type { ForwardRefExoticComponent, RefAttributes } from 'react';
  import type { LucideProps } from 'lucide-react';

  type IconComponent = ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;

  const Icon: IconComponent;
  export default Icon;
}
