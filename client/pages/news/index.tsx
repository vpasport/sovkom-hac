import type { NextPage, GetServerSideProps } from 'next';
import type { NewsPageProps } from './news';
import type { INews } from '../../types/news';

import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

import moment from 'moment';

import { Toast } from 'primereact/toast';

import * as newsApi from '../../api/news';
import * as userApi from '../../api/user';
import { useSocket, useNotifications } from '../../hooks';
import { Button, TextViewer } from '../../components';

import styles from './style.module.scss';

const News: NextPage<NewsPageProps> = ({ news, user }) => {
  const router = useRouter();
  const { pushNotifications } = useNotifications();

  const { initSocket } = useSocket();
  const [_news, setNews] = useState<INews[]>(news);

  useEffect(() => {
    initSocket([
      {
        event: 'update',
        handler: (message: string) =>
          message === 'news' &&
          newsApi
            .getAll()
            .then((res) => {
              setNews(res.data);
              pushNotifications({
                type: 'success',
                description: 'News updated',
              });
            })
            .catch((err) => console.error(err)),
      },
    ]);
  }, []);

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
      <div className={styles.feed}>
        <h1>News:</h1>
        {_news.map((el) => (
          <div key={el.id} className={styles.feed_news}>
            <img
              className={styles.feed_news_image}
              src={`${process.env.NEXT_PUBLIC_API_URL}/upload${el.image}`}
              alt={el.title}
            />
            <div className={styles.feed_news_description}>
              <h1 className={styles.feed_news_description_title}>{el.title}</h1>
              <div className={styles.feed_news_description_meta}>
                <span className={styles.feed_news_description_meta_author}>
                  {el.author_login}
                </span>
                <span className={styles.feed_news_description_meta_date}>
                  {moment(el.create_date).format('DD.MM.YY HH:mm')}
                </span>
              </div>
              <TextViewer
                value={el.description}
                className={styles.feed_news_description_text}
              />
              <div className={styles.feed_news_description_buttons}>
                <Button
                  buttonType="light"
                  onClick={() => router.push(`/news/${el.id}`)}
                >
                  Read more
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  let user = null;
  let news = [];

  try {
    news = await (await newsApi.getAll()).data;

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
