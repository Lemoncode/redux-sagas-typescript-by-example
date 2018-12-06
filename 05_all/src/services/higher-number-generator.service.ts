
let initialNumber = 100;

export const generateHigherNewNumber = () : Promise<number> => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      initialNumber += 1;
      resolve(initialNumber)
    }, 1500)
  });

  return promise;
}