import { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface Props {
  children: ReactNode;
}

const AdminModalPortal = ({ children }: Props) => {
  const el = document.getElementById('login-modal') as HTMLElement;

  return ReactDom.createPortal(children, el);
};

export default AdminModalPortal;
