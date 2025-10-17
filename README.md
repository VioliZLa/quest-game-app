# ViTa Pathfinder - Градски куестове

Интерактивна уеб игра за откриване на скритите тайни на града чрез загадки и приключения.

## 🎮 Функционалности

- **Soul 90s куест** - Носталгично пътешествие през 90-те години
- **Чалга куест** - Бляскаво приключение в света на поп-фолк културата
- **Цветен куест** - Архитектурно пътешествие през най-красивите сгради
- **Кореняк куест** - Автентични градски тайни и скрити места
- **Романтичен куест** - Любовни истории и романтични локации
- **Отборен куест** - Състезателни битки между отбори

## 🚀 Инсталация

1. Клонирайте репозиторията:
```bash
git clone https://github.com/yourusername/quest-game-app.git
cd quest-game-app
```

2. Инсталирайте зависимостите:
```bash
npm install
```

3. Стартирайте development сървъра:
```bash
npm run dev
```

4. Отворете браузъра на `http://localhost:5173`

## 🛠️ Build за production

```bash
npm run build
```

Файловете ще се генерират в `dist/` папката.

## 📁 Структура на проекта

```
src/
├── components/          # React компоненти
│   ├── SplashScreen.tsx
│   ├── HomeDashboard.tsx
│   ├── QuestDetails.tsx
│   ├── GameScreen.tsx
│   ├── QuestComplete.tsx
│   └── StatsDashboard.tsx
├── data/
│   └── quests.ts        # Данни за куестовете
├── types/
│   └── index.ts         # TypeScript типове
├── context/
│   └── GameContext.tsx  # React Context за състоянието
├── App.tsx              # Главен компонент
├── App.css              # Стилове
└── main.tsx             # Входна точка
```

## 🎨 Технологии

- **React 18** - UI библиотека
- **TypeScript** - Типизиран JavaScript
- **Vite** - Build инструмент
- **Framer Motion** - Анимации
- **Lucide React** - Икони
- **CSS3** - Стилове и анимации

## 📱 Responsive Design

Приложението е оптимизирано за:
- 📱 Мобилни устройства
- 💻 Таблети
- 🖥️ Desktop компютри

## 🎯 Особености

- **Интерактивни загадки** - Всяка локация има уникални загадки
- **Прогресивна система** - Точки, нива и постижения
- **Темизиран дизайн** - Различни стилове за всеки куест
- **Анимации** - Плавни преходи и ефекти
- **Responsive** - Работи на всички устройства

## 🚀 Deployment

Приложението може да се deploy-не на:
- **Vercel** - `vercel --prod`
- **Netlify** - Drag & drop на `dist/` папката
- **GitHub Pages** - Чрез GitHub Actions
- **Всяка друга статична хостинг платформа**

## 📄 Лиценз

MIT License - свободно за използване и модификация.

## 🤝 Принос

1. Fork-нете проекта
2. Създайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit-нете промените (`git commit -m 'Add some AmazingFeature'`)
4. Push-нете към branch-а (`git push origin feature/AmazingFeature`)
5. Отворете Pull Request

## 📞 Контакт

За въпроси и предложения, моля отворете issue в GitHub репозиторията.