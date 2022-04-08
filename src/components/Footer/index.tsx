import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'ToCoToCo',
          title: 'ToCoToCo',
          href: 'https://tocotocotea.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/phuongsumo',
          blankTarget: true,
        },
        {
          key: 'Nhóm 3',
          title: 'Nhóm 3',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
