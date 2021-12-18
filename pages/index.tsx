import React, { useEffect, useState } from 'react';
import { Htag, Button, Paragraph, Rating, AdditionalSmallElement, Input, Textarea } from '../components';
import { withLayout } from '../Layout/Layout';
import axios, { AxiosResponse } from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { GetStaticProps } from 'next';
import { API } from '../helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {

    return function cleanUp() {
      console.log('Mount')
    }
  })

  return (
    <>
      <Htag tag='h1'> {counter} </Htag>
      <Button appearance="primary" arrow="right" onClick={() => setCounter(x => x + 1)} >counter++</Button>
      <Button appearance="ghost" arrow="right">Кнопка</Button>
      <Paragraph size='s'>
        Напишу сразу в двух курсах, так как проходил оба. Java будет многим непросвещённым
        сложновата в изучении, но здесь перевес из-за лидирующего положения языка как
        самого популярного в программировании. Выбор мой пал на эту профессию еще и потому, что
        Java-разработчики получают самую большую зарплату. Хотя Python начинает догонять Java
        по многим моментам, но вот в крупном екоме разработке Джава все-таки остается
        главенствующей сейчас. Скажу так – полнота программы и интенсивность присуща
        обоим курсам GeekBrains. Хочу отметить, что с первого дня занятий вы приступаете
        к практике и получаете опыт коммерческой разработки уже в свое резюме. Скажу вам
        как прошедший это – реально помогло в трудоустройстве!
      </Paragraph>
      <Paragraph>
        Напишу сразу в двух курсах, так как проходил оба. Java будет многим непросвещённым
        сложновата в изучении, но здесь перевес из-за лидирующего положения языка как
        самого популярного в программировании. Выбор мой пал на эту профессию еще и потому, что
        Java-разработчики получают самую большую зарплату. Хотя Python начинает догонять Java
        по многим моментам, но вот в крупном екоме разработке Джава все-таки остается
        главенствующей сейчас. Скажу так – полнота программы и интенсивность присуща
        обоим курсам GeekBrains. Хочу отметить, что с первого дня занятий вы приступаете
        к практике и получаете опыт коммерческой разработки уже в свое резюме. Скажу вам
        как прошедший это – реально помогло в трудоустройстве!
      </Paragraph>

      <AdditionalSmallElement size="s">text</AdditionalSmallElement>
      <AdditionalSmallElement size="m" color="red">text</AdditionalSmallElement>
      <AdditionalSmallElement size="m" color="accent">textColor</AdditionalSmallElement>
      <AdditionalSmallElement size="m" color="green">text</AdditionalSmallElement>
      <AdditionalSmallElement size="s" color="ghost">text</AdditionalSmallElement>

      <Rating rating={rating} isEditable setRating={setRating} />

      <Input placeholder='Имя' />

      <Textarea placeholder='Текст отзыва' />
    </>
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
    }
  }
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}