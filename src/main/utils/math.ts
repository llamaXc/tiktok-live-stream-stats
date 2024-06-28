export function calculateAverage(numbers: number[]) {
    if (numbers.length === 0) {
      return 0;
    }
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / numbers.length;
}