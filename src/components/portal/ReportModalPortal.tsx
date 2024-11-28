import { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface Props {
  children: ReactNode;
}

const ReportModalPortal = ({ children }: Props) => {
  const el = document.getElementById('report-modal') as HTMLElement;

  return ReactDom.createPortal(children, el);
};

export default ReportModalPortal;
