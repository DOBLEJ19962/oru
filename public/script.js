const canvas = document.getElementById('collarCanvas');
const ctx = canvas.getContext('2d');
const consultarBtn = document.getElementById('consultar');
const resultado = document.getElementById('resultado');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radio = 20;

// Collar: 4 cuentas izquierda, 4 cuentas derecha
const cuentasIzq = [];
const cuentasDer = [];


// Ejemplo de Odù mapeado (reemplaza con tus combinaciones reales)
const odunes = [
  // 1
  { nombre: "Eji Ogbe", combinacion: "11111111", descripcion: "Eji Ogbe representa el inicio de todo ciclo, fuerza positiva, claridad y luz espiritual. Indica prosperidad, éxito en proyectos, guía divina y equilibrio en la vida material y espiritual. Enseña a actuar con ética, a mantener la mente clara y a aprovechar oportunidades con determinación y fe." },
  // 2
  { nombre: "Oyeku Meji", combinacion: "00000000", descripcion: "Oyeku Meji simboliza oscuridad, introspección y el fin de ciclos. Señala la necesidad de reflexión, prudencia y silencio. Indica que la preparación y el análisis profundo son esenciales antes de actuar. Enseña que la oscuridad precede a la luz, y que de los retos surge la sabiduría." },
  // 3
  { nombre: "Iwori Meji", combinacion: "10101010", descripcion: "Iwori Meji representa sabiduría oculta y conocimiento profundo. Enseña paciencia, discernimiento y estudio. Indica la necesidad de explorar lo desconocido, comprender la verdad detrás de las apariencias y utilizar la inteligencia para superar desafíos. Favorece la introspección y la conexión con la guía ancestral." },
  // 4
  { nombre: "Odi Meji", combinacion: "01010101", descripcion: "Odi Meji simboliza transformación, renovación y cambios inevitables. Enseña a adaptarse con humildad y a aceptar los ciclos de la vida. Indica que la muerte simbólica de lo viejo permite el nacimiento de lo nuevo, y que los cambios traen crecimiento espiritual y material." },
  // 5
  { nombre: "Irosun Meji", combinacion: "11110000", descripcion: "Irosun Meji representa advertencia y precaución ante peligros ocultos. Enseña discernimiento, protección y preparación. Indica la necesidad de observar cuidadosamente las circunstancias antes de actuar, de escuchar la guía espiritual y de evitar riesgos innecesarios para asegurar la seguridad y el bienestar." },
  // 6
  { nombre: "Owonrin Meji", combinacion: "00001111", descripcion: "Owonrin Meji simboliza movimiento, adaptabilidad y superación de obstáculos. Enseña a actuar con flexibilidad, aprovechar oportunidades y mantener el equilibrio en la acción. Indica que el cambio y la acción consciente llevan a la evolución y a la consecución de objetivos importantes." },
  // 7
  { nombre: "Obara Meji", combinacion: "11100011", descripcion: "Obara Meji representa comunicación poderosa, liderazgo y expansión social. Enseña a expresar ideas con claridad, a utilizar la palabra para influir positivamente y a liderar con integridad. Indica oportunidades de crecimiento social y personal mediante la interacción consciente y sabia con los demás." },
  // 8
  { nombre: "Okanran Meji", combinacion: "10011100", descripcion: "Okanran Meji simboliza conflicto, retos y la necesidad de coraje. Enseña a tomar decisiones difíciles con justicia y discernimiento. Indica que los desafíos requieren acción rápida, inteligencia emocional y fuerza interna para resolver situaciones complicadas y alcanzar objetivos significativos." },
  // 9
  { nombre: "Ogunda Meji", combinacion: "11001100", descripcion: "Ogunda Meji representa trabajo constante, esfuerzo y resistencia. Enseña disciplina, paciencia y dedicación a los proyectos. Indica que la perseverancia y la determinación son clave para superar obstáculos, fortalecer el carácter y lograr resultados duraderos en todos los ámbitos de la vida." },
  // 10
  { nombre: "Osa Meji", combinacion: "00110011", descripcion: "Osa Meji simboliza destino, cambios repentinos y pruebas de la vida. Enseña a adaptarse con sabiduría, mantener la calma ante la adversidad y confiar en la guía espiritual. Indica que las pruebas traen aprendizaje, fortaleza y la oportunidad de crecer a nivel personal y colectivo." },
  // 11
  { nombre: "Ika Meji", combinacion: "10100101", descripcion: "Ika Meji representa pruebas de carácter y control de impulsos. Enseña autocontrol, ética y discernimiento en la toma de decisiones. Indica que superar tentaciones y mantener la integridad personal asegura la protección espiritual y el cumplimiento del destino con éxito." },
  // 12
  { nombre: "Oturupon Meji", combinacion: "01011010", descripcion: "Oturupon Meji simboliza obstáculos y dificultades temporales. Enseña resiliencia, paciencia y aprendizaje a través de las pruebas. Indica que los retos son oportunidades para crecer y que la constancia y la fe permiten superar los desafíos y alcanzar el éxito espiritual y material." },
  // 13
  { nombre: "Otura Meji", combinacion: "11000011", descripcion: "Otura Meji representa claridad, equilibrio y guía espiritual. Enseña a actuar con justicia, mantener la armonía y buscar orientación divina en cada decisión. Indica que la conciencia y la ética aseguran el cumplimiento del destino y la protección ante situaciones adversas." },
  // 14
  { nombre: "Irete Meji", combinacion: "00111100", descripcion: "Irete Meji simboliza destino inevitable y cumplimiento de karma. Enseña a aceptar las consecuencias de las acciones pasadas, aprender de ellas y evolucionar. Indica que el reconocimiento de errores y la corrección de caminos permiten el crecimiento espiritual y la prosperidad." },
  // 15
  { nombre: "Oshe Meji", combinacion: "11101010", descripcion: "Oshe Meji representa amor, dulzura, placer y belleza. Enseña a valorar la armonía, la bondad y la fuerza femenina. Indica que la alegría, la creatividad y la expresión positiva generan bienestar y equilibrio en la vida personal, familiar y social." },
  // 16
  { nombre: "Ofun Meji", combinacion: "00010101", descripcion: "Ofun Meji simboliza fin de ciclo y preparación para renacer. Enseña desapego, reflexión y transformación. Indica que dejar atrás lo antiguo y aceptar el cambio permite un nuevo comienzo lleno de oportunidades y aprendizaje profundo." },
  // 17
  { nombre: "Ogbe Yekun", combinacion: "11111110", descripcion: "Ogbe Yekun representa la luz enfrentando la oscuridad. Enseña discernimiento, claridad y acción positiva. Indica que la confianza, la ética y la sabiduría guían hacia el éxito y la realización de proyectos importantes." },
  // 18
  { nombre: "Iwori Ogbe", combinacion: "10101111", descripcion: "Iwori Ogbe simboliza sabiduría al servicio del progreso. Enseña paciencia, estudio profundo y estrategia. Indica que el conocimiento aplicado con ética permite superar limitaciones y abrir caminos de prosperidad." },
  // 19
  { nombre: "Odi Ogbe", combinacion: "01011111", descripcion: "Odi Ogbe representa renovación material y espiritual. Enseña a aceptar cambios, buscar equilibrio y aprovechar oportunidades. Indica que la transformación consciente trae crecimiento y armonía en todos los niveles." },
  // 20
  { nombre: "Irosun Ogbe", combinacion: "11110001", descripcion: "Irosun Ogbe simboliza advertencia ante peligros y apertura de caminos. Enseña prudencia, análisis y vigilancia. Indica que la preparación y la conciencia aseguran la protección y el avance en los proyectos." },
  // 21
  { nombre: "Owonrin Ogbe", combinacion: "11111100", descripcion: "Owonrin Ogbe representa movimiento con claridad. Enseña adaptabilidad, disciplina y acción consciente. Indica que la flexibilidad combinada con planificación lleva al éxito y a la superación de obstáculos." },
  // 22
  { nombre: "Obara Ogbe", combinacion: "11111011", descripcion: "Obara Ogbe simboliza comunicación influyente y expansión social. Enseña a expresarse con claridad y a liderar con integridad. Indica oportunidades de crecimiento y prosperidad mediante relaciones conscientes y sabias." },
  // 23
  { nombre: "Okanran Ogbe", combinacion: "11100111", descripcion: "Okanran Ogbe representa conflictos resueltos con inteligencia. Enseña a tomar decisiones difíciles con discernimiento y ética. Indica que la prudencia y el coraje aseguran la resolución exitosa de retos importantes." },
  // 24
  { nombre: "Ogunda Ogbe", combinacion: "11101110", descripcion: "Ogunda Ogbe simboliza esfuerzo recompensado y crecimiento colectivo. Enseña perseverancia, disciplina y acción ética. Indica que el trabajo constante y responsable trae prosperidad y estabilidad." },
  // 25
  { nombre: "Osa Ogbe", combinacion: "11011111", descripcion: "Osa Ogbe representa cambios repentinos hacia la abundancia. Enseña adaptación, inteligencia y reflexión. Indica que la apertura a nuevas oportunidades permite aprovechar la fortuna y el bienestar." },
  // 26
  { nombre: "Ika Ogbe", combinacion: "11110101", descripcion: "Ika Ogbe simboliza pruebas de fe y protección. Enseña autocontrol, ética y resiliencia. Indica que superar desafíos con integridad asegura la guía espiritual y el cumplimiento del destino." },
  // 27
  { nombre: "Oturupon Ogbe", combinacion: "11100110", descripcion: "Oturupon Ogbe representa dificultades pasajeras y enseñanza espiritual. Enseña paciencia, disciplina y aprendizaje a través de la experiencia. Indica que la constancia y la fe superan los obstáculos y fortalecen el carácter." },
  // 28
  { nombre: "Otura Ogbe", combinacion: "11101001", descripcion: "Otura Ogbe simboliza guía divina y claridad en decisiones. Enseña ética, justicia y equilibrio. Indica que la conexión con la espiritualidad permite tomar decisiones sabias y alcanzar metas importantes." },
  // 29
  { nombre: "Irete Ogbe", combinacion: "11110010", descripcion: "Irete Ogbe representa cumplimiento del destino y logros tras sacrificios. Enseña perseverancia, paciencia y disciplina. Indica que el esfuerzo constante y la acción ética llevan a resultados exitosos y al reconocimiento del camino correcto." },
  // 30
  { nombre: "Oshe Ogbe", combinacion: "11011011", descripcion: "Oshe Ogbe simboliza dulzura y poder espiritual. Enseña armonía, creatividad y expresión positiva. Indica que la alegría, la belleza y la bondad generan bienestar y fortalecen las relaciones y el espíritu." },
  // 31
  { nombre: "Ofun Ogbe", combinacion: "11101000", descripcion: "Ofun Ogbe representa transformación y cierre de ciclos dolorosos. Enseña desapego, reflexión y renovación. Indica que aceptar el cambio permite avanzar hacia nuevos comienzos con sabiduría y éxito." },
  // 32
  { nombre: "Ogbe Iwori", combinacion: "11111010", descripcion: "Ogbe Iwori simboliza claridad y sabiduría. Enseña discernimiento, aprendizaje y apertura de caminos. Indica que la reflexión ética y la inteligencia aplicada aseguran decisiones correctas y crecimiento personal." },
  // 33
  { nombre: "Oyeku Iwori", combinacion: "00001010", descripcion: "Oyeku Iwori representa oscuridad con sabiduría. Enseña introspección, paciencia y conexión espiritual. Indica que el recogimiento y la reflexión permiten descubrir verdades ocultas y guiar la vida con prudencia." },
  // 34
  { nombre: "Iwori Oyeku", combinacion: "10100000", descripcion: "Iwori Oyeku simboliza conocimiento frente al vacío. Enseña discernimiento, paciencia y análisis profundo. Indica que enfrentar la incertidumbre con sabiduría permite tomar decisiones acertadas y avanzar con seguridad." },
  // 35
  { nombre: "Odi Iwori", combinacion: "01011000", descripcion: "Odi Iwori representa renovación con sabiduría. Enseña reflexión, adaptación y acción ética. Indica que los cambios internos fortalecen la mente, el espíritu y preparan el camino para nuevas oportunidades." },
  // 36
  { nombre: "Irosun Iwori", combinacion: "10110010", descripcion: "Irosun Iwori simboliza advertencia ante engaños. Enseña vigilancia, discernimiento y prudencia. Indica que la preparación y la ética aseguran evitar errores y tomar decisiones acertadas en situaciones complejas." },
  // 37
  { nombre: "Owonrin Iwori", combinacion: "10101100", descripcion: "Owonrin Iwori representa movimiento guiado por sabiduría. Enseña acción consciente, planificación y adaptabilidad. Indica que la inteligencia combinada con el esfuerzo asegura el progreso y la superación de obstáculos." },
  // 38
  { nombre: "Obara Iwori", combinacion: "10111100", descripcion: "Obara Iwori simboliza palabra sabia y discursos que abren puertas. Enseña comunicación estratégica, ética y liderazgo. Indica que expresarse con claridad y justicia permite oportunidades de crecimiento y reconocimiento social." },
  // 39
  { nombre: "Okanran Iwori", combinacion: "10100111", descripcion: "Okanran Iwori representa retos intelectuales. Enseña análisis, aprendizaje y discernimiento. Indica que enfrentar desafíos mentales fortalece la inteligencia, la ética y la capacidad de tomar decisiones correctas." },
  // 40
  { nombre: "Ogunda Iwori", combinacion: "10111001", descripcion: "Ogunda Iwori simboliza trabajo iluminado por sabiduría. Enseña disciplina, esfuerzo y estrategia. Indica que la combinación de inteligencia y perseverancia asegura éxito y crecimiento personal y colectivo." },
  // 41
  { nombre: "Osa Iwori", combinacion: "10110101", descripcion: "Osa Iwori representa destino revelado a través de la inteligencia. Enseña reflexión, adaptabilidad y ética. Indica que actuar con prudencia y sabiduría permite aprovechar oportunidades y cumplir con el propósito de vida." },
  // 42
  { nombre: "Ika Iwori", combinacion: "10110001", descripcion: "Ika Iwori simboliza pruebas mentales. Enseña autocontrol, concentración y disciplina. Indica que superar desafíos intelectuales fortalece la mente, la ética y asegura decisiones acertadas." },
  // 43
  { nombre: "Oturupon Iwori", combinacion: "10101001", descripcion: "Oturupon Iwori representa dificultades en el conocimiento. Enseña paciencia, aprendizaje y resiliencia. Indica que superar obstáculos mentales mediante reflexión y ética permite evolución personal y claridad de propósito." },
  // 44
  { nombre: "Otura Iwori", combinacion: "10111010", descripcion: "Otura Iwori simboliza guía espiritual en el aprendizaje. Enseña ética, disciplina y apertura de caminos. Indica que la sabiduría aplicada asegura decisiones acertadas y el avance en la vida material y espiritual." },
  // 45
  { nombre: "Irete Iwori", combinacion: "10100101", descripcion: "Irete Iwori representa destino marcado por la sabiduría. Enseña prudencia, ética y reflexión. Indica que la correcta aplicación del conocimiento permite cumplir objetivos y avanzar con seguridad." },
  // 46
  { nombre: "Oshe Iwori", combinacion: "10101101", descripcion: "Oshe Iwori simboliza amor guiado por inteligencia. Enseña equilibrio, armonía y claridad en relaciones. Indica que la ética y la sabiduría aseguran éxito afectivo y social." },
  // 47
  { nombre: "Ofun Iwori", combinacion: "10110011", descripcion: "Ofun Iwori representa transformación a través de la enseñanza ancestral. Enseña aprendizaje, reflexión y renovación. Indica que aplicar la sabiduría recibida asegura crecimiento y evolución." },
  // 48
  { nombre: "Eji Ogbe Meji", combinacion: "11111101", descripcion: "Eji Ogbe Meji simboliza inicio y acción con claridad y ética. Enseña a aprovechar oportunidades, actuar con determinación y mantener la integridad en cada paso. Indica prosperidad y guía espiritual constante." },
  // 49
  { nombre: "Oyeku Meji Meji", combinacion: "00000011", descripcion: "Oyeku Meji Meji representa introspección y final de ciclos. Enseña reflexión, paciencia y conexión con la espiritualidad. Indica que la preparación profunda permite enfrentar desafíos y avanzar con claridad." },
  // 50
  { nombre: "Iwori Meji Meji", combinacion: "10101011", descripcion: "Iwori Meji Meji simboliza conocimiento profundo y sabiduría aplicada. Enseña paciencia, estudio, discernimiento y acción ética. Indica que la correcta comprensión de la verdad y la ética asegura éxito y evolución espiritual." },
    // 51
  { nombre: "Odi Meji Meji", combinacion: "01010111", descripcion: "Odi Meji Meji simboliza renovación y cambios profundos. Enseña adaptación, resiliencia y aceptación de los ciclos de la vida. Indica que los retos permiten evolucionar, superar dificultades y alcanzar equilibrio espiritual y material." },
  // 52
  { nombre: "Irosun Meji Meji", combinacion: "11110011", descripcion: "Irosun Meji Meji representa advertencia ante peligros y necesidad de protección. Enseña prudencia, discernimiento y vigilancia espiritual. Indica que actuar con ética y precaución asegura seguridad y evita errores en decisiones importantes." },
  // 53
  { nombre: "Owonrin Meji Meji", combinacion: "00001111", descripcion: "Owonrin Meji Meji simboliza movimiento y adaptabilidad. Enseña a actuar con flexibilidad y aprovechar oportunidades. Indica que la acción consciente y la planificación aseguran éxito y superación de obstáculos." },
  // 54
  { nombre: "Obara Meji Meji", combinacion: "11100111", descripcion: "Obara Meji Meji representa comunicación sabia y liderazgo efectivo. Enseña a expresarse con claridad, ética y persuasión. Indica que la palabra bien usada abre caminos de éxito, relaciones positivas y crecimiento social." },
  // 55
  { nombre: "Okanran Meji Meji", combinacion: "10011111", descripcion: "Okanran Meji Meji simboliza conflictos y retos importantes. Enseña a tomar decisiones difíciles con coraje, ética y discernimiento. Indica que enfrentar desafíos fortalece la inteligencia emocional y asegura resultados justos." },
  // 56
  { nombre: "Ogunda Meji Meji", combinacion: "11001111", descripcion: "Ogunda Meji Meji representa esfuerzo constante y perseverancia. Enseña disciplina, paciencia y trabajo ético. Indica que la dedicación y la constancia aseguran resultados duraderos y crecimiento personal y colectivo." },
  // 57
  { nombre: "Osa Meji Meji", combinacion: "00110011", descripcion: "Osa Meji Meji simboliza destino y pruebas repentinas. Enseña a adaptarse, confiar en la guía espiritual y mantener equilibrio emocional. Indica que superar pruebas fortalece el carácter y asegura evolución y prosperidad." },
  // 58
  { nombre: "Ika Meji Meji", combinacion: "10100111", descripcion: "Ika Meji Meji representa pruebas de carácter y autocontrol. Enseña ética, paciencia y discernimiento. Indica que superar tentaciones y actuar con integridad asegura protección espiritual y cumplimiento del destino." },
  // 59
  { nombre: "Oturupon Meji Meji", combinacion: "01011011", descripcion: "Oturupon Meji Meji simboliza obstáculos temporales y lecciones profundas. Enseña resiliencia, paciencia y aprendizaje. Indica que enfrentar dificultades con constancia y fe permite crecimiento espiritual y éxito a largo plazo." },
  // 60
  { nombre: "Otura Meji Meji", combinacion: "11000011", descripcion: "Otura Meji Meji representa claridad y guía espiritual. Enseña equilibrio, discernimiento y acción ética. Indica que la conexión con la sabiduría ancestral asegura decisiones acertadas y cumplimiento de objetivos." },
  // 61
  { nombre: "Irete Meji Meji", combinacion: "00111111", descripcion: "Irete Meji Meji simboliza destino inevitable y cumplimiento del karma. Enseña aceptación, reflexión y aprendizaje. Indica que reconocer errores y actuar con ética permite evolución personal y prosperidad duradera." },
  // 62
  { nombre: "Oshe Meji Meji", combinacion: "11101011", descripcion: "Oshe Meji Meji representa amor, dulzura y armonía. Enseña expresión positiva, creatividad y cuidado de las relaciones. Indica que cultivar alegría, bondad y belleza genera bienestar espiritual y material." },
  // 63
  { nombre: "Ofun Meji Meji", combinacion: "00010111", descripcion: "Ofun Meji Meji simboliza cierre de ciclos y preparación para nuevos comienzos. Enseña desapego, reflexión y renovación. Indica que aceptar el cambio permite avanzar con sabiduría y aprovechar oportunidades futuras." },
  // 64
  { nombre: "Ogbe Yekun Meji", combinacion: "11111111", descripcion: "Ogbe Yekun Meji representa luz enfrentando oscuridad y discernimiento. Enseña claridad, ética y acción positiva. Indica que la confianza y la sabiduría guían hacia la prosperidad y la realización personal y espiritual." },
  // 65
  { nombre: "Iwori Ogbe Meji", combinacion: "10101111", descripcion: "Iwori Ogbe Meji simboliza sabiduría aplicada al progreso. Enseña paciencia, estudio profundo y acción estratégica. Indica que el conocimiento aplicado con ética supera limitaciones y abre caminos de éxito." },
  // 66
  { nombre: "Odi Ogbe Meji", combinacion: "01011111", descripcion: "Odi Ogbe Meji representa renovación y transformación espiritual y material. Enseña aceptación de cambios, adaptación y equilibrio. Indica que la evolución consciente trae armonía, prosperidad y crecimiento." },
  // 67
  { nombre: "Irosun Ogbe Meji", combinacion: "11110001", descripcion: "Irosun Ogbe Meji simboliza advertencia ante peligros y oportunidades de apertura. Enseña prudencia, vigilancia y discernimiento. Indica que la preparación y la ética aseguran seguridad y progreso sostenido." },
  // 68
  { nombre: "Owonrin Ogbe Meji", combinacion: "11111100", descripcion: "Owonrin Ogbe Meji representa movimiento con claridad y adaptabilidad. Enseña acción ética, planificación y flexibilidad. Indica que actuar con inteligencia asegura superación de obstáculos y éxito duradero." },
  // 69
  { nombre: "Obara Ogbe Meji", combinacion: "11111011", descripcion: "Obara Ogbe Meji simboliza comunicación persuasiva y liderazgo. Enseña ética, claridad y responsabilidad social. Indica que la palabra bien usada abre caminos de crecimiento y reconocimiento." },
  // 70
  { nombre: "Okanran Ogbe Meji", combinacion: "11100111", descripcion: "Okanran Ogbe Meji representa resolución de conflictos con inteligencia y coraje. Enseña prudencia, ética y análisis profundo. Indica que enfrentar retos asegura decisiones acertadas y desarrollo personal." },
  // 71
  { nombre: "Ogunda Ogbe Meji", combinacion: "11101110", descripcion: "Ogunda Ogbe Meji simboliza esfuerzo recompensado y progreso colectivo. Enseña disciplina, constancia y ética. Indica que la dedicación y el trabajo responsable generan estabilidad, crecimiento y prosperidad." },
  // 72
  { nombre: "Osa Ogbe Meji", combinacion: "11011111", descripcion: "Osa Ogbe Meji representa cambios repentinos hacia la abundancia. Enseña adaptación, prudencia y reflexión. Indica que actuar con sabiduría permite aprovechar oportunidades y lograr bienestar material y espiritual." },
  // 73
  { nombre: "Ika Ogbe Meji", combinacion: "11110101", descripcion: "Ika Ogbe Meji simboliza pruebas de fe y autocontrol. Enseña ética, paciencia y disciplina. Indica que superar desafíos con integridad asegura guía espiritual y cumplimiento del destino." },
  // 74
  { nombre: "Oturupon Ogbe Meji", combinacion: "11100110", descripcion: "Oturupon Ogbe Meji representa dificultades pasajeras y aprendizaje espiritual. Enseña resiliencia, paciencia y ética. Indica que superar obstáculos fortalece la mente, el carácter y la conexión con lo divino." },
  // 75
  { nombre: "Otura Ogbe Meji", combinacion: "11101001", descripcion: "Otura Ogbe Meji simboliza claridad y guía divina. Enseña equilibrio, discernimiento y acción ética. Indica que la conexión con la sabiduría ancestral asegura decisiones correctas y cumplimiento de objetivos." },
  // 76
  { nombre: "Irete Ogbe Meji", combinacion: "11110010", descripcion: "Irete Ogbe Meji representa cumplimiento del destino tras esfuerzo y sacrificio. Enseña perseverancia, ética y disciplina. Indica que la acción constante y correcta asegura éxito y reconocimiento." },
  // 77
  { nombre: "Oshe Ogbe Meji", combinacion: "11011011", descripcion: "Oshe Ogbe Meji simboliza dulzura, armonía y poder espiritual. Enseña creatividad, expresión positiva y cuidado de las relaciones. Indica que cultivar alegría y bondad genera bienestar integral." },
  // 78
  { nombre: "Ofun Ogbe Meji", combinacion: "11101000", descripcion: "Ofun Ogbe Meji representa transformación y cierre de ciclos. Enseña desapego, reflexión y renovación. Indica que aceptar el cambio permite avanzar con sabiduría y aprovechar nuevas oportunidades." },
  // 79
  { nombre: "Ogbe Iwori Meji", combinacion: "11111010", descripcion: "Ogbe Iwori Meji simboliza claridad, sabiduría y acción ética. Enseña discernimiento, aprendizaje y estrategia. Indica que la reflexión aplicada asegura decisiones acertadas y crecimiento personal." },
  // 80
  { nombre: "Oyeku Iwori Meji", combinacion: "00001010", descripcion: "Oyeku Iwori Meji representa oscuridad con sabiduría y recogimiento. Enseña introspección, paciencia y conexión espiritual. Indica que la reflexión profunda permite descubrir verdades ocultas y tomar decisiones acertadas." },
  // 81
  { nombre: "Iwori Oyeku Meji", combinacion: "10100000", descripcion: "Iwori Oyeku Meji simboliza conocimiento frente al vacío y discernimiento. Enseña paciencia, análisis y reflexión ética. Indica que enfrentar la incertidumbre con sabiduría asegura decisiones correctas y evolución personal." },
  // 82
  { nombre: "Odi Iwori Meji", combinacion: "01011000", descripcion: "Odi Iwori Meji representa renovación con sabiduría y transformación. Enseña adaptación, reflexión y acción ética. Indica que cambios internos fortalecen el espíritu y abren caminos de prosperidad." },
  // 83
  { nombre: "Irosun Iwori Meji", combinacion: "10110010", descripcion: "Irosun Iwori Meji simboliza advertencia ante engaños y necesidad de vigilancia. Enseña discernimiento, ética y prudencia. Indica que la preparación asegura evitar errores y tomar decisiones acertadas." },
  // 84
  { nombre: "Owonrin Iwori Meji", combinacion: "10101100", descripcion: "Owonrin Iwori Meji representa movimiento guiado por sabiduría. Enseña acción ética, planificación y adaptabilidad. Indica que actuar con inteligencia asegura progreso y superación de obstáculos." },
  // 85
  { nombre: "Obara Iwori Meji", combinacion: "10111100", descripcion: "Obara Iwori Meji simboliza palabra sabia y liderazgo ético. Enseña comunicación, claridad y responsabilidad. Indica que expresarse con justicia y ética abre caminos de crecimiento y reconocimiento social." },
  // 86
  { nombre: "Okanran Iwori Meji", combinacion: "10100111", descripcion: "Okanran Iwori Meji representa retos intelectuales y resolución de conflictos. Enseña análisis, ética y discernimiento. Indica que enfrentar desafíos mentales fortalece la inteligencia y asegura decisiones correctas." },
  // 87
  { nombre: "Ogunda Iwori Meji", combinacion: "10111001", descripcion: "Ogunda Iwori Meji simboliza trabajo iluminado por sabiduría y disciplina. Enseña esfuerzo ético, perseverancia y estrategia. Indica que la dedicación asegura éxito y crecimiento personal y colectivo." },
  // 88
  { nombre: "Osa Iwori Meji", combinacion: "10110101", descripcion: "Osa Iwori Meji representa destino revelado a través de la inteligencia. Enseña reflexión, ética y prudencia. Indica que actuar con sabiduría permite aprovechar oportunidades y cumplir con el propósito de vida." },
  // 89
  { nombre: "Ika Iwori Meji", combinacion: "10110001", descripcion: "Ika Iwori Meji simboliza pruebas mentales y autocontrol. Enseña disciplina, paciencia y ética. Indica que superar desafíos fortalece la mente y asegura decisiones acertadas." },
  // 90
  { nombre: "Oturupon Iwori Meji", combinacion: "10101001", descripcion: "Oturupon Iwori Meji representa dificultades en el conocimiento. Enseña resiliencia, reflexión y ética. Indica que superar obstáculos mentales asegura crecimiento, aprendizaje y claridad de propósito." },
  // 91
  { nombre: "Otura Iwori Meji", combinacion: "10111010", descripcion: "Otura Iwori Meji simboliza guía espiritual y apertura de caminos. Enseña discernimiento, ética y paciencia. Indica que la sabiduría aplicada asegura decisiones acertadas y avance en la vida material y espiritual." },
  // 92
  { nombre: "Irete Iwori Meji", combinacion: "10100101", descripcion: "Irete Iwori Meji representa destino marcado por la sabiduría y la prudencia. Enseña ética, reflexión y discernimiento. Indica que actuar con conocimiento asegura cumplimiento de objetivos y evolución." },
  // 93
  { nombre: "Oshe Iwori Meji", combinacion: "10101101", descripcion: "Oshe Iwori Meji simboliza amor guiado por inteligencia y ética. Enseña armonía, equilibrio y claridad en relaciones. Indica que cultivar la bondad y el amor asegura bienestar espiritual y social." },
  // 94
  { nombre: "Ofun Iwori Meji", combinacion: "10110011", descripcion: "Ofun Iwori Meji representa transformación mediante la enseñanza ancestral. Enseña aprendizaje, reflexión y renovación. Indica que aplicar la sabiduría recibida asegura evolución y crecimiento personal." },
  // 95
  { nombre: "Eji Ogbe Ogbe", combinacion: "11111110", descripcion: "Eji Ogbe Ogbe simboliza inicio y acción ética. Enseña determinación, reflexión y aprovechamiento de oportunidades. Indica prosperidad, guía espiritual y éxito sostenido." },
  // 96
  { nombre: "Oyeku Meji Ogbe", combinacion: "00000010", descripcion: "Oyeku Meji Ogbe representa introspección y transición de ciclos. Enseña paciencia, ética y conexión espiritual. Indica que la reflexión profunda permite enfrentar cambios con claridad y evolución." },
  // 97
  { nombre: "Iwori Meji Ogbe", combinacion: "10101010", descripcion: "Iwori Meji Ogbe simboliza sabiduría aplicada y conocimiento profundo. Enseña paciencia, análisis y acción ética. Indica que la correcta comprensión de la verdad asegura éxito, equilibrio y prosperidad." },
  // 98
  { nombre: "Odi Meji Ogbe", combinacion: "01010110", descripcion: "Odi Meji Ogbe representa renovación y transformación espiritual. Enseña adaptación, resiliencia y reflexión ética. Indica que los cambios traen crecimiento y fortalecen la conexión con lo divino." },
  // 99
  { nombre: "Irosun Meji Ogbe", combinacion: "11110010", descripcion: "Irosun Meji Ogbe simboliza advertencia y guía. Enseña prudencia, ética y reflexión. Indica que la preparación y la sabiduría aseguran seguridad y oportunidades de éxito." },
  // 100
  { nombre: "Owonrin Meji Ogbe", combinacion: "00001110", descripcion: "Owonrin Meji Ogbe representa acción y adaptabilidad guiadas por ética. Enseña planificación, flexibilidad y esfuerzo consciente. Indica que la correcta ejecución de acciones asegura progreso y superación de obstáculos." },
  // 101
  { nombre: "Obara Meji Ogbe", combinacion: "11100010", descripcion: "Obara Meji Ogbe representa palabra sabia y comunicación estratégica. Enseña liderazgo, ética y persuasión. Indica que expresarse con claridad y justicia abre caminos de éxito, relaciones positivas y crecimiento social." },
  // 102
  { nombre: "Okanran Meji Ogbe", combinacion: "10011110", descripcion: "Okanran Meji Ogbe simboliza retos y conflictos que requieren coraje y discernimiento. Enseña resolución ética, inteligencia emocional y paciencia. Indica que superar los desafíos asegura aprendizaje y fortalecimiento personal." },
  // 103
  { nombre: "Ogunda Meji Ogbe", combinacion: "11001110", descripcion: "Ogunda Meji Ogbe representa esfuerzo constante y disciplina aplicada. Enseña perseverancia, ética y planificación. Indica que la dedicación sostenida conduce a resultados duraderos y evolución en lo espiritual y material." },
  // 104
  { nombre: "Osa Meji Ogbe", combinacion: "00110010", descripcion: "Osa Meji Ogbe simboliza cambios repentinos y lecciones del destino. Enseña adaptación, reflexión y prudencia. Indica que superar pruebas fortalece la mente, el carácter y asegura prosperidad a largo plazo." },
  // 105
  { nombre: "Ika Meji Ogbe", combinacion: "10100110", descripcion: "Ika Meji Ogbe representa pruebas de carácter y autocontrol. Enseña paciencia, ética y resiliencia. Indica que actuar con integridad ante las tentaciones asegura protección espiritual y cumplimiento del destino." },
  // 106
  { nombre: "Oturupon Meji Ogbe", combinacion: "01011011", descripcion: "Oturupon Meji Ogbe simboliza dificultades pasajeras y aprendizaje profundo. Enseña reflexión, paciencia y perseverancia. Indica que superar obstáculos temporales fortalece el espíritu y conduce a éxito duradero." },
  // 107
  { nombre: "Otura Meji Ogbe", combinacion: "11000010", descripcion: "Otura Meji Ogbe representa claridad, equilibrio y guía espiritual. Enseña discernimiento, ética y acción consciente. Indica que la conexión con la sabiduría ancestral asegura decisiones acertadas y cumplimiento de objetivos." },
  // 108
  { nombre: "Irete Meji Ogbe", combinacion: "00111110", descripcion: "Irete Meji Ogbe simboliza destino inevitable y cumplimiento del karma. Enseña aceptación, ética y aprendizaje. Indica que reconocer errores y actuar correctamente asegura evolución y bienestar integral." },
  // 109
  { nombre: "Oshe Meji Ogbe", combinacion: "11101011", descripcion: "Oshe Meji Ogbe representa amor, armonía y expresión positiva. Enseña cuidado de relaciones, creatividad y dulzura. Indica que cultivar bondad y alegría genera bienestar espiritual, emocional y social." },
  // 110
  { nombre: "Ofun Meji Ogbe", combinacion: "00010110", descripcion: "Ofun Meji Ogbe simboliza cierre de ciclos y preparación para nuevos comienzos. Enseña desapego, reflexión y renovación. Indica que aceptar los cambios permite avanzar con sabiduría y aprovechar oportunidades futuras." },
  // 111
  { nombre: "Ogbe Yekun Iwori", combinacion: "11111101", descripcion: "Ogbe Yekun Iwori representa claridad y discernimiento en tiempos de transición. Enseña ética, reflexión y acción responsable. Indica que tomar decisiones conscientes asegura prosperidad y guía espiritual." },
  // 112
  { nombre: "Iwori Ogbe Iwori", combinacion: "10101110", descripcion: "Iwori Ogbe Iwori simboliza sabiduría aplicada y conocimiento profundo. Enseña paciencia, análisis y estrategia. Indica que la correcta comprensión de la verdad permite superar limitaciones y alcanzar éxito." },
  // 113
  { nombre: "Odi Ogbe Iwori", combinacion: "01011110", descripcion: "Odi Ogbe Iwori representa renovación espiritual y material. Enseña adaptación, resiliencia y ética. Indica que aceptar cambios y actuar con sabiduría fortalece la conexión con lo divino y asegura prosperidad." },
  // 114
  { nombre: "Irosun Ogbe Iwori", combinacion: "11110011", descripcion: "Irosun Ogbe Iwori simboliza advertencia y oportunidad de crecimiento. Enseña prudencia, ética y reflexión. Indica que prepararse y actuar con ética asegura seguridad y éxito sostenido." },
  // 115
  { nombre: "Owonrin Ogbe Iwori", combinacion: "11111101", descripcion: "Owonrin Ogbe Iwori representa acción consciente guiada por sabiduría. Enseña planificación, adaptabilidad y ética. Indica que actuar con inteligencia permite superar obstáculos y lograr objetivos." },
  // 116
  { nombre: "Obara Ogbe Iwori", combinacion: "11111010", descripcion: "Obara Ogbe Iwori simboliza comunicación sabia y liderazgo ético. Enseña claridad, persuasión y responsabilidad social. Indica que expresarse correctamente abre caminos de reconocimiento y éxito." },
  // 117
  { nombre: "Okanran Ogbe Iwori", combinacion: "11100110", descripcion: "Okanran Ogbe Iwori representa retos y conflictos que requieren discernimiento. Enseña ética, inteligencia emocional y paciencia. Indica que superar desafíos asegura aprendizaje y fortalecimiento personal." },
  // 118
  { nombre: "Ogunda Ogbe Iwori", combinacion: "11101101", descripcion: "Ogunda Ogbe Iwori simboliza esfuerzo y disciplina iluminada por sabiduría. Enseña constancia, ética y planificación. Indica que la dedicación sostenida asegura éxito, estabilidad y prosperidad." },
  // 119
  { nombre: "Osa Ogbe Iwori", combinacion: "11011110", descripcion: "Osa Ogbe Iwori representa cambios repentinos y lecciones del destino. Enseña adaptación, prudencia y reflexión. Indica que superar pruebas fortalece el carácter y asegura bienestar espiritual y material." },
  // 120
  { nombre: "Ika Ogbe Iwori", combinacion: "11110110", descripcion: "Ika Ogbe Iwori simboliza pruebas de carácter y autocontrol. Enseña ética, paciencia y resiliencia. Indica que superar desafíos con integridad asegura guía espiritual y cumplimiento del destino." },
  // 121
  { nombre: "Oturupon Ogbe Iwori", combinacion: "11100111", descripcion: "Oturupon Ogbe Iwori representa dificultades temporales y aprendizaje profundo. Enseña paciencia, reflexión y ética. Indica que superar obstáculos fortalece el espíritu y conduce a crecimiento duradero." },
  // 122
  { nombre: "Otura Ogbe Iwori", combinacion: "11101010", descripcion: "Otura Ogbe Iwori simboliza claridad, equilibrio y guía espiritual. Enseña discernimiento, ética y acción consciente. Indica que la sabiduría ancestral asegura decisiones acertadas y cumplimiento de objetivos." },
  // 123
  { nombre: "Irete Ogbe Iwori", combinacion: "11110011", descripcion: "Irete Ogbe Iwori representa cumplimiento del destino mediante esfuerzo y sabiduría. Enseña perseverancia, ética y disciplina. Indica que actuar con constancia asegura éxito y reconocimiento." },
  // 124
  { nombre: "Oshe Ogbe Iwori", combinacion: "11011010", descripcion: "Oshe Ogbe Iwori simboliza armonía, amor y expresión positiva. Enseña cuidado de relaciones, creatividad y dulzura. Indica que cultivar bondad y alegría genera bienestar integral." },
  // 125
  { nombre: "Ofun Ogbe Iwori", combinacion: "11101001", descripcion: "Ofun Ogbe Iwori representa transformación mediante aprendizaje ancestral. Enseña reflexión, renovación y ética. Indica que aplicar la sabiduría asegura evolución y crecimiento personal." },
  // 126
  { nombre: "Eji Ogbe Iwori", combinacion: "11111101", descripcion: "Eji Ogbe Iwori simboliza inicio, acción ética y claridad. Enseña determinación, reflexión y aprovechamiento de oportunidades. Indica prosperidad, guía espiritual y éxito sostenido." },
  // 127
  { nombre: "Oyeku Meji Iwori", combinacion: "00000010", descripcion: "Oyeku Meji Iwori representa introspección y transición de ciclos. Enseña paciencia, ética y conexión espiritual. Indica que la reflexión permite enfrentar cambios con claridad y evolución." },
  // 128
  { nombre: "Iwori Meji Iwori", combinacion: "10101010", descripcion: "Iwori Meji Iwori simboliza conocimiento profundo y sabiduría aplicada. Enseña análisis, ética y paciencia. Indica que la comprensión correcta asegura éxito, equilibrio y prosperidad." },
  // 129
  { nombre: "Odi Meji Iwori", combinacion: "01010110", descripcion: "Odi Meji Iwori representa renovación y transformación. Enseña adaptación, resiliencia y ética. Indica que los cambios traen crecimiento, fortalecimiento espiritual y prosperidad." },
  // 130
  { nombre: "Irosun Meji Iwori", combinacion: "11110010", descripcion: "Irosun Meji Iwori simboliza advertencia y guía. Enseña prudencia, ética y reflexión. Indica que prepararse y actuar con sabiduría asegura seguridad y éxito sostenible." },
  // 131
  { nombre: "Owonrin Meji Iwori", combinacion: "00001110", descripcion: "Owonrin Meji Iwori representa acción y adaptabilidad guiadas por ética. Enseña planificación, flexibilidad y esfuerzo consciente. Indica que actuar correctamente asegura progreso y superación de obstáculos." },
  // 132
  { nombre: "Obara Meji Iwori", combinacion: "11100010", descripcion: "Obara Meji Iwori simboliza comunicación sabia y liderazgo ético. Enseña claridad, persuasión y responsabilidad. Indica que expresarse con justicia abre caminos de reconocimiento y éxito." },
  // 133
  { nombre: "Okanran Meji Iwori", combinacion: "10011110", descripcion: "Okanran Meji Iwori representa retos y conflictos que requieren discernimiento. Enseña ética, inteligencia emocional y paciencia. Indica que superar desafíos asegura aprendizaje y fortalecimiento personal." },
  // 134
  { nombre: "Ogunda Meji Iwori", combinacion: "11001110", descripcion: "Ogunda Meji Iwori simboliza esfuerzo y disciplina iluminada por sabiduría. Enseña constancia, ética y planificación. Indica que la dedicación sostenida asegura éxito, estabilidad y prosperidad." },
  // 135
  { nombre: "Osa Meji Iwori", combinacion: "00110010", descripcion: "Osa Meji Iwori representa cambios repentinos y lecciones del destino. Enseña adaptación, prudencia y reflexión. Indica que superar pruebas fortalece el carácter y asegura bienestar espiritual y material." },
  // 136
  { nombre: "Ika Meji Iwori", combinacion: "10100110", descripcion: "Ika Meji Iwori simboliza pruebas de carácter y autocontrol. Enseña ética, paciencia y resiliencia. Indica que superar desafíos con integridad asegura guía espiritual y cumplimiento del destino." },
  // 137
  { nombre: "Oturupon Meji Iwori", combinacion: "01011011", descripcion: "Oturupon Meji Iwori representa dificultades temporales y aprendizaje profundo. Enseña paciencia, reflexión y ética. Indica que superar obstáculos fortalece el espíritu y conduce a crecimiento duradero." },
  // 138
  { nombre: "Otura Meji Iwori", combinacion: "11000010", descripcion: "Otura Meji Iwori simboliza claridad, equilibrio y guía espiritual. Enseña discernimiento, ética y acción consciente. Indica que la sabiduría ancestral asegura decisiones acertadas y cumplimiento de objetivos." },
  // 139
  { nombre: "Irete Meji Iwori", combinacion: "00111110", descripcion: "Irete Meji Iwori representa destino inevitable y cumplimiento del karma. Enseña aceptación, ética y aprendizaje. Indica que reconocer errores y actuar correctamente asegura evolución y bienestar integral." },
  // 140
  { nombre: "Oshe Meji Iwori", combinacion: "11101011", descripcion: "Oshe Meji Iwori simboliza amor, armonía y expresión positiva. Enseña cuidado de relaciones, creatividad y dulzura. Indica que cultivar bondad y alegría genera bienestar integral." },
  // 141
  { nombre: "Ofun Meji Iwori", combinacion: "00010110", descripcion: "Ofun Meji Iwori representa cierre de ciclos y preparación para nuevos comienzos. Enseña desapego, reflexión y renovación. Indica que aceptar los cambios permite avanzar con sabiduría y aprovechar oportunidades futuras." },
  // 142
  { nombre: "Ogbe Yekun Ogbe", combinacion: "11111101", descripcion: "Ogbe Yekun Ogbe simboliza claridad y discernimiento en tiempos de transición. Enseña ética, reflexión y acción responsable. Indica que tomar decisiones conscientes asegura prosperidad y guía espiritual." },
  // 143
  { nombre: "Iwori Ogbe Ogbe", combinacion: "10101110", descripcion: "Iwori Ogbe Ogbe representa sabiduría aplicada y conocimiento profundo. Enseña paciencia, análisis y estrategia. Indica que la correcta comprensión de la verdad permite superar limitaciones y alcanzar éxito." },
  // 144
  { nombre: "Odi Ogbe Ogbe", combinacion: "01011110", descripcion: "Odi Ogbe Ogbe simboliza renovación espiritual y material. Enseña adaptación, resiliencia y ética. Indica que aceptar cambios y actuar con sabiduría fortalece la conexión con lo divino y asegura prosperidad." },
  // 145
  { nombre: "Irosun Ogbe Ogbe", combinacion: "11110011", descripcion: "Irosun Ogbe Ogbe representa advertencia y oportunidad de crecimiento. Enseña prudencia, ética y reflexión. Indica que prepararse y actuar con ética asegura seguridad y éxito sostenido." },
  // 146
  { nombre: "Owonrin Ogbe Ogbe", combinacion: "11111101", descripcion: "Owonrin Ogbe Ogbe simboliza acción consciente guiada por sabiduría. Enseña planificación, adaptabilidad y ética. Indica que actuar con inteligencia permite superar obstáculos y lograr objetivos." },
  // 147
  { nombre: "Obara Ogbe Ogbe", combinacion: "11111010", descripcion: "Obara Ogbe Ogbe representa comunicación sabia y liderazgo ético. Enseña claridad, persuasión y responsabilidad social. Indica que expresarse correctamente abre caminos de reconocimiento y éxito." },
  // 148
  { nombre: "Okanran Ogbe Ogbe", combinacion: "11100110", descripcion: "Okanran Ogbe Ogbe simboliza retos y conflictos que requieren discernimiento. Enseña ética, inteligencia emocional y paciencia. Indica que superar desafíos asegura aprendizaje y fortalecimiento personal." },
  // 149
  { nombre: "Ogunda Ogbe Ogbe", combinacion: "11101101", descripcion: "Ogunda Ogbe Ogbe representa esfuerzo y disciplina iluminada por sabiduría. Enseña constancia, ética y planificación. Indica que la dedicación sostenida asegura éxito, estabilidad y prosperidad." },
  // 150
  { nombre: "Osa Ogbe Ogbe", combinacion: "11011110", descripcion: "Osa Ogbe Ogbe simboliza cambios repentinos y lecciones del destino. Enseña adaptación, prudencia y reflexión. Indica que superar pruebas fortalece el carácter y asegura bienestar espiritual y material." },
   // 151
  { nombre: "Ika Ogbe Ogbe", combinacion: "11110111", descripcion: "Ika Ogbe Ogbe representa pruebas de carácter y autocontrol profundas. Enseña paciencia, ética, disciplina y resiliencia. Indica que superar desafíos con integridad garantiza guía espiritual, evolución personal y equilibrio en la vida." },
  // 152
  { nombre: "Oturupon Ogbe Ogbe", combinacion: "11100111", descripcion: "Oturupon Ogbe Ogbe simboliza obstáculos temporales que requieren reflexión profunda. Enseña paciencia, sabiduría y perseverancia. Indica que superar dificultades fortalece el espíritu y asegura éxito y crecimiento sostenido." },
  // 153
  { nombre: "Otura Ogbe Ogbe", combinacion: "11101010", descripcion: "Otura Ogbe Ogbe representa claridad mental, equilibrio emocional y guía espiritual. Enseña discernimiento, ética y acción consciente. Indica que la conexión con la sabiduría ancestral garantiza decisiones acertadas y cumplimiento de objetivos." },
  // 154
  { nombre: "Irete Ogbe Ogbe", combinacion: "11110011", descripcion: "Irete Ogbe Ogbe simboliza destino inevitable y cumplimiento del karma. Enseña aceptación, ética y aprendizaje. Indica que reconocer errores y actuar correctamente asegura evolución, éxito y bienestar integral." },
  // 155
  { nombre: "Oshe Ogbe Ogbe", combinacion: "11011011", descripcion: "Oshe Ogbe Ogbe representa armonía, amor y expresión positiva en la vida cotidiana. Enseña cuidado de relaciones, creatividad, dulzura y empatía. Indica que cultivar bondad y alegría genera bienestar integral y equilibrio espiritual." },
  // 156
  { nombre: "Ofun Ogbe Ogbe", combinacion: "11101001", descripcion: "Ofun Ogbe Ogbe simboliza cierre de ciclos, renovación y preparación para nuevos comienzos. Enseña desapego, reflexión y renovación ética. Indica que aceptar cambios con sabiduría permite avanzar, aprovechar oportunidades y evolucionar." },
  // 157
  { nombre: "Eji Ogbe Ogbe", combinacion: "11111101", descripcion: "Eji Ogbe Ogbe representa inicio, acción ética y claridad espiritual. Enseña determinación, reflexión, sabiduría y aprovechamiento de oportunidades. Indica que la acción correcta y guiada por la ética asegura prosperidad, guía y éxito sostenido." },
  // 158
  { nombre: "Oyeku Meji Ogbe", combinacion: "00000010", descripcion: "Oyeku Meji Ogbe simboliza introspección profunda y transición de ciclos. Enseña paciencia, ética, análisis y conexión espiritual. Indica que la reflexión y el recogimiento permiten enfrentar cambios con claridad y alcanzar evolución." },
  // 159
  { nombre: "Iwori Meji Ogbe", combinacion: "10101010", descripcion: "Iwori Meji Ogbe representa conocimiento profundo, sabiduría y percepción de la verdad. Enseña análisis, paciencia, ética y disciplina. Indica que la comprensión correcta y aplicada asegura éxito, equilibrio y prosperidad duradera." },
  // 160
  { nombre: "Odi Meji Ogbe", combinacion: "01010110", descripcion: "Odi Meji Ogbe simboliza renovación espiritual y material. Enseña adaptación, resiliencia, ética y estrategia. Indica que aceptar cambios y actuar con sabiduría fortalece la conexión con lo divino y asegura prosperidad y éxito sostenido." },
  // 161
  { nombre: "Irosun Meji Ogbe", combinacion: "11110010", descripcion: "Irosun Meji Ogbe representa advertencia, oportunidad de aprendizaje y crecimiento espiritual. Enseña prudencia, ética, reflexión y preparación. Indica que anticiparse y actuar con sabiduría asegura seguridad, éxito y evolución personal." },
  // 162
  { nombre: "Owonrin Meji Ogbe", combinacion: "00001110", descripcion: "Owonrin Meji Ogbe simboliza acción consciente, adaptabilidad y resolución de problemas. Enseña planificación, ética, esfuerzo constante y flexibilidad. Indica que actuar correctamente garantiza progreso, superación y éxito sostenido." },
  // 163
  { nombre: "Obara Meji Ogbe", combinacion: "11100010", descripcion: "Obara Meji Ogbe representa comunicación sabia, liderazgo ético y persuasión positiva. Enseña claridad, responsabilidad y planificación estratégica. Indica que expresarse correctamente y con justicia abre caminos de reconocimiento y éxito social." },
  // 164
  { nombre: "Okanran Meji Ogbe", combinacion: "10011110", descripcion: "Okanran Meji Ogbe simboliza retos y conflictos que requieren discernimiento profundo y paciencia. Enseña ética, inteligencia emocional, tolerancia y perseverancia. Indica que superar obstáculos asegura aprendizaje y crecimiento personal." },
  // 165
  { nombre: "Ogunda Meji Ogbe", combinacion: "11001110", descripcion: "Ogunda Meji Ogbe representa esfuerzo, disciplina y acción guiada por la sabiduría. Enseña constancia, ética, estrategia y perseverancia. Indica que la dedicación sostenida asegura estabilidad, éxito y evolución tanto material como espiritual." },
  // 166
  { nombre: "Osa Meji Ogbe", combinacion: "00110010", descripcion: "Osa Meji Ogbe simboliza cambios repentinos, desafíos del destino y lecciones profundas. Enseña adaptación, prudencia, reflexión y ética. Indica que superar pruebas fortalece el carácter, asegura bienestar espiritual y permite evolución integral." },
  // 167
  { nombre: "Ika Meji Ogbe", combinacion: "10100110", descripcion: "Ika Meji Ogbe representa pruebas de carácter, autocontrol y ética aplicada. Enseña paciencia, disciplina, reflexión y resiliencia. Indica que actuar con integridad ante desafíos garantiza protección espiritual, guía y cumplimiento del destino." },
  // 168
  { nombre: "Oturupon Meji Ogbe", combinacion: "01011011", descripcion: "Oturupon Meji Ogbe simboliza obstáculos temporales y aprendizaje profundo. Enseña reflexión, paciencia, ética y perseverancia. Indica que superar dificultades fortalece el espíritu, asegura éxito y desarrollo espiritual y material." },
  // 169
  { nombre: "Otura Meji Ogbe", combinacion: "11000010", descripcion: "Otura Meji Ogbe representa claridad, equilibrio y guía espiritual. Enseña discernimiento, ética, acción consciente y toma de decisiones correcta. Indica que la conexión con la sabiduría ancestral garantiza cumplimiento de objetivos y éxito sostenido." },
  // 170
  { nombre: "Irete Meji Ogbe", combinacion: "00111110", descripcion: "Irete Meji Ogbe simboliza destino inevitable, cumplimiento del karma y evolución. Enseña aceptación, ética, disciplina y aprendizaje. Indica que actuar correctamente y con reflexión asegura crecimiento, bienestar integral y éxito duradero." },
  // 171
  { nombre: "Oshe Meji Ogbe", combinacion: "11101011", descripcion: "Oshe Meji Ogbe representa amor, armonía, dulzura y expresión positiva en la vida diaria. Enseña cuidado de relaciones, empatía, creatividad y ética. Indica que cultivar bondad, alegría y equilibrio genera bienestar integral y felicidad espiritual." },
  // 172
  { nombre: "Ofun Meji Ogbe", combinacion: "00010110", descripcion: "Ofun Meji Ogbe simboliza cierre de ciclos, transformación y preparación para nuevos comienzos. Enseña desapego, reflexión, renovación y ética. Indica que aceptar cambios con sabiduría permite avanzar, aprovechar oportunidades y evolucionar plenamente." },
  // 173
  { nombre: "Eji Ogbe Ogbe", combinacion: "11111101", descripcion: "Eji Ogbe Ogbe representa inicio, acción ética y claridad espiritual. Enseña determinación, reflexión, sabiduría y aprovechamiento de oportunidades. Indica que la acción correcta garantiza prosperidad, guía espiritual y éxito sostenido en todos los aspectos." },
  // 174
  { nombre: "Oyeku Meji Ogbe", combinacion: "00000010", descripcion: "Oyeku Meji Ogbe simboliza introspección, transición de ciclos y reflexión profunda. Enseña paciencia, ética, conexión espiritual y análisis. Indica que el recogimiento y la meditación permiten enfrentar cambios con claridad y alcanzar evolución integral." },
  // 175
  { nombre: "Iwori Meji Ogbe", combinacion: "10101010", descripcion: "Iwori Meji Ogbe representa conocimiento profundo, sabiduría aplicada y percepción de la verdad. Enseña análisis, ética, paciencia y disciplina. Indica que la correcta comprensión y aplicación de la verdad asegura éxito, equilibrio y prosperidad sostenida." },
  // 176
  { nombre: "Odi Meji Ogbe", combinacion: "01010110", descripcion: "Odi Meji Ogbe simboliza renovación espiritual y material, adaptabilidad y resiliencia. Enseña ética, estrategia, planificación y acción consciente. Indica que aceptar cambios y actuar con sabiduría fortalece la conexión con lo divino y asegura prosperidad." },
  // 177
  { nombre: "Irosun Meji Ogbe", combinacion: "11110010", descripcion: "Irosun Meji Ogbe representa advertencia, oportunidad de aprendizaje y crecimiento espiritual. Enseña prudencia, ética, reflexión y preparación. Indica que anticiparse y actuar con sabiduría asegura seguridad, éxito y evolución personal." },
  // 178
  { nombre: "Owonrin Meji Ogbe", combinacion: "00001110", descripcion: "Owonrin Meji Ogbe simboliza acción consciente, adaptabilidad y resolución de problemas. Enseña planificación, ética, esfuerzo constante y flexibilidad. Indica que actuar correctamente garantiza progreso, superación y éxito sostenido." },
  // 179
  { nombre: "Obara Meji Ogbe", combinacion: "11100010", descripcion: "Obara Meji Ogbe representa comunicación sabia, liderazgo ético y persuasión positiva. Enseña claridad, responsabilidad y planificación estratégica. Indica que expresarse correctamente y con justicia abre caminos de reconocimiento y éxito social." },
  // 180
  { nombre: "Okanran Meji Ogbe", combinacion: "10011110", descripcion: "Okanran Meji Ogbe simboliza retos y conflictos que requieren discernimiento profundo y paciencia. Enseña ética, inteligencia emocional, tolerancia y perseverancia. Indica que superar obstáculos asegura aprendizaje y crecimiento personal." },
  // 181
  { nombre: "Ogunda Meji Ogbe", combinacion: "11001110", descripcion: "Ogunda Meji Ogbe representa esfuerzo, disciplina y acción guiada por la sabiduría. Enseña constancia, ética, estrategia y perseverancia. Indica que la dedicación sostenida asegura estabilidad, éxito y evolución tanto material como espiritual." },
  // 182
  { nombre: "Osa Meji Ogbe", combinacion: "00110010", descripcion: "Osa Meji Ogbe simboliza cambios repentinos, desafíos del destino y lecciones profundas. Enseña adaptación, prudencia, reflexión y ética. Indica que superar pruebas fortalece el carácter, asegura bienestar espiritual y permite evolución integral." },
  // 183
  { nombre: "Ika Meji Ogbe", combinacion: "10100110", descripcion: "Ika Meji Ogbe representa pruebas de carácter, autocontrol y ética aplicada. Enseña paciencia, disciplina, reflexión y resiliencia. Indica que actuar con integridad ante desafíos garantiza protección espiritual, guía y cumplimiento del destino." },
  // 184
  { nombre: "Oturupon Meji Ogbe", combinacion: "01011011", descripcion: "Oturupon Meji Ogbe simboliza obstáculos temporales y aprendizaje profundo. Enseña reflexión, paciencia, ética y perseverancia. Indica que superar dificultades fortalece el espíritu, asegura éxito y desarrollo espiritual y material." },
  // 185
  { nombre: "Otura Meji Ogbe", combinacion: "11000010", descripcion: "Otura Meji Ogbe representa claridad, equilibrio y guía espiritual. Enseña discernimiento, ética, acción consciente y toma de decisiones correcta. Indica que la conexión con la sabiduría ancestral garantiza cumplimiento de objetivos y éxito sostenido." },
  // 186
  { nombre: "Irete Meji Ogbe", combinacion: "00111110", descripcion: "Irete Meji Ogbe simboliza destino inevitable, cumplimiento del karma y evolución. Enseña aceptación, ética, disciplina y aprendizaje. Indica que actuar correctamente y con reflexión asegura crecimiento, bienestar integral y éxito duradero." },
  // 187
  { nombre: "Oshe Meji Ogbe", combinacion: "11101011", descripcion: "Oshe Meji Ogbe representa amor, armonía, dulzura y expresión positiva en la vida diaria. Enseña cuidado de relaciones, empatía, creatividad y ética. Indica que cultivar bondad, alegría y equilibrio genera bienestar integral y felicidad espiritual." },
  // 188
  { nombre: "Ofun Meji Ogbe", combinacion: "00010110", descripcion: "Ofun Meji Ogbe simboliza cierre de ciclos, transformación y preparación para nuevos comienzos. Enseña desapego, reflexión, renovación y ética. Indica que aceptar cambios con sabiduría permite avanzar, aprovechar oportunidades y evolucionar plenamente." },
  // 189
  { nombre: "Eji Ogbe Ogbe", combinacion: "11111101", descripcion: "Eji Ogbe Ogbe representa inicio, acción ética y claridad espiritual. Enseña determinación, reflexión, sabiduría y aprovechamiento de oportunidades. Indica que la acción correcta garantiza prosperidad, guía espiritual y éxito sostenido en todos los aspectos." },
  // 190
  { nombre: "Oyeku Meji Ogbe", combinacion: "00000010", descripcion: "Oyeku Meji Ogbe simboliza introspección, transición de ciclos y reflexión profunda. Enseña paciencia, ética, conexión espiritual y análisis. Indica que el recogimiento y la meditación permiten enfrentar cambios con claridad y alcanzar evolución integral." },
  // 191
  { nombre: "Iwori Meji Ogbe", combinacion: "10101010", descripcion: "Iwori Meji Ogbe representa conocimiento profundo, sabiduría aplicada y percepción de la verdad. Enseña análisis, ética, paciencia y disciplina. Indica que la correcta comprensión y aplicación de la verdad asegura éxito, equilibrio y prosperidad sostenida." },
  // 192
  { nombre: "Odi Meji Ogbe", combinacion: "01010110", descripcion: "Odi Meji Ogbe simboliza renovación espiritual y material, adaptabilidad y resiliencia. Enseña ética, estrategia, planificación y acción consciente. Indica que aceptar cambios y actuar con sabiduría fortalece la conexión con lo divino y asegura prosperidad." },
  // 193
  { nombre: "Irosun Meji Ogbe", combinacion: "11110010", descripcion: "Irosun Meji Ogbe representa advertencia, oportunidad de aprendizaje y crecimiento espiritual. Enseña prudencia, ética, reflexión y preparación. Indica que anticiparse y actuar con sabiduría asegura seguridad, éxito y evolución personal." },
  // 194
  { nombre: "Owonrin Meji Ogbe", combinacion: "00001110", descripcion: "Owonrin Meji Ogbe simboliza acción consciente, adaptabilidad y resolución de problemas. Enseña planificación, ética, esfuerzo constante y flexibilidad. Indica que actuar correctamente garantiza progreso, superación y éxito sostenido." },
  // 195
  { nombre: "Obara Meji Ogbe", combinacion: "11100010", descripcion: "Obara Meji Ogbe representa comunicación sabia, liderazgo ético y persuasión positiva. Enseña claridad, responsabilidad y planificación estratégica. Indica que expresarse correctamente y con justicia abre caminos de reconocimiento y éxito social." },
  // 196
  { nombre: "Okanran Meji Ogbe", combinacion: "10011110", descripcion: "Okanran Meji Ogbe simboliza retos y conflictos que requieren discernimiento profundo y paciencia. Enseña ética, inteligencia emocional, tolerancia y perseverancia. Indica que superar obstáculos asegura aprendizaje y crecimiento personal." },
  // 197
  { nombre: "Ogunda Meji Ogbe", combinacion: "11001110", descripcion: "Ogunda Meji Ogbe representa esfuerzo, disciplina y acción guiada por la sabiduría. Enseña constancia, ética, estrategia y perseverancia. Indica que la dedicación sostenida asegura estabilidad, éxito y evolución tanto material como espiritual." },
  // 198
  { nombre: "Osa Meji Ogbe", combinacion: "00110010", descripcion: "Osa Meji Ogbe simboliza cambios repentinos, desafíos del destino y lecciones profundas. Enseña adaptación, prudencia, reflexión y ética. Indica que superar pruebas fortalece el carácter, asegura bienestar espiritual y permite evolución integral." },
  // 199
  { nombre: "Ika Meji Ogbe", combinacion: "10100110", descripcion: "Ika Meji Ogbe representa pruebas de carácter, autocontrol y ética aplicada. Enseña paciencia, disciplina, reflexión y resiliencia. Indica que actuar con integridad ante desafíos garantiza protección espiritual, guía y cumplimiento del destino." },
  // 200
  { nombre: "Oturupon Meji Ogbe", combinacion: "01011011", descripcion: "Oturupon Meji Ogbe simboliza obstáculos temporales y aprendizaje profundo. Enseña reflexión, paciencia, ética y perseverancia. Indica que superar dificultades fortalece el espíritu, asegura éxito y desarrollo espiritual y material." },
  // 201
  { nombre: "Otura Meji Ogbe", combinacion: "11000011", descripcion: "Otura Meji Ogbe representa claridad mental, guía espiritual y equilibrio en la toma de decisiones. Enseña reflexión profunda, paciencia y discernimiento ético. Indica que actuar con sabiduría asegura éxito, armonía y protección espiritual en todos los aspectos de la vida." },
  // 202
  { nombre: "Irete Meji Ogbe", combinacion: "00111111", descripcion: "Irete Meji Ogbe simboliza el cumplimiento del destino y la evolución del espíritu. Enseña aceptación, disciplina y ética. Indica que reconocer las lecciones de la vida y actuar con rectitud conduce a prosperidad, guía espiritual y bienestar integral." },
  // 203
  { nombre: "Oshe Meji Ogbe", combinacion: "11101100", descripcion: "Oshe Meji Ogbe representa amor, armonía y relaciones equilibradas. Enseña empatía, cuidado de los vínculos y creatividad positiva. Indica que cultivar la bondad y la alegría fortalece la vida emocional, asegura protección espiritual y prosperidad en la vida cotidiana." },
  // 204
  { nombre: "Ofun Meji Ogbe", combinacion: "00010111", descripcion: "Ofun Meji Ogbe simboliza cierre de ciclos y transformación profunda. Enseña desapego, reflexión, renovación y ética. Indica que aceptar los cambios con sabiduría permite evolucionar, aprovechar oportunidades y alcanzar la plenitud espiritual y material." },
  // 205
  { nombre: "Eji Ogbe Ogbe", combinacion: "11111110", descripcion: "Eji Ogbe Ogbe representa inicios poderosos y claridad espiritual. Enseña determinación, reflexión ética y acción correcta. Indica que actuar con integridad garantiza éxito, guía espiritual y prosperidad duradera, así como la capacidad de superar obstáculos con sabiduría." },
  // 206
  { nombre: "Oyeku Meji Ogbe", combinacion: "00000011", descripcion: "Oyeku Meji Ogbe simboliza introspección, transición y meditación profunda. Enseña paciencia, disciplina y conexión espiritual. Indica que el recogimiento y la reflexión consciente permiten enfrentar cambios con claridad, obtener guía divina y evolucionar integralmente." },
  // 207
  { nombre: "Iwori Meji Ogbe", combinacion: "10101100", descripcion: "Iwori Meji Ogbe representa conocimiento profundo y percepción de la verdad. Enseña análisis, ética, paciencia y disciplina. Indica que comprender y aplicar la verdad correctamente asegura éxito, equilibrio espiritual y prosperidad sostenida." },
  // 208
  { nombre: "Odi Meji Ogbe", combinacion: "01011100", descripcion: "Odi Meji Ogbe simboliza renovación, adaptabilidad y resiliencia. Enseña estrategia, planificación y acción ética. Indica que aceptar cambios y actuar con sabiduría fortalece la conexión con lo divino, asegurando bienestar, prosperidad y éxito sostenido." },
  // 209
  { nombre: "Irosun Meji Ogbe", combinacion: "11110100", descripcion: "Irosun Meji Ogbe representa advertencia, aprendizaje y crecimiento espiritual. Enseña prudencia, ética, reflexión y preparación. Indica que anticiparse y actuar con conciencia asegura seguridad, éxito y evolución personal en todos los ámbitos de la vida." },
  // 210
  { nombre: "Owonrin Meji Ogbe", combinacion: "00001111", descripcion: "Owonrin Meji Ogbe simboliza acción consciente, adaptabilidad y resolución de problemas. Enseña planificación, ética, esfuerzo constante y flexibilidad. Indica que actuar correctamente garantiza progreso, superación y éxito sostenido en la vida material y espiritual." },
  // 211
  { nombre: "Obara Meji Ogbe", combinacion: "11100011", descripcion: "Obara Meji Ogbe representa comunicación sabia, liderazgo ético y persuasión positiva. Enseña claridad, responsabilidad y estrategia. Indica que expresarse con justicia y sabiduría abre caminos de reconocimiento, éxito social y bienestar espiritual." },
  // 212
  { nombre: "Okanran Meji Ogbe", combinacion: "10011111", descripcion: "Okanran Meji Ogbe simboliza retos y conflictos que requieren discernimiento y paciencia. Enseña ética, inteligencia emocional y perseverancia. Indica que superar obstáculos asegura aprendizaje, crecimiento personal y desarrollo integral en todos los aspectos de la vida." },
  // 213
  { nombre: "Ogunda Meji Ogbe", combinacion: "11001111", descripcion: "Ogunda Meji Ogbe representa esfuerzo, disciplina y acción guiada por la sabiduría. Enseña constancia, ética y planificación estratégica. Indica que la dedicación sostenida asegura estabilidad, éxito y evolución tanto material como espiritual." },
  // 214
  { nombre: "Osa Meji Ogbe", combinacion: "00110011", descripcion: "Osa Meji Ogbe simboliza cambios repentinos, lecciones del destino y pruebas profundas. Enseña adaptación, prudencia y ética. Indica que superar pruebas fortalece el carácter, asegura bienestar espiritual y permite evolución integral y prosperidad duradera." },
  // 215
  { nombre: "Ika Meji Ogbe", combinacion: "10100111", descripcion: "Ika Meji Ogbe representa pruebas de carácter, autocontrol y ética aplicada. Enseña paciencia, disciplina y resiliencia. Indica que actuar con integridad ante desafíos garantiza protección espiritual, guía y cumplimiento del destino en la vida." },
  // 216
  { nombre: "Oturupon Meji Ogbe", combinacion: "01011101", descripcion: "Oturupon Meji Ogbe simboliza obstáculos temporales y aprendizaje profundo. Enseña reflexión, paciencia, ética y perseverancia. Indica que superar dificultades fortalece el espíritu, asegura éxito y desarrollo espiritual y material." },
  // 217
  { nombre: "Otura Meji Ogbe", combinacion: "11000011", descripcion: "Otura Meji Ogbe representa claridad, equilibrio y guía espiritual. Enseña discernimiento, ética y acción consciente. Indica que la conexión con la sabiduría ancestral garantiza cumplimiento de objetivos, éxito y armonía en todos los aspectos de la vida." },
  // 218
  { nombre: "Irete Meji Ogbe", combinacion: "00111111", descripcion: "Irete Meji Ogbe simboliza destino inevitable y cumplimiento del karma. Enseña aceptación, disciplina y aprendizaje ético. Indica que actuar correctamente asegura crecimiento, bienestar integral y evolución sostenida en la vida." },
  // 219
  { nombre: "Oshe Meji Ogbe", combinacion: "11101101", descripcion: "Oshe Meji Ogbe representa amor, armonía, dulzura y expresión positiva. Enseña cuidado de relaciones, creatividad, empatía y ética. Indica que cultivar la bondad y la alegría fortalece la vida emocional y asegura prosperidad y protección espiritual." },
  // 220
  { nombre: "Ofun Meji Ogbe", combinacion: "00010111", descripcion: "Ofun Meji Ogbe simboliza cierre de ciclos, transformación y preparación para nuevos comienzos. Enseña desapego, reflexión y renovación ética. Indica que aceptar los cambios con sabiduría permite evolucionar plenamente y alcanzar bienestar integral." },
  // 221
  { nombre: "Eji Ogbe Ogbe", combinacion: "11111111", descripcion: "Eji Ogbe Ogbe representa inicios poderosos y claridad espiritual. Enseña determinación, ética y acción correcta. Indica que actuar con integridad garantiza prosperidad, guía espiritual y éxito duradero en todos los aspectos de la vida." },
  // 222
  { nombre: "Oyeku Meji Ogbe", combinacion: "00000011", descripcion: "Oyeku Meji Ogbe simboliza introspección, transición de ciclos y reflexión profunda. Enseña paciencia, disciplina y conexión espiritual. Indica que el recogimiento permite enfrentar cambios con claridad y alcanzar evolución integral." },
  // 223
  { nombre: "Iwori Meji Ogbe", combinacion: "10101101", descripcion: "Iwori Meji Ogbe representa conocimiento profundo y percepción de la verdad. Enseña análisis, ética, paciencia y disciplina. Indica que comprender y aplicar la verdad asegura éxito, equilibrio espiritual y prosperidad sostenida." },
  // 224
  { nombre: "Odi Meji Ogbe", combinacion: "01011101", descripcion: "Odi Meji Ogbe simboliza renovación espiritual y material, adaptabilidad y resiliencia. Enseña estrategia, planificación y acción ética. Indica que aceptar cambios y actuar con sabiduría fortalece la conexión con lo divino y asegura prosperidad." },
  // 225
  { nombre: "Irosun Meji Ogbe", combinacion: "11110101", descripcion: "Irosun Meji Ogbe representa advertencia, aprendizaje y crecimiento espiritual. Enseña prudencia, ética y preparación. Indica que anticiparse y actuar con conciencia asegura seguridad, éxito y evolución personal en todos los ámbitos." },
  // 226
  { nombre: "Owonrin Meji Ogbe", combinacion: "00001111", descripcion: "Owonrin Meji Ogbe simboliza acción consciente, adaptabilidad y resolución de problemas. Enseña planificación, ética, esfuerzo constante y flexibilidad. Indica que actuar correctamente garantiza progreso, superación y éxito sostenido." },
  // 227
  { nombre: "Obara Meji Ogbe", combinacion: "11100011", descripcion: "Obara Meji Ogbe representa comunicación sabia, liderazgo ético y persuasión positiva. Enseña claridad, responsabilidad y estrategia. Indica que expresarse con justicia y sabiduría abre caminos de reconocimiento, éxito social y bienestar espiritual." },
  // 228
  { nombre: "Okanran Meji Ogbe", combinacion: "10011111", descripcion: "Okanran Meji Ogbe simboliza retos y conflictos que requieren discernimiento y paciencia. Enseña ética, inteligencia emocional y perseverancia. Indica que superar obstáculos asegura aprendizaje, crecimiento personal y desarrollo integral." },
  // 229
  { nombre: "Ogunda Meji Ogbe", combinacion: "11001111", descripcion: "Ogunda Meji Ogbe representa esfuerzo, disciplina y acción guiada por la sabiduría. Enseña constancia, ética y planificación estratégica. Indica que la dedicación sostenida asegura estabilidad, éxito y evolución material y espiritual." },
  // 230
  { nombre: "Osa Meji Ogbe", combinacion: "00110011", descripcion: "Osa Meji Ogbe simboliza cambios repentinos, lecciones del destino y pruebas profundas. Enseña adaptación, prudencia y ética. Indica que superar pruebas fortalece el carácter, asegura bienestar espiritual y permite evolución integral." },
  // 231
  { nombre: "Ika Meji Ogbe", combinacion: "10100111", descripcion: "Ika Meji Ogbe representa pruebas de carácter, autocontrol y ética aplicada. Enseña paciencia, disciplina y resiliencia. Indica que actuar con integridad ante desafíos garantiza protección espiritual, guía y cumplimiento del destino." },
  // 232
  { nombre: "Oturupon Meji Ogbe", combinacion: "01011101", descripcion: "Oturupon Meji Ogbe simboliza obstáculos temporales y aprendizaje profundo. Enseña reflexión, paciencia, ética y perseverancia. Indica que superar dificultades fortalece el espíritu, asegura éxito y desarrollo espiritual y material." },
  // 233
  { nombre: "Otura Meji Ogbe", combinacion: "11000011", descripcion: "Otura Meji Ogbe representa claridad, equilibrio y guía espiritual. Enseña discernimiento, ética y acción consciente. Indica que la conexión con la sabiduría ancestral garantiza cumplimiento de objetivos, éxito y armonía." },
  // 234
  { nombre: "Irete Meji Ogbe", combinacion: "00111111", descripcion: "Irete Meji Ogbe simboliza destino inevitable y cumplimiento del karma. Enseña aceptación, disciplina y aprendizaje ético. Indica que actuar correctamente asegura crecimiento, bienestar integral y evolución sostenida." },
  // 235
  { nombre: "Oshe Meji Ogbe", combinacion: "11101101", descripcion: "Oshe Meji Ogbe representa amor, armonía, dulzura y expresión positiva. Enseña cuidado de relaciones, creatividad, empatía y ética. Indica que cultivar la bondad y la alegría fortalece la vida emocional y asegura prosperidad y protección espiritual." },
  // 236
  { nombre: "Ofun Meji Ogbe", combinacion: "00010111", descripcion: "Ofun Meji Ogbe simboliza cierre de ciclos, transformación y preparación para nuevos comienzos. Enseña desapego, reflexión y renovación ética. Indica que aceptar los cambios con sabiduría permite evolucionar plenamente y alcanzar bienestar integral." },
  // 237
  { nombre: "Eji Ogbe Ogbe", combinacion: "11111111", descripcion: "Eji Ogbe Ogbe representa inicios poderosos y claridad espiritual. Enseña determinación, ética y acción correcta. Indica que actuar con integridad garantiza prosperidad, guía espiritual y éxito duradero en todos los aspectos de la vida." },
  // 238
  { nombre: "Oyeku Meji Ogbe", combinacion: "00000011", descripcion: "Oyeku Meji Ogbe simboliza introspección, transición de ciclos y reflexión profunda. Enseña paciencia, disciplina y conexión espiritual. Indica que el recogimiento permite enfrentar cambios con claridad y alcanzar evolución integral." },
  // 239
  { nombre: "Iwori Meji Ogbe", combinacion: "10101101", descripcion: "Iwori Meji Ogbe representa conocimiento profundo y percepción de la verdad. Enseña análisis, ética, paciencia y disciplina. Indica que comprender y aplicar la verdad asegura éxito, equilibrio espiritual y prosperidad sostenida." },
  // 240
  { nombre: "Odi Meji Ogbe", combinacion: "01011101", descripcion: "Odi Meji Ogbe simboliza renovación espiritual y material, adaptabilidad y resiliencia. Enseña estrategia, planificación y acción ética. Indica que aceptar cambios y actuar con sabiduría fortalece la conexión con lo divino y asegura prosperidad." },
  // 241
  { nombre: "Irosun Meji Ogbe", combinacion: "11110101", descripcion: "Irosun Meji Ogbe representa advertencia, aprendizaje y crecimiento espiritual. Enseña prudencia, ética y preparación. Indica que anticiparse y actuar con conciencia asegura seguridad, éxito y evolución personal." },
  // 242
  { nombre: "Owonrin Meji Ogbe", combinacion: "00001111", descripcion: "Owonrin Meji Ogbe simboliza acción consciente, adaptabilidad y resolución de problemas. Enseña planificación, ética, esfuerzo constante y flexibilidad. Indica que actuar correctamente garantiza progreso, superación y éxito sostenido." },
  // 243
  { nombre: "Obara Meji Ogbe", combinacion: "11100011", descripcion: "Obara Meji Ogbe representa comunicación sabia, liderazgo ético y persuasión positiva. Enseña claridad, responsabilidad y estrategia. Indica que expresarse con justicia y sabiduría abre caminos de reconocimiento, éxito social y bienestar espiritual." },
  // 244
  { nombre: "Okanran Meji Ogbe", combinacion: "10011111", descripcion: "Okanran Meji Ogbe simboliza retos y conflictos que requieren discernimiento y paciencia. Enseña ética, inteligencia emocional y perseverancia. Indica que superar obstáculos asegura aprendizaje, crecimiento personal y desarrollo integral." },
  // 245
  { nombre: "Ogunda Meji Ogbe", combinacion: "11001111", descripcion: "Ogunda Meji Ogbe representa esfuerzo, disciplina y acción guiada por la sabiduría. Enseña constancia, ética y planificación estratégica. Indica que la dedicación sostenida asegura estabilidad, éxito y evolución material y espiritual." },
  // 246
  { nombre: "Osa Meji Ogbe", combinacion: "00110011", descripcion: "Osa Meji Ogbe simboliza cambios repentinos, lecciones del destino y pruebas profundas. Enseña adaptación, prudencia y ética. Indica que superar pruebas fortalece el carácter, asegura bienestar espiritual y permite evolución integral." },
  // 247
  { nombre: "Ika Meji Ogbe", combinacion: "10100111", descripcion: "Ika Meji Ogbe representa pruebas de carácter, autocontrol y ética aplicada. Enseña paciencia, disciplina y resiliencia. Indica que actuar con integridad ante desafíos garantiza protección espiritual, guía y cumplimiento del destino." },
  // 248
  { nombre: "Oturupon Meji Ogbe", combinacion: "01011101", descripcion: "Oturupon Meji Ogbe simboliza obstáculos temporales y aprendizaje profundo. Enseña reflexión, paciencia, ética y perseverancia. Indica que superar dificultades fortalece el espíritu, asegura éxito y desarrollo espiritual y material." },
  // 249
  { nombre: "Otura Meji Ogbe", combinacion: "11000011", descripcion: "Otura Meji Ogbe representa claridad, equilibrio y guía espiritual. Enseña discernimiento, ética y acción consciente. Indica que la conexión con la sabiduría ancestral garantiza cumplimiento de objetivos, éxito y armonía." },
  // 250
  { nombre: "Irete Meji Ogbe", combinacion: "00111111", descripcion: "Irete Meji Ogbe simboliza destino inevitable y cumplimiento del karma. Enseña aceptación, disciplina y aprendizaje ético. Indica que actuar correctamente asegura crecimiento, bienestar integral y evolución sostenida." },
  // 251
  { nombre: "Oshe Meji Ogbe", combinacion: "11101101", descripcion: "Oshe Meji Ogbe representa amor, armonía, dulzura y expresión positiva. Enseña cuidado de relaciones, creatividad, empatía y ética. Indica que cultivar la bondad y la alegría fortalece la vida emocional y asegura prosperidad y protección espiritual." },
  // 252
  { nombre: "Ofun Meji Ogbe", combinacion: "00010111", descripcion: "Ofun Meji Ogbe simboliza cierre de ciclos, transformación y preparación para nuevos comienzos. Enseña desapego, reflexión y renovación ética. Indica que aceptar los cambios con sabiduría permite evolucionar plenamente y alcanzar bienestar integral." },
  // 253
  { nombre: "Eji Ogbe Ogbe", combinacion: "11111111", descripcion: "Eji Ogbe Ogbe representa inicios poderosos y claridad espiritual. Enseña determinación, ética y acción correcta. Indica que actuar con integridad garantiza prosperidad, guía espiritual y éxito duradero en todos los aspectos de la vida." },
  // 254
  { nombre: "Oyeku Meji Ogbe", combinacion: "00000011", descripcion: "Oyeku Meji Ogbe simboliza introspección, transición de ciclos y reflexión profunda. Enseña paciencia, disciplina y conexión espiritual. Indica que el recogimiento permite enfrentar cambios con claridad y alcanzar evolución integral." },
  // 255
  { nombre: "Iwori Meji Ogbe", combinacion: "10101101", descripcion: "Iwori Meji Ogbe representa conocimiento profundo y percepción de la verdad. Enseña análisis, ética, paciencia y disciplina. Indica que comprender y aplicar la verdad asegura éxito, equilibrio espiritual y prosperidad sostenida." },
  // 256
  { nombre: "Ofun Meji Ogbe", combinacion: "00010111", descripcion: "Ofun Meji Ogbe simboliza cierre de ciclos, transformación y preparación para nuevos comienzos. Enseña desapego, reflexión y renovación ética. Indica que aceptar los cambios con sabiduría permite evolucionar plenamente y alcanzar bienestar integral." }
];


// Inicializar posiciones de cuentas
for (let i = 0; i < 4; i++) {
  cuentasIzq.push({ x: centerX - 100, y: 80 + i * 60, estado: 0 });
  cuentasDer.push({ x: centerX + 100, y: 80 + i * 60, estado: 0 });
}

// Dibujar collar
function dibujarCollar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  [...cuentasIzq, ...cuentasDer].forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, radio, 0, Math.PI * 2);
    ctx.fillStyle = c.estado === 1 ? "#FFD700" : "#228B22";
    ctx.fill();
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

// Click en cuenta para alternar estado
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  [...cuentasIzq, ...cuentasDer].forEach(c => {
    const dx = mx - c.x;
    const dy = my - c.y;
    if (Math.sqrt(dx * dx + dy * dy) < radio) {
      c.estado = c.estado === 1 ? 0 : 1;
      dibujarCollar();
    }
  });
});

// Obtener combinación de 8 bits
function obtenerCombinacion() {
  return [...cuentasIzq, ...cuentasDer].map(c => c.estado).join('');
}

// Consultar Odù exacto
consultarBtn.addEventListener('click', () => {
  const combinacion = obtenerCombinacion();
  const odun = odunes.find(o => o.combinacion === combinacion);
  if (odun) {
    resultado.innerHTML = `<h2>${odun.nombre}</h2><p>${odun.descripcion}</p>`;
  } else {
    resultado.innerHTML = `<h2>Sin resultado</h2><p>Esta combinación no coincide con ningún Odù registrado.</p>`;
  }
});

// Inicializar
dibujarCollar();


