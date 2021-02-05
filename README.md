## Социальная сеть, созданная с использованием React, Redux и TypeScript.

## Backend реализован с помощью express на NodeJs

## Разработка

  -Данные приложение берет с API для курса Путь Самурая(ссылка: https://www.youtube.com/watch?v=gb7gMluAeao&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8&index=1). Запросы на сервер отправляются с использованием Axios и вынесены в отдельные файлы в директории api.

  -Новостная лента составлена на основе данных с API(https://newsapi.org/docs/endpoints/top-headlines).

  -Весь проект разработан с использованием TypeScript.

  -Само приложение разбито на множество JS и JSX файлов, каждый из которых является либо презентационной, либо контейнерной компонентой. Каждая презентационная компонента использует модульные стили, которое хранятся в соответствующих файлах CSS. Также в проекте используются вспомогательные компоненты типа Index(крутилка при загрузке) и Hoc Redirect(перенаправление на форму Login для неавторизованных пользователей).

  -Для работы с формами используется библиотека Redux Form.

  -В компонентах, которые требуют временного хранения данных было принято решение использования хуков UseState и UseEffect, чтобы не перекидывать часто данные в State.

  -В некоторых контейнерных компонентах используется библиотека reselect.

  -Для сохранения данных об активированной/неактивированной темной теме используется localStorage

## Функционал
  -На вкладке Profile отображается изображение пользователя, имя, статус, и дополнительное описание. При двойном клике можно загрузить и обновить свою фотографию. Имя, статус и дополнительная информация тоже редактируются. Ниже находится блок с постами и форма добавление нового поста.

  -На странице Dialogs располагаются диалоги с различными пользователями. Все сообщения хранятся на сервере и подгружаются оттуда.

  -На вкладке Users с использованием пагинатора выводятся пользователи по 10 человек на странице. Здесь можно подписаться/отписаться или отписаться от пользователя.

  -На вкладке Friends с использованием пагинатора выводится список друзей. Можно перейти на страницу друга, удалить из друзей и написать сообщение.

  -На странице News располагаются новости с возможностью перехода на источник. Страница также оснащена пагинатором для просмотра и загрузки новостей порциями.

  -На вкладке Settings находится кнопка переключения на темную тему(браузер будет запоминать активирована или нет темная тема при следующем входе)

  -На странице Login расположена форма для входа с функцией запоминания пользователя и проверки на бота с помощью капчи при более чем 10 неудачных попытках входа

  -В блоке профиль над фотографией находится шапка профиля, цвет которой можно сменить по клику(цвет запоминается в localStorage)

  -Приложение является адаптивным и отзывчивым для разного вида устройств

В будущем планирую дорабатывать приложение: отображать список всех подписчиков и подписок.
Дизайн также требует доработок.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

