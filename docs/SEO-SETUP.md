# SEO, аналитика и вебмастера — Energy Plastic

## Что делает сборка (`npm run build`)

`scripts/postbuild.mjs` после `vite build` создаёт в `dist/`:

| Файл | Назначение |
| --- | --- |
| `index.html`, `about.html`, `technology.html`, … | Отдельный HTML на каждую страницу: свой `<title>`, `description`, `canonical`, Open Graph / Twitter, JSON-LD (Organization, WebSite, WebPage, BreadcrumbList) и `<noscript>`-версия с H1, текстом и меню. |
| `404.html` | Страница «не найдено» с `noindex`, отдаётся с настоящим статусом 404. |
| `sitemap.xml` | Все публичные страницы с `lastmod` = дата сборки. |
| `robots.txt` | `Sitemap:` + `Clean-param` для UTM-меток (Яндекс). |
| `.htaccess` | www → без www, чистые URL `/about` → `about.html`, без слэша в конце, 404, кэширование, gzip, заголовки безопасности. |

Список страниц — один файл `src/config/routes.json` (меню, sitemap и метаданные берут его оттуда).
Тексты `title`/`description` (семантическое ядро, см. `SEO-SEMANTIC-CORE.md`) — ключи `seo.*` в `src/locales/{ru,kk,en}/translation.json`.

## Настройки — `.env.production`

```env
VITE_SITE_URL=https://energy-plastic.kz
VITE_GA_ID=G-XXXXXXXXXX               # Google Analytics 4
VITE_YANDEX_METRIKA_ID=12345678       # Яндекс.Метрика
VITE_GOOGLE_SITE_VERIFICATION=...     # Search Console, метод «HTML-тег», только значение content
VITE_YANDEX_VERIFICATION=...          # Яндекс.Вебмастер, метод «Метатег», только значение content
```

После заполнения: `npm run build` и загрузить содержимое `dist/` (включая скрытый `.htaccess`) в корень сайта в Plesk.

## Порядок подключения

1. **Google Analytics 4** — analytics.google.com → создать ресурс → веб-поток для `https://energy-plastic.kz` → скопировать ID `G-…` в `VITE_GA_ID`.
2. **Яндекс.Метрика** — metrika.yandex.ru → добавить счётчик → номер в `VITE_YANDEX_METRIKA_ID`. Вебвизор и карта кликов включаются кодом автоматически.
3. **Google Search Console** — добавить ресурс «Префикс URL» `https://energy-plastic.kz/` → метод «HTML-тег» → значение `content` в `VITE_GOOGLE_SITE_VERIFICATION` → собрать, загрузить, нажать «Подтвердить» → «Файлы Sitemap» → `sitemap.xml`.
4. **Яндекс.Вебмастер** — добавить сайт → «Метатег» → значение в `VITE_YANDEX_VERIFICATION` → собрать, загрузить, подтвердить → «Индексирование → Файлы Sitemap» → `https://energy-plastic.kz/sitemap.xml`.

Переходы внутри SPA отправляются в обе системы как просмотры страниц (`src/components/Analytics/Analytics.tsx`).

## SSL

Сертификат Sectigo DV на `energy-plastic.kz` и `www.energy-plastic.kz` установлен в Plesk (действует до 19.05.2027), HTTP → HTTPS — 301.
Перед окончанием срока проверьте автопродление в Plesk → «SSL/TLS-сертификаты».
