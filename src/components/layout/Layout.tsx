import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <section className="p-5 m-auto max-w-7xl">{children}</section>;
};

export default Layout;
