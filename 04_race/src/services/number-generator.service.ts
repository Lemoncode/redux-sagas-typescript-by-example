
let initialNumber = 0;

export const generateNewNumber = () : Promise<number> => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      initialNumber += 1;
      resolve(initialNumber)
    }, 5000)
  });

  return promise;
}