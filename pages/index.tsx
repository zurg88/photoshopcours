import React, { useContext, useEffect, useState } from 'react';
import styles from './Page.module.css';
import { Card, Htag, Paragraph } from '../components';
import { withLayout } from '../Layout/Layout';
import axios, { AxiosResponse } from 'axios';
import cn from 'classnames';
import { FirstLevelMenuItem, MenuItem, PageItem } from '../interfaces/menu.interface';
import { GetStaticProps } from 'next';
import { API } from '../helpers/api';
import { firstLevelMenu } from '../helpers/helpers';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import CategoryBg from '../helpers/img/categoryBg.jpg';
import { AppContext } from '../context/app.context';
import Link from 'next/link';
import { motion } from 'framer-motion';

function Home(): JSX.Element {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.categoryList}>
        {menu.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }
          return (
            <motion.li className={styles.categoryListItem} layout key={m._id.secondCategory}>
              <Card
                className={styles.categoryCard}
                aria-expanded={m.isOpened}
              >
                <Htag tag='h3'>{m._id.secondCategory}</Htag>
                <ul className={styles.secondLevelBlock} >
                  {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                </ul>
              </Card>

            </motion.li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      pages.map(p => (
        <li className={styles.thirdLevelItems} key={p._id}>
          <Link href={`/${route}/${p.alias}`}>
            <a
              aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
              tabIndex={0}
              className={styles.thirdLevelItemsLink}>
              {p.category}
            </a>
          </Link>
        </li>
      ))
    );
  };

  return (
    <div className={styles.contentWrapper}>
      <Htag tag='h1'> Освой новую профессию! </Htag>

      <div className={styles.imagelock}>
        <Image alt='Courses' src={CategoryBg} layout="responsive" />
      </div>

      {firstLevelMenu.map(m => (
        <div className={styles.categoryWrapp} key={m.id}>
          {m.id == firstCategory && buildSecondLevel(m)}
        </div>
      ))}

      <div className={styles.textContent}>
        <ul className={styles.benefitList}>
          <Htag tag='h2'>Когда полезны онлайн-курсы</Htag>
          <li className={styles.benefitListItem}>
            <Paragraph>
              <strong>Вы хотите быстрее начать работать.</strong>
              Курсы помогут быстро вникнуть в теорию, попробовать свои силы на
              практике и найти первых клиентов или работодателей.
            </Paragraph>
          </li>

          <li className={styles.benefitListItem}>
            <Paragraph>
              <strong>Вы чувствуете, что знаний для продвижения в профессии не хватает.</strong>
              Курсы помогут прокачать необходимые навыки и перейти на новый профессиональный уровень.
              Если вы пишете тексты для сайтов, на курсах научитесь создавать посты и для социальных сетей.
            </Paragraph>
          </li>

          <li className={styles.benefitListItem}>
            <Paragraph>
              <strong>Вам нужна обратная связь от опытных коллег.</strong>
              Курсы ведут эксперты, они помогут
              вам выполнять практические задания, покажут ошибки и помогут их исправить.
            </Paragraph>
          </li>

          <li className={styles.benefitListItem}>
            <Paragraph>
              <strong>Вы хотите учиться в удобное для себя время.</strong>
              На курсах вы сможете учиться дома и по вечерам.
              Вам не придётся ехать на другой конец города, чтобы послушать преподавателя.
            </Paragraph>
          </li>

          <li className={styles.benefitListItem}>
            <Paragraph>
              <strong>Вы хотите освоить профессию с нуля.</strong>
              Все знания на курсе даются
              последовательно — вы будете переходить от простого понятия к сложному.
              Большинство курсов ориентированы именно на обучение новичков.
            </Paragraph>
          </li>

          <li className={styles.benefitListItem}>
            <Paragraph>
              <strong>Вы хотите получить практический опыт.</strong>
              На курсах много практики. Вы будете выполнять домашнюю работу и
              тренироваться на реальных проектах.
              Все работы ученика проверяет опытный преподаватель, и на выходе каждый ученик получает качественное портфолио.
            </Paragraph>
          </li>
        </ul>

        <div className={styles.info}>
          <Htag tag='h2'>Ещё немного полезной информации</Htag>
          <ul className={styles.infoList}>
            <li className={styles.infoListItem}>
              <Paragraph>
                Курсы покупать стоит, если вы хотите сменить сферу деятельности и получить новую профессию.
              </Paragraph>
            </li>

            <li className={styles.infoListItem}>
              <Paragraph>
                Обучение на онлайн-курсах проходит в комфортном режиме:
                учиться можно по вечерам или выходным, а лекции пересматривать в любое время.
              </Paragraph>
            </li>

            <li className={styles.infoListItem}>
              <Paragraph>
                Самообразование не заменит, но дополнить курсы.
                Книги и бесплатные мастер-классы помогут разобраться с терминологией и изучить чужой опыт, но не дадут практику.
              </Paragraph>
            </li>

            <li className={styles.infoListItem}>
              <Paragraph>
                Оптимальный вариант — когда удаётся совмещать обучение на курсе и самообразование.
              </Paragraph>
            </li>
          </ul>
        </div>
      </div>
    </div >
  )
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {

  const firstCategory = 0;
  const { data: menu }: AxiosResponse<MenuItem[]> = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    },
    revalidate: 60,
  }
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}



