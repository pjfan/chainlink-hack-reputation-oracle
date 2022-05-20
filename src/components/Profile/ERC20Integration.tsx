import React from 'react';
import { Skeleton, Table } from 'antd';
import { MoralisChainOptions, useWalletBalance, WalletBalance } from '../../hooks/useWalletBalance';

export interface ERC20IntegrationProps {
  address: string;
  chain: MoralisChainOptions;
}

export const ERC20Integration: React.FC<ERC20IntegrationProps> = (props: ERC20IntegrationProps) => {
  const assets: WalletBalance[] | null | undefined = useWalletBalance(props.address, props.chain);

  const columns: object[] = [
    {
      title: '',
      dataIndex: 'logo',
      key: 'logo',
      render: (logo: string) => (
        <img
          src={logo || 'https://etherscan.io/images/main/empty-token.png'}
          alt="nologo"
          width="28px"
          height="28px"
        />
      ),
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (symbol: string) => symbol,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => name,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance: number) => balance,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => price,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => value,
    },
    {
      title: 'Address',
      dataIndex: 'token_address',
      key: 'token_address',
      render: (address: string) => address,
    },
  ];

  return (
    <Skeleton loading={!assets}>
      <Table
        dataSource={assets!}
        columns={columns}
        rowKey={(record) => {
          return record.token_address;
        }}
      />
    </Skeleton>
  );
};
