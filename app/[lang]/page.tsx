import type { NextComponentType, NextPageContext } from 'next';

interface Props {
  params: {
    lang: string;
  };
}

const Page: NextComponentType<NextPageContext, {}, Props> = ({
  params: { lang },
}: Props) => {
  return <div>Current language: {lang}</div>;
};

export default Page;
