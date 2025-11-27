  document.addEventListener('DOMContentLoaded', function() {
            // Page Loading
            window.addEventListener('load', function() {
              setTimeout(function() {
                const loader = document.querySelector('.page-loader');
                if (loader) {
                  loader.style.opacity = '0';
                  setTimeout(() => {
                    loader.style.display = 'none';
                  }, 500);
                }
              }, 1500);
            });
            
            // Scroll to Top Button
            const scrollToTopBtn = document.getElementById('scrollToTop');
            const scrollProgressCircle = scrollToTopBtn?.querySelector('.scroll-progress circle');
            
            function updateScrollButton() {
              if (!scrollToTopBtn) return;
              
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const docHeight = document.documentElement.scrollHeight - window.innerHeight;
              const scrollPercent = (scrollTop / docHeight) * 100;
              
              if (scrollTop > 300) {
                scrollToTopBtn.classList.add('visible');
              } else {
                scrollToTopBtn.classList.remove('visible');
              }
              
              if (scrollProgressCircle) {
                const circumference = 2 * Math.PI * 30; // radius = 30
                const offset = circumference - (scrollPercent / 100) * circumference;
                scrollProgressCircle.style.strokeDashoffset = offset;
              }
            }
            
            window.addEventListener('scroll', updateScrollButton);
            updateScrollButton();
            
            if (scrollToTopBtn) {
              scrollToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              });
            }

            // Smooth Page Transitions
            const pageLinks = document.querySelectorAll('a[href$=".html"]:not([href^="http"]):not([target="_blank"])');
            
            pageLinks.forEach(link => {
              link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // تجاهل الروابط الخارجية والمراسي والروابط الخاصة
                if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
                  return;
                }
                
                e.preventDefault();
                
                // إظهار اللودر
                const loader = document.querySelector('.page-loader');
                if (loader) {
                  loader.classList.remove('hidden');
                }
                
                // الانتقال بعد التأثير
                setTimeout(function() {
                  window.location.href = href;
                }, 500);
              });
            });
            
            // Initialize Swiper (card-style)
            const swiper = new Swiper('.swiper', {
                loop: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 24,
                autoplay: {
                    delay: 5500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                effect: 'slide',
                speed: 700,
                breakpoints: {
                    0: { slidesPerView: 1, spaceBetween: 12 },
                    576: { slidesPerView: 1, spaceBetween: 16 },
                    768: { slidesPerView: 1.05, spaceBetween: 18 },
                    992: { slidesPerView: 'auto', spaceBetween: 24 }
                },
                on: {
                    init: function() {
                        // add active content class to current slide
                        animateSlideContent(this.slides[this.activeIndex]);
                        // slight entrance animation
                        this.slides.forEach(s => s.style.opacity = 0);
                        setTimeout(() => {
                            this.slides.forEach(s => s.style.transition = 'opacity 0.6s ease, transform 0.45s ease');
                            this.slides.forEach(s => s.style.opacity = 1);
                        }, 50);
                    },
                    slideChange: function() {
                        // remove active from all slide contents
                        this.slides.forEach(slide => {
                            const content = slide.querySelector('.slide-content');
                            if (content) content.classList.remove('active');
                        });
                        // add active to current slide content
                        setTimeout(() => {
                            animateSlideContent(this.slides[this.activeIndex]);
                        }, 120);
                    }
                }
            });

            // Animate slide content
            function animateSlideContent(slide) {
                const content = slide.querySelector('.slide-content');
                if (content) {
                    content.classList.add('active');
                }
            }
            
            // Navbar scroll effect
            const navbar = document.querySelector('.main-navbar');
            if (navbar) {
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                });
            }
            
            // Translations
            const translations = {
                ar: {
                    'nav.home': 'الرئيسية',
                    'nav.about': 'من نحن',
                    'nav.privacy': 'سياسة الخصوصية',
                    'nav.refund': 'سياسة الاسترجاع والاسترداد',
                    'nav.terms': 'الشروط والأحكام',
                    'nav.contact': 'تواصل معنا',
                    'hero.tag': 'أكاديمية تحفيظ قرآنية معاصرة',
                    'hero.title': 'أكاديمية الف لام ميم',
                    'hero.desc': 'أكاديمية دينية عربية رقمية تساعدك على حفظ القرآن بإتقان، ضبط مخارج الحروف، ومتابعة أذكارك وبرامجك الإيمانية بشكل ذكي. مدرّسون معتمدون، غرف تفاعلية، وخطط مخصّصة تناسب جميع المستويات مع تقارير تقدم آنية.',
                    'hero.highlight1': 'حلقات تحفيظ مباشرة مع شيخ/ة معتمدين',
                    'hero.highlight2': 'تقييم تجويد فوري وتقارير تفصيلية لكل طالب',
                    'hero.highlight3': 'خطط حفظ ومراجعة مرنة + متابعة ولي الأمر',
                    'hero.apple.small': 'متاح الآن على',
                    'hero.apple.title': 'App Store',
                    'hero.google.small': 'حمل التطبيق من',
                    'hero.google.title': 'Google Play',
                    'hero.contact': 'تواصل مباشر على الواتساب',
                    'hero.meta1.value': '٤٫٩/٥',
                    'hero.meta1.label': 'تقييم المستخدمين',
                    'hero.meta2.value': '+١٥ ألف',
                    'hero.meta2.label': 'ورد منجز أسبوعياً',
                    'hero.meta3.value': '٢٤/٧',
                    'hero.meta3.label': 'مرافقة روحية',
                    'screen.title': 'ورد اليوم',
                    'screen.date': 'الخميس ١٥ رمضان',
                    'screen.item1.label': 'تلاوة القرآن',
                    'screen.item1.value': '٥ صفحات',
                    'screen.item2.label': 'أذكار الصباح',
                    'screen.item2.value': 'تمت',
                    'screen.item3.label': 'ورد التسبيح',
                    'screen.item3.value': '٣٣ × ٣',
                    'screen.cta.label': 'موعد الصلاة القادمة',
                    'screen.cta.value': 'المغرب - ٦:١٥ م',
                    'card.dhikr.label': 'المستوى الأسبوعي',
                    'card.dhikr.value': '٨٧٪ التزام',
                    'card.dhikr.desc': 'إستمر، بقي ٢ أهداف للإنجاز الكامل',
                    'card.prayer.label': 'تنبيه قيام الليل',
                    'card.prayer.sub': '١٠ دقائق قبل الأذان',
                    'features.tagline': 'اكتشف أدوات الأكاديمية',
                    'features.title': 'مميزات التطبيق',
                    'features.desc': 'منصة ذكية تربط بين الحفظ، الاختبارات، والاستماع لنخبة القراء لتعيش تجربة قرآنية متكاملة أينما كنت.',
                    'features.cards.quiz.tag': 'اختبر مستواك',
                    'features.cards.quiz.title': 'كويز تفاعلي فوري',
                    'features.cards.quiz.desc': 'قِّيم حفظك مباشرة بعد كل درس مع تغذية راجعة لحظية.',
                    'features.cards.quiz.point1': 'بنك أسئلة شامل للمستويات المختلفة',
                    'features.cards.quiz.point2': 'نتائج فورية مع نقاط تحفيزية',
                    'features.cards.quiz.point3': 'تقارير للأب أو المشرف',
                    'features.cards.quiz.cta': 'جرّب اختبار سريع',
                    'features.cards.courses.tag': 'خطة حفظ',
                    'features.cards.courses.title': 'كورسات تحفيظ متدرجة',
                    'features.cards.courses.desc': 'خطط مرنة من ٣ إلى ٦ أشهر بإشراف معلمي تجويد معتمدين.',
                    'features.cards.courses.point1': 'جدول حفظ ومراجعة محوسب',
                    'features.cards.courses.point2': 'غرف بث مباشر مع تسجيل',
                    'features.cards.courses.point3': 'دعم فردي حسب احتياجك',
                    'features.cards.courses.cta': 'احجز مسارك التعليمي',
                    'features.cards.audio.tag': 'استمع بخشوع',
                    'features.cards.audio.title': 'سماع قرآني عالي الجودة',
                    'features.cards.audio.desc': 'مكتبة صوتية بأصوات كبار القراء مع إمكانية المتابعة مع المصحف.',
                    'features.cards.audio.point1': 'أوضاع تركيز وخلفيات هادئة',
                    'features.cards.audio.point2': 'تحميل للاستماع دون إنترنت',
                    'features.cards.audio.point3': 'تتبع موضعك بالمصحف تلقائياً',
                    'features.cards.audio.cta': 'افتح مكتبة التلاوات',
                    'features.cta': 'ابدأ تجربتك المجانية اليوم',
                    'about.tag': 'عن الأكاديمية',
                    'about.title': 'منصة تحفيظ رقمية بروح الحلقة التقليدية',
                    'about.desc': 'نبني تجربة حفظ وتجويد متكاملة تمزج بين المعلم المعتمد، التقييم الذكي، والتشجيع المستمر. كل ذلك داخل تطبيق واحد يرافقك أينما كنت.',
                    'about.points.1': 'مناهج مجازة وتخصيص كامل لمسارك',
                    'about.points.2': 'تقارير فورية وذكاء اصطناعي ينبهك بنبض روحاني',
                    'about.points.3': 'مجتمع محفّز وتحديات أسبوعية لبناء عادة ثابتة',
                    'about.metrics.1.value': '40K+',
                    'about.metrics.1.label': 'جلسة تحفيظ مباشرة',
                    'about.metrics.2.value': '92%',
                    'about.metrics.2.label': 'نسبة التزام أسبوعية',
                    'about.metrics.3.value': '4 قارات',
                    'about.metrics.3.label': 'مجتمعات نخدمها',
                    'about.logo.caption': 'شعارنا، حروف ذهبية تحمل نور الفاتحة',
                    'about.device.card.title': 'جلسة اليوم',
                    'about.device.card.item1': 'جزء عمّ',
                    'about.device.card.item2': 'تجويد',
                    'about.device.card.cta': 'ابدأ التلاوة',
                    'about.ribbon.title': 'مرافقة 24/7',
                    'about.ribbon.desc': 'تنبيهات الذكر، جلسات جماعية، وتقييم حي',
                    'loader.title': 'أكاديمية الف لام ميم',
                    'loader.subtitle': 'منصة تحفيظ قرآنية معاصرة',
                    'footer.brand.title': 'أكاديمية الف لام ميم',
                    'footer.brand.desc': 'منصة تحفيظ قرآنية رقمية تجمع بين التقاليد الأصيلة والتكنولوجيا الحديثة لمساعدتك على حفظ القرآن بإتقان.',
                    'footer.social.facebook': 'فيسبوك',
                    'footer.social.twitter': 'تويتر',
                    'footer.social.instagram': 'إنستغرام',
                    'footer.social.whatsapp': 'واتساب',
                    'footer.social.youtube': 'يوتيوب',
                    'footer.links.title': 'روابط سريعة',
                    'footer.links.home': 'الرئيسية',
                    'footer.links.about': 'من نحن',
                    'footer.links.features': 'المميزات',
                    'footer.links.courses': 'الكورسات',
                    'footer.links.contact': 'تواصل معنا',
                    'footer.legal.title': 'معلومات قانونية',
                    'footer.legal.privacy': 'سياسة الخصوصية',
                    'footer.legal.terms': 'الشروط والأحكام',
                    'footer.legal.refund': 'سياسة الاسترجاع',
                    'footer.legal.cookies': 'سياسة الكوكيز',
                    'footer.download.title': 'حمل التطبيق',
                    'footer.download.desc': 'احصل على تجربة كاملة على هاتفك المحمول',
                    'footer.download.apple.small': 'متاح على',
                    'footer.download.google.small': 'حمل من',
                    'footer.copyright': '© 2024 أكاديمية الف لام ميم. جميع الحقوق محفوظة.',
                    'footer.made': 'صُنع بـ ❤️ من أجل خدمة القرآن الكريم',
                    'downloadNow.tag': 'حمل التطبيق الآن',
                    'downloadNow.title': 'كل أدوات التحفيظ في جيبك خلال ثوانٍ',
                    'downloadNow.desc': 'لوحة تحكم لحظية، تنبيهات أذكار ذكية، ونظام تحديات بصري يتفاعل مع تقدمك\nويمنحك دفعة حماسية كلما أنهيت وردك اليومي.',
                    'downloadNow.stats.1.value': '+١٥٬٠٠٠',
                    'downloadNow.stats.1.label': 'تحميل نشط خلال آخر ٣٠ يوم',
                    'downloadNow.stats.2.value': '٩٢٪',
                    'downloadNow.stats.2.label': 'نسبة الالتزام الأسبوعي',
                    'downloadNow.stats.3.value': '٤٫٩/٥',
                    'downloadNow.stats.3.label': 'متوسط تقييم المستخدمين',
                    'downloadNow.apple.aria': 'حمل من App Store',
                    'downloadNow.apple.small': 'متاح الآن على',
                    'downloadNow.google.aria': 'حمل من Google Play',
                    'downloadNow.google.small': 'حمل التطبيق من',
                    'downloadNow.device.title': 'جدول حفظك اليوم',
                    'downloadNow.device.item1.title': 'ورد الفجر',
                    'downloadNow.device.item1.desc': '٥ صفحات من سورة يس',
                    'downloadNow.device.item2.title': 'تحدي الأذكار',
                    'downloadNow.device.item2.desc': '٣٠ ذكر متتالي',
                    'downloadNow.device.item2.status': 'مكتمل',
                    'downloadNow.device.item3.title': 'جلسة المراجعة',
                    'downloadNow.device.item3.desc': 'يبقى ١٠ دقائق',
                    'downloadNow.device.cta': 'ابدأ الحفظ المتحرك',
                    'privacy.hero.title': 'سياسة الخصوصية',
                    'privacy.hero.desc': 'نحن في أكاديمية الف لام ميم ملتزمون بحماية خصوصيتك وأمان بياناتك. هذه السياسة توضح كيفية جمع واستخدام وحماية معلوماتك الشخصية.',
                    'privacy.intro.title': 'مقدمة',
                    'privacy.intro.p1': 'نرحب بك في أكاديمية الف لام ميم. نحن ندرك أهمية خصوصيتك ونلتزم بحماية معلوماتك الشخصية. تشرح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدام تطبيقنا وخدماتنا.',
                    'privacy.intro.p2': 'باستخدامك لتطبيقنا وخدماتنا، فإنك توافق على ممارسات جمع واستخدام المعلومات الموضحة في هذه السياسة. إذا كنت لا توافق على هذه السياسة، يرجى عدم استخدام خدماتنا.',
                    'privacy.collect.title': 'المعلومات التي نجمعها',
                    'privacy.collect.desc': 'نجمع أنواعًا مختلفة من المعلومات لتوفير وتحسين خدماتنا:',
                    'privacy.collect.personal': 'المعلومات الشخصية:',
                    'privacy.collect.personal.desc': 'الاسم، البريد الإلكتروني، رقم الهاتف، تاريخ الميلاد، ومعلومات أخرى تقدمها عند التسجيل.',
                    'privacy.collect.account': 'معلومات الحساب:',
                    'privacy.collect.account.desc': 'اسم المستخدم، كلمة المرور (مشفرة)، وتفضيلات الحساب.',
                    'privacy.collect.progress': 'معلومات التقدم:',
                    'privacy.collect.progress.desc': 'سجلات الحفظ، نتائج الاختبارات، ومستوى التقدم في الكورسات.',
                    'privacy.collect.device': 'معلومات الجهاز:',
                    'privacy.collect.device.desc': 'نوع الجهاز، نظام التشغيل، معرف الجهاز الفريد، وعنوان IP.',
                    'privacy.collect.usage': 'معلومات الاستخدام:',
                    'privacy.collect.usage.desc': 'كيفية استخدامك للتطبيق، الميزات التي تستخدمها، ومدة الجلسات.',
                    'privacy.use.title': 'كيف نستخدم المعلومات',
                    'privacy.use.desc': 'نستخدم المعلومات التي نجمعها للأغراض التالية:',
                    'privacy.use.1': 'توفير وصيانة وتحسين خدماتنا التعليمية',
                    'privacy.use.2': 'إنشاء وإدارة حسابك الشخصي',
                    'privacy.use.3': 'تتبع تقدمك في الحفظ والمراجعة',
                    'privacy.use.4': 'إرسال إشعارات مهمة حول حسابك وخدماتنا',
                    'privacy.use.5': 'تقديم الدعم الفني والرد على استفساراتك',
                    'privacy.use.6': 'تحليل استخدام التطبيق لتحسين تجربة المستخدم',
                    'privacy.use.7': 'ضمان الأمان ومنع الاحتيال',
                    'privacy.use.8': 'الامتثال للالتزامات القانونية',
                    'privacy.use.note.title': 'ملاحظة مهمة:',
                    'privacy.use.note.desc': 'نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة. نستخدم معلوماتك فقط لتحسين تجربتك التعليمية وتقديم أفضل خدمة ممكنة.',
                    'privacy.security.title': 'أمان البيانات',
                    'privacy.security.desc': 'نحن نأخذ أمان بياناتك على محمل الجد ونستخدم تدابير أمنية متقدمة لحماية معلوماتك:',
                    'privacy.security.encryption': 'التشفير:',
                    'privacy.security.encryption.desc': 'نستخدم تشفير SSL/TLS لحماية البيانات المنقولة',
                    'privacy.security.password': 'حماية كلمات المرور:',
                    'privacy.security.password.desc': 'كلمات المرور مشفرة باستخدام خوارزميات آمنة',
                    'privacy.security.access': 'الوصول المقيد:',
                    'privacy.security.access.desc': 'فقط الموظفون المصرح لهم يمكنهم الوصول إلى معلوماتك الشخصية',
                    'privacy.security.backup': 'النسخ الاحتياطي الآمن:',
                    'privacy.security.backup.desc': 'بياناتك محفوظة بشكل آمن مع نسخ احتياطية منتظمة',
                    'privacy.security.updates': 'التحديثات الأمنية:',
                    'privacy.security.updates.desc': 'نحدث أنظمتنا بانتظام لمواجهة التهديدات الجديدة',
                    'privacy.security.warning': 'على الرغم من جهودنا، لا يمكن ضمان الأمان المطلق 100%. ننصحك بعدم مشاركة معلومات تسجيل الدخول الخاصة بك مع أي شخص.',
                    'privacy.sharing.title': 'مشاركة البيانات',
                    'privacy.sharing.desc': 'نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك في الحالات التالية فقط:',
                    'privacy.sharing.services': 'مقدمي الخدمات:',
                    'privacy.sharing.services.desc': 'مع شركاء موثوقين يساعدوننا في تشغيل خدماتنا (مثل استضافة البيانات، الدفع)',
                    'privacy.sharing.legal': 'الالتزام القانوني:',
                    'privacy.sharing.legal.desc': 'عندما يتطلب القانون ذلك أو لحماية حقوقنا القانونية',
                    'privacy.sharing.consent': 'الموافقة:',
                    'privacy.sharing.consent.desc': 'عندما تمنحنا موافقة صريحة للمشاركة',
                    'privacy.sharing.safety': 'حماية الأمان:',
                    'privacy.sharing.safety.desc': 'لحماية أمان المستخدمين ومنع الاحتيال',
                    'privacy.sharing.note': 'جميع مقدمي الخدمات لدينا ملزمون بمعايير أمنية صارمة ولا يمكنهم استخدام معلوماتك لأغراض أخرى.',
                    'privacy.rights.title': 'حقوقك',
                    'privacy.rights.desc': 'لديك حقوق معينة فيما يتعلق بمعلوماتك الشخصية:',
                    'privacy.rights.access': 'حق الوصول:',
                    'privacy.rights.access.desc': 'يمكنك طلب نسخة من معلوماتك الشخصية',
                    'privacy.rights.correction': 'حق التصحيح:',
                    'privacy.rights.correction.desc': 'يمكنك تحديث أو تصحيح معلوماتك في أي وقت',
                    'privacy.rights.deletion': 'حق الحذف:',
                    'privacy.rights.deletion.desc': 'يمكنك طلب حذف حسابك ومعلوماتك الشخصية',
                    'privacy.rights.objection': 'حق الاعتراض:',
                    'privacy.rights.objection.desc': 'يمكنك الاعتراض على معالجة معلوماتك في حالات معينة',
                    'privacy.rights.portability': 'حق نقل البيانات:',
                    'privacy.rights.portability.desc': 'يمكنك طلب نقل بياناتك إلى خدمة أخرى',
                    'privacy.rights.withdrawal': 'حق سحب الموافقة:',
                    'privacy.rights.withdrawal.desc': 'يمكنك سحب موافقتك في أي وقت',
                    'privacy.rights.contact': 'لممارسة أي من هذه الحقوق، يرجى التواصل معنا عبر البريد الإلكتروني أو من خلال التطبيق.',
                    'privacy.cookies.title': 'ملفات تعريف الارتباط والتتبع',
                    'privacy.cookies.desc': 'نستخدم ملفات تعريف الارتباط والتقنيات المشابهة لتحسين تجربتك:',
                    'privacy.cookies.essential': 'ملفات تعريف الارتباط الضرورية:',
                    'privacy.cookies.essential.desc': 'مطلوبة لعمل التطبيق بشكل صحيح',
                    'privacy.cookies.functional': 'ملفات تعريف الارتباط الوظيفية:',
                    'privacy.cookies.functional.desc': 'تحفظ تفضيلاتك وإعداداتك',
                    'privacy.cookies.analytical': 'ملفات تعريف الارتباط التحليلية:',
                    'privacy.cookies.analytical.desc': 'تساعدنا في فهم كيفية استخدام التطبيق',
                    'privacy.cookies.manage': 'يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات التطبيق أو المتصفح.',
                    'privacy.children.title': 'خصوصية الأطفال',
                    'privacy.children.desc': 'خدماتنا موجهة للأطفال تحت إشراف أولياء الأمور. نحن:',
                    'privacy.children.1': 'نجمع معلومات الأطفال فقط بموافقة ولي الأمر',
                    'privacy.children.2': 'نوفر أدوات للآباء لمراقبة وإدارة حسابات أطفالهم',
                    'privacy.children.3': 'لا نشارك معلومات الأطفال مع أطراف ثالثة دون موافقة ولي الأمر',
                    'privacy.children.4': 'نحافظ على أمان عالي لحسابات الأطفال',
                    'privacy.children.warning': 'إذا كنت ولي أمر وتعتقد أن طفلك قد قدم معلومات شخصية دون موافقتك، يرجى التواصل معنا فورًا.',
                    'privacy.changes.title': 'تغييرات سياسة الخصوصية',
                    'privacy.changes.desc': 'قد نحدث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية من خلال:',
                    'privacy.changes.1': 'إشعار في التطبيق',
                    'privacy.changes.2': 'البريد الإلكتروني',
                    'privacy.changes.3': 'نشر نسخة محدثة على موقعنا',
                    'privacy.changes.note': 'ننصحك بمراجعة هذه السياسة بانتظام للبقاء على اطلاع بآخر التحديثات. استمرار استخدامك للخدمة بعد التغييرات يعني موافقتك على السياسة المحدثة.',
                    'privacy.contact.title': 'هل لديك أسئلة؟',
                    'privacy.contact.desc': 'إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه أو كيفية استخدامنا لمعلوماتك، لا تتردد في التواصل معنا. نحن هنا لمساعدتك.',
                    'privacy.contact.btn': 'تواصل معنا عبر الواتساب',
                    'privacy.updated.title': 'آخر تحديث:',
                    'privacy.updated.date': 'يناير 2025',
                    'privacy.updated.desc': 'هذه السياسة سارية المفعول اعتبارًا من تاريخ آخر تحديث أعلاه.',
                    'refund.hero.title': 'سياسة الاسترجاع والاسترداد',
                    'refund.hero.desc': 'نحن في أكاديمية الف لام ميم ملتزمون بتقديم تجربة تعليمية ممتازة. هذه السياسة توضح شروط وإجراءات الاسترجاع والاسترداد للاشتراكات والخدمات المدفوعة.',
                    'refund.intro.title': 'مقدمة',
                    'refund.intro.p1': 'نحن في أكاديمية الف لام ميم نهدف إلى تقديم أفضل تجربة تعليمية ممكنة. نفهم أن الظروف قد تتغير، ونوفر سياسة استرجاع واضحة وعادلة لجميع المستخدمين.',
                    'refund.intro.p2': 'تطبق هذه السياسة على جميع الاشتراكات والخدمات المدفوعة التي نقدمها. يرجى قراءة هذه السياسة بعناية قبل إجراء أي عملية شراء.',
                    'refund.eligibility.title': 'أهلية الاسترجاع',
                    'refund.eligibility.desc': 'يمكنك طلب استرجاع المبلغ في الحالات التالية:',
                    'refund.eligibility.1': 'إذا قمت بالاشتراك عن طريق الخطأ',
                    'refund.eligibility.2': 'إذا لم تتمكن من الوصول إلى الخدمة بسبب مشكلة تقنية من جانبنا',
                    'refund.eligibility.3': 'إذا تم إلغاء الكورس أو الخدمة من قبلنا',
                    'refund.eligibility.4': 'إذا لم يتم تفعيل اشتراكك خلال 48 ساعة من الدفع',
                    'refund.eligibility.note.title': 'ملاحظة مهمة:',
                    'refund.eligibility.note.desc': 'لا يمكن استرجاع المبلغ إذا تم استخدام أكثر من 30% من محتوى الكورس أو إذا انقضى أكثر من 14 يومًا من تاريخ الشراء.',
                    'refund.process.title': 'إجراءات الاسترجاع',
                    'refund.process.desc': 'لطلب استرجاع المبلغ، يرجى اتباع الخطوات التالية:',
                    'refund.process.1': 'تواصل معنا عبر البريد الإلكتروني أو الواتساب مع رقم الطلب أو رقم المعاملة',
                    'refund.process.2': 'قدم سببًا واضحًا لطلب الاسترجاع',
                    'refund.process.3': 'سنراجع طلبك خلال 3-5 أيام عمل',
                    'refund.process.4': 'في حالة الموافقة، سيتم استرجاع المبلغ خلال 7-14 يوم عمل',
                    'refund.process.note': 'سيتم استرجاع المبلغ إلى نفس طريقة الدفع المستخدمة في الشراء الأصلي.',
                    'refund.timeframe.title': 'الإطار الزمني للاسترجاع',
                    'refund.timeframe.desc': 'الإطار الزمني لمعالجة طلبات الاسترجاع:',
                    'refund.timeframe.review': 'مراجعة الطلب:',
                    'refund.timeframe.review.desc': '3-5 أيام عمل',
                    'refund.timeframe.processing': 'معالجة الاسترجاع:',
                    'refund.timeframe.processing.desc': '7-14 يوم عمل بعد الموافقة',
                    'refund.timeframe.appearance': 'ظهور المبلغ:',
                    'refund.timeframe.appearance.desc': 'قد يستغرق 3-5 أيام إضافية حسب البنك أو طريقة الدفع',
                    'refund.timeframe.note': 'نحاول معالجة جميع الطلبات في أسرع وقت ممكن. قد تستغرق المعالجة وقتًا أطول خلال فترات الذروة أو العطلات.',
                    'refund.nonrefundable.title': 'عناصر غير قابلة للاسترجاع',
                    'refund.nonrefundable.desc': 'لا يمكن استرجاع المبلغ في الحالات التالية:',
                    'refund.nonrefundable.1': 'إذا تم استخدام أكثر من 30% من محتوى الكورس',
                    'refund.nonrefundable.2': 'إذا انقضى أكثر من 14 يومًا من تاريخ الشراء',
                    'refund.nonrefundable.3': 'الاشتراكات الشهرية بعد انتهاء الفترة المدفوعة',
                    'refund.nonrefundable.4': 'الخدمات المقدمة كاملة (مثل الشهادات الصادرة)',
                    'refund.nonrefundable.5': 'الخصومات والعروض الترويجية المنتهية الصلاحية',
                    'refund.partial.title': 'الاسترجاع الجزئي',
                    'refund.partial.desc': 'في بعض الحالات، قد نقدم استرجاعًا جزئيًا:',
                    'refund.partial.1': 'إذا تم استخدام جزء من الكورس (أقل من 30%)، قد نستعيد نسبة من المبلغ',
                    'refund.partial.2': 'إذا كان هناك مشكلة تقنية جزئية، قد نستعيد جزءًا من المبلغ',
                    'refund.partial.3': 'سيتم احتساب المبلغ المسترجع بناءً على نسبة الاستخدام الفعلية',
                    'refund.partial.note': 'سيتم إعلامك بالمبلغ المسترجع قبل معالجة الطلب.',
                    'refund.cancellation.title': 'سياسة الإلغاء',
                    'refund.cancellation.desc': 'يمكنك إلغاء اشتراكك في أي وقت:',
                    'refund.cancellation.1': 'الإلغاء لا يعني استرجاع تلقائي للمبلغ المدفوع',
                    'refund.cancellation.2': 'سيستمر الوصول إلى الخدمة حتى نهاية الفترة المدفوعة',
                    'refund.cancellation.3': 'لن يتم تجديد الاشتراك تلقائيًا بعد الإلغاء',
                    'refund.cancellation.4': 'يمكنك إعادة الاشتراك في أي وقت',
                    'refund.cancellation.note': 'لإلغاء اشتراكك، يرجى التواصل معنا أو استخدام خيار الإلغاء في إعدادات حسابك.',
                    'refund.contact.title': 'هل تحتاج مساعدة؟',
                    'refund.contact.desc': 'إذا كان لديك أي أسئلة حول سياسة الاسترجاع والاسترداد أو تحتاج إلى تقديم طلب استرجاع، لا تتردد في التواصل معنا. فريق الدعم متاح لمساعدتك.',
                    'refund.contact.btn': 'تواصل معنا عبر الواتساب',
                    'refund.updated.title': 'آخر تحديث:',
                    'refund.updated.date': 'يناير 2025',
                    'refund.updated.desc': 'هذه السياسة سارية المفعول اعتبارًا من تاريخ آخر تحديث أعلاه.',
                    'terms.hero.title': 'الشروط والأحكام',
                    'terms.hero.desc': 'مرحبًا بك في أكاديمية الف لام ميم. يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا. باستخدامك لخدماتنا، فإنك توافق على الالتزام بهذه الشروط.',
                    'terms.intro.title': 'مقدمة',
                    'terms.intro.p1': 'هذه الشروط والأحكام ("الشروط") تحكم استخدامك لتطبيق وخدمات أكاديمية الف لام ميم. باستخدامك لخدماتنا، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط.',
                    'terms.intro.p2': 'إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا. نحن نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم إشعارك بأي تغييرات جوهرية.',
                    'terms.acceptance.title': 'قبول الشروط',
                    'terms.acceptance.desc': 'باستخدامك لخدماتنا، فإنك تقر وتوافق على:',
                    'terms.acceptance.1': 'أنك قد قرأت وفهمت هذه الشروط والأحكام',
                    'terms.acceptance.2': 'أنك توافق على الالتزام بجميع الشروط المذكورة',
                    'terms.acceptance.3': 'أنك تتحمل المسؤولية الكاملة عن استخدامك للخدمة',
                    'terms.acceptance.4': 'أنك تلتزم بالقوانين واللوائح المحلية والدولية',
                    'terms.account.title': 'تسجيل الحساب',
                    'terms.account.desc': 'للاستفادة من خدماتنا، قد تحتاج إلى إنشاء حساب:',
                    'terms.account.1': 'يجب أن تكون المعلومات المقدمة دقيقة وكاملة',
                    'terms.account.2': 'أنت مسؤول عن الحفاظ على سرية معلومات تسجيل الدخول',
                    'terms.account.3': 'يجب أن تكون 18 عامًا أو أكثر، أو لديك موافقة ولي الأمر',
                    'terms.account.4': 'أنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك',
                    'terms.account.5': 'يجب إبلاغنا فورًا عن أي استخدام غير مصرح به لحسابك',
                    'terms.use.title': 'استخدام الخدمة',
                    'terms.use.desc': 'يجب استخدام خدماتنا بشكل قانوني ومسؤول:',
                    'terms.use.1': 'لا يجوز استخدام الخدمة لأغراض غير قانونية أو غير أخلاقية',
                    'terms.use.2': 'لا يجوز محاولة الوصول غير المصرح به إلى أنظمتنا',
                    'terms.use.3': 'لا يجوز نسخ أو توزيع المحتوى دون إذن',
                    'terms.use.4': 'يجب احترام حقوق الملكية الفكرية',
                    'terms.use.5': 'لا يجوز استخدام الخدمة لإزعاج أو إيذاء الآخرين',
                    'terms.use.note.title': 'ملاحظة مهمة:',
                    'terms.use.note.desc': 'نحتفظ بالحق في تعليق أو إنهاء حسابك في حالة انتهاك هذه الشروط.',
                    'terms.ip.title': 'الملكية الفكرية',
                    'terms.ip.desc': 'جميع المحتويات والمواد في خدماتنا محمية بحقوق الملكية الفكرية:',
                    'terms.ip.1': 'جميع المحتويات التعليمية مملوكة لأكاديمية الف لام ميم',
                    'terms.ip.2': 'لا يجوز نسخ أو توزيع أو تعديل المحتوى دون إذن كتابي',
                    'terms.ip.3': 'يمكنك استخدام المحتوى للاستخدام الشخصي والتعليمي فقط',
                    'terms.ip.4': 'جميع العلامات التجارية والشعارات محمية',
                    'terms.ip.note': 'أي انتهاك لحقوق الملكية الفكرية قد يؤدي إلى اتخاذ إجراءات قانونية.',
                    'terms.payment.title': 'المدفوعات والاشتراكات',
                    'terms.payment.desc': 'بخصوص المدفوعات والاشتراكات:',
                    'terms.payment.1': 'جميع الأسعار معروضة بالعملة المحلية وقد تتغير',
                    'terms.payment.2': 'الاشتراكات تتجدد تلقائيًا ما لم يتم الإلغاء',
                    'terms.payment.3': 'أنت مسؤول عن جميع الرسوم المرتبطة بحسابك',
                    'terms.payment.4': 'نحتفظ بالحق في تغيير الأسعار مع إشعار مسبق',
                    'terms.payment.5': 'الاسترجاع يخضع لسياسة الاسترجاع والاسترداد',
                    'terms.content.title': 'محتوى المستخدم',
                    'terms.content.desc': 'بخصوص المحتوى الذي تقدمه:',
                    'terms.content.1': 'أنت تحتفظ بحقوق الملكية لمحتواك',
                    'terms.content.2': 'بإرسال المحتوى، تمنحنا ترخيصًا لاستخدامه في الخدمة',
                    'terms.content.3': 'يجب ألا يحتوي المحتوى على مواد مسيئة أو غير قانونية',
                    'terms.content.4': 'نحتفظ بالحق في إزالة أي محتوى غير مناسب',
                    'terms.liability.title': 'تحديد المسؤولية',
                    'terms.liability.desc': 'في حدود القانون المسموح:',
                    'terms.liability.1': 'نقدم الخدمة "كما هي" دون ضمانات صريحة أو ضمنية',
                    'terms.liability.2': 'لا نضمن عدم انقطاع الخدمة أو خلوها من الأخطاء',
                    'terms.liability.3': 'لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية',
                    'terms.liability.4': 'مسؤوليتنا محدودة بمبلغ الاشتراك المدفوع',
                    'terms.termination.title': 'إنهاء الخدمة',
                    'terms.termination.desc': 'يمكن إنهاء حسابك في الحالات التالية:',
                    'terms.termination.1': 'إذا انتهكت هذه الشروط والأحكام',
                    'terms.termination.2': 'إذا قمت بأنشطة غير قانونية أو ضارة',
                    'terms.termination.3': 'إذا طلبت الإنهاء بنفسك',
                    'terms.termination.4': 'إذا لم تدفع الرسوم المستحقة',
                    'terms.termination.note': 'في حالة الإنهاء، قد نفقد الوصول إلى بياناتك ومحتواك.',
                    'terms.changes.title': 'تغييرات الشروط',
                    'terms.changes.desc': 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت:',
                    'terms.changes.1': 'سيتم إشعارك بأي تغييرات جوهرية',
                    'terms.changes.2': 'استمرار استخدامك للخدمة يعني موافقتك على الشروط المحدثة',
                    'terms.changes.3': 'إذا لم توافق على التغييرات، يمكنك إلغاء حسابك',
                    'terms.changes.note': 'ننصحك بمراجعة هذه الشروط بانتظام للبقاء على اطلاع.',
                    'terms.contact.title': 'هل لديك أسئلة؟',
                    'terms.contact.desc': 'إذا كان لديك أي أسئلة حول هذه الشروط والأحكام أو تحتاج إلى توضيحات، لا تتردد في التواصل معنا. نحن هنا لمساعدتك.',
                    'terms.contact.btn': 'تواصل معنا عبر الواتساب',
                    'terms.updated.title': 'آخر تحديث:',
                    'terms.updated.date': 'يناير 2025',
                    'terms.updated.desc': 'هذه الشروط سارية المفعول اعتبارًا من تاريخ آخر تحديث أعلاه.'
                },
                en: {
                    'nav.home': 'Home',
                    'nav.about': 'About',
                    'nav.privacy': 'Privacy Policy',
                    'nav.refund': 'Refund & Return Policy',
                    'nav.terms': 'Terms & Conditions',
                    'nav.contact': 'Contact Us',
                    'hero.tag': 'Modern Quran Memorization Academy',
                    'hero.title': 'Alif Lam Meem Academy',
                    'hero.desc': 'A digital Islamic academy that helps you memorize Quran flawlessly, master Tajweed, and stay consistent with adhkar through smart reminders. Certified teachers, interactive classes, and tailored plans for every level with instant progress reports.',
                    'hero.highlight1': 'Live memorization circles with certified instructors',
                    'hero.highlight2': 'Instant Tajweed assessment with detailed reports',
                    'hero.highlight3': 'Flexible memorization & review plans + guardian tracking',
                    'hero.apple.small': 'Available now on',
                    'hero.apple.title': 'App Store',
                    'hero.google.small': 'Get the app on',
                    'hero.google.title': 'Google Play',
                    'hero.contact': 'Chat with us on WhatsApp',
                    'hero.meta1.value': '4.9 / 5',
                    'hero.meta1.label': 'User rating',
                    'hero.meta2.value': '+15K',
                    'hero.meta2.label': 'Weekly completed wird',
                    'hero.meta3.value': '24/7',
                    'hero.meta3.label': 'Spiritual guidance',
                    'screen.title': 'Today’s Wird',
                    'screen.date': 'Thursday 15 Ramadan',
                    'screen.item1.label': 'Quran recitation',
                    'screen.item1.value': '5 pages',
                    'screen.item2.label': 'Morning adhkar',
                    'screen.item2.value': 'Completed',
                    'screen.item3.label': 'Tasbeeh wird',
                    'screen.item3.value': '33 × 3',
                    'screen.cta.label': 'Next prayer time',
                    'screen.cta.value': 'Maghrib - 6:15 PM',
                    'card.dhikr.label': 'Weekly progress',
                    'card.dhikr.value': '87% commitment',
                    'card.dhikr.desc': 'Keep going! 2 goals left for full completion',
                    'card.prayer.label': 'Qiyam reminder',
                    'card.prayer.sub': '10 minutes before Adhan',
                    'features.tagline': 'Discover the academy tools',
                    'features.title': 'App highlights',
                    'features.desc': 'A smart platform that blends memorization, interactive quizzes, and premium recitation so you enjoy a complete Quran experience anywhere.',
                    'features.cards.quiz.tag': 'Check your level',
                    'features.cards.quiz.title': 'Instant interactive quizzes',
                    'features.cards.quiz.desc': 'Evaluate your memorization right after every class with instant feedback.',
                    'features.cards.quiz.point1': 'Question bank for every level',
                    'features.cards.quiz.point2': 'Immediate scores with motivational points',
                    'features.cards.quiz.point3': 'Progress reports for parents or mentors',
                    'features.cards.quiz.cta': 'Take a quick quiz',
                    'features.cards.courses.tag': 'Memorization plan',
                    'features.cards.courses.title': 'Structured memorization courses',
                    'features.cards.courses.desc': 'Flexible 3-to-6 month plans led by certified Tajweed instructors.',
                    'features.cards.courses.point1': 'Smart schedule for memorization & review',
                    'features.cards.courses.point2': 'Live classrooms with recorded sessions',
                    'features.cards.courses.point3': 'Personal support tailored to your pace',
                    'features.cards.courses.cta': 'Book your learning track',
                    'features.cards.audio.tag': 'Listen mindfully',
                    'features.cards.audio.title': 'High-fidelity Quran listening',
                    'features.cards.audio.desc': 'Audio library of renowned reciters synchronized with Mushaf view.',
                    'features.cards.audio.point1': 'Focus modes and calming backgrounds',
                    'features.cards.audio.point2': 'Offline downloads for any track',
                    'features.cards.audio.point3': 'Automatic ayah tracking in the Mushaf',
                    'features.cards.audio.cta': 'Open the recitation library',
                    'features.cta': 'Start your free experience today',
                    'about.tag': 'About the academy',
                    'about.title': 'A digital hifdh hub with the heart of a halaqa',
                    'about.desc': 'We craft a complete memorization + tajweed experience that blends certified teachers, smart evaluation, and constant encouragement—inside one app.',
                    'about.points.1': 'Ijaza-backed syllabus tailored to your pace',
                    'about.points.2': 'Instant reports and AI reminders with soulful tone',
                    'about.points.3': 'Vibrant community with weekly challenges',
                    'about.metrics.1.value': '40K+',
                    'about.metrics.1.label': 'Live memorization sessions',
                    'about.metrics.2.value': '92%',
                    'about.metrics.2.label': 'Weekly commitment rate',
                    'about.metrics.3.value': '4 continents',
                    'about.metrics.3.label': 'Communities we serve',
                    'about.logo.caption': 'Our emblem blends sacred letters with golden circles',
                    'about.device.card.title': 'Today’s session',
                    'about.device.card.item1': 'Juz’ Amma',
                    'about.device.card.item2': 'Tajweed',
                    'about.device.card.cta': 'Start reciting',
                    'about.ribbon.title': '24/7 mentorship',
                    'about.ribbon.desc': 'Dhikr alerts, group rooms, and live assessment',
                    'loader.title': 'Alif Lam Meem Academy',
                    'loader.subtitle': 'Modern Quran memorization platform',
                    'footer.brand.title': 'Alif Lam Meem Academy',
                    'footer.brand.desc': 'A digital Quran memorization platform that combines authentic traditions with modern technology to help you memorize the Quran perfectly.',
                    'footer.social.facebook': 'Facebook',
                    'footer.social.twitter': 'Twitter',
                    'footer.social.instagram': 'Instagram',
                    'footer.social.whatsapp': 'WhatsApp',
                    'footer.social.youtube': 'YouTube',
                    'footer.links.title': 'Quick Links',
                    'footer.links.home': 'Home',
                    'footer.links.about': 'About Us',
                    'footer.links.features': 'Features',
                    'footer.links.courses': 'Courses',
                    'footer.links.contact': 'Contact Us',
                    'footer.legal.title': 'Legal Information',
                    'footer.legal.privacy': 'Privacy Policy',
                    'footer.legal.terms': 'Terms & Conditions',
                    'footer.legal.refund': 'Refund Policy',
                    'footer.legal.cookies': 'Cookie Policy',
                    'footer.download.title': 'Download App',
                    'footer.download.desc': 'Get the full experience on your mobile device',
                    'footer.download.apple.small': 'Available on',
                    'footer.download.google.small': 'Get it on',
                    'footer.copyright': '© 2024 Alif Lam Meem Academy. All rights reserved.',
                    'footer.made': 'Made with ❤️ to serve the Holy Quran',
                    'downloadNow.tag': 'Download the app now',
                    'downloadNow.title': 'All memorization tools in your pocket within seconds',
                    'downloadNow.desc': 'Instant dashboard, smart dhikr alerts, and a visual challenge system that reacts to your progress\nand gives you a motivational boost whenever you complete your daily wird.',
                    'downloadNow.stats.1.value': '+15,000',
                    'downloadNow.stats.1.label': 'Active downloads in the last 30 days',
                    'downloadNow.stats.2.value': '92%',
                    'downloadNow.stats.2.label': 'Weekly commitment rate',
                    'downloadNow.stats.3.value': '4.9/5',
                    'downloadNow.stats.3.label': 'Average user rating',
                    'downloadNow.apple.aria': 'Download from App Store',
                    'downloadNow.apple.small': 'Available now on',
                    'downloadNow.google.aria': 'Download from Google Play',
                    'downloadNow.google.small': 'Get the app on',
                    'downloadNow.device.title': 'Your daily memorization schedule',
                    'downloadNow.device.item1.title': 'Fajr wird',
                    'downloadNow.device.item1.desc': '5 pages from Surah Ya-Sin',
                    'downloadNow.device.item2.title': 'Dhikr challenge',
                    'downloadNow.device.item2.desc': '30 consecutive dhikr',
                    'downloadNow.device.item2.status': 'Completed',
                    'downloadNow.device.item3.title': 'Review session',
                    'downloadNow.device.item3.desc': '10 minutes remaining',
                    'downloadNow.device.cta': 'Start active memorization',
                    'privacy.hero.title': 'Privacy Policy',
                    'privacy.hero.desc': 'At Alif Lam Meem Academy, we are committed to protecting your privacy and data security. This policy explains how we collect, use, and protect your personal information.',
                    'privacy.intro.title': 'Introduction',
                    'privacy.intro.p1': 'Welcome to Alif Lam Meem Academy. We recognize the importance of your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and protect your information when you use our app and services.',
                    'privacy.intro.p2': 'By using our app and services, you agree to the information collection and use practices described in this policy. If you do not agree with this policy, please do not use our services.',
                    'privacy.collect.title': 'Information We Collect',
                    'privacy.collect.desc': 'We collect different types of information to provide and improve our services:',
                    'privacy.collect.personal': 'Personal Information:',
                    'privacy.collect.personal.desc': 'Name, email, phone number, date of birth, and other information you provide during registration.',
                    'privacy.collect.account': 'Account Information:',
                    'privacy.collect.account.desc': 'Username, password (encrypted), and account preferences.',
                    'privacy.collect.progress': 'Progress Information:',
                    'privacy.collect.progress.desc': 'Memorization records, test results, and course progress level.',
                    'privacy.collect.device': 'Device Information:',
                    'privacy.collect.device.desc': 'Device type, operating system, unique device identifier, and IP address.',
                    'privacy.collect.usage': 'Usage Information:',
                    'privacy.collect.usage.desc': 'How you use the app, features you use, and session duration.',
                    'privacy.use.title': 'How We Use Information',
                    'privacy.use.desc': 'We use the information we collect for the following purposes:',
                    'privacy.use.1': 'Provide, maintain, and improve our educational services',
                    'privacy.use.2': 'Create and manage your personal account',
                    'privacy.use.3': 'Track your progress in memorization and review',
                    'privacy.use.4': 'Send important notifications about your account and services',
                    'privacy.use.5': 'Provide technical support and respond to your inquiries',
                    'privacy.use.6': 'Analyze app usage to improve user experience',
                    'privacy.use.7': 'Ensure security and prevent fraud',
                    'privacy.use.8': 'Comply with legal obligations',
                    'privacy.use.note.title': 'Important Note:',
                    'privacy.use.note.desc': 'We do not sell your personal information to third parties. We only use your information to improve your educational experience and provide the best possible service.',
                    'privacy.security.title': 'Data Security',
                    'privacy.security.desc': 'We take the security of your data seriously and use advanced security measures to protect your information:',
                    'privacy.security.encryption': 'Encryption:',
                    'privacy.security.encryption.desc': 'We use SSL/TLS encryption to protect data in transit',
                    'privacy.security.password': 'Password Protection:',
                    'privacy.security.password.desc': 'Passwords are encrypted using secure algorithms',
                    'privacy.security.access': 'Restricted Access:',
                    'privacy.security.access.desc': 'Only authorized employees can access your personal information',
                    'privacy.security.backup': 'Secure Backup:',
                    'privacy.security.backup.desc': 'Your data is securely stored with regular backups',
                    'privacy.security.updates': 'Security Updates:',
                    'privacy.security.updates.desc': 'We regularly update our systems to address new threats',
                    'privacy.security.warning': 'Despite our efforts, 100% absolute security cannot be guaranteed. We advise you not to share your login information with anyone.',
                    'privacy.sharing.title': 'Data Sharing',
                    'privacy.sharing.desc': 'We do not sell or rent your personal information to third parties. We may share your information only in the following cases:',
                    'privacy.sharing.services': 'Service Providers:',
                    'privacy.sharing.services.desc': 'With trusted partners who help us operate our services (such as data hosting, payment)',
                    'privacy.sharing.legal': 'Legal Compliance:',
                    'privacy.sharing.legal.desc': 'When required by law or to protect our legal rights',
                    'privacy.sharing.consent': 'Consent:',
                    'privacy.sharing.consent.desc': 'When you give us explicit consent to share',
                    'privacy.sharing.safety': 'Safety Protection:',
                    'privacy.sharing.safety.desc': 'To protect user safety and prevent fraud',
                    'privacy.sharing.note': 'All our service providers are bound by strict security standards and cannot use your information for other purposes.',
                    'privacy.rights.title': 'Your Rights',
                    'privacy.rights.desc': 'You have certain rights regarding your personal information:',
                    'privacy.rights.access': 'Right to Access:',
                    'privacy.rights.access.desc': 'You can request a copy of your personal information',
                    'privacy.rights.correction': 'Right to Correction:',
                    'privacy.rights.correction.desc': 'You can update or correct your information at any time',
                    'privacy.rights.deletion': 'Right to Deletion:',
                    'privacy.rights.deletion.desc': 'You can request deletion of your account and personal information',
                    'privacy.rights.objection': 'Right to Objection:',
                    'privacy.rights.objection.desc': 'You can object to the processing of your information in certain cases',
                    'privacy.rights.portability': 'Right to Data Portability:',
                    'privacy.rights.portability.desc': 'You can request transfer of your data to another service',
                    'privacy.rights.withdrawal': 'Right to Withdraw Consent:',
                    'privacy.rights.withdrawal.desc': 'You can withdraw your consent at any time',
                    'privacy.rights.contact': 'To exercise any of these rights, please contact us via email or through the app.',
                    'privacy.cookies.title': 'Cookies and Tracking',
                    'privacy.cookies.desc': 'We use cookies and similar technologies to improve your experience:',
                    'privacy.cookies.essential': 'Essential Cookies:',
                    'privacy.cookies.essential.desc': 'Required for the app to function properly',
                    'privacy.cookies.functional': 'Functional Cookies:',
                    'privacy.cookies.functional.desc': 'Save your preferences and settings',
                    'privacy.cookies.analytical': 'Analytical Cookies:',
                    'privacy.cookies.analytical.desc': 'Help us understand how the app is used',
                    'privacy.cookies.manage': 'You can manage cookie preferences through the app settings or browser.',
                    'privacy.children.title': 'Children\'s Privacy',
                    'privacy.children.desc': 'Our services are directed to children under parental supervision. We:',
                    'privacy.children.1': 'Collect children\'s information only with parental consent',
                    'privacy.children.2': 'Provide tools for parents to monitor and manage their children\'s accounts',
                    'privacy.children.3': 'Do not share children\'s information with third parties without parental consent',
                    'privacy.children.4': 'Maintain high security for children\'s accounts',
                    'privacy.children.warning': 'If you are a parent and believe your child has provided personal information without your consent, please contact us immediately.',
                    'privacy.changes.title': 'Changes to Privacy Policy',
                    'privacy.changes.desc': 'We may update this privacy policy from time to time. We will notify you of any material changes through:',
                    'privacy.changes.1': 'In-app notification',
                    'privacy.changes.2': 'Email',
                    'privacy.changes.3': 'Publishing an updated version on our website',
                    'privacy.changes.note': 'We advise you to review this policy regularly to stay informed of the latest updates. Continued use of the service after changes means you agree to the updated policy.',
                    'privacy.contact.title': 'Do You Have Questions?',
                    'privacy.contact.desc': 'If you have any questions or inquiries about this privacy policy or how we use your information, please do not hesitate to contact us. We are here to help you.',
                    'privacy.contact.btn': 'Contact Us on WhatsApp',
                    'privacy.updated.title': 'Last Updated:',
                    'privacy.updated.date': 'January 2025',
                    'privacy.updated.desc': 'This policy is effective as of the last update date above.',
                    'refund.hero.title': 'Refund & Return Policy',
                    'refund.hero.desc': 'At Alif Lam Meem Academy, we are committed to providing an excellent educational experience. This policy outlines the terms and procedures for refunds and returns for paid subscriptions and services.',
                    'refund.intro.title': 'Introduction',
                    'refund.intro.p1': 'At Alif Lam Meem Academy, we aim to provide the best possible educational experience. We understand that circumstances may change, and we offer a clear and fair refund policy for all users.',
                    'refund.intro.p2': 'This policy applies to all paid subscriptions and services we offer. Please read this policy carefully before making any purchase.',
                    'refund.eligibility.title': 'Refund Eligibility',
                    'refund.eligibility.desc': 'You can request a refund in the following cases:',
                    'refund.eligibility.1': 'If you subscribed by mistake',
                    'refund.eligibility.2': 'If you cannot access the service due to a technical issue on our end',
                    'refund.eligibility.3': 'If the course or service is canceled by us',
                    'refund.eligibility.4': 'If your subscription is not activated within 48 hours of payment',
                    'refund.eligibility.note.title': 'Important Note:',
                    'refund.eligibility.note.desc': 'Refunds cannot be issued if more than 30% of the course content has been used or if more than 14 days have passed since the purchase date.',
                    'refund.process.title': 'Refund Process',
                    'refund.process.desc': 'To request a refund, please follow these steps:',
                    'refund.process.1': 'Contact us via email or WhatsApp with your order number or transaction ID',
                    'refund.process.2': 'Provide a clear reason for the refund request',
                    'refund.process.3': 'We will review your request within 3-5 business days',
                    'refund.process.4': 'If approved, the refund will be processed within 7-14 business days',
                    'refund.process.note': 'The refund will be issued to the same payment method used in the original purchase.',
                    'refund.timeframe.title': 'Refund Timeframe',
                    'refund.timeframe.desc': 'Timeframe for processing refund requests:',
                    'refund.timeframe.review': 'Request Review:',
                    'refund.timeframe.review.desc': '3-5 business days',
                    'refund.timeframe.processing': 'Refund Processing:',
                    'refund.timeframe.processing.desc': '7-14 business days after approval',
                    'refund.timeframe.appearance': 'Fund Appearance:',
                    'refund.timeframe.appearance.desc': 'May take an additional 3-5 days depending on the bank or payment method',
                    'refund.timeframe.note': 'We try to process all requests as quickly as possible. Processing may take longer during peak periods or holidays.',
                    'refund.nonrefundable.title': 'Non-Refundable Items',
                    'refund.nonrefundable.desc': 'Refunds cannot be issued in the following cases:',
                    'refund.nonrefundable.1': 'If more than 30% of the course content has been used',
                    'refund.nonrefundable.2': 'If more than 14 days have passed since the purchase date',
                    'refund.nonrefundable.3': 'Monthly subscriptions after the paid period has ended',
                    'refund.nonrefundable.4': 'Fully delivered services (such as issued certificates)',
                    'refund.nonrefundable.5': 'Expired discounts and promotional offers',
                    'refund.partial.title': 'Partial Refunds',
                    'refund.partial.desc': 'In some cases, we may offer partial refunds:',
                    'refund.partial.1': 'If part of the course has been used (less than 30%), we may refund a portion of the amount',
                    'refund.partial.2': 'If there is a partial technical issue, we may refund a portion of the amount',
                    'refund.partial.3': 'The refund amount will be calculated based on the actual usage percentage',
                    'refund.partial.note': 'You will be informed of the refund amount before processing the request.',
                    'refund.cancellation.title': 'Cancellation Policy',
                    'refund.cancellation.desc': 'You can cancel your subscription at any time:',
                    'refund.cancellation.1': 'Cancellation does not mean automatic refund of the paid amount',
                    'refund.cancellation.2': 'Access to the service will continue until the end of the paid period',
                    'refund.cancellation.3': 'The subscription will not be automatically renewed after cancellation',
                    'refund.cancellation.4': 'You can resubscribe at any time',
                    'refund.cancellation.note': 'To cancel your subscription, please contact us or use the cancellation option in your account settings.',
                    'refund.contact.title': 'Need Help?',
                    'refund.contact.desc': 'If you have any questions about the refund and return policy or need to submit a refund request, please do not hesitate to contact us. Our support team is available to help you.',
                    'refund.contact.btn': 'Contact Us on WhatsApp',
                    'refund.updated.title': 'Last Updated:',
                    'refund.updated.date': 'January 2025',
                    'refund.updated.desc': 'This policy is effective as of the last update date above.',
                    'terms.hero.title': 'Terms & Conditions',
                    'terms.hero.desc': 'Welcome to Alif Lam Meem Academy. Please read these terms and conditions carefully before using our services. By using our services, you agree to be bound by these terms.',
                    'terms.intro.title': 'Introduction',
                    'terms.intro.p1': 'These Terms and Conditions ("Terms") govern your use of the Alif Lam Meem Academy app and services. By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.',
                    'terms.intro.p2': 'If you do not agree to any of these Terms, please do not use our services. We reserve the right to modify these Terms at any time, and you will be notified of any material changes.',
                    'terms.acceptance.title': 'Acceptance of Terms',
                    'terms.acceptance.desc': 'By using our services, you acknowledge and agree that:',
                    'terms.acceptance.1': 'You have read and understood these Terms and Conditions',
                    'terms.acceptance.2': 'You agree to comply with all the stated terms',
                    'terms.acceptance.3': 'You are fully responsible for your use of the service',
                    'terms.acceptance.4': 'You comply with local and international laws and regulations',
                    'terms.account.title': 'Account Registration',
                    'terms.account.desc': 'To benefit from our services, you may need to create an account:',
                    'terms.account.1': 'The information provided must be accurate and complete',
                    'terms.account.2': 'You are responsible for maintaining the confidentiality of your login information',
                    'terms.account.3': 'You must be 18 years or older, or have parental consent',
                    'terms.account.4': 'You are responsible for all activities that occur under your account',
                    'terms.account.5': 'You must notify us immediately of any unauthorized use of your account',
                    'terms.use.title': 'Use of Service',
                    'terms.use.desc': 'Our services must be used legally and responsibly:',
                    'terms.use.1': 'The service may not be used for illegal or unethical purposes',
                    'terms.use.2': 'Unauthorized access to our systems is not permitted',
                    'terms.use.3': 'Content may not be copied or distributed without permission',
                    'terms.use.4': 'Intellectual property rights must be respected',
                    'terms.use.5': 'The service may not be used to harass or harm others',
                    'terms.use.note.title': 'Important Note:',
                    'terms.use.note.desc': 'We reserve the right to suspend or terminate your account in case of violation of these terms.',
                    'terms.ip.title': 'Intellectual Property',
                    'terms.ip.desc': 'All content and materials in our services are protected by intellectual property rights:',
                    'terms.ip.1': 'All educational content is owned by Alif Lam Meem Academy',
                    'terms.ip.2': 'Content may not be copied, distributed, or modified without written permission',
                    'terms.ip.3': 'You may use the content for personal and educational use only',
                    'terms.ip.4': 'All trademarks and logos are protected',
                    'terms.ip.note': 'Any violation of intellectual property rights may result in legal action.',
                    'terms.payment.title': 'Payments and Subscriptions',
                    'terms.payment.desc': 'Regarding payments and subscriptions:',
                    'terms.payment.1': 'All prices are displayed in local currency and may change',
                    'terms.payment.2': 'Subscriptions renew automatically unless canceled',
                    'terms.payment.3': 'You are responsible for all fees associated with your account',
                    'terms.payment.4': 'We reserve the right to change prices with prior notice',
                    'terms.payment.5': 'Refunds are subject to the refund and return policy',
                    'terms.content.title': 'User Content',
                    'terms.content.desc': 'Regarding content you provide:',
                    'terms.content.1': 'You retain ownership rights to your content',
                    'terms.content.2': 'By submitting content, you grant us a license to use it in the service',
                    'terms.content.3': 'Content must not contain offensive or illegal materials',
                    'terms.content.4': 'We reserve the right to remove any inappropriate content',
                    'terms.liability.title': 'Limitation of Liability',
                    'terms.liability.desc': 'To the extent permitted by law:',
                    'terms.liability.1': 'We provide the service "as is" without express or implied warranties',
                    'terms.liability.2': 'We do not guarantee uninterrupted service or error-free operation',
                    'terms.liability.3': 'We will not be liable for any indirect or incidental damages',
                    'terms.liability.4': 'Our liability is limited to the amount of the paid subscription',
                    'terms.termination.title': 'Termination',
                    'terms.termination.desc': 'Your account may be terminated in the following cases:',
                    'terms.termination.1': 'If you violate these Terms and Conditions',
                    'terms.termination.2': 'If you engage in illegal or harmful activities',
                    'terms.termination.3': 'If you request termination yourself',
                    'terms.termination.4': 'If you fail to pay due fees',
                    'terms.termination.note': 'Upon termination, we may lose access to your data and content.',
                    'terms.changes.title': 'Changes to Terms',
                    'terms.changes.desc': 'We reserve the right to modify these Terms at any time:',
                    'terms.changes.1': 'You will be notified of any material changes',
                    'terms.changes.2': 'Continued use of the service means you agree to the updated terms',
                    'terms.changes.3': 'If you do not agree to the changes, you can cancel your account',
                    'terms.changes.note': 'We advise you to review these Terms regularly to stay informed.',
                    'terms.contact.title': 'Do You Have Questions?',
                    'terms.contact.desc': 'If you have any questions about these Terms and Conditions or need clarifications, please do not hesitate to contact us. We are here to help you.',
                    'terms.contact.btn': 'Contact Us on WhatsApp',
                    'terms.updated.title': 'Last Updated:',
                    'terms.updated.date': 'January 2025',
                    'terms.updated.desc': 'These Terms are effective as of the last update date above.'
                }
            };
            
            function applyTranslations(lang) {
                const trans = translations[lang];
                if (!trans) return;
                
                // Update page title based on current page
                if (window.location.pathname.includes('privacy.html')) {
                    const privacyTitle = trans['privacy.hero.title'];
                    if (privacyTitle) {
                        document.title = privacyTitle + (lang === 'ar' ? ' - الف لام ميم' : ' - Alif Lam Meem');
                    }
                } else if (window.location.pathname.includes('refund.html')) {
                    const refundTitle = trans['refund.hero.title'];
                    if (refundTitle) {
                        document.title = refundTitle + (lang === 'ar' ? ' - الف لام ميم' : ' - Alif Lam Meem');
                    }
                } else if (window.location.pathname.includes('terms.html')) {
                    const termsTitle = trans['terms.hero.title'];
                    if (termsTitle) {
                        document.title = termsTitle + (lang === 'ar' ? ' - الف لام ميم' : ' - Alif Lam Meem');
                    }
                }
                
                const transElements = document.querySelectorAll('[data-i18n]');
                transElements.forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    const value = trans[key];
                    if (!value) return;
                    
                    // Handle aria-label attribute
                    if (key.startsWith('[aria-label]')) {
                        const actualKey = key.replace('[aria-label]', '');
                        const ariaValue = trans[actualKey];
                        if (ariaValue) {
                            el.setAttribute('aria-label', ariaValue);
                        }
                        return;
                    }
                    
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = value;
                    } else if (el.tagName === 'BUTTON' || el.tagName === 'SPAN' || el.tagName === 'SMALL' || el.tagName === 'STRONG') {
                        el.textContent = value;
                    } else {
                        // For paragraphs and other elements, preserve line breaks
                        el.innerHTML = value.replace(/\n/g, '<br>');
                    }
                });
            }
            
            // Language Switcher
            const langToggle = document.querySelector('.lang-toggle');
            const langDropdown = document.querySelector('.lang-dropdown');
            const langOptions = document.querySelectorAll('.lang-option');
            const mobileLangOptions = document.querySelectorAll('.mobile-lang-option');
            const currentLangSpan = document.querySelector('.current-lang');
            
            function setLanguageUI(lang) {
                if (currentLangSpan) {
                    currentLangSpan.textContent = lang.toUpperCase();
                }
                langOptions.forEach(opt => {
                    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
                });
                mobileLangOptions.forEach(opt => {
                    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
                });
            }
            
            // Toggle language dropdown
            if (langToggle && langDropdown) {
                langToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    this.classList.toggle('active');
                    langDropdown.classList.toggle('active');
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                        langToggle.classList.remove('active');
                        langDropdown.classList.remove('active');
                    }
                });
                
                // Handle language selection
                langOptions.forEach(option => {
                    option.addEventListener('click', function() {
                        const selectedLang = this.getAttribute('data-lang');
                        const selectedDir = this.getAttribute('data-dir');
                        
                        setLanguageUI(selectedLang);
                        changeLanguage(selectedLang, selectedDir);
                        
                        // Close dropdown
                        langToggle.classList.remove('active');
                        langDropdown.classList.remove('active');
                    });
                });
            }
            
            // Mobile language switcher
            mobileLangOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const selectedLang = this.getAttribute('data-lang');
                    const selectedDir = this.getAttribute('data-dir');
                    
                    setLanguageUI(selectedLang);
                    changeLanguage(selectedLang, selectedDir);
                });
            });
            
            // Language change function
            function changeLanguage(lang, dir) {
                // Update HTML attributes
                document.documentElement.setAttribute('lang', lang);
                document.documentElement.setAttribute('dir', dir);
                
                // Save to localStorage
                localStorage.setItem('selectedLanguage', lang);
                localStorage.setItem('selectedDirection', dir);
                
                applyTranslations(lang);
            }
            
            // Load saved language preference
            const savedLang = localStorage.getItem('selectedLanguage') || 'ar';
            const savedDir = localStorage.getItem('selectedDirection') || 'rtl';
            
            setLanguageUI(savedLang);
            changeLanguage(savedLang, savedDir);
            
            // Mobile Menu Toggle
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-contact-btn');
            
            if (mobileMenuToggle && mobileMenu) {
                mobileMenuToggle.addEventListener('click', function() {
                    this.classList.toggle('active');
                    mobileMenu.classList.toggle('active');
                    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
                });
                
                // Close menu when clicking on a link
                mobileNavLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenuToggle.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', function(event) {
                    const isClickInsideNav = navbar.contains(event.target);
                    if (!isClickInsideNav && mobileMenu.classList.contains('active')) {
                        mobileMenuToggle.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }

                        try {
                            const toggler = document.querySelector('.navbar-toggler');
                            const navbarCollapseEl = document.getElementById('navbarNav');
                            if (toggler && navbarCollapseEl) {
                                toggler.addEventListener('click', function () {
                                    const isShown = navbarCollapseEl.classList.contains('show');
                                    if (isShown) {
                                        navbarCollapseEl.classList.remove('show');
                                        toggler.setAttribute('aria-expanded', 'false');
                                    } else {
                                        navbarCollapseEl.classList.add('show');
                                        toggler.setAttribute('aria-expanded', 'true');
                                    }
                                });
                            }
                        } catch (e) {
                            // no-op
                        }
        });
        document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for fade-up animation
  const animateCards = () => {
    const cards = document.querySelectorAll('.service-card-elegant');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
  };

  animateCards();

  // Service Modal Setup
  const serviceModal = document.getElementById('serviceModal');
  if (serviceModal) {
    serviceModal.addEventListener('show.bs.modal', function(event) {
      const button = event.relatedTarget;
      const title = button.getAttribute('data-title');
      const desc = button.getAttribute('data-desc');

      const modalTitle = serviceModal.querySelector('.modal-title');
      const modalDesc = serviceModal.querySelector('.modal-desc');

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
    });
  }
});
// تأخير ظهور الأنيميشن عند التمرير
document.addEventListener("DOMContentLoaded", function() {
    const animateElements = document.querySelectorAll('.animate__animated');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Counter Animation للأرقام
    const counterElements = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    const animateCounter = (element) => {
        const target = element.textContent.trim();
        const isNumber = /^\+?\d+$/.test(target);
        
        if (!isNumber) return;
        
        const finalNumber = parseInt(target.replace('+', ''));
        const duration = 2500; // مدة الأنيميشن بالميلي ثانية
        const steps = 80;
        const increment = finalNumber / steps;
        const stepDuration = duration / steps;
        let current = 0;
        
        element.textContent = '0';
        element.classList.add('counting');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                element.textContent = target; // إعادة النص الأصلي مع علامة +
                element.classList.remove('counting');
                clearInterval(timer);
            } else {
                element.textContent = '+' + Math.floor(current);
            }
        }, stepDuration);
    };
    
    // مراقبة ظهور قسم الإحصائيات
    const statsSection = document.querySelector('.static-info');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    counterElements.forEach((counter, index) => {
                        setTimeout(() => {
                            animateCounter(counter);
                        }, index * 100); // تأخير بسيط بين كل رقم
                    });
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }
});

// وظيفة أزرار "احجز استشارة"
document.addEventListener('DOMContentLoaded', function() {
    // جميع أزرار "احجز استشارة"
    const bookButtons = document.querySelectorAll('.cta-button');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الانتقال إلى قسم التواصل
            const contactSection = document.querySelector('#contact-us');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // تركيز على حقل الاسم بعد الانتقال
                setTimeout(() => {
                    const nameInput = document.querySelector('.contact-form input[type="text"]');
                    if (nameInput) {
                        nameInput.focus();
                    }
                }, 1000);
            }
        });
    });
    
    // Smooth scrolling لجميع الروابط الداخلية
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // تجاهل الروابط الفارغة أو التي تحتوي فقط على #
            if (!href || href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // إغلاق القائمة في الموبايل إذا كانت مفتوحة
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
                
                // الانتقال السلس للعنصر المستهدف
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });
});
