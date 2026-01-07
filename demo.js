const { toOrdinal } = require('./src/ordinales');

console.log("\n--- DEMOSTRACIÓN DE RESULTADOS ---\n");

// Vamos a probar estos números clave
const numeros = [1, 3, 10, 21, 23, 31, 101];

console.log("NUM | NORMAL (M)           | APÓCOPE (M) [NUEVO]  | FEMENINO");
console.log("----|----------------------|----------------------|-----------------");

numeros.forEach(n => {
    const normal = toOrdinal(n, 'm');       // Comportamiento de siempre
    const conApocope = toOrdinal(n, 'm', true); // Tu nueva funcionalidad
    const femenino = toOrdinal(n, 'f', true);   // Femenino (debe ignorar apócope)

    // Formateamos para que se vea como tabla
    const col1 = n.toString().padEnd(3);
    const col2 = normal.padEnd(20);
    const col3 = conApocope.padEnd(20);

    console.log(`${col1} | ${col2} | ${col3} | ${femenino}`);
});

console.log("\n----------------------------------\n");
