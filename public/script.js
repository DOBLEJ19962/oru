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
  { nombre: "Eji Ogbe", combinacion: "11111111", descripcion: "Inicio, fuerza positiva, prosperidad, claridad y la luz del universo." },
  { nombre: "Oyeku Meji", combinacion: "00000000", descripcion: "Oscuridad, silencio, introspección, el fin de un ciclo y la transición." },
  { nombre: "Iwori Meji", combinacion: "10101010", descripcion: "Profundidad, conocimiento oculto, paciencia, sabiduría ancestral." },
  { nombre: "Odi Meji", combinacion: "01010101", descripcion: "Transformación, renovación, fertilidad, cambios inevitables." },
  { nombre: "Irosun Meji", combinacion: "11110000", descripcion: "Advertencia, precaución, peligros ocultos, necesidad de protección." },
  { nombre: "Owonrin Meji", combinacion: "00001111", descripcion: "Movimiento, adaptabilidad, flexibilidad, superación de obstáculos." },
  { nombre: "Obara Meji", combinacion: "11100011", descripcion: "Palabra poderosa, comunicación, liderazgo, expansión social." },
  { nombre: "Okanran Meji", combinacion: "10011100", descripcion: "Conflicto, retos, coraje, acción rápida y decisiones difíciles." },
  { nombre: "Ogunda Meji", combinacion: "11001100", descripcion: "Trabajo duro, esfuerzo constante, lucha y resistencia." },
  { nombre: "Osa Meji", combinacion: "00110011", descripcion: "Destino, cambios repentinos, pruebas de la vida para crecer." },
  { nombre: "Ika Meji", combinacion: "10100101", descripcion: "Pruebas de carácter, control de impulsos, superar tentaciones." },
  { nombre: "Oturupon Meji", combinacion: "01011010", descripcion: "Obstáculos, dificultades temporales, lecciones espirituales." },
  { nombre: "Otura Meji", combinacion: "11000011", descripcion: "Claridad, equilibrio, guía espiritual, apertura de caminos." },
  { nombre: "Irete Meji", combinacion: "00111100", descripcion: "Destino inevitable, cumplimiento de karma, evolución forzada." },
  { nombre: "Oshe Meji", combinacion: "11101010", descripcion: "Amor, dulzura, placer, belleza, fuerza femenina y armonía." },
  { nombre: "Ofun Meji", combinacion: "00010101", descripcion: "Fin de un ciclo, muerte simbólica, preparación para el renacer." },

  // Del 17 al 50 (simplificado, puedes expandir cada uno)
  { nombre: "Ogbe Yekun", combinacion: "11111110", descripcion: "Luz enfrentando oscuridad, transición entre extremos." },
  { nombre: "Iwori Ogbe", combinacion: "10101111", descripcion: "Sabiduría al servicio del progreso, vencer limitaciones." },
  { nombre: "Odi Ogbe", combinacion: "01011111", descripcion: "Renovación material y espiritual, fertilidad y fuerza vital." },
  { nombre: "Irosun Ogbe", combinacion: "11110001", descripcion: "Advertencia de peligro, pero también apertura de caminos." },
  { nombre: "Owonrin Ogbe", combinacion: "11111100", descripcion: "Movimiento con claridad, adaptabilidad y evolución positiva." },
  { nombre: "Obara Ogbe", combinacion: "11111011", descripcion: "Comunicación influyente, logros sociales, expansión rápida." },
  { nombre: "Okanran Ogbe", combinacion: "11100111", descripcion: "Conflictos resueltos con inteligencia y firmeza." },
  { nombre: "Ogunda Ogbe", combinacion: "11101110", descripcion: "Esfuerzo recompensado, crecimiento personal y colectivo." },
  { nombre: "Osa Ogbe", combinacion: "11011111", descripcion: "Cambios repentinos hacia la abundancia, destino positivo." },
  { nombre: "Ika Ogbe", combinacion: "11110101", descripcion: "Pruebas de fe, superar miedos internos, protección." },
  { nombre: "Oturupon Ogbe", combinacion: "11100110", descripcion: "Dificultades pasajeras, enseñanza espiritual profunda." },
  { nombre: "Otura Ogbe", combinacion: "11101001", descripcion: "Guía divina, claridad en decisiones, justicia." },
  { nombre: "Irete Ogbe", combinacion: "11110010", descripcion: "Cumplimiento del destino, logros tras sacrificios." },
  { nombre: "Oshe Ogbe", combinacion: "11011011", descripcion: "Dulzura y poder espiritual, equilibrio emocional." },
  { nombre: "Ofun Ogbe", combinacion: "11101000", descripcion: "Transformación total, cierre de ciclos dolorosos." },

  { nombre: "Ogbe Iwori", combinacion: "11111010", descripcion: "Claridad y sabiduría, descubrimiento de secretos." },
  { nombre: "Oyeku Iwori", combinacion: "00001010", descripcion: "Oscuridad con sabiduría, tiempo de recogimiento." },
  { nombre: "Iwori Oyeku", combinacion: "10100000", descripcion: "Conocimiento frente al vacío, luz en la oscuridad." },
  { nombre: "Odi Iwori", combinacion: "01011000", descripcion: "Renovación con sabiduría, cambios internos fuertes." },
  { nombre: "Irosun Iwori", combinacion: "10110010", descripcion: "Advertencia de engaños, necesidad de vigilancia." },
  { nombre: "Owonrin Iwori", combinacion: "10101100", descripcion: "Movimiento guiado por sabiduría, superar pruebas." },
  { nombre: "Obara Iwori", combinacion: "10111100", descripcion: "Palabra sabia, discursos que abren puertas." },
  { nombre: "Okanran Iwori", combinacion: "10100111", descripcion: "Retos intelectuales, aprender de los errores." },
  { nombre: "Ogunda Iwori", combinacion: "10111001", descripcion: "Trabajo iluminado por sabiduría, progreso real." },
  { nombre: "Osa Iwori", combinacion: "10110101", descripcion: "Destino revelado a través de la inteligencia." },
  { nombre: "Ika Iwori", combinacion: "10110001", descripcion: "Pruebas mentales, necesidad de firmeza en decisiones." },
  { nombre: "Oturupon Iwori", combinacion: "10101001", descripcion: "Dificultades en el conocimiento, lecciones de vida." },
  { nombre: "Otura Iwori", combinacion: "10111010", descripcion: "Guía espiritual en el aprendizaje, apertura de caminos." },
  { nombre: "Irete Iwori", combinacion: "10100101", descripcion: "Destino marcado por la sabiduría, decisiones firmes." },
  { nombre: "Oshe Iwori", combinacion: "10101101", descripcion: "Amor guiado por inteligencia, claridad en relaciones." },
  { nombre: "Ofun Iwori", combinacion: "10110011", descripcion: "Transformación a través de la enseñanza ancestral." }
];


// Inicializar posiciones de cuentas
for(let i=0;i<4;i++){
  cuentasIzq.push({x:centerX-100, y:80 + i*60, estado:0});
  cuentasDer.push({x:centerX+100, y:80 + i*60, estado:0});
}

// Dibujar collar
function dibujarCollar(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  [...cuentasIzq,...cuentasDer].forEach(c=>{
    ctx.beginPath();
    ctx.arc(c.x,c.y,radio,0,Math.PI*2);
    ctx.fillStyle = c.estado===1 ? "#FFD700" : "#228B22"; // visible=dorado, oculto=verde
    ctx.fill();
    ctx.strokeStyle="#FFD700";
    ctx.lineWidth=2;
    ctx.stroke();
  });
}

// Click en cuenta para alternar estado
canvas.addEventListener('click',(e)=>{
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  [...cuentasIzq,...cuentasDer].forEach(c=>{
    const dx = mx-c.x;
    const dy = my-c.y;
    if(Math.sqrt(dx*dx+dy*dy)<radio){
      c.estado = c.estado===1?0:1;
      dibujarCollar();
    }
  });
});

// Obtener combinación de 8 bits
function obtenerCombinacion(){
  return [...cuentasIzq,...cuentasDer].map(c=>c.estado).join('');
}

// Consultar Odù exacto
consultarBtn.addEventListener('click',()=>{
  const combinacion = obtenerCombinacion();
  const odun = odunes.find(o=>o.combinacion===combinacion);
  if(odun){
    resultado.innerHTML=`<h2>${odun.nombre}</h2><p>${odun.descripcion}</p>`;
  }else{
    resultado.innerHTML=`<h2>Sin resultado</h2><p>Esta combinación no coincide con ningún Odù registrado.</p>`;
  }
});

// Inicializar
dibujarCollar();
