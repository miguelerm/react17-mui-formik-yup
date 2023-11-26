const optionsHours: string[] = [

];

for (let index = 0; index < 24; index++) {
    const prefix = index < 10 ? '0' : '';
    const hour = prefix + index;
    optionsHours.push(`${hour}:00`);
    optionsHours.push(`${hour}:30`);
}

export { optionsHours };