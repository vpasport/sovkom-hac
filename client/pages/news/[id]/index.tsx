import type { NextPage, GetServerSideProps } from 'next';
import type { NewsPageProps } from './news';

import { useRouter } from 'next/router';

import moment from 'moment';

import * as newsApi from '../../../api/news';
import * as userApi from '../../../api/user';
import { Button, TextViewer } from '../../../components';

import styles from './style.module.scss';

const News: NextPage<NewsPageProps> = ({ news, user }) => {
  console.log(news, user);
  const router = useRouter();

  return (
    <div className={styles.root}>
      {user && (
        <Button
          className={styles.to_admin_panel}
          onClick={() => router.push('/admins/news')}
          buttonType="default"
        >
          В панель администратора
        </Button>
      )}
      <div className={styles.news}>
        <div className={styles.news_cover}>
          <Button
            buttonType="default"
            className={styles.news_cover_button}
            onClick={() => router.back()}
            leftIcon={<i className="pi pi-angle-left" />}
          >
            Go back
          </Button>
          <img
            className={styles.news_cover_image}
            src={`${process.env.NEXT_PUBLIC_API_URL}/upload${news.image}`}
            alt={news.title}
          />
        </div>
        <div className={styles.news_content}>
          <h1 className={styles.news_content_title}>{news.title}</h1>
          <div className={styles.news_content_meta}>
            <span>{news.author_login}</span>
            <span>{moment(news.create_date).format('DD.MM.YY HH:mm')}</span>
          </div>
          <TextViewer
            value={news.description}
            className={styles.news_content_text}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req: {
    headers: { cookie },
  },
  params,
}) => {
  let user = null;
  let news = null;

  if (!params?.id || Array.isArray(params.id)) {
    return {
      redirect: {
        destination: '/404',
        permanent: true,
      },
    };
  }

  const { id } = params;

  if (isNaN(parseInt(id))) {
    return {
      redirect: {
        destination: '/404',
        permanent: true,
      },
    };
  }

  try {
    const result = await await newsApi.getById(parseInt(id));

    if (result.status !== 200) {
      return {
        redirect: {
          destination: '/404',
          permanent: true,
        },
      };
    }

    news = result.data;

    if (cookie && (await userApi.checkAuth(cookie))) {
      user = await (await userApi.getMe(cookie)).data;
    }
    throw new Error('user not authorized');
  } catch (e) {
    console.error(e);
  } finally {
    return {
      props: {
        user,
        news,
      },
    };
  }
};

export default News;
