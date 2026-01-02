import { ReactNode } from 'react';

interface FormLayoutProps {
  children: ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-orange-50 min-h-screen flex flex-col">
      <div className="max-w-3xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
