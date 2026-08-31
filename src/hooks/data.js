export const MODULES = [
    // {
    //     id: 1,
    //     title_ru: 'Базовая платформа',
    //     title_en: 'The basic platform',
    //     image: 'web',
    //     image_light: 'base_light',
    //     image_dark: 'base_dark',
    //     about_ru: '',
    //     about_en: ' ',
    // },
    {
        id: 1,
        title_ru: 'Веб-интерфейс',
        title_en: 'Web interface',
        image: 'web',
        image_light: 'web_interfase_light',
        image_dark: 'web_interfase_dark',
        about_ru: 'Современный и интуитивно понятный интерфейс для работы с документами и данными проектов. Модуль обеспечивает удобную навигацию, быстрый поиск и доступ к актуальной информации в любое время. Все изменения отображаются в режиме реального времени, а гибкая система фильтрации и сортировки позволяет мгновенно находить необходимые проекты и документы, а также отслеживать историю и версии файлов. Веб-интерфейс не требует установки дополнительного программного обеспечения и не зависит от клиентского приложения, обеспечивает безопасную работу пользователей в соответствии с назначенными правами доступа и статусами документов.',
        about_en: 'A modern and intuitive interface for working with documents and project data. The module provides convenient navigation, quick search and access to up-to-date information at any time. All changes are displayed in real time, and a flexible filtering and sorting system allows you to instantly find the necessary projects and documents, as well as track the history and versions of files. The web interface does not require the installation of additional software and does not depend on the client application. It ensures the safe operation of users in accordance with the assigned access rights and document statuses.',
        // features_ru: [
        //     "Удобная работа с проектами",
        //     "Гибкие настройки и фильтры",
        //     "Адаптивный дизайн для любых устройств",
        //     "Быстрый доступ к ключевой информации",
        // ],
        // features_en: [
        //     "Convenient work with projects",
        //     "Flexible settings and filters",
        //     "Responsive design for all devices",
        //     "Quick access to key information",
        // ],
    },
    {
        id: 2,
        title_ru: 'ЭЦП',
        title_en: 'The EDS',
        image: 'ecp',
        image_light: 'ecp_light',
        image_dark: 'ecp_dark',
        about_ru: 'Модуль электронной цифровой подписи обеспечивает безопасное подписание документов с использованием усиленной квалифицированной ЭЦП. Реализованы пакетное подписание документов, поддержка прикрепленной и открепленной электронной подписи, а также сохранение подписанных файлов с возможностью гибкой настройки имен и расширений файлов. Модуль также позволяет формировать список подписантов для контроля полноты подписания документов всеми участниками, а также выполнять быстрый поиск и фильтрацию документов по фамилии подписанта.',
        about_en: 'The electronic digital signature module ensures the secure signing of documents using an enhanced qualified EDS. Batch signing of documents, support for attached and unpinned electronic signatures, as well as saving signed files with the ability to flexibly customize file names and extensions are implemented. The module also allows you to create a list of signatories to control the completeness of signing documents by all participants, as well as perform a quick search and filtering of documents by the last name of the signatory.',
    },
    {
        id: 3,
        title_ru: 'Корреспонденция',
        title_en: 'Correspondence',
        image: 'corr',
        image_light: 'corr_light',
        image_dark: 'corr_dark',
        about_ru: 'Модуль корреспонденции обеспечивает централизованную регистрацию, хранение и обработку входящей и исходящей корреспонденции. Благодаря гибкому поиску и мощному механизму фильтрации обеспечивается быстрый доступ к истории переписки и необходимым приложениям. Реализована поддержка резолюций с назначением исполнителей и их автоматическим оповещением, а также генерация писем по заранее подготовленным шаблонам непосредственно из карточки корреспонденции. Модуль позволяет прикреплять приложения к письмам, назначать статусы входящей корреспонденции и контролировать ход исполнения поручений.',
        about_en: 'The correspondence module provides centralized registration, storage and processing of incoming and outgoing correspondence. Thanks to the flexible search and powerful filtering mechanism, quick access to the correspondence history and necessary applications is provided. Support for resolutions with the appointment of performers and their automatic notification has been implemented, as well as the generation of letters using pre-prepared templates directly from the correspondence card. The module allows you to attach attachments to emails, assign incoming correspondence statuses, and monitor the progress of orders.',
    },
    {
        id: 4,
        title_ru: 'Задания и планирование',
        title_en: 'The Tasks and Planning',
        image: 'tasks',
        image_light: 'tasks_light',
        image_dark: 'tasks_dark',
        about_ru: 'Модуль технических условий и согласований обеспечивает централизованное ведение, хранение и контроль технических условий и согласований по объектам. Реализована интеграция реестра технических условий и согласований с модулем состава проекта, назначение и отслеживание статусов согласований, контроль сроков действия технических условий с автоматическими напоминаниями об их истечении, перенос технических условий между проектами, ведение истории согласования документации и назначение ответственных исполнителей на каждом этапе согласования.',
        about_en: 'The technical specifications and Approvals module provides centralized management, storage and control of technical specifications and approvals for facilities. The integration of the register of technical specifications and approvals with the project composition module has been implemented, the assignment and tracking of approval statuses, the monitoring of the validity period of technical specifications with automatic reminders of their expiration, the transfer of technical specifications between projects, the maintenance of the history of documentation approval and the appointment of responsible executors at each stage of approval.',
    },
    {
        id: 5,
        title_ru: 'ТУ и согласования',
        title_en: 'Technical specifications and approvals',
        image: 'tachspec_approvals',
        image_light: 'tachspec_approvals_light',
        image_dark: 'tachspec_approvals_dark',
        about_ru: 'Модуль заданий и планирования обеспечивает создание, редактирование и контроль выполнения задач по проектам. Может использоваться как инструмент календарного планирования для комплексного ГИПа, а также как полноценная система управления задачами с назначением исполнителей, контролем сроков и мониторингом выполнения работ. Встроенная диаграмма Ганта наглядно отображает этапы реализации проекта и взаимосвязи между задачами.',
        about_en: 'The Tasks and Planning module provides the creation, editing, and monitoring of project tasks. It can be used as a calendar planning tool for a comprehensive ISU, as well as as a full-fledged task management system with the appointment of performers, timing control and monitoring of work performance. The built-in Gantt chart clearly shows the stages of project implementation and the relationship between tasks.',
    },
];

export const PROGRAMMS = [
    {
        id: 1,
        title: 'AutoCAD, AutoCAD Civil 3D, Indor Road',
        description_ru: 'Системы автоматизированного проектирования общего и специального назначения',
        description_en: 'Computer-aided design systems for general and special purposes',
        image: 'cads',
    },
    {
        id: 2,
        title: 'Word, Excel, PowerPoint',
        description_ru: 'Инструменты создания, редактирования и просмотра офисных документов',
        description_en: 'Tools for creating, editing, and viewing office documents',
        image: 'ms_office',
    },
    {
        id: 3,
        title: 'GIMP, FastStone Image Viewer, Windows Media Player',
        description_ru: 'Инструменты создания, редактирования и просмотра графических материалов и видео файлов',
        description_en: 'Tools for creating, editing, and viewing graphic materials and video files',
        image: 'draw',
    },
    {
        id: 4,
        title: 'PDF Acrobat Reader DC, PDF-XChange Editor',
        description_ru: 'Инструменты базовой обработки и редактирования PDF-документов',
        description_en: 'Basic PDF document processing and editing tools',
        image: 'pdf',
    },
    // {
    //     id: 5,
    //     description_ru: 'Любые другие форматы',
    //     description_en: 'Any other formats',
    //     image: 'file',
    // },
];
export const TASKS_SERVER = [
    {
        id: 1,
        name_ru: 'хранение проектной информации и документов;',
        name_en: 'storage of project information and documents;',
    },
    {
        id: 2,
        name_ru: 'обработка запросов от прикладных программ;',
        name_en: 'processing requests from application programs;',
    },
    {
        id: 3,
        name_ru: 'обеспечение доступа и разграничение прав пользователей;',
        name_en: 'ensuring access and differentiation of user rights;',
    },
    {
        id: 4,
        name_ru: 'контроль целостности данных;',
        name_en: 'data integrity control;',
    },
    {
        id: 5,
        name_ru: 'выполнение операций чтения и записи;',
        name_en: 'performing read and write operations;',
    },
    {
        id: 6,
        name_ru: 'обеспечение совместной работы пользователей;',
        name_en: 'ensuring user collaboration;',
    },
    {
        id: 7,
        name_ru: 'ведение истории изменений и журналирование операций.',
        name_en: 'maintaining a history of changes and logging operations.',
    },
];

export const NECESSARY = [
    {
        id: 1,
        icon: 'why_rights',
        title_ru: 'Система прав доступа',
        title_en: 'Access rights system',
        description_ru: 'Гибкая настройка прав позволяет разграничивать права доступа в соответствии с обязанностями сотрудников. Пользователи получают доступ только к тем данным и функциям, которые необходимы им для работы, что повышает безопасность информации, снижает риск случайных изменений и гарантирует соблюдение корпоративных требований к безопасности.',
        description_en: 'Flexible rights settings allow you to differentiate access rights in accordance with the responsibilities of employees. Users get access only to the data and functions they need to work with, which increases information security, reduces the risk of accidental changes, and ensures compliance with corporate security requirements.',
    },
    {
        id: 2,
        icon: 'why_saves',
        title_ru: 'Надежное хранение и защита информации',
        title_en: 'Reliable storage and protection of information',
        description_ru: 'DMT Base обеспечивает надежное хранение проектных данных на корпоративном сервере организации с возможностью резервного копирования, быстрого восстановления и масштабирования системы по мере роста объема информации и количества пользователей. Централизованное хранение упрощает администрирование, повышает сохранность информации и обеспечивает стабильную работу системы на всех этапах жизненного цикла проекта.',
        description_en: "DMT Base provides reliable storage of project data on an organization's corporate server with the ability to backup, quickly restore, and scale the system as the volume of information and the number of users grow. Centralized storage simplifies administration, increases information security, and ensures stable system operation at all stages of the project lifecycle.",
    },
    {
        id: 3,
        icon: 'why_risks',
        title_ru: 'Риски при работе с данными при использовании традиционных файловых систем Windows',
        title_en: 'Risks of working with data when using traditional Windows file systems',
        more: [
            {
                id: 1,
                title_ru: 'Хранение и актуальность данных проекта',
                title_en: 'Project data storage and relevance',
                points: [
                    { id: 1,
                        point_ru: 'Разрозненность, недостаточность и неполнота данных проекта.',
                        point_en: 'Fragmentation, insufficiency, and incompleteness of project data.',
                    },
                    { id: 2,
                        point_ru: 'Случайные или преднамеренные потери данных.',
                        point_en: 'Accidental or intentional data loss.',
                    },
                    { id: 3,
                        point_ru: 'Противоречивость данных.',
                        point_en: 'Inconsistency of the data.',
                    },
                    { id: 4,
                        point_ru: 'Несвоевременное внесение изменений в данные проекта.',
                        point_en: 'Late introduction of changes to the project data.',
                    },
                ],
            },
            {
                id: 2,
                title_ru: 'Управление проектной документацией',
                title_en: 'Project documentation management',
                points: [
                    { id: 1,
                        point_ru: 'Сложности при создании и ведении учета истории изменений документов.',
                        point_en: 'Difficulties in creating and keeping records of the history of document changes.',
                    },
                    { id: 2,
                        point_ru: 'Неконтролируемое внесение изменений в проектную документацию.',
                        point_en: 'Uncontrolled modification of project documentation.',
                    },
                    { id: 3,
                        point_ru: 'Невозможность быстрого доступа к нужной информации.',
                        point_en: 'Inability to quickly access the necessary information.',
                    },
                ],
            },
            {
                id: 3,
                title_ru: 'Совместная работа участников проекта и ее организация',
                title_en: 'The joint work of the project participants and its organization',
                points: [
                    { id: 1,
                        point_ru: 'Трудности при обработке информации, полученной от контрагентов.',
                        point_en: 'Difficulties in processing information received from counterparties.',
                    },
                    { id: 2,
                        point_ru: 'Размывание ответственности при внесении изменений в проектную документацию и связанные с ней данные.',
                        point_en: 'Blurring of responsibility when making changes to project documentation and related data.',
                    },
                    { id: 3,
                        point_ru: 'Зависимость компании от ключевых сотрудников, которые аккумулируют информацию.',
                        point_en: "The company's dependence on key employees who accumulate information.",
                    },
                ],
            },
            {
                id: 4,
                title_ru: 'Безопасность и контроль доступа',
                title_en: 'Security and access control',
                points: [
                    { id: 1,
                        point_ru: 'Доступ к данным и возможность внесения изменений сотрудниками без соответствующих полномочий.',
                        point_en: 'Access to data and the possibility of making changes by employees without appropriate authority.',
                    },
                ],
            },
        ]
        // points: [
            // { id: 1, 
            //     point_ru: 'Разрозненность, недостаточность и неполнота данных проекта', 
            //     point_en: 'Fragmentation, insufficiency and incompleteness of project data' 
            // },
            // { id: 2, 
            //     point_ru: 'Случайные или преднамеренные потери данных', 
            //     point_en: 'Accidental or intentional data loss' 
            // },
            // { id: 3, 
            //     point_ru: 'Противоречивость данных', 
            //     point_en: 'Inconsistency of data' 
            // },
            // { id: 4, 
            //     point_ru: 'Сложности при создании и ведении учета истории изменений документов', 
            //     point_en: 'Difficulties in creating and keeping records of the history of document changes' 
            // },
            // { id: 5, 
            //     point_ru: 'Несвоевременное внесение изменений в данные проекта', 
            //     point_en: 'Late introduction of changes to project data' 
            // },
            // { id: 6, 
            //     point_ru: 'Неконтролируемое внесение изменений в проектную документацию', 
            //     point_en: 'Uncontrolled modification of project documentation' 
            // },
            // { id: 7, 
            //     point_ru: 'Невозможность быстрого доступа к нужной информации', 
            //     point_en: 'Inability to quickly access the necessary information' 
            // },
            // { id: 8, 
            //     point_ru: 'Трудности при обработке информации, полученной от контрагентов', 
            //     point_en: 'Difficulties in processing information received from counterparties' 
            // },
            // { id: 9, 
            //     point_ru: 'Размывание ответственности при внесении изменений в проектную документацию и связанные с ней данные', 
            //     point_en: 'Blurring of responsibility when making changes to project documentation and related data' 
            // },
            // { id: 10, 
            //     point_ru: 'Зависимость компании от ключевых сотрудников, которые аккумулируют информацию', 
            //     point_en: "The company's dependence on key employees who accumulate information" 
            // },
            // { id: 11, 
            //     point_ru: 'Доступ к данным и возможность внесения изменений сотрудниками без соответствующих полномочий', 
            //     point_en: 'Access to data and the possibility of making changes by employees without appropriate authority' 
            // },
        // ]
    },
];

export const NEWS = [
    {
        id: 4,
        image: 'Новость от 15.06.2026.png',
        time_ru: '15.06.2026',
        time_en: '15/06/2026',
        title: 'Состав проекта',
        articles: [
            { id: 1, 
                article: 'В настройках состава проекта теперь можно настраивать следующие поля: шифр (первая часть заполняется автоматически), разработал, проверил, норм. контроль. Настройки полей автоматически сохраняются. Поле ГИП, как и прежде автоматически заполняется из карточки проекта. Все это упрощает процедуру генерации состава проекта в текстовый редактор.',
            },
            { id: 2, 
                article: 'В основном окне состава добавлены активные столбцы–ссылки на тома в формате PDF (Заказчик и Экспертиза). Документ привязывается к составу вручную, а вся дальнейшая история и новые версии привязываются автоматически.',
            },
        ],
    },
    {
        id: 3,
        image: 'ecp_light.png',
        time_ru: '17.05.2026',
        time_en: '17/05/2026',
        title: 'Модуль ЭЦП',
        articles: [
            { id: 1,
                article: 'Добавлена возможность подписания пакета документов электронной подписью. Расширена отображаемая информация подписываемых томов (шифр, назв низ/верх). Добавлена цветовая индикация статуса подписания тома и список подписантов.',
            },
        ],
    },
    {
        id: 2,
        image: 'web_interfase_light.png',
        time_ru: '15.05.2026',
        time_en: '15/05/2026',
        title: 'Веб-интерфейс',
        articles: [
            { id: 1,
                article: 'https://base.dmtsoft.com/',
            },
            { id: 2,
                article: 'Теперь у нас появился свой веб-интерфейс и для его работы нужен только интернет-браузер установленный на компьютер, телефон или планшет.',
            },
        ],
    },
    {
        id: 1,
        image: 'Новость от 11.02.2026.png',
        time_ru: '11.02.2026',
        time_en: '11/02/2026',
        title: 'Веб-интерфейс',
        articles: [
            { id: 1,
                article: 'Идут работы над веб-интерфейсом. Функционал будет доступен сотрудникам Департамента управления проектами и Заказчикам.',
            },
        ],
    },
    
];

export const CLIENTS = [
    {
        id: 1,
        title: 'DMT',
        image: 'DMT.png',
    },
    {
        id: 2,
        title: 'MP-3',
        image: 'MP-3.png',
    },
    {
        id: 3,
        title: 'Promos',
        image: 'Promos.png',
    },
];

export const TRUSTS = [
    {
        id: 1,
        count: '20+',
        title_ru: 'лет безотказной работы',
        title_en: 'years of trouble-free operation',
    },
    {
        id: 2,
        count: '6',
        title_ru: 'компаний',
        title_en: 'companies',
    },
    {
        id: 3,
        count: '500+',
        title_ru: 'пользователей в одной организации',
        title_en: 'users in the same organization',
    },
    {
        id: 4,
        count: '0',
        title_ru: 'случаев потери данных',
        title_en: 'cases of data loss',
    },
];

export const WHIESDMTBASE = [
    {
        id: 1,
        image: 'engineer.png',
        text_ru: 'Создана инженерами для инженеров',
        text_en: 'Created by engineers for engineers',
    },
    {
        id: 2,
        image: 'time.png',
        text_ru: 'Проверена в реальной проектной работе на длинных дистанциях',
        text_en: 'Verified in real project work over long distances.',
    },
    {
        id: 3,
        image: 'platform.png',
        text_ru: 'Всё необходимое — уже внутри базовой платформы',
        text_en: 'Everything you need is already inside the base platform.',
    },
    {
        id: 4,
        image: 'users.png',
        text_ru: 'Развивается вместе с пользователями',
        text_en: 'Develops together with users',
    },
    {
        id: 5,
        image: 'reliability.png',
        text_ru: 'Надёжность, проверенная временем',
        text_en: 'Time-tested reliability',
    },
];


export const PRIVATE_POLICY = [
    {
        id: 1,
        number_point: '1',
        title: 'Общие положения',
        points: [
            {
                id: 1,
                number_point: '1.1',
                text: 'Настоящая Политика конфиденциальности определяет порядок обработки персональных данных пользователей при использовании сервиса, закрепляет принципы обеспечения конфиденциальности и безопасности информации, а также разъясняет права и обязанности сторон. Действие документа распространяется на все процессы сбора, хранения, использования и передачи персональных данных, осуществляемые оператором в рамках функционирования платформы, включая взаимодействие через веб‑интерфейс и сопутствующие сервисы.',
            },
            {
                id: 2,
                number_point: '1.2',
                text: 'В тексте Политики термины применяются в значениях, установленных действующим законодательством о персональных данных, с учётом специфики деятельности оператора. Под персональными данными понимается любая информация, прямо или косвенно позволяющая идентифицировать физическое лицо. Оператором выступает организация, управляющая сервисом и определяющая цели и способы обработки данных; субъектом персональных данных — пользователь, предоставляющий сведения при регистрации или использовании функционала платформы. Конфиденциальность данных обеспечивается путём соблюдения установленных правовых, организационных и технических мер, исключающих неправомерный доступ, распространение или утрату информации.',
            }
        ],
    },
    {
        id: 2,
        number_point: '2',
        title: 'Сбор и обработка персональных данных',
        points: [
            {
                id: 1,
                number_point: '2.1',
                text: 'В рамках использования сервиса мы можем запрашивать и обрабатывать имя и фамилию пользователя для персонализации интерфейса и корректного обращения в коммуникациях, а также адрес электронной почты и номер телефона, необходимые для авторизации, восстановления доступа и отправки уведомлений. Кроме того, в автоматическом режиме фиксируются данные об устройстве и браузере, включая тип устройства, операционную систему, версию браузера и IP‑адрес, что требуется для обеспечения безопасности, анализа трафика и оптимизации работы сервиса.',
            },
            {
                id: 2,
                number_point: '2.2',
                text: 'Обработка персональных данных осуществляется исключительно для предоставления функционала сервиса и исполнения пользовательского соглашения, обеспечения безопасности учётной записи и предотвращения мошеннических действий, оказания технической поддержки и поддержания коммуникации с пользователем по вопросам работы платформы, а также для аналитики и улучшения качества работы сервиса на основе обезличенных данных. Правовым основанием обработки выступает согласие пользователя, выраженное при регистрации, наряду с необходимостью исполнения договора и соблюдения требований действующего законодательства.',
            }
        ],
    },
    {
        id: 3,
        number_point: '3',
        title: 'Защита и хранение данных',
        points: [
            {
                id: 1,
                number_point: '3.1',
                text: 'Для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения применяется комплекс технических и организационных мер, включающий шифрование данных при передаче по сети с использованием протокола HTTPS, строгое разграничение прав доступа к базам данных, при котором доступ предоставляется исключительно уполномоченным сотрудникам, а также регулярное резервное копирование информации и непрерывный мониторинг инцидентов информационной безопасности.',
            },
            {
                id: 2,
                number_point: '3.2',
                text: 'Персональные данные хранятся в течение периода, необходимого для достижения целей их обработки, либо в пределах сроков, предусмотренных законодательством. По запросу пользователя предоставляется возможность скачать копию своих данных либо удалить учётную запись вместе со всеми связанными сведениями. После удаления аккаунта персональные данные подлежат анонимизации или уничтожению в разумные сроки с учётом необходимости сохранения отчётности и возможности разрешения потенциальных споров.',
            }
        ],
    },
];

export const USER_AGREEMENT = [
    {
        id: 1,
        number_point: '1',
        title: 'Общие положения',
        points: [
            {
                id: 1,
                number_point: '1.1',
                text: 'Настоящее Соглашение — это публичная оферта ООО «ДМТ Софт» (далее — «Компания» в адрес любого дееспособного лица (далее — «Пользователь»). Акцептом оферты считается использование сайта по адресу https://dmt_soft или регистрация на нём.',
            },
            {
                id: 2,
                number_point: '1.2',
                text: 'Соглашение определяет правила использование сайта «ДМТ Софт», включая сервисы, инструменты и любой контент, размещенный на сайте.',
            },
            {
                id: 3,
                number_point: '1.3',
                text: 'Компания вправе в любое время изменять условия Соглашения. Новая редакция публикуется на странице https://dmt_soft/#/user_agreement/. Продолжение использование сайта после публикации изменений означает согласие Пользователя с ними.',
            },
        ],
    },
    {
        id: 2,
        number_point: '2',
        title: 'Термины и определения',
        points: [
            {
                id: 1,
                number_point: '2.1',
                text: 'В соглашении используются следующие термины:',
                inpoints: [
                    {
                        id: 1,
                        number_point: '2.1.1',
                        text: 'Сайт — интернет-ресурс «ДМТ Софт» по адресу https://dmt_soft, включая его страницы, разделы, скрипты и базы данных.',
                    },
                    {
                        id: 2,
                        number_point: '2.1.2',
                        text: 'Сервис — отдельные функциональные возможности Сайта (калькулятор, конструктор, загрузка файлов, чат и т. п.).',
                    },
                    {
                        id: 3,
                        number_point: '2.1.3',
                        text: 'Учетная запись (аккаунт) — профиль Пользователь, создаваемый при регистрации и позволяющий сохранять персональные настройки, историю действий и загружать данные.',
                    },
                    {
                        id: 4,
                        number_point: '2.1.4',
                        text: 'Авторизация — вход в учетную запись с использованием логина и пароля.',
                    },
                    {
                        id: 5,
                        number_point: '2.1.5',
                        text: 'Персональные данные - любая информация, относящаяся к Пользователю и собираемая Сайтом (e-mail, телефон, файлы загрузки) в соответствии с Политикой конфиденциальности.',
                    },
                    {
                        id: 6,
                        number_point: '2.1.6',
                        text: 'Контент Компании — все материалы, созданные и размещенные на Сайте Компанией (тексты, дизайн, логотипы, программный код, шаблоны).',
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        number_point: '3',
        title: 'Регистрация и использование учетной записи',
        points: [
            {
                id: 1,
                number_point: '3.1',
                text: 'Регистрация на Сайте не является обязательной для базового просмотра контента. Для доступа к расширенным функциям (сохранение проекта, загрузка файлов, аналитика) регистрация необходима.'
            },
            {
                id: 2,
                number_point: '3.2',
                text: 'При регистрации Пользователь предоставляет достоверные данные и соглашается с тем, что Компания может запросить подтверждение этих данных (например, через e-mail или SMS).',
            },
            {
                id: 3,
                number_point: '3.3',
                text: 'Пользователь обязан хранить свои данные для входа (логин и пароль) в тайне и не передавать их третьим лицам.',
            },
            {
                id: 4,
                number_point: '3.4',
                text: 'Компания не несет ответственности за ущерб, возникший из-за несанкционированного доступа к учетной записи, если такой доступ стал возможен по вине Пользователя (утеря пароля, передача данных третьим лицам).',
            },
            {
                id: 5,
                number_point: '3.5',
                text: 'Компания вправе приостановить или удалить учетную запись Пользователя в случае нарушения условий Соглашения или по техническим причинам, уведомив Пользователя по e-mail.',
            },
        ],
    },
    {
        id: 4,
        number_point: '4',
        title: 'Права на контент и интеллектуальную собственность',
        points: [
            {
                id: 1,
                number_point: '4.1',
                text: 'Все исключительные права на Сайт, его дизайн, программный код и Контент Компании принадлежат Компании. Использование этих объектов без письменного согласия Компании запрещено.',
            },
            {
                id: 2,
                number_point: '4.2',
                text: 'Пользователь, размещая Пользовательский контент, предоставляет Компании безвозмездную, бессрочную, неисключительную лицензию на использование, копирование, хранение, изменение и демонстрацию этого контента на Сайте и в маркетинговых материалах Компании.',
            },
            {
                id: 3,
                number_point: '4.3',
                text: 'Пользователь гарантирует, что размещаемый им контент не нарушает права третьих лиц (авторские права, товарные знаки, коммерческую тайну) и не содержит запрещенной информации.',
            },
            {
                id: 4,
                number_point: '4.4',
                text: 'Компания не проверяет весь Пользовательский контент перед публикацией, но оставляет за собой право удалять любой контент, который, по ее мнению, нарушает Соглашение или законодательство.',
            },
        ],
    },
    {
        id: 5,
        number_point: '5',
        title: 'Обработка персональных данных',
        points: [
            {
                id: 1,
                number_point: '5.1',
                text: 'Использование Сайта подразумевает согласие Пользователя на обработку его персональных данных в соответствии с Политикой конфиденциальности, размещенной по адресу http://localhost:3000/dmt_soft/#/private_policy.',
            },
            {
                id: 2,
                number_point: '5.2',
                text: 'Компания собирает данные для обеспечения работы Сайта, улучшения сервисов, коммуникации с Пользователем и в целях безопасности.',
            },
            {
                id: 3,
                number_point: '5.3',
                text: 'Компания не передает персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ, или при привлечении подрядчиков для выполнения технических задач (хостинг, аналитика, поддержка), при условии соблюдения ими требований к защите данных.',
            },
        ],
    },
    {
        id: 6,
        number_point: '6',
        title: 'Ограничение ответственности',
        points: [
            {
                id: 1,
                number_point: '6.1',
                text: 'Сайт предоставляется «как есть» («as is»). Компания не гарантирует бесперебойную работу Сайта, отсутствие ошибок или соответствие Сайта конкретным целям Пользователя.',
            },
            {
                id: 2,
                number_point: '6.2',
                text: 'Компания не несет ответственности за:',
                lists: [
                    {
                        id: 1,
                        number_point: '6.2.1',
                        text: 'потерю данных Пользователем (рекомендуется регулярно делать резервные копии);',
                    },
                    {
                        id: 1,
                        number_point: '6.2.2',
                        text: 'сбои в работе Сайта из-за действий третьих лиц, вирусов или проблем с интернет-соединением Пользователя;',
                    },
                    {
                        id: 1,
                        number_point: '6.2.3',
                        text: 'результаты использования инструментов Сайта, если они не соответствуют ожиданиям Пользователя.',
                    },
                ],
            },
            {
                id: 3,
                number_point: '6.3',
                text: 'В максимальной степени, разрешенной законодательством РФ, ответственность Компании перед Пользователем ограничена суммой, фактически уплаченной Пользователем за услуги Компании за последние 30 дней (если услуги были платными).',
            },
        ],
    },
    {
        id: 7,
        number_point: '7',
        title: 'Прочие условия',
        points: [
            {
                id: 1,
                number_point: '7.1',
                text: 'Любое использование Сайта, не предусмотренное настоящим Соглашением, строго запрещено.',
            },
            {
                id: 2,
                number_point: '7.2',
                text: 'Споры, возникающие из Соглашения, подлежат рассмотрению в соответствии с законодательством Российской Федерации.',
            },
            {
                id: 3,
                number_point: '7.3',
                text: 'Если отдельные пункты Соглашения становятся недействительными, остальные пункты сохраняют свою юридическую силу.',
            },
        ],
    },
];