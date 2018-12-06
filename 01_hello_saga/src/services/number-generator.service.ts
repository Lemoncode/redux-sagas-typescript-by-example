
let initialNumber = 2;

export const generateNewNumber = () : Promise<number> => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      initialNumber += 2;
      resolve(initialNumber)
    }, 500)
  });

  return promise;
}