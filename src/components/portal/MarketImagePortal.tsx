import { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface Props {
  children: ReactNode;
}

const MarketImagePortal = ({ children }: Props) => {
  const el = document.getElementById('market-image-modal') as HTMLElement;

  return ReactDom.createPortal(children, el);
};

export default MarketImagePortal;
