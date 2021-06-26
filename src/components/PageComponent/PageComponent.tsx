import React, { createContext } from 'react';
import { BaseProps } from '../../interfaces/BaseProps';

export type PageResponse = any;

export type PageComponentProps = {
  page?: PageResponse;
  device?: 'mobile' | 'desktop';
};

export type ServerSideProps = {
  pageComponentProps: PageComponentProps;
};

const DEFAULT_PAGE_RESPONSE: PageResponse = {};

export const PageContext = createContext<PageResponse>({
  ...DEFAULT_PAGE_RESPONSE,
});

export default function PageComponent({
  page,
  device,
  children,
}: PageComponentProps & Pick<BaseProps, 'children'>): JSX.Element {
  return <PageContext.Provider value={page}>{children}</PageContext.Provider>;
}
