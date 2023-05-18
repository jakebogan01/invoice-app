import { persisted } from "svelte-local-storage-store";

/**TESTING ONLY**/
/**REMOVE WHEN IN PRODUCTION**/
class RanId {
     id() {
          let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
          let result = "";

          for (let i = 0; i < 6; i++) {
               result += characters[Math.floor(Math.random() * characters.length)];
          }

          return result;
     }
}
const radonId = new RanId();
/**REMOVE ABOVE IN PRODUCTION**/

function getRandomDate(startDate, endDate) {
     const minValue = startDate.getTime();
     const maxValue = endDate.getTime();
     const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
     const randomDate = new Date(timestamp);
     return randomDate.toDateString().split(" ").slice(1).join(" ");
}

export const preferences = persisted("preferences", [
     {
          id: 1,
          amount: 1800.91,
          randomId: radonId.id(),
          name: "Jerome yount",
          dueDate: getRandomDate(new Date(2015, 0, 1), new Date()),
          status: "Paid",
     },
     {
          id: 2,
          amount: 1800.91,
          randomId: radonId.id(),
          name: "Jake Bogan",
          dueDate: getRandomDate(new Date(2015, 0, 1), new Date()),
          status: "Pending",
     },
     {
          id: 3,
          amount: 1800.91,
          randomId: radonId.id(),
          name: "Jane Doe",
          dueDate: getRandomDate(new Date(2015, 0, 1), new Date()),
          status: "Draft",
     },
]);
